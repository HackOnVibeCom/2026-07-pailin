import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const BASE = process.env.JUPITER_API || "https://lite-api.jup.ag";
const KEY = process.env.JUPITER_API_KEY;

/**
 * Proxy to Jupiter's price API.
 * GET /api/jupiter/price?ids=mint1,mint2
 * Returns { <mint>: { usdPrice: 1.23, ... } }.
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const ids = searchParams.get("ids");
  if (!ids) return NextResponse.json({ error: "missing ids" }, { status: 400 });

  const url = `${BASE}/price/v3?ids=${ids}`;

  try {
    const res = await fetch(url, {
      headers: KEY ? { "x-api-key": KEY } : {},
      cache: "no-store",
    });
    if (!res.ok) {
      return NextResponse.json({ error: "jupiter_error" }, { status: res.status });
    }
    return NextResponse.json(await res.json());
  } catch (e) {
    return NextResponse.json(
      { error: "fetch_failed", detail: e instanceof Error ? e.message : String(e) },
      { status: 502 },
    );
  }
}
