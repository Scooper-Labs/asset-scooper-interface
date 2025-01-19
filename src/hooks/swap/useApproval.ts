import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { erc20Abi } from "viem";
import { assetscooper_contract } from "@/constants/contractAddress";

export function useApprove(
  // address: `0x${string}`,
  args: [`0x${string}`, bigint]
) {
  const { data: hash, isPending, writeContractAsync } = useWriteContract();
  //   const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
  //     hash,
  //     confirmations: 1,
  //   });

  const approve = async () => {
    const result = await writeContractAsync({
      address: assetscooper_contract,
      abi: erc20Abi,
      functionName: "approve",
      args,
    });
    return result;
  };

  //   const isLoading = isPending ?? isConfirming;

  //   const isLoading = isPending;
  return { approve };
}
