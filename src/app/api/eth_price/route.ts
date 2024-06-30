import { NextResponse } from "next/server";

export async function GET() {
  const url = "https://1inch-proxy.vercel.app/eth_price";

  try {
    const response = await fetch(url);
    if (response.status === 200) {
      const data = await response.json();

      return NextResponse.json(data, { status: 200 });
    } else {
      const error = await response.text();
      return NextResponse.json({ error }, { status: response.status });
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
