"use client";

import { TokenIcon } from "@/components/ui/TokenIcon";
import { MOCK_WALLET, TOKENS } from "@/lib/tokens";
import { formatUsd } from "@/lib/utils";

const ROW = [
  ...MOCK_WALLET,
  { token: TOKENS.USDC, balance: 0, priceUsd: 1, valueUsd: 0 },
];

export function Marquee() {
  const items = [...ROW, ...ROW];
  return (
    <div className="relative overflow-hidden border-y border-white/8 bg-white/[0.015] py-4">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink-950 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink-950 to-transparent" />
      <div className="flex w-max animate-marquee items-center gap-8">
        {items.map((wt, i) => (
          <div key={i} className="flex shrink-0 items-center gap-2.5">
            <TokenIcon token={wt.token} size={28} />
            <span className="text-sm font-semibold text-white">{wt.token.symbol}</span>
            <span className="text-sm text-zinc-400 tabular-nums">
              {formatUsd(wt.priceUsd)}
            </span>
            <span className="ml-1 text-zinc-700">→</span>
            <span className="text-sm font-medium text-fuse-400">USDC</span>
          </div>
        ))}
      </div>
    </div>
  );
}
