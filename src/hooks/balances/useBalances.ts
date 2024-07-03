import { useEffect, useMemo } from "react";
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

  const filteredAssets = useMemo(() => {
    if (data?.data?.assets) {
      return data.data.assets.filter(
        (asset: AssetClass) =>
          asset.address !== "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
      );
    }
    return [];
  }, [data]);
  useEffect(() => {
    if (data) {
      try {
        dispatch(setUserWalletTokenWithBalance([]));
        dispatch(clearAllSelectedTokens());
        dispatch(setUserWalletTokenWithBalance(filteredAssets));
      } catch (error) {
        console.error("Error validating data:", error);
      }
    }
  }, [data, isLoading]);

  return {
    walletBalance: filteredAssets as AssetClass[],
    isError,
    isLoading,
  };
};
