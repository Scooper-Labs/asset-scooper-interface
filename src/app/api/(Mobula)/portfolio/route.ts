import { WalletPortfolioClass } from "@/utils/classes";
import { WalletPortfolioApiResInterface } from "@/utils/interface";
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
  const url = `${Mobula_Api}/multi-portfolio?wallets=${walletsParam}&blockchains=${blockchainsParam}`;

  try {
    const response = await fetch(url, options);
    if (response.status === 200) {
      const res = await response.json();
      const apiRes = res.data as WalletPortfolioApiResInterface[];

      const cleanedResponseFromZero = apiRes.map((obj) => {
        obj.assets = obj.assets.filter((asset) => asset.token_balance !== 0);
        return obj;
      });
      const walletsPortfolioData = cleanedResponseFromZero.map(
        (resp) => new WalletPortfolioClass(resp)
      );
      return NextResponse.json(
        { data: walletsPortfolioData[0] },
        { status: 200 }
      );
    } else {
      const error = await response.text();
      return NextResponse.json({ error }, { status: response.status });
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
