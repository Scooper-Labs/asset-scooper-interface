import { ChainId, ONE_INCH_BASE_URI } from "@/constants";
import { useSelectedTokens } from "../useSelectTokens";
import { isPromiseFulfilled } from "../useTokens";
import { useCallback, useState } from "react";
import { Token } from "@/lib/components/types";
import { Address } from "viem";

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

  const swapParamsConfig = selectedTokens.map((token) => {
    const params = new URLSearchParams({
      src: token.address.toLowerCase(),
      dst: "0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2", // wrapped Ethereum
      amount: Math.floor(token.userBalance).toString(),
      from: "0xB2ad807Ec5Ac97C617734956760dEd85bEd345C1", // asset scooper router
      origin: originAddress as string,
      slippage: "50",
      chainId: chainId ? chainId.toString() : "", // Assuming chainId is a number, convert to string
    });
    const url = `${swapUrl}?${params.toString()}`;
    return url;
  });

  // const fetchSwapData = async () => {
  //   setIsLoading(true);
  //   const res = await Promise.allSettled(
  //     swapParamsConfig.map((url) => fetch(url).then((res) => res.json())),
  //   )
  //     .then((res) => {
  //       return res.filter(isPromiseFulfilled).map((el, i) => {
  //         console.log("this is return vallue 1", el.value);
  //         return el.value;
  //       });
  //     })
  //     .catch((e) => console.log(e))
  //     .finally(() => {
  //       setIsLoading(false);
  //     });

  //   return res;
  // };

  // const fetchSwapData = async () => {
  //   setIsLoading(true);
  //   // setError(null);
  //   try {
  //     const res = await Promise.allSettled(
  //       swapParamsConfig.map((url) => fetch(url).then((res) => res.json())),
  //     );
  //     const filteredRes = res.filter(isPromiseFulfilled).map((el) => el.value);
  //     console.log("Swap data:", filteredRes);
  //     return filteredRes;
  //   } catch (e) {
  //     console.error("Error fetching swap data:", e);
  //     // setError("Failed to fetch swap data. Please try again.");
  //     return null;
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const fetchSwapData = async () => {
    setIsLoading(true);
    // setError(null);

    const delay = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));

    try {
      const results = [];
      for (const url of swapParamsConfig) {
        try {
          const response = await fetch(url);
          const data = await response.json();
          results.push({ status: "fulfilled", value: data });
        } catch (error) {
          results.push({ status: "rejected", reason: error });
        }
        // Wait for 1 second before the next request
        await delay(1100);
      }

      const filteredRes = results
        .filter(
          (result): result is PromiseFulfilledResult<any> =>
            result.status === "fulfilled",
        )
        .map((result) => result.value);

      console.log("Swap data:", filteredRes);

      filteredRes.map((result) => {
        console.log(result?.description);

        if (result.description == "insufficient liquidity") {
        }
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
