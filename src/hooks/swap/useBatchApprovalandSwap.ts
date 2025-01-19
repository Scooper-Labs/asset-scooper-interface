import { useState, useCallback, useEffect, useContext } from "react";
import { useAccount, useWaitForTransactionReceipt } from "wagmi";
import { useSendCalls, useCallsStatus } from "wagmi/experimental";
import { useToast } from "@chakra-ui/react";
import { Address, encodeFunctionData, erc20Abi, parseUnits } from "viem";
import axios from "axios";
import BigNumber from "bignumber.js";
import { OptimalRate, SwapSide, ParaSwapVersion } from "@paraswap/core";
import { PARASWAP_API_URL } from "@/constants/paraswap";
import { assetscooper_contract } from "@/constants/contractAddress";
import { Token } from "@/lib/components/types";
import { StateContext, Types } from "@/provider/AppProvider";
import CustomToast from "@/components/Toast";
import { ExtendedErrorType } from "../useAssetScooperWriteContract";
import useSelectToken from "../useSelectToken";
import { MoralisAssetClass } from "@/utils/classes";

const PARTNER = "chucknorrisv6";
const SLIPPAGE = 1;
const ETH_ADDRESS = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";

export enum TransactionStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  FAILED = "FAILED",
}

interface TransactionParams {
  to: Address;
  from: string;
  value: bigint;
  data: Address;
  gasPrice: string;
  gas?: string;
  chainId: number;
}

