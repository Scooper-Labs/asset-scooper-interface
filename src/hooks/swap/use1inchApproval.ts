import { ChainId, ONE_INCH_BASE_URI } from "@/constants";
import { useSelectedTokens } from "../useSelectTokens";
import { isPromiseFulfilled } from "../useTokens";
import { useCallback, useState } from "react";
import { Token } from "@/lib/components/types";
import { Address, parseUnits } from "viem";

export const use1inchApprovals = (
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
  const approvalUrl = `https://1inch-proxy.vercel.app/approval`;

  const fetchApprovalData = async () => {
    setIsLoading(true);

    const swapParamsConfig = selectedTokens.map((token) => {
      const params = new URLSearchParams({
        tokenAddress: token.address.toLowerCase(),
        amount: parseUnits(
          token.userBalance.toString(),
          token.decimals,
        ).toString(),
        chainId: chainId ? chainId.toString() : "", // Assuming chainId is a number, convert to string
      });
      const url = `${approvalUrl}?${params.toString()}`;
      return url;
    });

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
    fetchApprovalData,
    isLoading,
    tokensWithLiquidity,
    tokensWithNoLiquidity,
    swapCallDataArray,
  };
};
