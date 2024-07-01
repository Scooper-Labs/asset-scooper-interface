import { NextRequest, NextResponse } from "next/server";
import { getConstants } from "../constant";

export async function GET(request: NextRequest) {
  const { Mobula_Api, blockchainsParam, options } = getConstants();
  const { searchParams } = new URL(request.url);
  const walletsParam = searchParams.get("wallets");

  if (!walletsParam) {
    return NextResponse.json(
      { error: "Wallets parameter is required" },
      { status: 400 }
    );
  }

  let currentTime = new Date().getTime();
  let twentyFourHoursAgo = currentTime - 24 * 60 * 60 * 1000;

  const url = `${Mobula_Api}/history?wallets=${walletsParam}&from=${twentyFourHoursAgo}&blockchains=${blockchainsParam}`;

  try {
    const response = await fetch(url, options);
    if (response.status === 200) {
      const data = await response.json();

      const balanceHistory = data.data.balance_history;
      const firstElement = balanceHistory[0][1];
      const lastElement = balanceHistory[balanceHistory.length - 1][1];

      const percentChange = ((lastElement - firstElement) / firstElement) * 100;
      const valueChange = lastElement - firstElement;

      const HistoryData = {
        valueChange: Number(valueChange.toFixed(2)),
        percentChange: Number(percentChange.toFixed(2)),
        balance: Number(data.data.balance_usd.toFixed(2)),
        walletsCount: data.data.wallets.length as number,
      };

      return NextResponse.json({ data: HistoryData }, { status: 200 });
    } else {
      const error = await response.text();
      return NextResponse.json({ error }, { status: response.status });
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
