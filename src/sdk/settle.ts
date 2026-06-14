"use client";

import {
  Connection,
  PublicKey,
  Transaction,
  VersionedTransaction,
  type TransactionInstruction,
} from "@solana/web3.js";
import {
  createAssociatedTokenAccountInstruction,
  createTransferInstruction,
  getAssociatedTokenAddressSync,
} from "@solana/spl-token";
import { Buffer } from "buffer";
import type { PaymentStatus } from "./types";
import type { Selection } from "./useFuseQuote";
import { MAINNET_USDC, getClusterEndpoint } from "./settlement";
import { fetchJupiterQuote } from "@/lib/jupiter";
import type { WalletContextState } from "@solana/wallet-adapter-react";

export type StageReport = (status: PaymentStatus, label: string) => void;

type SendTx = WalletContextState["sendTransaction"];

export interface SettleContext {
  publicKey: PublicKey;
  sendTransaction: SendTx;
  selections: Selection[];
  outputUsdc: number;
  merchant: PublicKey;
}

export interface SettleResult {
  txHash: string;
  usdc: number;
}

/**
 * MAINNET settlement — real funds.
 *
 * For each selected non-USDC token, build a Jupiter swap to USDC (settled to the
 * payer), confirm it, then transfer the aggregate USDC to the merchant. Every
 * step is signed by the connected wallet.
 */
export async function settleMainnet(ctx: SettleContext, report: StageReport): Promise<SettleResult> {
  const connection = new Connection(getClusterEndpoint(), "confirmed");
  const owner = ctx.publicKey.toBase58();

  // 1) Swap every non-USDC token to USDC (lands in the payer's USDC account).
  for (const sel of ctx.selections) {
    const token = sel.walletToken.token;
    if (token.mint === MAINNET_USDC.toBase58()) continue;

    report("swapping", `Swapping ${token.symbol} → USDC`);
    const amountBase = Math.floor(sel.amount * 10 ** token.decimals);
    const quote = await fetchJupiterQuote(token.mint, amountBase);
    if (!quote) throw new Error(`No Jupiter route for ${token.symbol}`);

    const res = await fetch("/api/jupiter/swap", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quoteResponse: quote, userPublicKey: owner }),
    });
    const data = (await res.json()) as { swapTransaction?: string; error?: string };
    if (!res.ok || !data.swapTransaction) throw new Error(`Swap build failed for ${token.symbol}`);

    const vtx = VersionedTransaction.deserialize(Buffer.from(data.swapTransaction, "base64"));
    const sig = await ctx.sendTransaction(vtx, connection);
    const bh = await connection.getLatestBlockhash();
    await connection.confirmTransaction({ signature: sig, ...bh }, "confirmed");
  }

  // 2) Transfer the resulting USDC to the merchant.
  report("settling", "Transferring USDC to merchant");
  const usdcBase = Math.round(ctx.outputUsdc * 1e6);
  const payerAta = getAssociatedTokenAddressSync(MAINNET_USDC, ctx.publicKey);
  const merchantAta = getAssociatedTokenAddressSync(MAINNET_USDC, ctx.merchant, true);

  const ix: TransactionInstruction[] = [];
  const merchantInfo = await connection.getAccountInfo(merchantAta);
  if (!merchantInfo) {
    ix.push(createAssociatedTokenAccountInstruction(ctx.publicKey, merchantAta, ctx.merchant, MAINNET_USDC));
  }
  ix.push(createTransferInstruction(payerAta, merchantAta, ctx.publicKey, usdcBase));

  const tx = new Transaction().add(...ix);
  const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
  tx.recentBlockhash = blockhash;
  tx.feePayer = ctx.publicKey;

  const signature = await ctx.sendTransaction(tx, connection);
  await connection.confirmTransaction({ signature, blockhash, lastValidBlockHeight }, "confirmed");

  return { txHash: signature, usdc: ctx.outputUsdc };
}
