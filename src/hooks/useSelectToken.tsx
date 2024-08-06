"use client"

import { TokenListProvider } from "@/provider/tokenListProvider";
import { useContext } from "react";

export default function useSelectToken() {
  const {
    tokenList,
    addTokenList,
    removeTokenList,
    isTokenSelected,
    clearList,
    selectAll,
  } = useContext(TokenListProvider);
  return {
    tokenList,
    addTokenList,
    removeTokenList,
    isTokenSelected,
    clearList,
    selectAll,
  };
}
