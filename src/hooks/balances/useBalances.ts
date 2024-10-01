import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Address } from "viem";
import { MoralisAssetClass } from "@/utils/classes";
import { MoralisAssetInterface } from "@/utils/interface";

interface UseBalances {
  address: Address | undefined;
}
export const useBalances = ({ address }: UseBalances) => {
  const [moralisAssets, set_] = useState<MoralisAssetClass[] | null>(null);

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["/walletBalance" + address],
    queryFn: () => {
      const queryParams = new URLSearchParams({
        chain: "base",
      });

      return fetch(
        `https://deep-index.moralis.io/api/v2.2/wallets/${address}/tokens?${queryParams.toString()}`,
        {
          headers: {
            "X-API-Key": process.env.NEXT_PUBLIC_MORALIS_API_KEY ?? "",
          },
        }
      ).then((response) => response.json());
    },
    refetchOnWindowFocus: true,
    enabled: true,
  });

  useEffect(() => {
    if (data && address) {
      const { result }: { result: MoralisAssetInterface[] } = data;
      const assets = result?.map((res) => new MoralisAssetClass(res));
      set_(cleanSpam(assets));
    }
  }, [data, address]);

  // console.log(data, "this is data");

  return {
    data,
    isLoading,
    isError,
    error,
    refetch,
    moralisAssets,
  };
};

function cleanSpam(data: MoralisAssetClass[]) {
  return data?.filter((asset) => asset.isSpam === false);
}
