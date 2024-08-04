import { useEffect, useMemo, useState } from "react";
import { useAccount } from "wagmi";

export const useSmartWallet = () => {
  const { chainId, connector, isConnected } = useAccount();
  const isSmartWallet = useMemo(() => {
    return (
      isConnected &&
      (connector?.id === "coinbaseWallet" ||
        connector?.id === "coinbaseWalletSDK")
    );
  }, [isConnected, connector?.id]);
  return {
    isSmartWallet,
    connectorId: connector?.id
  };
};
