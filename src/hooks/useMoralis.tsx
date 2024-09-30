import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import {
  MoralisWalletPortfolioApiResponse,
  MoralisAssetInterface,
} from "@/utils/interface";
import { MoralisAssetClass } from "@/utils/classes";

export const useWalletsPortfolioMoralis = () => {
  const { address } = useAccount();
  const [moralisAssets, setMoralisAssets] = useState<
    MoralisAssetClass[] | null
  >(null);

  const [moralisWalletPortfolioBalance, setMoralisWalletPortfolioBalance] =
    useState<MoralisWalletPortfolioApiResponse | null>(null);

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["/walletBalance", address],
    queryFn: async () => {
      if (!address) {
        throw new Error(
          "No wallet connected. Please connect a wallet to proceed"
        );
      }

      const url = `https://deep-index.moralis.io/api/v2.2/${address}/erc20`;
      const response = await fetch(url, {
        headers: {
          "X-API-Key": process.env.NEXT_PUBLIC_MORALIS_API_KEY ?? "",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch wallet portfolio");
      }

      return response.json();
    },
    refetchOnWindowFocus: true,
    enabled: !!address,
  });

  useEffect(() => {
    if (data && address) {
      const assets = data?.result?.map(
        (res: MoralisAssetInterface) => new MoralisAssetClass(res)
      );
      setMoralisAssets(cleanSpam(assets));
    }
  }, [data, address]);

  function cleanSpam(data: MoralisAssetClass[]) {
    return data?.filter((asset) => asset.isSpam === false);
  }

  return {
    data,
    isLoading,
    isError,
    error,
    refetch,
    moralisAssets,
  };
};
