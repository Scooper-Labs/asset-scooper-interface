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

export const testTokens: Token[] = [
  {
    address: "0x83764F62B9Fd5ae2dE43904dE7E45Ff47476e2B5",
    chainId: 1,
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
    chainId: 1,
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
    chainId: 1,
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { address, chainId } = useAccount();
  // const { tokenList: selectedTokens } = useSelectToken();
  const { refetch: refetchTokenBalance } = useWalletsPortfolio();
  const toast = useToast();
  const { sendCalls } = useSendCalls();
  const ETH_ADDRESS = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
  const selectedTokens = testTokens;
  const getRate = useCallback(
    async ({
      srcToken,
      destToken,
      srcAmount,
      networkID,
    }: {
      srcToken: Token;
      destToken: Token;
      srcAmount: string;
      networkID: number;
    }): Promise<OptimalRate | null> => {
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
        const { data } = await axios.get<{ priceRoute: OptimalRate }>(
          pricesURL,
        );
        return data.priceRoute;
      } catch (e) {
        setError("An error occurred while getting swap rate");
        return null;
      }
    },
    [setError],
  );

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
    const tokensWithLiquidity: Token[] = [];
    const tokensWithoutLiquidity: Token[] = [];

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

        if (priceRoute) {
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

      const priceRoute = await getRate({
        srcToken: token,
        destToken: { address: ETH_ADDRESS, decimals: 18 } as Token,
        srcAmount: srcAmountBN,
        networkID: chainId,
      });

      if (priceRoute) {
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
          networkID: chainId,
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
          onSuccess(data, variables, context) {
            refetchTokenBalance();
            () =>
              CustomToast(
                toast,
                "Your tokens have been successfully approved proceed to swap.",
                4000,
                "top-right",
              );
          },
        },
      );
    }

    return { tokensWithLiquidity, tokensWithoutLiquidity };
  };
  return {
    getRate,
    getTokensWithLiquidity,
    executeBatchSwap,
  };
};
