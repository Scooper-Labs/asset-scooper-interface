import { MoralisAssetClass } from "@/utils/classes";
import { useState, useEffect } from "react";

const UNISWAP_V3_SUBGRAPH = "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3";

// Define types for better TypeScript support
interface PoolData {
    id: string;
    feeTier: string;
}

interface PoolFees {
    [tokenIn: string]: number | null;
}

const usePoolFees = (tokenInList: MoralisAssetClass[], tokenOut: string) => {
    const [poolFees, setPoolFees] = useState<PoolFees>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPoolFees = async () => {
            if (!tokenInList.length || !tokenOut) return;
            setLoading(true);
            setError(null);

            try {
                // Build multiple queries for each token pair
                const queries = tokenInList.map(
                    (tokenIn, index) => `
                    pool${index}: pools(
                        where: { token0: "${tokenIn.address.toLowerCase()}", token1: "${tokenOut.toLowerCase()}" }
                    ) {
                        id
                        feeTier
                    }
                `
                );

                const query = `{ ${queries.join("\n")} }`;

                const response = await fetch(UNISWAP_V3_SUBGRAPH, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ query }),
                });

                const data = await response.json();
                const fees: PoolFees = {};

                tokenInList.forEach((tokenIn, index) => {
                    const pools: PoolData[] = data.data[`pool${index}`] || [];
                    fees[tokenIn.address] = pools.length > 0 ? Number(pools[0].feeTier) : null;
                });

                setPoolFees(fees);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchPoolFees();
    }, [tokenInList, tokenOut]);

    return { poolFees, loading, error };
};

export default usePoolFees;
