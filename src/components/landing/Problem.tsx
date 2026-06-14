"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check, Clock, X } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

const CURRENT = ["Wallet", "Swap", "Approve", "Bridge", "Transfer", "Checkout"];
const FUSE = ["Wallet", "Pay"];

function Flow({
  steps,
  tone,
}: {
  steps: string[];
  tone: "bad" | "good";
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {steps.map((s, i) => (
        <div key={s} className="flex items-center gap-2">
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className={cn(
              "rounded-xl border px-3 py-2 text-sm font-medium",
              tone === "bad"
                ? "border-white/8 bg-white/[0.03] text-zinc-300"
                : "border-fuse-400/40 bg-fuse-400/10 text-white",
            )}
          >
            {s}
          </motion.span>
          {i < steps.length - 1 && (
            <ArrowRight
              className={cn("h-4 w-4", tone === "bad" ? "text-zinc-600" : "text-fuse-400")}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export function Problem() {
  return (
    <section id="problem" className="relative mx-auto max-w-6xl px-5 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <Badge className="mb-5">The problem</Badge>
        <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
          <span className="text-gradient">Crypto checkout is</span>{" "}
          <span className="text-zinc-500 line-through decoration-red-500/50">broken</span>
        </h2>
        <p className="mt-4 text-lg text-zinc-400">
          Users hold dozens of assets. Merchants want stablecoins. Today, bridging that gap means
          swaps, approvals, bridges and lost dust. FUSE collapses it to a single tap.
        </p>
      </div>

      <div className="mt-14 grid gap-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl border border-white/8 bg-white/[0.02] p-7"
        >
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-medium text-zinc-400">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-500/10 text-red-400">
                <X className="h-4 w-4" />
              </span>
              The old way
            </div>
            <span className="flex items-center gap-1.5 rounded-full bg-red-500/10 px-2.5 py-1 text-xs font-medium text-red-400">
              <Clock className="h-3.5 w-3.5" /> ~6 steps · minutes
            </span>
          </div>
          <Flow steps={CURRENT} tone="bad" />
          <ul className="mt-6 space-y-2 text-sm text-zinc-500">
            <li className="flex gap-2"><X className="mt-0.5 h-4 w-4 shrink-0 text-red-400/70" /> Multiple wallet approvals and signatures</li>
            <li className="flex gap-2"><X className="mt-0.5 h-4 w-4 shrink-0 text-red-400/70" /> Slippage, dust, and failed bridges</li>
            <li className="flex gap-2"><X className="mt-0.5 h-4 w-4 shrink-0 text-red-400/70" /> Users abandon at checkout</li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative overflow-hidden rounded-3xl border border-fuse-400/30 bg-fuse-400/[0.04] p-7 shadow-[0_0_60px_-20px_rgba(35,226,126,0.5)]"
        >
          <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-fuse-400/20 blur-3xl" />
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-medium text-white">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-fuse-400/15 text-fuse-400">
                <Check className="h-4 w-4" />
              </span>
              The FUSE way
            </div>
            <span className="flex items-center gap-1.5 rounded-full bg-fuse-400/15 px-2.5 py-1 text-xs font-medium text-fuse-300">
              <Clock className="h-3.5 w-3.5" /> 1 tap · seconds
            </span>
          </div>
          <Flow steps={FUSE} tone="good" />
          <ul className="mt-6 space-y-2 text-sm text-zinc-300">
            <li className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-fuse-400" /> Pay with any combination of tokens</li>
            <li className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-fuse-400" /> FUSE routes the swaps under the hood</li>
            <li className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-fuse-400" /> Merchant always receives clean USDC</li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
