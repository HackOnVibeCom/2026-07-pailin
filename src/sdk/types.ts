/**
 * FUSE SDK — shared types
 * "Pay with any token. Settle in stablecoins."
 */

export type ChainId = "solana" | "ethereum" | "base";

export interface Token {
  /** Mint address (Solana) */
  mint: string;
  symbol: string;
  name: string;
  /** Decimals on-chain */
  decimals: number;
  /** Brand color used across the UI */
  color: string;
  /** Optional secondary brand color for gradients */
  color2?: string;
  /** Short ticker emoji / glyph fallback */
  glyph: string;
  chain: ChainId;
}

export interface WalletToken {
  token: Token;
  /** Human-readable balance */
  balance: number;
  /** USD price per token */
  priceUsd: number;
  /** balance * priceUsd */
  valueUsd: number;
}

export interface QuoteRouteStep {
  label: string;
  detail: string;
}

export interface SwapQuote {
  inputToken: Token;
  inputAmount: number;
  outputSymbol: string;
  outputAmount: number;
  priceImpactPct: number;
  networkFeeUsd: number;
  fuseFeeUsd: number;
  route: QuoteRouteStep[];
  /** ms the quote is valid */
  validForMs: number;
}

export type PaymentStatus =
  | "idle"
  | "quoting"
  | "ready"
  | "signing"
  | "swapping"
  | "settling"
  | "success"
  | "error";

export interface PaymentResult {
  status: "success";
  txHash: string;
  amountPaidUsd: number;
  merchantReceivedUsdc: number;
  tokensUsed: string[];
  completedAt: number;
  /** Settlement path that produced this result */
  mode?: "mainnet" | "demo";
}

export interface FuseCheckoutConfig {
  amount: number;
  currency: "USDC";
  recipient: string;
  merchantName?: string;
  productName?: string;
}
