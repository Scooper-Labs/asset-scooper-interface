import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export const useSmartWallet = () => {
  const { chainId, connector, isConnected } = useAccount();
  const [isSmartWallet, setIsSmartWallet] = useState(false);
  useEffect(() => {}, []);
};
