import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const BASE = process.env.JUPITER_API || "https://lite-api.jup.ag";
const KEY = process.env.JUPITER_API_KEY;

/**
 * Proxy to Jupiter's swap quote API.
 * GET /api/jupiter/quote?inputMint=..&outputMint=..&amount=..&slippageBps=50
 *
 * Proxying server-side avoids browser CORS and lets us attach a key for the
 * paid tier without exposing it to the client.
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const inputMint = searchParams.get("inputMint");
  const outputMint = searchParams.get("outputMint");
  const amount = searchParams.get("amount");
  const slippageBps = searchParams.get("slippageBps") ?? "50";

  if (!inputMint || !outputMint || !amount) {
    return NextResponse.json({ error: "missing inputMint/outputMint/amount" }, { status: 400 });
  }

  const url =
    `${BASE}/swap/v1/quote?inputMint=${inputMint}&outputMint=${outputMint}` +
    `&amount=${amount}&slippageBps=${slippageBps}&restrictIntermediateTokens=true`;

  try {
    const res = await fetch(url, {
      headers: KEY ? { "x-api-key": KEY } : {},
      // Jupiter quotes are time-sensitive — never cache.
      cache: "no-store",
    });
    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json({ error: "jupiter_error", detail: text }, { status: res.status });
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json(
      { error: "fetch_failed", detail: e instanceof Error ? e.message : String(e) },
      { status: 502 },
    );
  }
}
