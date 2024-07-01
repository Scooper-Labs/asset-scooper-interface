"use client";

import { useLocalStorage } from "../useLocalStorage";

export const useSweepThreshhold = () => {
  const [sweepthreshHold, setSweepThreshold] = useLocalStorage(
    "assetscooper.xyz.sweepthreshHold",
    "0.001"
  );

  return {
    setSweepThreshold,
    sweepthreshHold,
  };
};
