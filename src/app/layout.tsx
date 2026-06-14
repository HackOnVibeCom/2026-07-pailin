import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers/Providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "FUSE — Pay with any token. Settle in stablecoins.",
  description:
    "FUSE lets customers pay with assets they already own; merchants receive USDC automatically. One checkout. One payment flow.",
  keywords: ["crypto payments", "USDC", "Solana", "stablecoin checkout", "Web3 payments", "Jupiter"],
  openGraph: {
    title: "FUSE — Pay with any token. Settle in stablecoins.",
    description: "Any token in, USDC out — in one tap.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${display.variable}`}>
      <body className="antialiased">
        <div className="bg-field" />
        <div className="bg-grid" />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
