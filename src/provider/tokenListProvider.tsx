"use client";
import { ProvidersProps } from "@/lib/components/types";
import { MoralisAssetClass } from "@/utils/classes";
import { compareAddress } from "@/utils/walletUtils";
import React, { createContext, useState, type FC } from "react";

interface ContextProps {
  tokenList: MoralisAssetClass[];
  addTokenList: (token: MoralisAssetClass) => void;
  removeTokenList: (token: MoralisAssetClass) => void;
  isTokenSelected: (token: MoralisAssetClass) => boolean;
  clearList: () => void;
  selectAll: (tokens: MoralisAssetClass[]) => void;
}

export const TokenListProvider = createContext<ContextProps>({
  tokenList: [],
  addTokenList: () => {},
  removeTokenList: () => {},
  isTokenSelected: () => false,
  clearList: () => {},
  selectAll: () => {},
});

const TokenListContextProviders: FC<ProvidersProps> = ({ children }) => {
  const [tokens, setTokens] = useState<MoralisAssetClass[]>([]);
  const addTokenList = (newToken: MoralisAssetClass) => {
    setTokens((prev) => [...prev, newToken]);
  };
  const removeTokenList = (token: MoralisAssetClass) => {
    setTokens((prev) =>
      prev.filter((t) => !compareAddress(t.address, token.address))
    );
  };
  const isTokenSelected = (token: MoralisAssetClass) => {
    return tokens.some((t) => compareAddress(t.address, token.address));
  };
  function clearList() {
    setTokens([]);
  }
  function selectAll(tokens: MoralisAssetClass[]) {
    setTokens(tokens);
  }
  return (
    <TokenListProvider.Provider
      value={{
        tokenList: tokens,
        addTokenList,
        removeTokenList,
        isTokenSelected,
        clearList,
        selectAll,
      }}
    >
      {children}
    </TokenListProvider.Provider>
  );
};

export default TokenListContextProviders;
