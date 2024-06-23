import { ChainID as CovalentChainID } from "@covalenthq/client-sdk";
import { covalentClient } from "@/lib/covalent";
import { base } from "viem/chains";
import { z } from "zod";
import { NextRequest } from "next/server";

const querySchema = z.object({
  address: z.coerce.string(),
});

const tokensSchema = z.array(z.coerce.string());

export const revalidate = 10;

// const resp = await client.BalanceService.getTokenBalancesForWalletAddress("eth-mainnet");

export async function GET(
  request: NextRequest,
  { params }: { params: { address: string } }
) {
  const { address } = querySchema.parse(params);

  try {
    const { data } =
      await covalentClient.BalanceService.getTokenBalancesForWalletAddress(
        base.id as CovalentChainID,
        address
      );

    const formattedData = data.items.map((item) => ({
      name: item.contract_name,
      address: item.contract_address,
      decimals: item.contract_decimals,
      balance: item.balance,
      usdPrice: item.quote,
      logoUrl: item.logo_url,
      symbol: item.contract_ticker_symbol,
    }));

    console.log(formattedData, "this is data console");

    return new Response(JSON.stringify(formattedData), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "max-age=60, stale-while-revalidate=600",
      },
    });
  } catch (e) {
    console.error("Couldn't fetch balances from covalent", e);
    return new Response(
      JSON.stringify({ error: "Couldn't fetch balances from covalent" }),
      { status: 500 }
    );
  }
}
