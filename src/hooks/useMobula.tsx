import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { WalletPortfolioClass } from "@/utils/classes";

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

  function updateData(data: any) {
    setData(data);
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
      } else {
        await fetchWalletsPortfolio();
      }
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

  async function fetchWalletsHistory() {
    setLoading(true);
    try {
      const response = await fetch(url);
      const { data, error } = await response.json();
      if (data) {
        setData(data);
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
      } else {
        await fetchWalletsHistory();
      }
    };

    handleEffect();
  }, [address]);

  return { data, error, loading };
};