export const useBatchTransactions = ({
  tokens,
  amounts,
  spender = assetscooper_contract as Address,
}: {
  tokens: Token[];
  amounts: string[];
  spender?: Address;
}) => {
  const { setMessage, setType } = useContext(StateContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [isExecuteLoading, setIsExecuteLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { address, chainId } = useAccount();
  const toast = useToast();
  const { sendCalls } = useSendCalls();
  const [batchCallId, setBatchCallId] = useState<string | null>(null);

  const { tokenList: selectedTokens } = useSelectToken();

  const [txHash, setTxHash] = useState<string | null>(null);

  const [transactionStatus, setTransactionStatus] =
    useState<TransactionStatus | null>(null);

  const { data: callStatus } = useCallsStatus({
    id: (batchCallId as string) ?? "",
    query: {
      enabled: !!batchCallId,
      // Poll every second until the calls are confirmed
      refetchInterval: (data) =>
        data.state.data?.status === TransactionStatus.CONFIRMED ? false : 1000,
    },
  });

  // ParaSwap rate fetching
  const getRate = async ({
    srcToken,
    destToken,
    srcAmount,
    networkID,
  }: {
    srcToken: Token;
    destToken: Token;
    srcAmount: string;
    networkID: number;
  }) => {
    const queryParams = new URLSearchParams({
      srcToken: srcToken.address,
      destToken: destToken.address,
      srcDecimals: srcToken.decimals.toString(),
      destDecimals: destToken.decimals.toString(),
      amount: srcAmount,
      side: SwapSide.SELL,
      network: networkID.toString(),
      partner: PARTNER,
      version: ParaSwapVersion.V6,
    });

    try {
      const { data, status } = await axios.get<{ priceRoute: OptimalRate }>(
        `${PARASWAP_API_URL}/prices/?${queryParams}`
      );
      return { priceRoute: data.priceRoute, status };
    } catch (e) {
      setError("Error fetching swap rate");
      return null;
    }
  };

  const getTokensWithLiquidity = async () => {
    if (!chainId || !address) {
      setError("Please connect wallet");
      return {
        tokensWithLiquidity: [],
        tokensWithoutLiquidity: selectedTokens,
      };
    }

    setLoading(true);
    setError(null);

    const tokensWithLiquidity: MoralisAssetClass[] = [];
    const tokensWithoutLiquidity: MoralisAssetClass[] = [];

    try {
      for (const token of selectedTokens) {
        const srcAmount = token.userBalance;
        const srcAmountBN = new BigNumber(srcAmount)
          .times(10 ** token.decimals)
          .toFixed(0);

        const _priceRoute = await getRate({
          srcToken: token,
          destToken: { address: ETH_ADDRESS, decimals: 18 } as Token,
          srcAmount: srcAmountBN,
          networkID: Number(chainId),
        });

        if (!_priceRoute) {
          tokensWithoutLiquidity.push(token);
          // return;
        } else if (_priceRoute.status === 200) {
          console.log("yess");
          const { priceRoute, status } = _priceRoute;
          tokensWithLiquidity.push(token);
        } else {
          tokensWithoutLiquidity.push(token);
        }
      }

      return { tokensWithLiquidity, tokensWithoutLiquidity };
    } catch (e) {
      console.error(e);
      setError("An error occurred while getting swap transactions");
      return {
        tokensWithLiquidity: [],
        tokensWithoutLiquidity: selectedTokens,
      };
    } finally {
      setLoading(false);
    }
  };

  // Build swap transaction

  const buildSwap = async ({
    srcToken,
    destToken,
    srcAmount,
    minAmount,
    priceRoute,
    userAddress,
    receiver,
    networkID,
  }: {
    srcToken: Token;
    destToken: Token;
    srcAmount: string;
    minAmount: string;
    priceRoute: OptimalRate;
    userAddress: string;
    receiver?: string;
    networkID: number;
  }): Promise<TransactionParams> => {
    setLoading(true);
    setError(null);

    const txURL = `${PARASWAP_API_URL}/transactions/${networkID}`;

    const txConfig = {
      priceRoute,
      srcToken: srcToken.address,
      srcDecimals: srcToken.decimals,
      destToken: destToken.address,
      destDecimals: destToken.decimals,
      srcAmount,
      destAmount: minAmount,
      userAddress,
      partner: PARTNER,
      receiver,
    };

    const { data } = await axios.post<TransactionParams>(txURL, txConfig);
    setLoading(false);
    return data;
  };

  // Combined approve and swap execution
  const executeApproveAndSwap = async () => {
    if (!address || !chainId) {
      setError("Please connect wallet");
      return;
    }
    setIsExecuteLoading(true);
    setTransactionStatus(TransactionStatus.PENDING);

    const { tokensWithLiquidity, tokensWithoutLiquidity } =
      await getTokensWithLiquidity();

    try {
      // Build approval calls
      const approveCalls = tokens.map((token, index) => {
        const amount = amounts && amounts.length > index ? amounts[index] : "0";
        const amountBigInt = parseUnits(amount, token?.decimals);

        return {
          to: token.address as Address,
          data: encodeFunctionData({
            abi: erc20Abi,
            functionName: "approve",
            args: [spender, amountBigInt],
          }),
          value: BigInt(0),
        };
      });

      // Build swap calls
      const swapCalls: TransactionParams[] = [];

      for (const token of tokensWithLiquidity) {
        const srcAmount = token.userBalance;
        const srcAmountBN = new BigNumber(srcAmount)
          .times(10 ** token.decimals)
          .toFixed(0);

        const _priceRoute = await getRate({
          srcToken: token,
          destToken: { address: ETH_ADDRESS, decimals: 18 } as Token,
          srcAmount: srcAmountBN,
          networkID: Number(chainId),
        });

        if (_priceRoute) {
          const { priceRoute, status } = _priceRoute;
          if (status !== 200) {
            return;
          }

          const minAmount = new BigNumber(priceRoute.destAmount)
            .times(1 - SLIPPAGE / 100)
            .toFixed(0);

          const txParams = await buildSwap({
            srcToken: token,
            destToken: { address: ETH_ADDRESS, decimals: 18 } as Token,
            srcAmount: srcAmountBN,
            minAmount,
            priceRoute,
            userAddress: address as Address,
            networkID: Number(chainId),
          });

          swapCalls.push(txParams);
        }
      }
      // Combine approve and swap calls into one singele batch
      const combinedCalls = [...approveCalls, ...swapCalls];

      if (combinedCalls.length > 0) {
        sendCalls(
          { calls: combinedCalls },
          {
            onSuccess(data) {
              setBatchCallId(data);
              CustomToast(
                toast,
                "Transaction submitted successfully!",
                4000,
                "top-left"
              );
            },
            onError(error) {
              console.error("Transaction failed:", error);
              setErrorBatch(error as ExtendedErrorType);
              setTransactionStatus(TransactionStatus.FAILED);
            },
            onSettled() {
              setIsExecuteLoading(false);
            },
          }
        );
      }
    } catch (error) {
      console.error("Error executing approve and swap:", error);
      setError("Failed to execute transactions");
      setIsExecuteLoading(false);
    }
  };

  // Monitor transaction status
  useEffect(() => {
    if (callStatus?.status && callStatus.receipts?.[0]) {
      const currentStatus = callStatus.status as TransactionStatus;
      const txHash = callStatus.receipts[0].transactionHash;

      setTransactionStatus(currentStatus);
      if (txHash) setTxHash(txHash);

      if (currentStatus === TransactionStatus.CONFIRMED) {
        setIsExecuteLoading(false);
        CustomToast(
          toast,
          "Transaction confirmed! Your tokens have been swept successfully.",
          4000,
          "top-left"
        );
      }
    }
  }, [callStatus, toast]);

  const setErrorBatch = (error: ExtendedErrorType) => {
    const message = error.shortMessage || error.message;
    const title = error.name as string;
    setMessage({ title, message: message ?? "An unknown error occurred" });
    setType(Types.ERROR);
  };

  const paraswapDataLoading = loading;

  return {
    getTokensWithLiquidity,
    executeApproveAndSwap,
    paraswapDataLoading,
    isExecuteLoading,
    transactionStatus,
    error,
    TransactionStatus,
  };
};
