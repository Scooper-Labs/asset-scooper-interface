import { useEffect, useState } from "react";

export default function useGetETHPrice() {
  const [price, setPrice] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    async function fetchETHPrice() {
      try {
        const response = await fetch("/api/eth_price");
        const _price = await response.json();
        setPrice(parseInt(_price));
      } catch (err) {
        setError("Unknown error occurred: " + err);
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchETHPrice();

    const intervalId = setInterval(fetchETHPrice, 30000);

    return () => clearInterval(intervalId);
  }, []);

  return { price, loading, error };
}
