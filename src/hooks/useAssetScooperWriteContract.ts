import { Address, erc20Abi, parseUnits } from "viem";
import {
  useReadContract,
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { useToast } from "@chakra-ui/react";
import { useCallback, useEffect } from "react";
import { ChainId } from "@/constants";

export const useAssetScooperContractWrite = ({
  fn,
  args,
  abi,
  contractAddress,
  chainId,
}: {
  fn: string;
  args: any[];
  abi: any;
  contractAddress: Address;
  chainId?: ChainId;
}) => {
  const toast = useToast();
  const {
    data: hash,
    isPending,
    isSuccess: isTrxSubmitted,
    isError: isWriteContractError,
    writeContract,
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
  });

  const write = useCallback(() => {
    writeContract({
      address: contractAddress,
      abi,
      functionName: fn,
      args,
    });
  }, [writeContract, contractAddress, abi, fn, args]);
  useEffect(() => {
    if (isPending) {
      toast({
        title: "Transaction Pending...",
        description: "Transaction Pending, Please confirm in wallet",
        status: "info",
        duration: 9000,
        isClosable: true,
      });
    }
    if (isTrxSubmitted) {
      toast({
        title: "Transaction Submitted",
        description: "Transaction has been submitted to the network",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }
    if (isConfirmed) {
      toast({
        title: "Transaction Confirmed",
        description: "Transaction has been confirmed on the network",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }
    if (isWriteContractError || isWaitTrxError) {
      toast({
        title: "Transaction Error",
        description:
          WriteContractError?.message ||
          WaitForTransactionReceiptError?.message ||
          "An error occurred",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }, [
    isPending,
    isTrxSubmitted,
    isConfirmed,
    isWriteContractError,
    isWaitTrxError,
    toast,
    WriteContractError,
    WaitForTransactionReceiptError,
  ]);

  return {
    write,
    isPending,
    isConfirming,
    isTrxSubmitted,
    isConfirmed,
    isWriteContractError,
    isWaitTrxError,
    WriteContractError,
    WaitForTransactionReceiptError,
    reset,
    hash,
  };
};
