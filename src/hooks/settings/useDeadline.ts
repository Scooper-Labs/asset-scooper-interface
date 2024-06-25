"use client";

import { useLocalStorage } from "../useLocalStorage";

export const useSweepSlippageTolerance = () => {
  const [sweepthreshHold, setSweepThreshold] = useLocalStorage(
    "assetscooper.xyz.sweepDeadline",
    "30",
  );

  return {
    setSweepThreshold,
    sweepthreshHold,
  };
};
