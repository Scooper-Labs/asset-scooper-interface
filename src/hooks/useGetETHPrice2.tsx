import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

interface UseEthPrice {
  address: string;
}

export const useEthPrice = ({ address }: UseEthPrice) => {
  const [ethPrice, setEthPrice] = useState<string | null>(null);

  // const { data, isLoading, isError, error, refetch } = useQuery({
  //   queryKey: ["/ethPrice", address],
  //   queryFn: () => {
  //     const queryParams = new URLSearchParams({
  //       chain: "eth",
  //       include: "percent_change",
  //     });

  //     return fetch(
  //       `https://deep-index.moralis.io/api/v2.2/erc20/${address}/price?${queryParams.toString()}`,
  //       {
  //         headers: {
  //           "X-API-Key": process.env.NEXT_PUBLIC_MORALIS_API_KEY ?? "",
  //         },
  //       }
  //     ).then((response) => response.json());
  //   },
  //   refetchOnWindowFocus: false,
  //   enabled: true,
  //   refetchInterval: 300000, // refetch every 300 seconds
  // });

  // useEffect(() => {
  //   if (data && data.usdPrice) {
  //     // setEthPrice(data.usdPrice);
  //     setEthPrice(Number(data.usdPrice).toFixed(2));
  //   }
  // }, [data]);

  return {
    refetch: () => {},
    ethPrice: 3020,
  };
};
