import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import { formatUnits, getAddress } from "viem";
import { covalentClient } from "@/lib/covalent";
import {
  BalancesResponse,
  ChainID as CovalentChainID,
} from "@covalenthq/client-sdk";
import ms from "ms";
import { base } from "viem/chains";
import { Token } from "@/lib/components/types";

export const NativeAddress = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";

interface UseBalances {
  account: string;
}

export const useBalancesQuery = ({ account }: UseBalances) => {
  return useQuery({
    queryKey: [`covalent: ${account}`],
    queryFn: async () => {
      // return fetch(`/api/balance/${account.toLowerCase()}`).then(
      //   async (response) => {
      //     console.log("response raw", response);
      //     console.log("json response", await response.json());
      //     await response.json();
      //   },
      // );

      const resp =
        await covalentClient.BalanceService.getTokenBalancesForWalletAddress(
          "base-mainnet",
          account,
        );
      console.log(resp.data);
      const xxx: BalancesResponse = resp.data;
      return resp;
    },
    // staleTime: ms("15m"), // 15 mins
    // gcTime: ms("1h"), // 1hr
    // enabled: Boolean(account),
  });
};
// Define the schema for LogoUrls

export const useBalances = ({  account }: UseBalances) => {
  const [walletTokenList, setWalletTokenList] = useState<Token[]>([]);
  const { data, isLoading, isError, error, isFetched, isSuccess } =
    useBalancesQuery({  account });

  useEffect(() => {
    if (data) {
      try {
        const transformedData = data.data.items.map((item) => {
          return {
            address: item.contract_address,
            chainId: data.data.chain_id,
            decimals: item.contract_decimals,
            logoURI: item.logo_url,
            name: item.contract_name,
            symbol: item.contract_ticker_symbol,
            quoteUSD: item.quote,
            userBalance: Number(formatUnits(item.balance ?? 0n, 18)),
          };
        });

        console.log("Validated and transformed data:", transformedData);
        setWalletTokenList(transformedData);
      } catch (error) {
        console.error("Error validating data:", error);
      }
    }
  }, [data, isLoading, isError, error, isFetched, isSuccess]);

  return walletTokenList;
};
