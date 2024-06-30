import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../rtkHooks";
import { RootState } from "@/store/store";
import {
  selectAllTokens,
  setUserWalletTokenWithBalance,
} from "@/store/sweep/sweepSlice";
import { useWalletsPortfolio } from "../useMobula";

interface UseBalances {
  account: string;
}
export const useBalances = ({ account }: UseBalances) => {
  const dispatch = useAppDispatch();

  const userWalletTokens = useAppSelector(
    (state: RootState) => state.SweepTokensSlice.userWalletTokens
  );

  const { data, error, loading } = useWalletsPortfolio();

  useEffect(() => {
    if (data) {
      try {
        dispatch(setUserWalletTokenWithBalance([]));
        dispatch(setUserWalletTokenWithBalance(data.assets));
      } catch (error) {
        console.error("Error validating data:", error);
      }
    }
  }, [account]);

  return { userWalletTokens, error, loading };
};
