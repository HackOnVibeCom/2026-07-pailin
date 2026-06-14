import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const BASE = process.env.JUPITER_API || "https://lite-api.jup.ag";
const KEY = process.env.JUPITER_API_KEY;

/**
 * Proxy to Jupiter's swap-transaction builder.
 * POST /api/jupiter/swap  body: { quoteResponse, userPublicKey, destinationTokenAccount? }
 * Returns { swapTransaction: <base64 VersionedTransaction>, lastValidBlockHeight, ... }
 */
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  if (!body.quoteResponse || !body.userPublicKey) {
    return NextResponse.json({ error: "missing quoteResponse/userPublicKey" }, { status: 400 });
  }

  try {
    const res = await fetch(`${BASE}/swap/v1/swap`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(KEY ? { "x-api-key": KEY } : {}),
      },
      body: JSON.stringify({
        dynamicComputeUnitLimit: true,
        dynamicSlippage: true,
        prioritizationFeeLamports: { priorityLevelWithMaxLamports: { maxLamports: 1_000_000, priorityLevel: "high" } },
        wrapAndUnwrapSol: true,
        ...body,
      }),
      cache: "no-store",
    });
    const data = await res.json();
    if (!res.ok) {
      return NextResponse.json({ error: "jupiter_error", detail: data }, { status: res.status });
    }
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json(
      { error: "fetch_failed", detail: e instanceof Error ? e.message : String(e) },
      { status: 502 },
    );
  }
}
