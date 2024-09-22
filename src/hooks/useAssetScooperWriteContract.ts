"use client";

import {
  type SimulateContractReturnType,
  type SimulateContractErrorType,
  erc20Abi,
} from "viem";
import {
  useWriteContract,
  useWaitForTransactionReceipt,
  useSimulateContract,
} from "wagmi";
import { useCallback, useContext, useEffect } from "react";
import { BaseError } from "@wagmi/core";

import abi from "@/constants/abi/assetscooper.json";
import { assetscooper_contract as assetscooper } from "@/constants/contractAddress";
import { Types, StateContext } from "@/provider/AppProvider";

type ExtendedErrorType = SimulateContractErrorType & {
  shortMessage?: string;
};

export function useSweepTokensSimulation(args: any[] = []) {
  const { setMessage, setType } = useContext(StateContext);

  const simulateRes = useSimulateContract({
    address: assetscooper,
    abi: abi,
    functionName: "sweepTokens",
    args,
    query: { enabled: false },
  });

  const { data, refetch, isLoading } = simulateRes;

  const setError = (error: BaseError) => {
    const message = error.shortMessage ? error.shortMessage : error.message;
    const title = error.name as string;
    setMessage({ title, message: message ?? "An unknown error occurred" });
    setType(Types.ERROR);
  };

  async function resimulate() {
    const { data: newRes, failureReason: newFail } = await refetch();
    if (newFail) {
      setError(newFail as BaseError);
    }
    return newRes;
  }

  return { data, resimulate, isPending: isLoading };
}

export function useApprove(
  address: `0x${string}`,
  args: [`0x${string}`, bigint]
) {
  const { data: hash, isPending, writeContractAsync } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
    confirmations: 1,
  });

  const approve = async () => {
    const result = await writeContractAsync({
      address,
      abi: erc20Abi,
      functionName: "approve",
      args,
    });
    return result;
  };

  const isLoading = isPending ?? isConfirming;
  return { approve, isLoading, isSuccess };
}

export function useSweepTokens(request?: SimulateContractReturnType) {
  const { setMessage, setType } = useContext(StateContext);
  const {
    writeContractAsync,
    data: hash,
    failureReason,
    reset,
    isPending,
  } = useWriteContract();

  const setError = (error: ExtendedErrorType) => {
    const message = error.shortMessage ? error.shortMessage : error.message;
    const title = error.name as string;
    setMessage({ title, message: message ?? "An unknown error occurred" });
    setType(Types.ERROR);
  };

  const { isLoading, isSuccess, error, refetch } = useWaitForTransactionReceipt(
    {
      hash: hash || undefined,
    }
  );

  useEffect(() => {
    if (failureReason) {
      setError(failureReason as ExtendedErrorType);
    }
    if (error) {
      setError(error as ExtendedErrorType);
    }
    if (isSuccess) {
      setMessage(hash as string);
      setType(Types.SUCCESS);
    }
  }, [failureReason, error, isSuccess]);

  const sweepTokens = useCallback(
    async (customRequest?: SimulateContractReturnType) => {
      const finalRequest = customRequest ?? request;
      if (!finalRequest) return;

      const transactionHash = await writeContractAsync(finalRequest.request);

      console.log(hash, error, "this is error");

      if (transactionHash) {
        refetch();
        reset();
      } else {
        console.error("Transaction hash is undefined");
      }
    },
    []
  );

  const waitSubmitAndConfirm = isPending || isLoading;

  return { sweepTokens, isLoading: waitSubmitAndConfirm, isSuccess };
}
