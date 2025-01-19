import { useBlockNumber, useAccount } from "wagmi";
import { useState, useEffect } from "react";

const useEstimatedTransactionTime = () => {
  const { data: currentBlockNumber } = useBlockNumber({ watch: true }); // Fetch the current block number
  const { chain } = useAccount(); // Get the current network

  const [estimatedTime, setEstimatedTime] = useState<string>("Calculating...");

  // Block times for supported chains (seconds per block)
  const chainBlockTimes: Record<number, number> = {
    10: 2, // Optimism
    8453: 2, // Base
    1135: 2, // Lisk
  };

  useEffect(() => {
    if (!currentBlockNumber || !chain?.id) return;

    // Get block time for the current chain or default to 15 seconds
    const blockTime = chainBlockTimes[chain.id] || 15;
    const confirmationBlocks = 2; // Number of blocks required for confirmation

    // Calculate estimated time (in seconds)
    const timeInSeconds = blockTime * confirmationBlocks;

    // Format the time (seconds to readable format)
    const formattedTime =
      timeInSeconds < 60
        ? `${timeInSeconds} seconds`
        : `${Math.floor(timeInSeconds / 60)} minutes`;

    setEstimatedTime(formattedTime);
  }, [currentBlockNumber, chain?.id]);

  return estimatedTime;
};

export default useEstimatedTransactionTime;
