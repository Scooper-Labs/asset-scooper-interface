"use client";

import { Address, parseGwei } from "viem";
import {
  useWriteContract,
  useWaitForTransactionReceipt,
  useSimulateContract,
  useAccount,
} from "wagmi";
import { useToast } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import CustomToast from "@/components/Toast";

export const useAssetScooperContractWrite = ({
  fn,
  args,
  abi,
  contractAddress,
}: {
  fn: string;
  args: any[];
  abi: any;
  contractAddress: Address;
}) => {
  const toast = useToast();
  const {
    data: hash,
    isPending,
    isSuccess: isTrxSubmitted,
    isError: isWriteContractError,
    writeContractAsync,
    error: WriteContractError,
    reset,
  } = useWriteContract();

  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    isError: isWaitTrxError,
    error: WaitForTransactionReceiptError,
  } = useWaitForTransactionReceipt({
    hash,
    confirmations: 2,
  });

  const write = () =>
    writeContractAsync({
      address: contractAddress,
      abi,
      functionName: fn,
      args,
    });

  useEffect(() => {
    if (isPending) {
      CustomToast(
        toast,
        "Transaction Pending, Please confirm in wallet",
        2000,
        "bottom-right"
      );
    }
    if (isTrxSubmitted) {
      CustomToast(
        toast,
        "Transaction has been submitted to the network",
        2000,
        "bottom-right"
      );
    }
  }, [
    isPending,
    isTrxSubmitted,
    isConfirmed,
    isWriteContractError,
    isWaitTrxError,
  ]);

  return {
    write,
    isPending,
    isConfirming,
    isTrxSubmitted,
    isConfirmed,
    isWriteContractError,
    isWaitTrxError,
    reset,
    hash,
    WriteContractError,
    WaitForTransactionReceiptError,
  };
};

import abi from "@/constants/abi/assetscooper.json";
import { assetscooper_contract as assetscooper } from "@/constants/contractAddress";
import { StateContext } from "@/app/app/Provider";
import { publicClient } from "@/lib/config";

// export function useSweepTokensSim(args: any[] = []) {
//   const { address } = useAccount();
//   const { setMessage, setType } = useContext(StateContext);
//   const result = publicClient.simulateContract({
//     functionName: "sweepTokens",
//     args,
//     abi,
//     address: assetscooper,
//     account: address,
//   });
//   useEffect(() => {
//     console.log("result", result);
//   // if (failureReason) {
//   //   setMessage(failureReason);
//   //   setType("result");
//   // }
//   }, [result]);
//   return result;
// }

export function useSweepTokensSim(args: any[] = []) {
  const simulateRes = useSimulateContract({
    address: assetscooper,
    abi: abi,
    functionName: "sweepTokens",
    args,
  });
  const { data, isError, refetch } = simulateRes;
  useEffect(() => {
    console.log("result", simulateRes);
  }, [simulateRes]);
  return {data,isError,refetch};
}
