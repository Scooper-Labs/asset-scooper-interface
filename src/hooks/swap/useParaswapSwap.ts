import { useState, useCallback } from "react";
import axios from "axios";
import BigNumber from "bignumber.js";
import { OptimalRate, SwapSide, ParaSwapVersion } from "@paraswap/core";
import { PARASWAP_API_URL } from "@/constants/paraswap";

const PARTNER = "chucknorrisv6";
const SLIPPAGE = 1;

interface TransactionParams {
  to: string;
  from: string;
  value: string;
  data: string;
  gasPrice: string;
  gas?: string;
  chainId: number;
}

export const useParaSwap = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [transactionRequest, setTransactionRequest] =
    useState<TransactionParams | null>(null);

  const getSwapTransaction = async ({
    srcToken,
    destToken,
    srcAmount,
    networkID,
    slippage = SLIPPAGE,
    userAddress,
    receiver,
  }: {
    srcToken: string;
    destToken: string;
    srcAmount: string;
    networkID: number;
    slippage?: number;
    userAddress: string;
    receiver?: string;
  }) => {
    setLoading(true);
    setError(null);

    try {
    } catch (e) {
      console.log(e);
      setError("An error occurred while getting swap transaction");
    } finally {
      setLoading(false);
    }
  };
};
