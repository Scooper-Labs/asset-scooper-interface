import { useState, useEffect } from "react";
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
  const key = gen_key(url);

  const { value, setValue } = useSessionStorage(key, null);

  async function fetchWalletsPortfolio() {
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
        setData(value as WalletPortfolioClass);
      } else {
        console.log("Cache miss");
        fetchWalletsPortfolio();
      }
    };

    handleEffect();
  }, []);

  return { data, error, loading };
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
