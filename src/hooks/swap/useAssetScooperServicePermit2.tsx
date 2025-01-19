import { useSignTypedData, useAccount } from "wagmi";
import { getWalletClient, getPublicClient } from "@wagmi/core";
import {
  AllowanceProvider,
  PERMIT2_ADDRESS,
  MaxAllowanceTransferAmount,
  PermitSingle,
  AllowanceTransfer,
  PermitDetails,
} from "@uniswap/permit2-sdk";
import {
  Address,
  createPublicClient,
  http,
  getContract,
  PublicClient,
} from "viem";
import { wagmiConfig } from "@/config/switchchain/reownkit";
import { toDeadline } from "@/utils/numberUtils";
import { assetscooper_contract as ASSETSCOOPER_CONTRACT_ADDRESS } from "@/constants/contractAddress";
import { ASSETSCOOPER_CONTRACT_ABI } from "@/constants/abi/assetscooper2";
import { MoralisAssetClass } from "@/utils/classes";
import { providers } from "ethers";

const PERMIT_EXPIRATION = 30 * 24 * 60 * 60 * 1000; // 30 days in ms
const PERMIT_SIG_EXPIRATION = 30 * 60 * 1000; // 30 minutes in ms
const ETH_ADDRESS = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";

const createEthersProvider = (publicClient: PublicClient) => {
  return new providers.JsonRpcProvider(
    publicClient?.transport?.url as string,
    publicClient?.chain?.id
  );
};

export function usePermit2() {
  const { address } = useAccount();
  const { signTypedDataAsync } = useSignTypedData();

  const getPermit2SignatureForTokens = async (
    tokens: MoralisAssetClass[],
    spenderAddress: Address
  ) => {
    try {
      if (!address) throw new Error("No wallet connected");

      // Get wallet client and public client
      const walletClient = await getWalletClient(wagmiConfig);

      if (!walletClient) throw new Error("Wallet not connected");

      const publicClient = getPublicClient(wagmiConfig);

      const viemProvider = createPublicClient({
        chain: walletClient.chain,
        transport: http(),
      });

      // Convert Viem provider to Ethers provider
      const ethersProvider = createEthersProvider(viemProvider);

      console.log(ethersProvider, "this is ethers provider");

      const allowanceProvider = new AllowanceProvider(
        ethersProvider as any,
        PERMIT2_ADDRESS
      );

      const permits = await Promise.all(
        tokens.map(async (token) => {
          console.log("Processing token:", token.address);
          const {
            amount: permitAmount,
            expiration,
            nonce,
          } = await allowanceProvider.getAllowanceData(
            address as Address,
            token.address,
            spenderAddress
          );

          console.log("Allowance data:", { permitAmount, expiration, nonce });

          if (
            permitAmount >= MaxAllowanceTransferAmount &&
            expiration > Date.now() / 1000
          ) {
            return null;
          }

          const permitSingle: PermitSingle = {
            details: {
              token: token.address,
              amount: MaxAllowanceTransferAmount,
              expiration: toDeadline(PERMIT_EXPIRATION),
              nonce,
            },
            spender: spenderAddress,
            sigDeadline: toDeadline(PERMIT_SIG_EXPIRATION),
          };

          // Get chain ID
          const chainId = await publicClient?.getChainId();

          console.log("Created permitSingle:", permitSingle);

          const {
            domain: permitDomain,
            types,
            values,
          } = AllowanceTransfer.getPermitData(
            permitSingle,
            PERMIT2_ADDRESS,
            chainId!!
          );

          const domain = {
            name: permitDomain.name!!,
            chainId: Number(chainId),
            verifyingContract: permitDomain.verifyingContract as Address,
          };

          console.log("Signing domain:", domain);
          console.log("Types:", types);

          const details = values.details as PermitDetails;

          // Convert message values to Record<string, any>
          const message: Record<string, any> = {
            details: {
              token: details.token,
              amount: details.amount.toString(),
              expiration: details.expiration,
              nonce: details.nonce,
            },
            spender: values.spender,
            sigDeadline: values.sigDeadline,
          };

          console.log("Signing message:", message);

          // Sign the permit
          const signature = await signTypedDataAsync({
            domain,
            types,
            primaryType: "PermitSingle",
            message,
          });

          console.log("Obtained signature:", signature);

          if (!signature) {
            throw new Error("Failed to obtain signature");
          }

          return {
            permitSingle,
            signature,
          };
        })
      );

      return permits;
    } catch (error) {
      console.error("Error getting Permit2 signature:", error);
      throw error;
    }
  };

  const permitAndSweepAssets = async (
    tokens: MoralisAssetClass[],
    amounts: bigint[]
  ) => {
    try {
      // Get permits for all tokens
      const permits = await getPermit2SignatureForTokens(
        tokens,
        ASSETSCOOPER_CONTRACT_ADDRESS
      );

      console.log("Received permits:", permits);

      const walletClient = await getWalletClient(wagmiConfig);
      const publicClient = getPublicClient(wagmiConfig);

      if (!walletClient) throw new Error("Wallet not connected");

      const contract = getContract({
        address: ASSETSCOOPER_CONTRACT_ADDRESS,
        abi: ASSETSCOOPER_CONTRACT_ABI,
        client: { public: publicClient, wallet: walletClient },
      });

      console.log("Contract instance created");

      const swapParam = {
        assets: tokens.map((token) => token.address as `0x${string}`),
        minOutputAmounts: amounts.map((amount) => BigInt(amount)),
        tokenOut: "0x4200000000000000000000000000000000000006" as `0x${string}`,
        deadline: BigInt(toDeadline(PERMIT_SIG_EXPIRATION)),
      };

      console.log(
        "swapParam:",
        JSON.stringify(
          swapParam,
          (_, v) => (typeof v === "bigint" ? v.toString() : v),
          2
        )
      );

      const validPermits = permits.filter(
        (p): p is { permitSingle: any; signature: `0x${string}` } =>
          p !== null &&
          typeof p.signature === "string" &&
          p.signature.startsWith("0x")
      );

      if (validPermits.length === 0) {
        throw new Error("No valid permits found");
      }

      const permitParam = {
        permitted: tokens.map((token, index) => ({
          token: token.address as `0x${string}`,
          amount: amounts[index],
        })),
        nonce: BigInt(validPermits[0].permitSingle.details.nonce.toString()),
        deadline: BigInt(validPermits[0].permitSingle.sigDeadline.toString()),
      };

      console.log(
        "permitParam:",
        JSON.stringify(
          permitParam,
          (_, v) => (typeof v === "bigint" ? v.toString() : v),
          2
        )
      );

      const signatures = validPermits.map((p) => p.signature);
      console.log("signatures:", signatures);

      console.log(
        "Full contract parameters:",
        JSON.stringify(
          {
            swapParam,
            permitParam,
            signatures,
          },
          (_, v) => (typeof v === "bigint" ? v.toString() : v),
          2
        )
      );

      const hash = await contract.write.sweepAsset(
        [swapParam, permitParam, signatures as any],
        {
          account: walletClient.account,
          chain: walletClient.chain,
        }
      );

      console.log("Transaction hash:", hash);

      const receipt = await publicClient?.waitForTransactionReceipt({ hash });

      console.log("the receipt is here", receipt);

      return receipt;
    } catch (error) {
      console.error("Error in permitAndSweepAssets:", error);
      throw error;
    }
  };

  return {
    getPermit2SignatureForTokens,
    permitAndSweepAssets,
  };
}
