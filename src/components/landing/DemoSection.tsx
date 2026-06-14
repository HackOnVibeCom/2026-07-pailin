"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { FuseCheckout } from "@/sdk/FuseCheckout";
import { MERCHANT_ADDRESS } from "@/lib/tokens";

const STORY = [
  { label: "Sarah wants", value: "a $50 product" },
  { label: "Her wallet holds", value: "SOL · BONK · JUP" },
  { label: "Merchant accepts", value: "USDC only" },
];

export function DemoSection() {
  return (
    <section id="demo" className="relative overflow-hidden py-24">
      <div className="absolute left-1/2 top-1/3 -z-10 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-fuse-500/10 blur-[120px]" />

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-2">
        <div>
          <Badge dot className="mb-5">
            Live, interactive demo
          </Badge>
          <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
            <span className="text-gradient">Meet Sarah&apos;s</span>{" "}
            <span className="text-neon">checkout.</span>
          </h2>
          <p className="mt-4 max-w-md text-lg text-zinc-400">
            This isn&apos;t a screenshot. Connect the demo wallet, pick your tokens, and watch FUSE
            settle real USDC to the merchant — right here on the page.
          </p>

          <div className="mt-8 space-y-3">
            {STORY.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/[0.02] px-4 py-3"
              >
                <span className="text-sm text-zinc-500">{s.label}</span>
                <span className="ml-auto text-sm font-semibold text-white">{s.value}</span>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-2 text-sm text-fuse-400">
            <Sparkles className="h-4 w-4" />
            Tip: hit <span className="font-semibold">Auto-fill</span> to cover the total instantly.
          </div>
        </div>

        {/* 3D-tilted checkout */}
        <div className="perspective-card flex justify-center lg:justify-end">
          <motion.div
            initial={{ opacity: 0, rotateY: -18, y: 30 }}
            whileInView={{ opacity: 1, rotateY: -8, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
            whileHover={{ rotateY: 0, rotateX: 0, scale: 1.01 }}
            className="preserve-3d animate-float"
          >
            <FuseCheckout
              embedded
              amount={49.99}
              currency="USDC"
              recipient={MERCHANT_ADDRESS}
              merchantName="Nebula Store"
              productName="Pro Plan — Annual"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
