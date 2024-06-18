import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import { getAddress } from "viem";

import ms from "ms";
import { Token } from "@/lib/components/types";

export const NativeAddress = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";

interface UseBalances {
  tokens: Token[];
  account: string;
}

export const useBalancesQuery = ({ tokens, account }: UseBalances) => {
  return useQuery({
    queryKey: [`/api/balance/${account}`],
    queryFn: async () => {
      const balance = await fetch(`/api/balance/${account}`).then((response) =>
        response.json()
      );

      console.log("balance", balance);
    },
    staleTime: ms("15m"), // 15 mins
    gcTime: ms("1h"), // 1hr
    enabled: Boolean(account),
  });
};

export const useBalances = ({ tokens, account }: UseBalances) => {
  return useBalancesQuery({ tokens, account });
};
