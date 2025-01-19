import { useContext } from "react";
import { Types, StateContext } from "@/provider/AppProvider";

import { type SimulateContractErrorType } from "viem";
import { useSimulateContract } from "wagmi";
import { BaseError } from "@wagmi/core";

import { assetscooper_contract as assetscooper_contract_address } from "@/constants/contractAddress";
import { ASSETSCOOPER_CONTRACT_ABI } from "./../../constants/abi/assetscooper2";

export type ExtendedErrorType = SimulateContractErrorType & {
  shortMessage?: string;
};

export function useSweepAssetsSimulation(args: any[] = []) {
  const { setMessage, setType } = useContext(StateContext);

  const simulateRes = useSimulateContract({
    address: assetscooper_contract_address,
    abi: ASSETSCOOPER_CONTRACT_ABI,
    functionName: "sweepAsset",
    //@ts-ignore
    args,
    query: {
      enabled: args.length > 0, // Only simulate when we have args
      retry: false,
    },
  });

  const { data, refetch, isLoading } = simulateRes;

  const setError = (error: BaseError) => {
    const message = error.shortMessage ? error.shortMessage : error.message;
    const title = error.name as string;
    setMessage({ title, message: message ?? "An unknown error occurred" });
    setType(Types.ERROR);
  };

  const resimulate = async () => {
    try {
      const { data: newRes, error } = await refetch();
      if (error) {
        setError(error as BaseError);
        return null;
      }
      return newRes;
    } catch (error) {
      setError(error as BaseError);
      return null;
    }
  };

  return { data, resimulate, isPending: isLoading };
}
