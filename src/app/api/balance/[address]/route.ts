import { ChainID as CovalentChainID } from "@covalenthq/client-sdk";
import { createConfig, getBalance, readContracts } from "@wagmi/core";
import { covalentClient } from "@/lib/covalent";
import { base } from "viem/chains";
import { z } from "zod";

const querySchema = z.object({
  address: z.coerce.string(),
});

const tokensSchema = z.array(z.coerce.string());

export const revalidate = 10;

// const resp = await client.BalanceService.getTokenBalancesForWalletAddress("eth-mainnet");

export async function GET(
  _req: Request,
  {
    params,
  }: { params: { chainId: string; address: string; tokens?: string[] } }
) {
  const { address } = querySchema.parse(params);

  try {
    const { data } =
      await covalentClient.BalanceService.getTokenBalancesForWalletAddress(
        base.id as CovalentChainID,
        address
      );

    console.log(data);
    return Response.json(
      data,
      {
        headers: {
          "Cache-Control": "s-maxage=1, stale-while-revalidate=59",
        },
      }
    );
  } catch (e) {
    console.error("Couldn't fetch balances from covalent", e);
    //fetch balance from subgraph
  }
}
