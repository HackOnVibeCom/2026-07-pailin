"use client";

import { TOKENS } from "./tokens";

export const USDC_MINT = TOKENS.USDC.mint;

export interface JupRoutePlanStep {
  swapInfo?: { label?: string; inputMint?: string; outputMint?: string };
  percent?: number;
}

export interface JupQuote {
  inAmount: string;
  outAmount: string;
  priceImpactPct: string;
  routePlan?: JupRoutePlanStep[];
}

/** Fetch USD prices for a set of mints from Jupiter (via our proxy). */
export async function fetchPrices(mints: string[]): Promise<Record<string, number>> {
  if (mints.length === 0) return {};
  try {
    const res = await fetch(`/api/jupiter/price?ids=${mints.join(",")}`, { cache: "no-store" });
    if (!res.ok) return {};
    // Jupiter price/v3 shape: { "<mint>": { usdPrice: number } | null }
    const json = (await res.json()) as Record<string, { usdPrice?: number } | null>;
    const out: Record<string, number> = {};
    for (const [mint, v] of Object.entries(json)) {
      const p = Number(v?.usdPrice);
      if (v && Number.isFinite(p) && p > 0) out[mint] = p;
    }
    return out;
  } catch {
    return {};
  }
}

/** Fetch a real Jupiter swap quote (token -> USDC). Returns null on failure. */
export async function fetchJupiterQuote(
  inputMint: string,
  amountBaseUnits: number,
  slippageBps = 50,
): Promise<JupQuote | null> {
  if (inputMint === USDC_MINT) return null; // 1:1, no swap needed
  if (!Number.isFinite(amountBaseUnits) || amountBaseUnits <= 0) return null;
  try {
    const url =
      `/api/jupiter/quote?inputMint=${inputMint}&outputMint=${USDC_MINT}` +
      `&amount=${Math.floor(amountBaseUnits)}&slippageBps=${slippageBps}`;
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return null;
    const json = (await res.json()) as JupQuote & { error?: string };
    if (json.error || !json.outAmount) return null;
    return json;
  } catch {
    return null;
  }
}
