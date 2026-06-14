"use client";

import { Connection, PublicKey } from "@solana/web3.js";
import type { WalletToken } from "@/sdk/types";
import { TOKENS } from "./tokens";
import { fetchPrices } from "./jupiter";

const TOKEN_PROGRAM_ID = new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA");
const TOKEN_2022_PROGRAM_ID = new PublicKey("TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb");
const SOL_MINT = TOKENS.SOL.mint;

const MINT_TO_TOKEN = Object.fromEntries(
  Object.values(TOKENS).map((t) => [t.mint, t]),
);

/** Last-resort prices if Jupiter price API is unavailable. */
const FALLBACK_PRICE: Record<string, number> = {
  SOL: 184,
  BONK: 0.0000241,
  JUP: 0.91,
  USDC: 1,
  JTO: 3.18,
  WIF: 2.05,
};

/**
 * Read a wallet's real balances from the chain and enrich them with live
 * Jupiter USD prices. Only tokens in our registry are surfaced (we need brand
 * metadata to render them); everything else is ignored.
 */
export async function fetchWalletTokens(
  connection: Connection,
  owner: PublicKey,
): Promise<WalletToken[]> {
  const held: { mint: string; balance: number }[] = [];

  // Native SOL
  const lamports = await connection.getBalance(owner);
  const sol = lamports / 1e9;
  if (sol > 0) held.push({ mint: SOL_MINT, balance: sol });

  // SPL tokens (classic + token-2022)
  const [classic, t22] = await Promise.all([
    connection.getParsedTokenAccountsByOwner(owner, { programId: TOKEN_PROGRAM_ID }),
    connection
      .getParsedTokenAccountsByOwner(owner, { programId: TOKEN_2022_PROGRAM_ID })
      .catch(() => ({ value: [] as never[] })),
  ]);

  for (const { account } of [...classic.value, ...t22.value]) {
    const info = (account.data as { parsed?: { info?: { mint?: string; tokenAmount?: { uiAmount?: number } } } })
      .parsed?.info;
    const mint = info?.mint;
    const amount = info?.tokenAmount?.uiAmount ?? 0;
    if (mint && amount > 0 && MINT_TO_TOKEN[mint]) {
      held.push({ mint, balance: amount });
    }
  }

  // Keep only tokens we can render, dedupe by mint.
  const known = held.filter((h) => MINT_TO_TOKEN[h.mint]);
  if (known.length === 0) return [];

  const prices = await fetchPrices(known.map((h) => h.mint));

  return known
    .map(({ mint, balance }) => {
      const token = MINT_TO_TOKEN[mint];
      const priceUsd = prices[mint] ?? FALLBACK_PRICE[token.symbol] ?? 0;
      return { token, balance, priceUsd, valueUsd: balance * priceUsd };
    })
    .sort((a, b) => b.valueUsd - a.valueUsd);
}
