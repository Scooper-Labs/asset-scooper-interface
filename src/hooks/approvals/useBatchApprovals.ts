import { assetscooper_contract } from "@/constants/contractAddress";
import { Token } from "@/lib/components/types";
import { Address, encodeFunctionData, erc20Abi, parseUnits } from "viem";
import { useCallsStatus, useSendCalls } from "wagmi/experimental";
import { useToast } from "@chakra-ui/react";
import CustomToast from "@/components/Toast";
import { useEffect, useState } from "react";

export enum TransactionStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  FAILED = "FAILED",
}

export const useBatchApprovals = ({
  tokens,
  amounts,
  spender = assetscooper_contract as Address,
}: {
  tokens: Token[];
  amounts: string[];
  spender?: Address;
}) => {
  const { sendCalls } = useSendCalls();
  const toast = useToast();
  const [isBatchApprovalLoading, setIsBatchApprovalLoading] =
    useState<boolean>(false);
  const [batchApproveCallId, setBatchApproveCallId] = useState<string | null>(
    null
  );
  const [transactionStatus, setTransactionStatus] =
    useState<TransactionStatus | null>(null);

  const { data: callStatus, isLoading: statusLoading } = useCallsStatus({
    id: batchApproveCallId ?? "", // Pass the batch call ID data in the state
  });

  // Construct calldata for each token
  const approveCalls = tokens.map((token, index) => {
    const amount = amounts && amounts.length > index ? amounts[index] : "0";
    const amountBigInt = parseUnits(amount, token?.decimals);

    const approveCalldata = encodeFunctionData({
      abi: erc20Abi,
      functionName: "approve",
      args: [spender, amountBigInt],
    });

    return {
      to: token.address as Address,
      data: approveCalldata,
      value: BigInt(0),
    };
  });

  const approveTTokens = async () => {
    setIsBatchApprovalLoading(true);

    sendCalls(
      {
        calls: approveCalls,
      },
      {
        onSuccess(data) {
          // Set batch approve call ID to track the transaction
          const batchId = data;
          setBatchApproveCallId(batchId);
        },
        onError(error) {
          console.error("Approval failed:", error);
          CustomToast(
            toast,
            "Oops! There was an issue approving your tokens. Please try again, and let us know if you need any help.",
            4000,
            "top"
          );
        },
        onSettled() {
          setIsBatchApprovalLoading(false);
        },
      }
    );
  };

  useEffect(() => {
    if (callStatus && callStatus.status) {
      const transactionStatusCall = callStatus.status as TransactionStatus;

      // Check if the status indicates success
      if (transactionStatusCall === TransactionStatus.CONFIRMED) {
        setTransactionStatus(TransactionStatus.CONFIRMED);
        setIsBatchApprovalLoading(false);
        CustomToast(
          toast,
          "Success! Your tokens have been approved. You're all set to sweep!",
          4000,
          "top-left"
        );
      } else if (transactionStatusCall === TransactionStatus.PENDING) {
        // console.log("Approval is still pending...");
        setIsBatchApprovalLoading(true);
      } else {
        console.log("Unexpected status:", transactionStatusCall);
        setTransactionStatus(TransactionStatus.FAILED);
        setIsBatchApprovalLoading(false);
      }
    } else {
      console.log("Call status is undefined or empty.");
    }
  }, [callStatus, toast]);

  return {
    approveTTokens,
    isBatchApprovalLoading,
    transactionStatus,
  };
};
