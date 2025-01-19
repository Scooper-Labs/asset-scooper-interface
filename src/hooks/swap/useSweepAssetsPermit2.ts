import { ASSETSCOOPER_CONTRACT_ABI } from "./../../constants/abi/assetscooper2";
import {
  useAccount,
  useReadContract,
  useReadContracts,
  useWriteContract,
  useSimulateContract,
  useWaitForTransactionReceipt,
  useSignTypedData,
} from "wagmi";
import { useState, useEffect, useContext, useMemo } from "react";
import {
  MaxAllowanceTransferAmount,
  SignatureTransfer,
  permit2Address,
} from "@uniswap/permit2-sdk";
import { Address, parseEther, parseUnits } from "viem";
import { erc20Abi } from "viem";
import BigNumber from "bignumber.js";
import PERMIT2_ABI from "../../constants/abi/permit2.json";
import { TokenListProvider } from "@/provider/tokenListProvider";
import {
  permit2_contract_address,
  assetscooper_contract,
} from "@/constants/contractAddress";
import { useApprove } from "./useApproval";
import { useSweepAssetsSimulation } from "./useSweepAssets";
import { useTokenAllowances } from "./useTokenAllowances";
import { MoralisAssetClass } from "@/utils/classes";
import { toDeadline } from "@/utils/numberUtils";

const ASSET_SCOOPER_ADDRESS = assetscooper_contract; // assetscooper deployed contract
const PERMIT2_ADDRESS = permit2_contract_address; // Permit2 contract address

export function useSweepAssetsPermit2() {
  const { address, chain } = useAccount();
  const [isApproving, setIsApproving] = useState<boolean>(false);

  const { tokenList: selectedTokens } = useContext(TokenListProvider);

  const { writeContract, writeContractAsync } = useWriteContract();
  const {
    data: transactionReceipt,
    isLoading: isWaitingForReceipt,
    isSuccess: isReceiptSuccess,
  } = useWaitForTransactionReceipt();

  const [simulationArgs, setSimulationArgs] = useState<any[]>([]);
  const { data: simulationData, resimulate } =
    useSweepAssetsSimulation(simulationArgs);

  // Handle permit2 approval
  // const {
  //   approve,
  //   //  isLoading: isPendingApproval,
  //   //  isSuccess,
  // } = useApprove(selectedTokens[0]?.address as Address, [
  //   PERMIT2_ADDRESS,
  //   parseUnits(
  //     selectedTokens[0].userBalance.toString() || "0",
  //     selectedTokens[0].decimals || 18
  //   ),
  // ]);

  const { approve } = useApprove([
    PERMIT2_ADDRESS,
    //@ts-ignore
    MaxAllowanceTransferAmount, // Max approval
  ]);

  const allowanceData = useTokenAllowances(
    selectedTokens,
    address as Address,
    permit2_contract_address
  );

  // Check and approve tokens
  const slippageToleranceTest = 0.005; // 0.5% slippage tolerance

  const calculateMinAmountOut = (token: MoralisAssetClass) => {
    const balance = parseUnits(token.userBalance.toString(), token.decimals);
    const minAmountOut =
      (balance * BigInt(Math.floor((1 - slippageToleranceTest) * 1000))) /
      1000n;
    return minAmountOut.toString();
  };

  const checkAndApproveTokens = async (tokens: MoralisAssetClass[]) => {
    setIsApproving(true);
    try {
      for (const [index, token] of tokens.entries()) {
        const { data: allowanceDataForToken } = allowanceData[index];
        if (allowanceDataForToken !== undefined) {
          const allowance = BigInt(allowanceDataForToken.toString());
          const requiredAllowance = parseUnits(
            token.userBalance.toString(),
            token.decimals
          );
          if (allowance < requiredAllowance) {
            console.log(`Approving ${token.symbol}...`);
            await approve?.();
          }
        } else {
          console.warn(
            `Allowance data for token ${token.symbol} is undefined.`
          );
        }
      }
    } catch (error) {
      console.error("Error in checkAndApproveTokens:", error);
      throw error;
    } finally {
      setIsApproving(false);
    }
  };

  // Generate permit signature
  const generatePermitSignature = async (
    tokens: MoralisAssetClass[],
    amounts: string[],
    deadline: number
  ) => {
    if (!address || !chain?.id) return null;

    const permitted = tokens.map((token, index) => ({
      token: token.address,
      amount: calculateMinAmountOut(token),
    }));

    const permitData = {
      permitted,
      nonce: Date.now(), // You may want to fetch this from the contract
      deadline,
      spender: assetscooper_contract,
    };

    const { domain, types } = SignatureTransfer.getPermitData(
      //@ts-ignore
      permitData,
      permit2_contract_address,
      chain.id
    );

    // Use wagmi's signTypedData
    const signature = await window.ethereum.request({
      method: "eth_signTypedData_v4",
      params: [
        address,
        JSON.stringify({
          domain,
          types,
          message: permitData,
        }),
      ],
    });

    return { permitData, signature };
  };

  //**sweep function
  const sweepAssets = async ({
    tokens,
    // minOutputAmounts,
    tokenOut,
    deadline = toDeadline(/* 30 days= */ 1000 * 60 * 60 * 24 * 30),
  }: {
    tokens: MoralisAssetClass[];
    // minOutputAmounts: string[];
    tokenOut: Address;
    deadline?: number;
  }) => {
    if (!address) throw new Error("Wallet not connected");

    try {
      console.log("Starting sweep with:", {
        tokenAddresses: tokens.map((t) => t.address),
        tokenOut,
        deadline,
      });

      await checkAndApproveTokens(tokens);

      const minOutputAmounts = tokens.map(calculateMinAmountOut);

      const result = await generatePermitSignature(
        tokens,
        tokens.map((t) => t.userBalance.toString()),
        deadline
      );

      if (!result) {
        throw new Error("Permit signature generation failed");
      }

      const { permitData, signature } = result;

      const swapParam = {
        assets: tokens.map((t) => t.address),
        minOutputAmounts,
        tokenOut,
        deadline,
      };

      setSimulationArgs([swapParam, permitData, signature]);

      const simulationResult = await resimulate();

      if (!simulationResult?.result) {
        console.error("Simulation Result:", simulationResult);
        throw new Error("Simulation failed or returned no data");
      }

      console.log("Final contract call params:", simulationResult.result);
      const hash = await writeContractAsync(simulationResult.result);
      console.log("Transaction submitted:", hash);

      // Wait for the transaction receipt
      while (!isReceiptSuccess) {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second
      }
      console.log("Transaction receipt:", transactionReceipt);

      return transactionReceipt;
    } catch (error: any) {
      console.error("Sweep Assets Error:", {
        message: error.message,
        code: error.code,
        data: error.data,
        originalError: error.data?.originalError,
      });
      throw error;
    }
  };

  return {
    sweepAssets,
    isApproving,
    checkAndApproveTokens,
  };
}
