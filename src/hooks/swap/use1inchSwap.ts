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

  const swapUrl = `https://1inch-proxy.vercel.app/swap`;

  const executeSwap = useCallback(async () => {
    const swapParamsConfig = selectedTokens.map((token) => ({
      params: {
        src: token.address.toLowerCase(),
        dst: "0x4200000000000000000000000000000000000006", // wrapped Ethereum
        amount: token.userBalance,
        from: "0xB2ad807Ec5Ac97C617734956760dEd85bEd345C1", // asset scooper router
        origin: originAddress as string,
        slippage: "10",
        chainId,
      },
    }));

    try {
      const responses = await Promise.all(
        swapParamsConfig.map(
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
    executeSwap,
    tokensWithLiquidity,
    tokensWithNoLiquidity,
    callDataArray,
  };
};

//   const res = await Promise.allSettled(
//     TOKEN_LISTS.map((el) => fetch(el).then((res) => res.json())),
//   ).then((res) => {
//     return res.filter(isPromiseFulfilled).map((el) => {
//       el.value;
//       console.log("this is other tokens", el.value);
//     });
//   });
