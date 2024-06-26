import { ChainId, ONE_INCH_BASE_URI } from "@/constants";
import { useSelectedTokens } from "../useSelectTokens";
import { isPromiseFulfilled } from "../useTokens";
import { useCallback, useState } from "react";
import { Token } from "@/lib/components/types";
import { Address, parseUnits } from "viem";

export type SuccessResult = { status: "fulfilled"; value: any; token: Token };
export type ErrorResult = { status: "rejected"; reason: unknown; value: Token };
export type SwapResult = SuccessResult | ErrorResult;

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
  const [approvalCallDataArray, setApprovalCallDataArray] = useState<string[]>(
    [],
  );

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

      return { url, token };
    });

    const delay = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));

    try {
      const results = [];
      const callDataArray = [];
      for (const config of swapParamsConfig) {
        try {
          const response = await fetch(config.url);
          const data = await response.json();
          results.push({
            status: "fulfilled",
            value: data,
            token: config.token,
          });
          data.tx.data && callDataArray.push(data);
        } catch (error) {
          results.push({
            status: "rejected",
            reason: error,
            token: config.token,
          });
        }
        // Wait for 1 second before the next request
        await delay(1100);
      }

      const filteredRes = results
        .filter(
          (result): result is SuccessResult => result.status === "fulfilled",
        )
        .map((result) => result.value);

      console.log("Approval data data:", filteredRes);

      filteredRes.map((result) => {
        console.log("setting approval calldata");
        setApprovalCallDataArray((prev) => [...prev, result.data]);
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
    approvalCallDataArray,
  };
};
