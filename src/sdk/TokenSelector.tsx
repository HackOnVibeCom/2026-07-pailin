"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import type { WalletToken } from "./types";
import { TokenIcon } from "@/components/ui/TokenIcon";
import { cn, formatToken, formatUsd } from "@/lib/utils";

interface TokenSelectorProps {
  wallet: WalletToken[];
  /** USD amount allocated per token symbol */
  allocations: Record<string, number>;
  onToggle: (wt: WalletToken) => void;
  onAllocate: (wt: WalletToken, usd: number) => void;
}

export function TokenSelector({ wallet, allocations, onToggle, onAllocate }: TokenSelectorProps) {
  return (
    <div className="space-y-2">
      {wallet.map((wt, i) => {
        const allocated = allocations[wt.token.symbol] ?? 0;
        const selected = allocated > 0;
        const pct = wt.valueUsd > 0 ? Math.min(100, (allocated / wt.valueUsd) * 100) : 0;

        return (
          <motion.div
            key={wt.token.symbol}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className={cn(
              "group relative overflow-hidden rounded-2xl border p-3 transition-all duration-200",
              selected
                ? "border-fuse-400/60 bg-fuse-400/[0.06]"
                : "border-white/8 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]",
            )}
          >
            <div className="flex items-center gap-3">
              <button
                onClick={() => onToggle(wt)}
                className="flex flex-1 items-center gap-3 text-left cursor-pointer"
              >
                <div className="relative">
                  <TokenIcon token={wt.token} size={42} />
                  <span
                    className={cn(
                      "absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-ink-900 transition-all",
                      selected ? "bg-fuse-400 scale-100" : "bg-ink-700 scale-0 group-hover:scale-100",
                    )}
                  >
                    <Check className="h-3 w-3 text-ink-950" strokeWidth={3} />
                  </span>
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white">{wt.token.symbol}</span>
                    <span className="truncate text-xs text-zinc-500">{wt.token.name}</span>
                  </div>
                  <div className="text-xs text-zinc-400">
                    {formatToken(wt.balance)} {wt.token.symbol}
                  </div>
                </div>
              </button>

              <div className="text-right">
                <div className="font-semibold text-white tabular-nums">{formatUsd(wt.valueUsd)}</div>
                {selected ? (
                  <div className="text-xs font-medium text-fuse-400 tabular-nums">
                    using {formatUsd(allocated)}
                  </div>
                ) : (
                  <div className="text-xs text-zinc-500">available</div>
                )}
              </div>
            </div>

            {/* Per-token allocation slider when selected */}
            {selected && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                className="mt-3 overflow-hidden"
              >
                <input
                  type="range"
                  min={0}
                  max={wt.valueUsd}
                  step={Math.max(0.01, wt.valueUsd / 200)}
                  value={allocated}
                  onChange={(e) => onAllocate(wt, Number(e.target.value))}
                  className="fuse-range w-full"
                  style={{ accentColor: wt.token.color }}
                />
                <div className="mt-1 flex justify-between text-[10px] uppercase tracking-wider text-zinc-500">
                  <span>{pct.toFixed(0)}% of holding</span>
                  <span>{formatToken(allocated / wt.priceUsd)} {wt.token.symbol}</span>
                </div>
              </motion.div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
