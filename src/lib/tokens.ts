import type { Token, WalletToken } from "@/sdk/types";

/**
 * Token registry. In production these come from the Jupiter token list /
 * Helius DAS. For the demo we ship a curated Solana set with brand colors.
 */
export const TOKENS: Record<string, Token> = {
  SOL: {
    mint: "So11111111111111111111111111111111111111112",
    symbol: "SOL",
    name: "Solana",
    decimals: 9,
    color: "#14F195",
    color2: "#9945FF",
    glyph: "◎",
    chain: "solana",
  },
  BONK: {
    mint: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263",
    symbol: "BONK",
    name: "Bonk",
    decimals: 5,
    color: "#FF9E2C",
    color2: "#F23A2F",
    glyph: "🐕",
    chain: "solana",
  },
  JUP: {
    mint: "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN",
    symbol: "JUP",
    name: "Jupiter",
    decimals: 6,
    color: "#22D1F8",
    color2: "#34D399",
    glyph: "🪐",
    chain: "solana",
  },
  USDC: {
    mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    symbol: "USDC",
    name: "USD Coin",
    decimals: 6,
    color: "#2775CA",
    color2: "#2775CA",
    glyph: "$",
    chain: "solana",
  },
  JTO: {
    mint: "jtojtomepa8beP8AuQc6eXt5FriJwfFMwQx2v2f9mCL",
    symbol: "JTO",
    name: "Jito",
    decimals: 9,
    color: "#3DD68C",
    color2: "#14B8A6",
    glyph: "⚡",
    chain: "solana",
  },
  WIF: {
    mint: "EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm",
    symbol: "WIF",
    name: "dogwifhat",
    decimals: 6,
    color: "#C8A06A",
    color2: "#8B5E34",
    glyph: "🧢",
    chain: "solana",
  },
};

/**
 * Mock wallet — Sarah's wallet from the core user story.
 * Replace with Helius `getAssetsByOwner` in production.
 */
export const MOCK_WALLET: WalletToken[] = [
  { token: TOKENS.SOL, balance: 0.42, priceUsd: 184.12, valueUsd: 0.42 * 184.12 },
  { token: TOKENS.BONK, balance: 920_000, priceUsd: 0.0000241, valueUsd: 920_000 * 0.0000241 },
  { token: TOKENS.JUP, balance: 38.5, priceUsd: 0.91, valueUsd: 38.5 * 0.91 },
  { token: TOKENS.JTO, balance: 4.2, priceUsd: 3.18, valueUsd: 4.2 * 3.18 },
  { token: TOKENS.WIF, balance: 11.0, priceUsd: 2.05, valueUsd: 11.0 * 2.05 },
];

export const MERCHANT_ADDRESS = "8FuSeMerCh4ntXyZpAy2RecVUSDCdemo9aBcDeFgHJk";

/**
 * Recipient used by the demo wallet flow. Unlike MERCHANT_ADDRESS (a vanity
 * placeholder that intentionally doesn't parse, so real users type their own),
 * this is a valid base58 address — the demo wallet prefills it so the simulated
 * payment can run end-to-end without anyone entering a recipient.
 */
export const DEMO_MERCHANT = "4ZYCDQNKg6kfoMyRSbhDA72rUfaaZegP2Jo65gGLH7MS";
