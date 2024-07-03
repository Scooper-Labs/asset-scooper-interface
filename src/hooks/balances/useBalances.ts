import { useEffect } from "react";
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

interface UseBalances {
  account: Address | undefined;
}
export const useBalances = ({ account }: UseBalances) => {
  const dispatch = useAppDispatch();

  // const { data, error, loading } = useWalletsPortfolio();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["/walletBalance"],
    queryFn: async () =>
      fetch(`/api/portfolio?wallets=${account}`).then((response) =>
        response.json(),
      ),
    // staleTime: ms("60s"),
    // gcTime: ms("1h"),
    refetchOnWindowFocus: true,
    enabled: true,
  });

  useEffect(() => {
    if (data) {
      try {
        dispatch(setUserWalletTokenWithBalance([]));
        dispatch(clearAllSelectedTokens());
        dispatch(setUserWalletTokenWithBalance(data.assets));
      } catch (error) {
        console.error("Error validating data:", error);
      }
    }
  }, [data, isLoading]);

  return {
    walletBalance: data?.data?.assets as AssetClass[],
    isError,
    isLoading,
  };
};
