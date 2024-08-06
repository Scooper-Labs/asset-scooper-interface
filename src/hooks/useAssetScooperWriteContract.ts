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
import { useToast } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import CustomToast from "@/components/Toast";

import abi from "@/constants/abi/assetscooper.json";
import { assetscooper_contract as assetscooper } from "@/constants/contractAddress";
import { Types, StateContext } from "@/provider/AppProvider";
import useSelectToken from "./useSelectToken";

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

  const setError = (error: ExtendedErrorType) => {
    const message = error.shortMessage ? error.shortMessage : error.message;
    const title = error.name as string;
    setMessage({ title, message: message ?? "An unknown error occurred" });
    setType(Types.ERROR);
  };

  async function resimulate() {
    const { data: newRes, failureReason: newFail } = await refetch();
    if (newFail) {
      setError(newFail as ExtendedErrorType);
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
    confirmations: 2,
  });
  const approve = async () => {
    writeContractAsync({
      address,
      abi: erc20Abi,
      functionName: "approve",
      args,
    });
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
  const { isLoading, isSuccess, error, refetch } = useWaitForTransactionReceipt(
    {
      hash,
      confirmations: 2,
      query: { enabled: false },
    }
  );

  const setError = (error: ExtendedErrorType) => {
    const message = error.shortMessage ? error.shortMessage : error.message;
    const title = error.name as string;
    setMessage({ title, message: message ?? "An unknown error occurred" });
    setType(Types.ERROR);
  };

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

  async function sweepTokens(customRequest?: SimulateContractReturnType) {
    const finalRequest = customRequest ?? request;
    if (!finalRequest) return;
    await writeContractAsync(finalRequest.request);
    refetch();
    reset();
  }

  const waitSubmitAndConfirm = isPending || isLoading;

  return { sweepTokens, isLoading: waitSubmitAndConfirm, isSuccess };
}

function parseSimulationResults(simulationResults: any) {
  return JSON.parse(
    JSON.stringify(
      simulationResults,
      (key, value) => (typeof value === "bigint" ? value.toString() : value) // return everything else unchanged
    )
  );
}
