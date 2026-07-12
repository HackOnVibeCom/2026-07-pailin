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

---

## 🏆 Business Success track

**Track goals:** real problem · clear users · working demo · meaningful AI · pricing & path to first revenue  
**Live demo:** [fuse-sage.vercel.app](https://fuse-sage.vercel.app)

### The problem (recurring, high friction)

Solana users hold **dozens of tokens**. Merchants want **USDC** (or one stable asset) for books, payroll, and suppliers.

Today that gap forces a painful loop:

1. Customer must swap elsewhere (DEX UI, bridge, CEX)
2. Hope they pick a good route and don’t overpay on impact
3. Come back and pay the merchant
4. Merchant still risks receiving the wrong asset or dusty SPL tokens

That is a **recurring** problem on every checkout — not a one-off setup issue. It kills conversion for any merchant selling to crypto-native buyers.

### Who pays (clear users)

| Segment | Who they are | Why they need FUSE |
|--------|----------------|--------------------|
| **Primary customer** | Solana merchants & dApps (stores, NFT checkouts, SaaS, creators, in-game shops) | Want USDC in, not a bag of random tokens |
| **End user (payer)** | Wallet holders (Phantom / Solflare / Backpack) with mixed SOL + SPL balances | Pay with what they already hold — no leave-and-swap detour |
| **Secondary** | Agencies / no-code builders shipping Solana storefronts | Drop-in SDK, one integration |

**ICP (first revenue):** indie Solana storefronts and dApp checkouts doing **$1k–$50k/mo** volume who already accept crypto but lose sales when buyers “don’t have USDC.”

### Product flow (demo path for judges)

1. Open **[live demo](https://fuse-sage.vercel.app)** → landing explains problem → **Pay with FUSE**
2. **Connect wallet** (Phantom / Solflare / Backpack)
3. **Pick any mix of tokens** from real on-chain balances; set allocation
4. See a **live USDC quote** (Jupiter route, impact, path)
5. Enter **merchant recipient** (Solana address) → one-tap pay → wallet signs
6. **On-chain settlement:** non-USDC → swap via Jupiter → USDC lands in merchant wallet; Solscan link on success
7. Open **[/dashboard](https://fuse-sage.vercel.app/dashboard)** → conversion funnel + live events (`Checkout Opened` → `Payment Completed`)

**Merchant integration (3 lines):**

```tsx
<FuseCheckout amount={49.99} currency="USDC" recipient="merchant_wallet" />
```

### Meaningful AI in the product / workflow

FUSE is not “chat for chat’s sake.” AI / intelligence sits **inside the money path**:

| Layer | What it does | Why it matters |
|-------|----------------|----------------|
| **Smart routing** | Jupiter’s multi-hop / multi-AMM pathfinding picks routes under live liquidity | Buyer pays more of their tokens as **usable USDC**, less as slippage waste |
| **Basket quoting** | Live multi-token basket → single USDC outcome with impact awareness | Turns a messy wallet into one clear “you can pay this invoice” decision |
| **Conversion intelligence** | Novus-compatible event stream + merchant dashboard funnel | Merchants see **where checkout dies** (wallet, token pick, quote, pay) and fix the product, not guess |
| **Roadmap AI** | Suggested token split to hit invoice amount; anomaly / failed-pay recovery tips; auto USDC amount from cart | Keeps the “AI inside the workflow” loop after hackathon |

Judges can see routing + quotes on every real checkout, and the **AI-assisted ops loop** on `/dashboard`.

### Business model

#### How we make money

| Stream | Model | Notes |
|--------|--------|--------|
| **Take rate (core)** | **0.5%** of successfully settled USDC volume (merchant-paid, like Stripe) | Transparent line item at checkout (“Network + FUSE fee”) |
| **Pro SaaS** | **$49 / merchant / month** | Dashboard, webhooks, team seats, branded checkout, higher rate limits |
| **Scale** | **$199 / month** or custom | Multi-store, SLA, dedicated RPC, invoice API, white-label |
| **Later** | Fiat on/off-ramp partner rev-share; enterprise treasury tools | After PMF on pure crypto settlement |

**Unit sketch (volume take rate):**  
$100k monthly GMV through FUSE → ~**$500** platform revenue at 0.5% before SaaS.  
10 Pro merchants → **+$490 MRR** on software alone.

#### Pricing the buyer sees

- Payer: **no FUSE subscription** — they only sign the wallet tx  
- Merchant: **free to integrate** → pay on **successful settlement** + optional Pro for analytics/ops  
- Transparent fee at quote time so conversion is not a surprise

#### Path to first revenue (30–60 days)

| Week | Action | Success metric |
|------|--------|----------------|
| **1–2** | Ship SDK + demo; list 20 Solana merch / dApp founders (Discord, Twitter, Superteam) | 5 design-partner calls booked |
| **2–3** | **3 design partners** integrate `<FuseCheckout />` on a real product page (even a tip jar / digital good) | First **mainnet** settlements > $0 |
| **3–4** | Turn on **0.5% take rate** on partner volume; offer **Pro free for 30 days** then $49 | First **fee revenue** + 1 paid Pro conversion |
| **5–8** | Case study (“conversion +X% when any-token pay”) + content; open self-serve waitlist | $500–2k GMV/week or 3 paid merchants |

**First dollar definition:** either (a) take rate on a live partner checkout, or (b) first $49 Pro seat — whichever hits first. Both are instrumented via the same payment + dashboard events.

#### Why this can win the track

| Criterion | How FUSE answers |
|-----------|------------------|
| Real recurring problem | Every checkout where the buyer’s wallet ≠ merchant’s preferred asset |
| Clear users | Solana merchants (buyer of FUSE) + wallet holders (users of checkout) |
| Working demo + clear flow | Live on Vercel: connect → multi-token → quote → settle → dashboard |
| Meaningful AI | Route intelligence + basket quote + conversion analytics in the payment workflow |
| Pricing & first revenue | 0.5% take rate + $49 Pro; design partners → first mainnet fees in weeks |

---

## 🛠️ Stack

Next.js 15 · TypeScript · Tailwind CSS v4 · framer-motion ·
@react-three/fiber + drei · lucide-react · (Solana Wallet Adapter / Helius /
Jupiter / Pyth / Novus integration points wired for live keys) · Vercel-ready.

---

<div align="center">
<sub>Demo uses simulated on-chain data. Prioritizes product polish over protocol complexity — working demo &gt; technical perfection.</sub>
</div>
