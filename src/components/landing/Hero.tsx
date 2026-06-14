"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Zap, Layers, Code2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FuseMark } from "@/components/ui/Logo";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
  loading: () => <HeroSceneFallback />,
});

function HeroSceneFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="relative">
        <div className="h-40 w-40 animate-spin-slow rounded-full border-2 border-dashed border-fuse-400/30" />
        <FuseMark size={64} className="absolute inset-0 m-auto animate-pulse" />
      </div>
    </div>
  );
}

const TRUST = [
  { icon: ShieldCheck, label: "Non-custodial" },
  { icon: Zap, label: "Instant settlement" },
  { icon: Layers, label: "Any token in" },
  { icon: Code2, label: "3-line integration" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

export function Hero({ onLaunch }: { onLaunch: () => void }) {
  return (
    <section className="relative overflow-hidden pt-32 pb-12 md:pt-40">
      {/* 3D scene lives in the right half only, with its left edge faded out so
          it never sits over the headline. Hidden on small screens where the
          text needs the full width. */}
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-0 hidden w-1/2 md:block"
        style={{
          maskImage: "linear-gradient(to right, transparent 0%, black 28%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 28%)",
        }}
      >
        <div className="absolute right-[-6%] top-[-4%] h-[720px] w-[120%]">
          <HeroScene />
        </div>
      </div>

      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-8 px-5 lg:grid-cols-12">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="lg:col-span-7"
        >
          <motion.h1
            variants={item}
            className="font-display text-[clamp(2.6rem,7vw,5.2rem)] font-bold leading-[0.98] tracking-tight"
          >
            <span className="text-gradient">Pay with</span>{" "}
            <span className="italic font-medium text-zinc-300">any</span>{" "}
            <span className="text-neon">token.</span>
            <br />
            <span className="text-gradient">Settle in</span>{" "}
            <span className="italic font-medium text-zinc-300">stable</span>
            <span className="text-gradient">coins.</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-400"
          >
            FUSE lets customers pay with assets they already own — SOL, BONK, JUP, anything —
            while merchants receive <span className="font-medium text-white">USDC</span> automatically.
            One checkout. One payment flow.
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-3">
            <Button size="lg" onClick={onLaunch} className="group">
              Try live checkout
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => scrollTo("how")}>
              See how it works
            </Button>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-10 grid max-w-lg grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-4"
          >
            {TRUST.map((t) => (
              <div key={t.label} className="flex items-center gap-2 text-sm text-zinc-400">
                <t.icon className="h-4 w-4 text-fuse-400" />
                {t.label}
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* spacer column keeps text clear of the densest part of the 3D scene on lg */}
        <div className="hidden lg:col-span-5 lg:block" />
      </div>
    </section>
  );
}

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}
