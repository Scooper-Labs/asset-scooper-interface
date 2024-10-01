import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Address } from "viem";
import { DexScreenerTokenResponseInterface } from "@/utils/interface";

interface UseBalances {
  address: Address | undefined;
}

export const useGetLiquidity = ({ address }: UseBalances) => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["/walletBalanceLiquidity" + address],
    queryFn: () => {
      const queryParams = new URLSearchParams({
        chain: "base",
      });

      return fetch(
        `https://api.dexscreener.com/latest/dex/tokens/${address}`,
        {}
      ).then((response) => response.json());
    },
    refetchOnWindowFocus: true,
    enabled: true,
  });

  useEffect(() => {
    if (data && address) {
      const { result }: { result: DexScreenerTokenResponseInterface[] } = data;
      console.log(result);
    }
  }, [data, address]);

  return {
    data,
    isLoading,
    isError,
    error,
    refetch,
    //  moralisAssets,
  };
};
