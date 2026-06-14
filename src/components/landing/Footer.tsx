"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";

export function Footer({ onLaunch }: { onLaunch: () => void }) {
  return (
    <footer className="relative mx-auto max-w-6xl px-5 pb-12">
      {/* Final CTA band */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-[2rem] border border-fuse-400/25 bg-gradient-to-br from-fuse-500/15 via-ink-900 to-ink-900 p-10 text-center md:p-16"
      >
        <div className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-fuse-400/20 blur-3xl" />
        <div className="absolute -bottom-24 -right-10 h-60 w-60 rounded-full bg-violet-500/20 blur-3xl" />
        <div className="relative">
          <h2 className="mx-auto max-w-2xl font-display text-4xl font-bold tracking-tight md:text-5xl">
            <span className="text-gradient">Accept any token.</span>{" "}
            <span className="text-neon">Settle in USDC.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-zinc-400">
            One integration. Every asset your customers already hold.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button size="lg" onClick={onLaunch} className="group">
              Launch live checkout
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Footer bar */}
      <div className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-white/8 pt-8 md:flex-row">
        <div className="flex flex-col items-center gap-3 md:flex-row md:gap-6">
          <Logo />
          <span className="text-sm text-zinc-500">Pay with any token. Settle in stablecoins.</span>
        </div>
      </div>
    </footer>
  );
}
