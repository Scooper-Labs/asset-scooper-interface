import { useState, useCallback } from "react";
import axios from "axios";
import BigNumber from "bignumber.js";
import { OptimalRate, SwapSide, ParaSwapVersion } from "@paraswap/core";
import { PARASWAP_API_URL } from "@/constants/paraswap";
import { Token } from "@/lib/components/types";
import { useAccount } from "wagmi";
import { useSendCalls } from "wagmi/experimental";
import { useToast } from "@chakra-ui/react";
import { Address } from "viem";
import { useWalletsPortfolio } from "../useMobula";
import CustomToast from "@/components/Toast";
import useSelectToken from "../useSelectToken";

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

export const useParaSwap = () => {
  const [, setLoading] = useState(false);
  const [, setError] = useState<string | null>(null);
  const { address, chainId } = useAccount();
  const { tokenList: selectedTokens } = useSelectToken();
  const { refetch: refetchTokenBalance } = useWalletsPortfolio();
  const toast = useToast();
  const { sendCalls } = useSendCalls();

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
  }): Promise<OptimalRate> => {
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
    const { data } = await axios.get<{ priceRoute: OptimalRate }>(pricesURL);

    // console.log(data, "this is data");
    return data.priceRoute;
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

    try {
    } catch (e) {
      console.log(e);
      setError("An error occurred while getting swap transaction");
    } finally {
      setLoading(false);
    }

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

    console.log(data, "this is data2");
    return data;
  };

  const swapsTrxData = async () => {
    if (!chainId || !address) {
      setError("Please connect wallet");
      return null;
    }

    setLoading(true);
    setError(null);

    const ETH_ADDRESS = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
    const swapData: TransactionParams[] = [];

    try {
      for (const token of selectedTokens) {
        const srcAmount = token.userBalance;
        const srcAmountBN = new BigNumber(srcAmount)
          .times(10 ** token.decimals)
          .toFixed(0);

        const priceRoute = await getRate({
          srcToken: token,
          destToken: { address: ETH_ADDRESS, decimals: 18 } as Token,
          srcAmount: srcAmountBN,
          networkID: chainId,
        });

        const minAmount = new BigNumber(priceRoute.destAmount)
          .times(1 - SLIPPAGE / 100)
          .toFixed(0);

        const txParams = await buildSwap({
          srcToken: token,
          destToken: { address: ETH_ADDRESS, decimals: 18 } as Token,
          srcAmount: srcAmountBN,
          minAmount,
          priceRoute,
          userAddress: address,
          networkID: chainId,
        });

        swapData.push(txParams);
      }

      return swapData;
    } catch (e) {
      console.error(e);
      setError("An error occurred while getting swap transactions");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const executeBatchSwap = async () => {
    const swapTxnData = await swapsTrxData();
    if (swapTxnData) {
      sendCalls(
        {
          calls: swapTxnData,
        },
        {
          onSuccess(data, variables, context) {
            refetchTokenBalance();
            () =>
              CustomToast(
                toast,
                "Your tokens have been successfully approved proceed to swap.",
                4000,
                "top-right"
              );
          },
        }
      );
    }
  };
  return {
    getRate,
    buildSwap,
    swapsTrxData,
    executeBatchSwap,
  };
};
