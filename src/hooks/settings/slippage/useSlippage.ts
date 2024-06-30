"use client";

import { useLocalStorage } from "../../useLocalStorage";
import { SlippageToleranceStorageKey } from "./utils";

export const useSlippageTolerance = (
  key: SlippageToleranceStorageKey = SlippageToleranceStorageKey.Sweep
) => {
  const [slippageTolerance, setSlippageTolerance] = useLocalStorage(key, "1");

  return {
    slippageTolerance,
    setSlippageTolerance,
  };
};
