"use client";

import { useState } from "react";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Marquee } from "@/components/landing/Marquee";
import { Problem } from "@/components/landing/Problem";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { DemoSection } from "@/components/landing/DemoSection";
import { Developer } from "@/components/landing/Developer";
import { Footer } from "@/components/landing/Footer";
import { FuseCheckout } from "@/sdk/FuseCheckout";
import { MERCHANT_ADDRESS } from "@/lib/tokens";

export default function Home() {
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const launch = () => setCheckoutOpen(true);

  return (
    <main className="relative">
      <Navbar onLaunch={launch} />
      <Hero onLaunch={launch} />
      <Marquee />
      <Problem />
      <HowItWorks />
      <DemoSection />
      <Developer />
      <Footer onLaunch={launch} />

      {checkoutOpen && (
        <FuseCheckout
          open={checkoutOpen}
          onClose={() => setCheckoutOpen(false)}
          amount={49.99}
          currency="USDC"
          recipient={MERCHANT_ADDRESS}
          merchantName="Nebula Store"
          productName="Pro Plan — Annual"
        />
      )}
    </main>
  );
}
