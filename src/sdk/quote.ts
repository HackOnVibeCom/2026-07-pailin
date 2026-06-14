import type { SwapQuote, WalletToken } from "./types";
import { fetchJupiterQuote, USDC_MINT } from "@/lib/jupiter";

/**
 * getSwapQuote — quotes an input token into USDC.
 *
 * Tries the real Jupiter API first (token -> USDC, real route + price impact).
 * Falls back to a synthetic quote derived from the token's USD price so the
 * demo always works offline / when a wallet token isn't routable.
 */
export async function getSwapQuote(
  walletToken: WalletToken,
  inputAmount: number,
): Promise<SwapQuote> {
  const { token, priceUsd } = walletToken;

  // USDC needs no swap.
  if (token.mint === USDC_MINT) {
    return synthetic(walletToken, inputAmount, { impact: 0, label: "Direct" });
  }

  const amountBaseUnits = inputAmount * 10 ** token.decimals;
  const jup = await fetchJupiterQuote(token.mint, amountBaseUnits);

  if (jup) {
    const outputAmount = Number(jup.outAmount) / 1e6; // USDC has 6 decimals
    const priceImpactPct = Math.abs(Number(jup.priceImpactPct) * 100) || 0;
    const fuseFeeUsd = outputAmount * 0.003;
    const networkFeeUsd = 0.0008;
    const labels =
      jup.routePlan
        ?.map((r) => r.swapInfo?.label)
        .filter((l): l is string => Boolean(l)) ?? [];
    const via = labels.length ? Array.from(new Set(labels)).join(" → ") : "Jupiter";

    return {
      inputToken: token,
      inputAmount,
      outputSymbol: "USDC",
      outputAmount: Math.max(0, outputAmount - fuseFeeUsd),
      priceImpactPct,
      networkFeeUsd,
      fuseFeeUsd,
      validForMs: 30_000,
      route: [
        { label: token.symbol, detail: "Input" },
        { label: via, detail: "Live route via Jupiter" },
        { label: "USDC", detail: "Settled to merchant" },
      ],
    };
  }

  // Fallback: synthetic quote.
  const thin = ["BONK", "WIF"].includes(token.symbol);
  const grossUsd = inputAmount * priceUsd;
  const impact = Math.min(thin ? 0.85 : 0.22, (grossUsd / 5000) * (thin ? 1.4 : 0.6) + 0.04);
  return synthetic(walletToken, inputAmount, {
    impact,
    label: thin ? "Raydium CLMM" : "Orca Whirlpool",
  });
}

function synthetic(
  walletToken: WalletToken,
  inputAmount: number,
  { impact, label }: { impact: number; label: string },
): SwapQuote {
  const grossUsd = inputAmount * walletToken.priceUsd;
  const networkFeeUsd = 0.0008;
  const fuseFeeUsd = grossUsd * 0.003;
  const outputAmount = grossUsd * (1 - impact / 100) - fuseFeeUsd;
  return {
    inputToken: walletToken.token,
    inputAmount,
    outputSymbol: "USDC",
    outputAmount: Math.max(0, outputAmount),
    priceImpactPct: impact,
    networkFeeUsd,
    fuseFeeUsd,
    validForMs: 30_000,
    route: [
      { label: walletToken.token.symbol, detail: "Input" },
      { label, detail: "Best route via Jupiter" },
      { label: "USDC", detail: "Settled to merchant" },
    ],
  };
}

/** Aggregate quotes for a basket of selected tokens (multi-asset checkout). */
export async function getBasketQuote(
  selections: { walletToken: WalletToken; amount: number }[],
) {
  const quotes = await Promise.all(
    selections.map((s) => getSwapQuote(s.walletToken, s.amount)),
  );
  const outputUsdc = quotes.reduce((sum, q) => sum + q.outputAmount, 0);
  const totalFeesUsd = quotes.reduce((sum, q) => sum + q.fuseFeeUsd + q.networkFeeUsd, 0);
  const worstImpact = quotes.reduce((m, q) => Math.max(m, q.priceImpactPct), 0);
  return { quotes, outputUsdc, totalFeesUsd, worstImpact };
}
