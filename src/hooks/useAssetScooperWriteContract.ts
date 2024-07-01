"use client";

import { Address } from "viem";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { error } from "console";

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
      toast({
        title: "Transaction Pending...",
        description: "Transaction Pending, Please confirm in wallet",
        status: "info",
        duration: 2000,
        isClosable: true,
      });
    }
    if (isTrxSubmitted) {
      toast({
        title: "Transaction Submitted",
        description: "Transaction has been submitted to the network",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
    // if (isWriteContractError || isWaitTrxError) {
    //   toast({
    //     title: "Transaction Error",
    //     description:
    //       WriteContractError?.message ||
    //       ?.message ||
    //       "An error occurred",
    //     status: "error",
    //     duration: 2000,
    //     isClosable: true,
    //   });
    // }
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
