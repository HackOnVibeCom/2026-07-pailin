"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { Wallet, Coins, ShieldCheck, BadgeDollarSign } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

const STEPS = [
  {
    icon: Wallet,
    n: "01",
    title: "Connect wallet",
    body: "FUSE scans the customer's wallet and surfaces every token and balance instantly via Helius.",
  },
  {
    icon: Coins,
    n: "02",
    title: "Choose assets",
    body: "Pick any token — or several. FUSE shows live USD value and exactly how much is still needed.",
  },
  {
    icon: ShieldCheck,
    n: "03",
    title: "Confirm payment",
    body: "One signature. FUSE routes the optimal swaps through Jupiter with the best on-chain price.",
  },
  {
    icon: BadgeDollarSign,
    n: "04",
    title: "Merchant receives USDC",
    body: "Settlement lands as clean USDC — no dust, no bridges, no manual swaps. Done in seconds.",
  },
];

function TiltCard({ step, index }: { step: (typeof STEPS)[number]; index: number }) {
  const rx = useSpring(useMotionValue(0), { stiffness: 200, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 200, damping: 18 });
  const transform = useMotionTemplate`perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 12);
    rx.set(-py * 12);
  }
  function reset() {
    rx.set(0);
    ry.set(0);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ transform }}
      className="group relative rounded-3xl border border-white/8 bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-6 will-change-transform"
    >
      <div className="absolute right-5 top-5 font-display text-4xl font-bold text-white/5 transition-colors group-hover:text-fuse-400/20">
        {step.n}
      </div>
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-fuse-400/20 bg-fuse-400/10 text-fuse-400 shadow-[0_8px_24px_-10px_rgba(35,226,126,0.6)]">
        <step.icon className="h-6 w-6" />
      </div>
      <h3 className="text-lg font-semibold text-white">{step.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-zinc-400">{step.body}</p>
    </motion.div>
  );
}

export function HowItWorks() {
  return (
    <section id="how" className="relative mx-auto max-w-6xl px-5 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <Badge className="mb-5">How it works</Badge>
        <h2 className="font-display text-4xl font-bold tracking-tight text-gradient md:text-5xl">
          Four steps. One tap.
        </h2>
        <p className="mt-4 text-lg text-zinc-400">
          The entire flow feels as simple as Stripe Checkout — because that&apos;s the bar.
        </p>
      </div>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((s, i) => (
          <TiltCard key={s.n} step={s} index={i} />
        ))}
      </div>
    </section>
  );
}
