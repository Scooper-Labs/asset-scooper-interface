import { useReadContract } from "wagmi";
import { erc20Abi } from "viem";
import { Address } from "viem";

export const useTokenAllowances = (
  selectedTokens: any[],
  owner: Address,
  spender: Address
) => {
  //**Fetching the allowances for all tokens
  const allowances = selectedTokens.map((token) =>
    useReadContract({
      address: token.address as Address,
      abi: erc20Abi,
      functionName: "allowance",
      args: [owner, spender],
    })
  );

  return allowances;
};
