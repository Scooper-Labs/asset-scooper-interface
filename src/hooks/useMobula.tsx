import { useState, useEffect, useMemo } from "react";
import useSessionStorage from "./useSessionStorage";
import { useAccount } from "wagmi";
import { WalletPortfolioClass } from "@/utils/classes";
import { gen_key } from "@/utils/walletUtils";

interface HistoryDataInterface {
  valueChange: number;
  percentChange: number;
  balance: number;
  walletsCount: number;
}

export const useWalletsPortfolio = () => {
  const { address } = useAccount();
  const [data, setData] = useState<WalletPortfolioClass | null>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const url = `/api/portfolio?wallets=${address}`;
  // const key = useMemo(
  //   () => gen_key(`/api/portfolio?wallets=${address}`),
  //   [address]
  // );

  // const { value, setValue } = useSessionStorage(key, null);
  // console.log(value, "Outside value");

  function updateData(data: any) {
    setData(data);
    // setValue(data);
  }

  async function fetchWalletsPortfolio() {
    setLoading(true);
    try {
      const response = await fetch(url);
      const { data, error } = await response.json();
      if (data) {
        updateData(data);
      } else {
        setError(error);
      }
    } catch (err) {
      setError("Unknown error occurred: " + err);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function refetch() {
    setData(null);
    setError(null);
    await fetchWalletsPortfolio();
  }
  useEffect(() => {
    const handleEffect = async () => {
      if (address === undefined) {
        setError("No wallet connected. Please connect a wallet to proceed");
        setLoading(false);
        return;
      }

      // if (value) {
      //   console.log("Cache hit");
      //   updateData(value);
      // } else {
      console.log("Cache miss");
      await fetchWalletsPortfolio();
      // }
    };

    handleEffect();
  }, [address]);

  return { data, error, loading, refetch };
};

export const useWalletsHistory = () => {
  const { address } = useAccount();
  const [data, setData] = useState<HistoryDataInterface | null>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const url = `/api/history?wallets=${address}`;
  const key = gen_key(url);

  const { value, setValue } = useSessionStorage(key, null);

  async function fetchWalletsHistory() {
    setLoading(true);
    try {
      const response = await fetch(url);
      const { data, error } = await response.json();
      if (data) {
        setData(data);
        setValue(data);
      } else {
        setError(error);
      }
    } catch (err) {
      setError("Unknown error occurred: " + err);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const handleEffect = async () => {
      if (address === undefined) {
        setError("No wallet connected. Please connect a wallet to proceed");
        setLoading(false);
        return;
      }

      if (value) {
        console.log("Cache hit");
        setData(value as HistoryDataInterface);
      } else {
        console.log("Cache miss");
        fetchWalletsHistory();
      }
    };

    handleEffect();
  }, [address]);

  return { data, error, loading };
};
