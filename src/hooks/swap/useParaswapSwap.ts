import { useState, useCallback, useEffect, useContext } from "react";
import axios from "axios";
import BigNumber from "bignumber.js";
import { OptimalRate, SwapSide, ParaSwapVersion } from "@paraswap/core";
import { PARASWAP_API_URL } from "@/constants/paraswap";
import { Token } from "@/lib/components/types";
import { useAccount, useWaitForTransactionReceipt } from "wagmi";
import { useSendCalls, useCallsStatus } from "wagmi/experimental";
import { useToast } from "@chakra-ui/react";
import { Address } from "viem";
import { useWalletsPortfolio } from "../useMobula";
import CustomToast from "@/components/Toast";
import useSelectToken from "../useSelectToken";
import { MoralisAssetClass } from "@/utils/classes";
import { ExtendedErrorType } from "../useAssetScooperWriteContract";
import { StateContext, Types } from "@/provider/AppProvider";
import { TransactionStatus } from "../approvals/useBatchApprovals";

const PARTNER = "chucknorrisv6";
const SLIPPAGE = 1;

interface TransactionParams {
  to: Address;
  from: string;
  value: bigint;
  data: Address;
  gasPrice: string;
  gas?: string;
  chainId: number;
}

export const testTokens: Token[] = [
  {
    address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
    chainId: 8453,
    decimals: 6,
    logoURI:
      "https://raw.githubusercontent.com/sushiswap/list/master/logos/token-logos/network/base/0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913.jpg",
    name: "USD Coin",
    symbol: "USDC",
    quoteUSD: 10.5,
    userBalance: 123.45,
    price: 10.0,
    price_change_24h: 2.5,
  },
  {
    address: "0x6985884C4392D348587B19cb9eAAf157F13271cd",
    chainId: 8453,
    decimals: 18,
    logoURI:
      "https://raw.githubusercontent.com/sushiswap/list/master/logos/token-logos/network/base/0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913.jpg",
    name: "LayerZero",
    symbol: "ZRO",
    quoteUSD: 10.5,
    userBalance: 123.45,
    price: 10.0,
    price_change_24h: 2.5,
  },
  {
    address: "0x83764F62B9Fd5ae2dE43904dE7E45Ff47476e2B5",
    chainId: 8453,
    decimals: 9,
    logoURI: "",
    name: "BaseDoodleCat",
    symbol: "$DOCAT",
    quoteUSD: 10.5,
    userBalance: 123.45,
    price: 10.0,
    price_change_24h: 2.5,
  },
  {
    address: "0x0cBD6fAdcF8096cC9A43d90B45F65826102e3eCE",
    chainId: 8453,
    decimals: 18,
    logoURI: "",
    name: "CheckDot",
    symbol: "CDT",
    quoteUSD: 5.75,
    userBalance: 78.9,
    price: 5.0,
    price_change_24h: -1.2,
  },
  {
    address: "0x80B3455e1Db60b4Cba46Aba12E8b1E256dD64979",
    chainId: 8453,
    decimals: 18,
    logoURI: "",
    name: "Blue-Footed Booby",
    symbol: "BOOBY",
    quoteUSD: 15.25,
    userBalance: 45.6,
    price: 15.0,
    price_change_24h: 3.8,
  },
];

