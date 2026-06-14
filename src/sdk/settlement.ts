import { clusterApiUrl, PublicKey } from "@solana/web3.js";

/** Mainnet USDC mint. */
export const MAINNET_USDC = new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v");

/** Parse a base58 address into a PublicKey, or null if invalid. */
export function parsePubkey(raw: string): PublicKey | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  try {
    return new PublicKey(trimmed);
  } catch {
    return null;
  }
}

/** Mainnet RPC endpoint. */
export function getClusterEndpoint(): string {
  return process.env.NEXT_PUBLIC_SOLANA_RPC || clusterApiUrl("mainnet-beta");
}

/** Explorer link for a transaction signature. */
export function explorerTx(signature: string): string {
  return `https://solscan.io/tx/${signature}`;
}
