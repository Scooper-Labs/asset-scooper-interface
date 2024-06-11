

// fetches token lists on base

import { getAddress } from "viem";

interface UseTokensParams {
  chainId: number;
}

type Data = {
  id: string;
  address: string;
  name: string;
  symbol: string;
  logoUrl: string;
  decimals: number;
};

export const fetchTokensQueryFn = async () => {
  const resp = await fetch("https://tokenlist-apis.vercel.app/v0");
  if (resp.status === 200) {
    const data: Data[] = await resp.json();

    return data.reduce<Record<number, Record<string, Token>>>(
      (acc, { id, name, symbol, decimals, logoUrl }) => {
        const [_chainId, _address] = id.split(":");

        const chainId = Number(_chainId);
        const address = String(_address);

        if (!acc?.[chainId]) acc[chainId] = {};

        const map = acc[chainId] as Record<string, Token>;

        map[getAddress(address)] = new Token({
          chainId,
          name,
          decimals,
          symbol,
          logoUrl,
          address,
        });

        return acc;
      },
      {},
    );
  }

  throw new Error("Could not fetch tokens");
};

export const useTokens = ({ chainId }: UseTokensParams) => {
  const { data: customTokenMap } = useCustomTokens();
  return useQuery({
    queryKey: ["tokens", Object.keys(customTokenMap).length],
    queryFn: () => fetchTokensQueryFn({ customTokenMap }),
    select: (data) => data[chainId],
    // keepPreviousData: true,
    placeholderData: keepPreviousData,
    staleTime: ms("15m"), // 15 mins
    gcTime: ms("24h"), // 24hs
  });
};
