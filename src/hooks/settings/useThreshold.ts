"use client";

import { useLocalStorage } from "../useLocalStorage";

export const useSweepThreshhold = () => {
  const [sweepthreshHold, setSweepThreshold] = useLocalStorage(
    "assetscooper.xyz.sweepthreshHold",
    "30",
  );

  return {
    setSweepThreshold,
    sweepthreshHold,
  };
};
