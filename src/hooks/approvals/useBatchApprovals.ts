import { assetscooper_contract } from "@/constants/contractAddress";
import { Token } from "@/lib/components/types";
import { Address, encodeFunctionData, erc20Abi, parseUnits } from "viem";
import { useSendCalls } from "wagmi/experimental";
import { useToast } from "@chakra-ui/react";
import CustomToast from "@/components/Toast";
import { useState } from "react";

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

  // Construct calldata for each token
  const approveCalls = tokens.map((token, index) => {
    // if (tokens.length === 0) {
    //   return;
    // }
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

  // const approveTTokens = () =>
  //   sendCalls(
  //     {
  //       calls: approveCalls,
  //     },
  //     {
  //       onSuccess(data, variables, context) {
  //         () =>
  //           CustomToast(
  //             toast,
  //             "Your tokens have been successfully approved proceed to swap.",
  //             4000,
  //             "top-right"
  //           );
  //       },
  //     }
  //   );

  const approveTTokens = () => {
    setIsBatchApprovalLoading(true);

    sendCalls(
      {
        calls: approveCalls,
      },
      {
        onSuccess(data, variables, context) {
          CustomToast(
            toast,
            "Success! Your tokens have been approved. You're all set to sweep!",
            4000,
            "top"
          );
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

  return {
    approveTTokens,
    isBatchApprovalLoading,
  };
};
