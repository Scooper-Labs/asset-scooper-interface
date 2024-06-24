import { ChainId, ONE_INCH_BASE_URI } from "@/constants";
import { useSelectedTokens } from "../useSelectTokens";
import { isPromiseFulfilled } from "../useTokens";
import { useCallback, useState } from "react";
import { Token } from "@/lib/components/types";
import { Address, parseUnits } from "viem";

type SuccessResult = { status: "fulfilled"; value: any; token: Token };
type ErrorResult = { status: "rejected"; reason: unknown; value: Token };
type SwapResult = SuccessResult | ErrorResult;

export const use1inchSwap = (
  chainId: ChainId | undefined,
  originAddress: Address | undefined,
) => {
  const { selectedTokens } = useSelectedTokens();
  const [tokensWithLiquidity, setTokensWithLiquidity] = useState<Token[]>([]);
  const [tokensWithNoLiquidity, setTokensWithNoLiquidity] = useState<Token[]>(
    [],
  );
  const [shouldFetch, setShouldFetch] = useState<boolean>(false);
  const [swapCallDataArray, setSwapCallDataArray] = useState<string[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const swapUrl = `https://1inch-proxy.vercel.app/swap`;

  const fetchSwapData = async () => {
    setIsLoading(true);

    const swapParamsConfig = selectedTokens.map((token) => {
      const params = new URLSearchParams({
        src: token.address.toLowerCase(),
        dst: "0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2", // wrapped Ethereum
        amount: parseUnits(
          token.userBalance.toString(),
          token.decimals,
        ).toString(),
        from: originAddress
          ? originAddress?.toString()
          : "0xE3c347cEa95B7BfdB921074bdb39b8571F905f6D",
        slippage: "50",
        chainId: chainId ? chainId.toString() : "", // Assuming chainId is a number, convert to string
      });
      const url = `${swapUrl}?${params.toString()}`;
      return { url, token };
    });

    const delay = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));

    try {
      const results = [];
      for (const config of swapParamsConfig) {
        try {
          const response = await fetch(config.url);
          const data = await response.json();
          results.push({
            status: "fulfilled",
            value: data,
            token: config.token,
          });
        } catch (error) {
          results.push({
            status: "rejected",
            reason: error,
            token: config.token,
          });
        }
        await delay(1100);
      }

      const filteredRes = results
        .filter(
          (result): result is SuccessResult => result.status === "fulfilled",
        )
        .map((result) => result);

      console.log("Sweep data:", filteredRes);

      filteredRes.map(async (result) => {
        console.log(result.status);

        if (result.value.error || result.value.statusCode == 400) {
          console.log("token address BADDD REQUEST", result.token.address);
          //push result.token to setTokensWithNoLiquidity

          setTokensWithNoLiquidity((prev) => [...prev, result.token]);
        } else if (result.value.tx) {
          console.log("token address", result.token.address);
          //push result.token to setTokensWithLiquidity
          setTokensWithLiquidity((prev) => [...prev, result.token]);
          setSwapCallDataArray((prev) => [...prev, result.value.tx.data]);
        }

        console.log(tokensWithNoLiquidity, tokensWithLiquidity);
      });
      return filteredRes;
    } catch (e) {
      console.error("Error fetching swap data:", e);
      // setError("Failed to fetch swap data. Please try again.");
      return null;
    } finally {
      setIsLoading(false);
    }
  };
  return {
    fetchSwapData,
    isLoading,
    tokensWithLiquidity,
    tokensWithNoLiquidity,
    swapCallDataArray,
  };
};
