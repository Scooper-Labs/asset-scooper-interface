import { useState, useCallback, useMemo } from "react";
import { useAccount, useReadContract } from "wagmi";
import { Address, parseUnits } from "viem";
import {
  PERMIT2_ADDRESS,
  MaxUint256,
  MaxAllowanceTransferAmount,
} from "@uniswap/permit2-sdk";
import { Token } from "@/lib/components/types";
import { erc20Abi } from "viem";
import { useApprove } from "./useApproval";

export function useTokenApprovals() {
  const { address } = useAccount();
  const [isApproving, setIsApproving] = useState(false);

  // Helper function to check allowance
  const checkAllowance = useCallback(
    async (token: Address, amount: bigint) => {
      if (!address) throw new Error("Wallet not connected");

      // Reading contract to get allowance
      const { data: allowance } = useReadContract({
        address: token,
        abi: erc20Abi,
        functionName: "allowance",
        args: [address, PERMIT2_ADDRESS],
      });

      // Ensure allowance is greater than or equal to the required amount
      return BigInt(allowance || "0") >= amount;
    },
    [address]
  );

  const { approve } = useApprove([
    PERMIT2_ADDRESS,
    //@ts-ignore
    MaxAllowanceTransferAmount, // Max approval
  ]);

  // Function to approve multiple tokens
  const approveTokensForPermit2 = useCallback(
    async (tokens: Token[]) => {
      if (!address) throw new Error("Wallet not connected");
      setIsApproving(true);

      try {
        for (const token of tokens) {
          const amount = parseUnits(String(token.userBalance), token.decimals);
          const hasAllowance = await checkAllowance(
            token.address as Address,
            amount
          );

          if (!hasAllowance) {
            await approve?.();
            console.log(`Approved ${token.symbol} for Permit2`);
          }
        }
      } catch (error) {
        console.error("Error approving tokens:", error);
      } finally {
        setIsApproving(false);
      }
    },
    [address, checkAllowance, approve]
  );

  return useMemo(
    () => ({
      isApproving,
      approveTokensForPermit2,
      checkAllowance,
      approve,
    }),
    [isApproving, approveTokensForPermit2, checkAllowance, approve]
  );
}
