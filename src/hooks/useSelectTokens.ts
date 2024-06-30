"use client";

import { useCallback, useMemo } from "react";
import { type Address } from "viem";
import { useAppDispatch, useAppSelector } from "./rtkHooks";
import { Token } from "@/lib/components/types";
import {
  clearAllSelectedTokens,
  selectAllTokens,
  selectToken,
  unSelectToken,
} from "@/store/sweep/sweepSlice";
import { RootState } from "@/store/store";

export const useSelectedTokens = () => {
  const dispatch = useAppDispatch();
  const selectedTokenLists = useAppSelector(
    (state: RootState) => state.SweepTokensSlice.SelectedLowBalanceTokens
  );
  const userWalletTokens = useAppSelector(
    (state: RootState) => state.SweepTokensSlice.userWalletTokens
  );
  const _selectToken = useCallback((token: Token) => {
    dispatch(selectToken(token));
  }, []);

  const _selectAllToken = useCallback((tokens: Token[]) => {
    dispatch(selectAllTokens(tokens));
  }, []);
  const _unSelectToken = useCallback((token: Token) => {
    dispatch(unSelectToken(token));
  }, []);

  const isSelected = useCallback(
    (token: Token) =>
      selectedTokenLists.some(
        (selectedToken) => selectedToken.address === token.address
      ),
    [selectedTokenLists]
  );
  //   const isSelected = useCallback(
  //     (token: Token) => selectedTokenLists.map((selectedToken) => selectedToken.address).includes(token.address),
  //     [selectedTokenLists]
  //   );

  const _clearSelectedTokens = useCallback(() => {
    dispatch(clearAllSelectedTokens());
  }, [dispatch]);

  return useMemo(() => {
    return {
      selectedTokens: selectedTokenLists,
      _selectToken,
      _unSelectToken,
      isSelected,
      _clearSelectedTokens,
      _selectAllToken,
      userWalletTokens,
    };
  }, [
    _selectToken,
    _unSelectToken,
    isSelected,
    selectedTokenLists,
    _clearSelectedTokens,
    _selectAllToken,
    userWalletTokens,
  ]);
};
