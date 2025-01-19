import { useCallback } from "react";
import { useWalletClient } from "wagmi";
import { usePermit2 } from "./useAssetScooperServicePermit2";
import { MoralisAssetClass } from "@/utils/classes";

type SweepParams = {
  tokens: MoralisAssetClass[];
  amounts: string[];
};

export function usePermit2Sweep() {
  const { permitAndSweepAssets } = usePermit2();
  const { data: walletClient } = useWalletClient();

  const sweep = useCallback(
    async ({ tokens, amounts }: SweepParams) => {
      if (!walletClient) {
        throw new Error("Wallet not connected");
      }

      if (tokens.length !== amounts.length) {
        throw new Error("Number of tokens must match number of amounts");
      }

      // Convert string amounts to BigInt
      const bigintAmounts = amounts.map((amount) => BigInt(amount));

      return permitAndSweepAssets(tokens, bigintAmounts);
    },
    [walletClient, permitAndSweepAssets]
  );

  return { sweep };
}