export const useParaSwap = () => {
  const { setMessage, setType } = useContext(StateContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [isExecuteLoading, setIsExecuteLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { address, chainId } = useAccount();
  const { tokenList: selectedTokens } = useSelectToken();
  const { refetch: refetchTokenBalance } = useWalletsPortfolio();
  const toast = useToast();
  const { sendCalls } = useSendCalls();
  const [batchCallId, setBatchCallId] = useState<string | null>(null);

  const [txHash, setTxHash] = useState<any>(null);
  const [transactionStatus, setTransactionStatus] =
    useState<TransactionStatus | null>(null);

  const { data: callStatus, isLoading: statusLoading } = useCallsStatus({
    id: batchCallId ?? "", // Pass the batch call ID data in the state
  });

  const ETH_ADDRESS = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
  // const selectedTokens = testTokens;
  // const chainId = "8453";
  // const address: string = "0xE3c347cEa95B7BfdB921074bdb39b8571F905f6D";

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

    const pricesURL = `${PARASWAP_API_URL}/prices/?${queryParams}`;
    try {
      const { data, status } = await axios.get<{ priceRoute: OptimalRate }>(
        pricesURL
      );
      // console.log(data, status);
      return { priceRoute: data.priceRoute, status: status };
    } catch (e) {
      setError("An error occurred while getting swap rate");
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

    const ETH_ADDRESS = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
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

  const executeBatchSwap = async () => {
    setIsExecuteLoading(true);
    setTransactionStatus(TransactionStatus.PENDING);

    const { tokensWithLiquidity, tokensWithoutLiquidity } =
      await getTokensWithLiquidity();

    const swapTxnData: TransactionParams[] = [];

    if (!address || !chainId) {
      setError("Please connect wallet");
      return { tokensWithLiquidity, tokensWithoutLiquidity };
    }

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

        swapTxnData.push(txParams);
      }
    }

    if (swapTxnData.length > 0) {
      sendCalls(
        {
          calls: swapTxnData,
        },
        {
          onSuccess(data) {
            const batchId = data;
            setBatchCallId(batchId);
            refetchTokenBalance();
          },
          onError(error) {
            console.error("Transaction failed:", error);
            CustomToast(
              toast,
              "Oops! There was an issue sweeping your tokens. Please try again.",
              4000,
              "top"
            );
          },
          onSettled() {
            setIsExecuteLoading(false);
          },
        }
      );
    }
  };

  // Monitor batch call status and fetch receipt if available
  useEffect(() => {
    if (
      callStatus &&
      callStatus.status &&
      callStatus.receipts &&
      callStatus.receipts.length > 0
    ) {
      const transactionStatusCall = callStatus.status as TransactionStatus;

      const transactionHash = callStatus.receipts[0].transactionHash;

      if (
        transactionStatusCall === TransactionStatus.CONFIRMED &&
        transactionHash
      ) {
        setTransactionStatus(TransactionStatus.CONFIRMED);

        setTxHash(transactionHash);

        setIsExecuteLoading(false);
      } else if (
        transactionStatusCall === TransactionStatus.PENDING &&
        transactionHash
      ) {
        console.log("Approval is still pending...");
        setIsExecuteLoading(true);
      } else {
        console.log("Unexpected status:", transactionStatusCall);

        setTransactionStatus(TransactionStatus.FAILED);

        setIsExecuteLoading(false);
      }
    } else {
      console.log("Call status or receipts are undefined or empty.");
    }
  }, [callStatus]);

  const setErrorBatch = (error: ExtendedErrorType) => {
    const message = error.shortMessage ? error.shortMessage : error.message;
    const title = error.name as string;
    setMessage({ title, message: message ?? "An unknown error occurred" });
    setType(Types.ERROR);
  };

  const {
    data: receipt,
    isError,
    isLoading: receiptLoading,
    failureReason,
    isSuccess,
    error: receiptError,
  } = useWaitForTransactionReceipt({
    hash: txHash,
    query: {
      enabled: txHash !== "0x",
    },
  });

  useEffect(() => {
    if (failureReason) {
      setErrorBatch(failureReason as ExtendedErrorType);
      setTransactionStatus(TransactionStatus.FAILED);
    }
    if (error) {
      setErrorBatch(receiptError as ExtendedErrorType);
      setTransactionStatus(TransactionStatus.FAILED);
      setIsExecuteLoading(false);
    }
    if (isSuccess) {
      setMessage(txHash as string);
      setType(Types.SUCCESS);
      setTransactionStatus(TransactionStatus.CONFIRMED);
      setIsExecuteLoading(false);
    }
  }, [failureReason, receiptError, error, isSuccess]);

  useEffect(() => {
    if (receipt) {
      console.log("Transaction is confirmed:", receipt);
      // CustomToast(
      //   toast,
      //   "Transaction confirmed! Your swap was successful.",
      //   4000,
      //   "top"
      // );
    }

    if (isError) {
      console.log("error while making transaction:", isError);
      // CustomToast(
      //   toast,
      //   "Transaction failed. Please check the details or try again.",
      //   4000,
      //   "top"
      // );
    }
  }, [receipt, isError]);

  return {
    getRate,
    loading,
    isExecuteLoading,
    error,
    getTokensWithLiquidity,
    executeBatchSwap,
    transactionStatus,
    TransactionStatus,
  };
};
