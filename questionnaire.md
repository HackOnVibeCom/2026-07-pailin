# HackOnVibe — Project Questionnaire

**1. What does your application/service do?**

FUSE is "Stripe for Web3 on Solana." Customers pay with any tokens they already hold (SOL, BONK, JUP, USDC, mixed baskets) and merchants receive USDC automatically after smart routing and on-chain settlement — one checkout, one payment flow. Under the hood it provides real wallet connect (Phantom / Solflare / Backpack), live multi-token balances and Jupiter quotes/swaps, swap → USDC → transfer to the merchant wallet (mainnet-capable), a drop-in SDK (`<FuseCheckout amount={…} currency="USDC" recipient="…" />`), and a merchant analytics dashboard with a conversion funnel and live events.

**2. Who is the target audience?**

Buyers of the service are Solana merchants, dApps, NFT/store checkouts, creators, in-game shops, and crypto SaaS that want USDC in without managing token chaos. End users of the checkout are wallet holders with mixed SOL + SPL balances who abandon carts when they "don't have the right token." Integrators are indie builders and agencies shipping Solana storefronts who want a 3-line checkout embed. Ideal first customer: an indie Solana storefront / dApp doing roughly $1k–$50k/mo volume, already crypto-native.

**3. Which countries are the expected buyers of this service?**

FUSE is borderless by design, but early commercial buyers concentrate where Solana commerce is densest. Core markets: United States and Canada; Western Europe (UK, Germany, France, Netherlands, Nordics, Portugal); and Singapore, UAE, South Korea, Japan. Growth markets: Nigeria, Kenya, South Africa, Ghana (and broader English-speaking Africa); plus India, Vietnam, Indonesia, Philippines, Brazil, Argentina, and Mexico. GTM and first revenue focus on English-first, high-activity Solana hubs, then expand with local partners.

**4. Who are your competitors?**

Helio / Sphere / Candypay-style Solana pay links (often expect a specific asset or simpler single-token flow); Crossmint / MoonPay / fiat on-ramps (solve fiat entry, not paying an invoice from an existing SPL token mix); DIY Jupiter + wallet adapter (weeks of engineering, no productized checkout, weak analytics); Stripe / PayPal (best-in-class card checkout but no native "pay with a BONK + SOL basket, settle USDC"); and CEX withdraw + pay (leaves the merchant site and kills conversion). FUSE competes on merchant conversion at crypto checkout, not on being a CEX or card processor.

**5. What is your advantage?**

(1) Any-token basket → merchant USDC in one flow (not "go swap, then come back"); (2) real rails — Jupiter quote/swap + on-chain settlement + wallet-standard connect, not a mock-only pitch; (3) productized UX + SDK — landing, modal/embedded checkout, success + Solscan, 3-line merchant embed; (4) a merchant ops loop with event tracking and a `/dashboard` funnel so sellers see where checkout drops; and (5) a clear commercial model — 0.5% take rate plus Pro SaaS with a path to first revenue via design partners.
