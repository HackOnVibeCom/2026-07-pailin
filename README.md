<div align="center">

# ⚡ FUSE

### Pay with any token. Settle in stablecoins.

**Stripe for Web3** — customers pay with assets they already own (SOL, BONK, JUP…),
merchants receive USDC automatically. One checkout. One payment flow.

**HackOnVibe 2026** · team **pailin**

### 🌐 Live demo

**[https://fuse-sage.vercel.app](https://fuse-sage.vercel.app)**

> Deployed on **Vercel** (Next.js SSR + API routes). Use this URL for judging and demos.

| | |
|---|---|
| Landing + checkout | [fuse-sage.vercel.app](https://fuse-sage.vercel.app) |
| Merchant dashboard | [fuse-sage.vercel.app/dashboard](https://fuse-sage.vercel.app/dashboard) |
| Source | [HackOnVibeCom/2026-07-pailin](https://github.com/HackOnVibeCom/2026-07-pailin) |

</div>

---

## ✨ What's inside

| | |
|---|---|
| 🎬 **3D animated landing** | react-three-fiber hero (orbiting token coins + a pulsing fusion core), parallax to the pointer, framer-motion throughout, CSS-3D tilt cards |
| 💳 **Live interactive checkout** | Connect → pick any mix of tokens → live USDC quote → settlement → success screen. Embedded right on the page **and** as a modal |
| 📊 **Analytics dashboard** | Real-time conversion funnel + live event feed at `/dashboard`, powered by the exact Novus event set |
| 🧩 **Drop-in SDK** | `<FuseCheckout amount={49.99} currency="USDC" recipient="merchant" />` — 3-line integration |

## 🚀 Run it

```bash
npm install
npm run dev        # http://localhost:3000
```

```bash
npm run build && npm run start   # production
```

### What's real

| | |
|---|---|
| **Solana Wallet Adapter** | Connect Phantom / Solflare / Backpack via Wallet Standard |
| **On-chain balances** | Real SOL + SPL token balances via RPC |
| **Jupiter quotes** | Real `swap/v1/quote` routes, price impact & AMM labels |
| **Jupiter prices** | Real `price/v3` USD prices |
| **Jupiter swap** | Real `swap/v1/swap` — builds signable transactions |
| **On-chain settlement** | Real signed + confirmed transactions (devnet/mainnet) |

### ⚠️ Settlement: Solana mainnet, real funds

FUSE settles **for real on Solana mainnet**. When a payment completes:

1. Each selected non-USDC token is swapped to USDC via Jupiter (`swap/v1/swap`),
   signed by the connected wallet and confirmed on-chain.
2. The resulting USDC is transferred to the merchant's wallet (creating the
   merchant's USDC token account if needed).

The success screen links to the **real Solscan transaction**.

- **This moves real money.** Connecting a wallet and completing checkout — on the
  landing page demo *or* the modal — sends real USDC. There is no simulation mode.
- **The payer enters the recipient address** at checkout (the "Send USDC to" field).
  Whatever valid Solana address they type receives the settled USDC. Nothing to
  configure server-side.
- Payment is **one tap** → straight to the wallet's own signature prompt (the
  wallet is the confirmation surface).

> **Tip:** the public RPC rate-limits hard. Set `NEXT_PUBLIC_SOLANA_RPC` to a
> Helius/QuickNode URL in `.env` for reliable balances and settlement.

## 🗺️ Routes

- `/` — landing page + launchable checkout modal
- `/dashboard` — merchant analytics (hit **Simulate payment** to watch the funnel move live)

## 🧱 Architecture

```
src/
├─ app/
│  ├─ page.tsx            # landing (hero, problem, how-it-works, demo, dev, footer)
│  ├─ dashboard/page.tsx  # Novus-style analytics funnel + live event feed
│  └─ globals.css         # design tokens (dark + neon-green from the logo)
├─ sdk/                   # @fuse/sdk — the drop-in checkout
│  ├─ FuseCheckout.tsx    # the checkout component (modal + embedded)
│  ├─ TokenSelector.tsx   # multi-token selection w/ per-token allocation
│  ├─ useFuseQuote.ts     # live USDC quote for the selected basket
│  ├─ useFuseExecute.ts   # quote → swap → settle → success lifecycle
│  ├─ settlement.ts       # mainnet config: merchant pubkey, RPC, explorer helpers
│  ├─ settle.ts           # real on-chain settle: Jupiter swap → USDC transfer to merchant
│  ├─ quote.ts            # Jupiter routing (real, w/ synthetic fallback)
│  └─ types.ts
├─ components/
│  ├─ three/HeroScene.tsx # the 3D scene
│  ├─ landing/*           # page sections
│  └─ ui/*                # Button, Badge, Logo, TokenIcon, AnimatedNumber
└─ lib/
   ├─ tokens.ts           # token registry + Sarah's mock wallet
   ├─ jupiter.ts          # client → Jupiter proxy (quote / price / swap)
   ├─ wallet-balances.ts  # real on-chain balance reader (SOL + SPL)
   ├─ analytics.ts        # Novus-compatible event layer
   └─ utils.ts
```

## 📈 Tracked events (Novus)

`Checkout Opened` · `Wallet Connected` · `Token Selected` · `Quote Generated` ·
`Payment Started` · `Payment Completed` · `Payment Failed`

The dashboard derives **checkout opens, conversion rate, successful payments and
completion rate** from these — visible live during the demo.

## 🛠️ Stack

Next.js 15 · TypeScript · Tailwind CSS v4 · framer-motion ·
@react-three/fiber + drei · lucide-react · (Solana Wallet Adapter / Helius /
Jupiter / Pyth / Novus integration points wired for live keys) · Vercel-ready.

---

<div align="center">
<sub>Demo uses simulated on-chain data. Prioritizes product polish over protocol complexity — working demo &gt; technical perfection.</sub>
</div>
