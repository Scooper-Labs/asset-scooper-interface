import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../rtkHooks";
import { RootState } from "@/store/store";
import {
  setUserWalletTokenWithBalance,
  clearAllSelectedTokens,
} from "@/store/sweep/sweepSlice";
import { useWalletsPortfolio } from "../useMobula";
import { useQuery } from "@tanstack/react-query";
import { Address } from "viem";
import { WalletPortfolioClass } from "@/utils/classes";
import { AssetClass } from "@/utils/classes";
import Moralis from "moralis";

interface UseBalances {
  address: Address | undefined;
}
export const useBalances = ({ address }: UseBalances) => {
  const dispatch = useAppDispatch();
  const [serializedBalance, setSerializedBalance] =
    useState<WalletPortfolioClass | null>(null);

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["/walletBalance"],
    queryFn: () => {
      const queryParams = new URLSearchParams({
        chain: "base",
      });

      return fetch(
        `https://deep-index.moralis.io/api/v2.2/wallets/${address}/tokens?${queryParams.toString()}`,
        {
          headers: {
            "X-API-Key": process.env.NEXT_PUBLIC_MORALIS_API_KEY ?? "",
          },
        },
      ).then((response) => response.json());
    },
    // staleTime: ms("60s"),
    // gcTime: ms("1h"),
    refetchOnWindowFocus: true,
    enabled: true,
  });

  useEffect(() => {
    setSerializedBalance(data?.result);
  }, [data, isLoading, isError, error]);
  console.log("usebalance testings", data?.result, isLoading, isError, error);
  return { serializedBalance, data, isLoading, isError, error, refetch };
};
