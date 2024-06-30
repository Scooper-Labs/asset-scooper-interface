import { useEffect, useState } from "react";

export default function useGetETHPrice() {
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    async function fetchETHPrice() {
      try {
        const response = await fetch("/api/eth_price");
        const _price = await response.json();
        console.log(_price);
        setPrice(parseInt(_price));
      } catch (err) {
        setError("Unknown error occurred: " + err);
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchETHPrice();
  }, []);

  return { price, loading, error };
}
