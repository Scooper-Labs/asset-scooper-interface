import { ChainId, ONE_INCH_BASE_URI } from "@/constants";
import { useSelectedTokens } from "../useSelectTokens";
import axios from "axios";
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
  const [callDataArray, setCallDataArray] = useState<string[]>([]);

  const swapUrl = `https://1inch-proxy.vercel.app/approval`;

  const executeApprovals = useCallback(async () => {
    const aprrovalParamsConfig = selectedTokens.map((token) => ({
      params: {
        tokenAddress: token.address, // wrapped Ethereum
        amount: token.userBalance,
        chainId,
      },
    }));

    try {
      const responses = await Promise.all(
        aprrovalParamsConfig.map(
          async (config) => await axios.get(swapUrl, config),
        ),
      );
      console.log("Response from axios0,", responses);

      const newTokensWithLiquidity: Token[] = [];
      const newTokensWithNoLiquidity: Token[] = [];
      const newCallDataArray: string[] = [];

      responses.forEach((response, index) => {
        if (response.data && response.data.tx && response.data.tx.data) {
          newTokensWithLiquidity.push(selectedTokens[index]);
          newCallDataArray.push(response.data.tx.data);
        } else {
          newTokensWithNoLiquidity.push(selectedTokens[index]);
        }
      });

      setTokensWithLiquidity(newTokensWithLiquidity);
      setTokensWithNoLiquidity(newTokensWithNoLiquidity);
      setCallDataArray(newCallDataArray);

      return {
        tokensWithLiquidity: newTokensWithLiquidity,
        tokensWithNoLiquidity: newTokensWithNoLiquidity,
        callDataArray: newCallDataArray,
      };
    } catch (error) {
      console.error("Error executing swap:", error);
      throw error;
    }
  }, [chainId, originAddress, selectedTokens, swapUrl]);

  return {
    executeApprovals,
    tokensWithLiquidity,
    tokensWithNoLiquidity,
    callDataArray,
  };
};
