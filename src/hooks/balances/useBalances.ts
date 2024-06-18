import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import { getAddress } from "viem";
import { covalentClient } from "@/lib/covalent";
import { ChainID as CovalentChainID } from "@covalenthq/client-sdk";
import ms from "ms";
import { base } from "viem/chains";
import { Token } from "@/lib/components/types";

export const NativeAddress = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";

interface UseBalances {
  tokens: Token[];
  account: string;
}

export const useBalancesQuery = ({ tokens, account }: UseBalances) => {
  return useQuery({
    queryKey: [`covalent: ${account}`],
    queryFn: () => {
      return fetch(`/api/balance/${account.toLowerCase()}`).then(
        async (response) => {
          console.log("response raw", response);
          console.log("json response", await response.json());
          await response.json();
        }
      );

      // const { data } =
      //   await covalentClient.BalanceService.getTokenBalancesForWalletAddress(
      //     base.id as CovalentChainID,
      //     account
      //   );
      // console.log(data?.items);

      // return data;
    },
    // staleTime: ms("15m"), // 15 mins
    // gcTime: ms("1h"), // 1hr
    // enabled: Boolean(account),
  });
};

export const useBalances = ({ tokens, account }: UseBalances) => {
  return useBalancesQuery({ tokens, account });
};
