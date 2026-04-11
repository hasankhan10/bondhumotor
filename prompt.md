You are a senior full-stack developer and UI/UX expert. Build a complete, 
premium, SEO-optimised, frontend-only electric scooter showcase website.

PROJECT: Bondhu Motor and Electric
TYPE: Electric scooter product showcase (NOT eCommerce — no cart/checkout/login)
LOCATION: Jumainaskar Hat, South 24 Parganas, West Bengal, India
WHATSAPP: +91XXXXXXXXXX (replace with real number)

TECH STACK:
- Next.js 14 with App Router
- Tailwind CSS with custom theme tokens
- Framer Motion for animations
- Space Grotesk (headings) + Inter (body) from Google Fonts
- next/image for all images
- JSON-LD structured data for SEO

DESIGN SYSTEM:
- Background: #0A0E1A (primary), #111827 (cards)
- Primary accent: #00B4FF (Electric Blue)
- Secondary accent: #00E676 (Eco Green)
- Text: #FFFFFF (headings), #E0E8FF (body), #8899BB (muted)
- Border: #1E2A45
- Glass cards: backdrop-blur-sm + bg-white/5 + border border-white/10
- Hero text: gradient from #00B4FF to #00E676 using bg-clip-text
- CTAs: bg-[#00E676] text-black font-bold hover:scale-105
- Card hover: shadow-[0_0_30px_rgba(0,180,255,0.15)] translate-y-[-4px]
- All transitions: duration-300 ease-in-out

PAGES TO BUILD:
1. Homepage (/) — Hero + brand strip + featured 6 products + Why Choose Us + Testimonials + WhatsApp CTA + FAQ
2. Products (/products) — Full grid with brand/price filter (JS frontend only)
3. Product Detail (/products/[slug]) — Image gallery + specs table + EMI calc + WhatsApp CTA
4. About (/about) — Story + why electric + brands + map
5. Contact (/contact) — WhatsApp + address + hours + map
6. 404 page

PRODUCT DATA (store in data/products.ts):
Include these 8 products with full specs:
1. Ola S1 Pro — ₹1,47,499 — 195km range — 120kmph
2. Ola S1 Air — ₹1,04,999 — 151km range — 90kmph
3. Ather 450X — ₹1,49,000 — 150km range — 90kmph
4. Ather 450S — ₹1,29,000 — 115km range — 90kmph
5. TVS iQube ST — ₹1,38,993 — 123km range — 82kmph
6. Bajaj Chetak Premium — ₹1,35,000 — 126km range — 73kmph
7. Hero Vida V1 Pro — ₹1,45,900 — 165km range — 80kmph
8. Greaves Ampere Magnus Pro — ₹74,999 — 121km range — 55kmph

SEO REQUIREMENTS (MANDATORY):
- Unique title + meta description per page with local keywords
- JSON-LD LocalBusiness schema on layout.tsx
- JSON-LD Product schema on every product page
- Open Graph + Twitter Card tags everywhere
- Semantic HTML h1→h2→h3 hierarchy
- All images: descriptive alt text with brand + model + South 24 Parganas
- robots.txt + sitemap.xml
- Canonical URLs on all pages

Homepage title: "Bondhu Motor and Electric | Electric Scooter Showroom – Jumainaskar Hat, South 24 Parganas"
Homepage description: "Buy top electric scooters at Bondhu Motor and Electric, Jumainaskar Hat, South 24 Parganas. Authorised dealer for Ola, Ather, TVS iQube, Bajaj Chetak & more. Best price, EMI available, test ride free."

Target keywords: electric scooter South 24 Parganas, electric scooty Jumainaskar Hat, EV showroom near Baruipur, Ola Electric dealer South 24 Parganas, Ather scooter showroom, buy electric scooter West Bengal, electric vehicle subsidy West Bengal 2026

JSON-LD LocalBusiness schema:
{
  "@context": "https://schema.org",
  "@type": "AutoDealer",
  "name": "Bondhu Motor and Electric",
  "url": "https://www.bondhumotorelectric.com",
  "telephone": "+91XXXXXXXXXX",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Jumainaskar Hat",
    "addressLocality": "South 24 Parganas",
    "addressRegion": "West Bengal",
    "addressCountry": "IN"
  },
  "openingHours": "Mo-Sa 09:00-19:00"
}

WHATSAPP INTEGRATION:
- Floating WhatsApp button bottom-right on ALL pages — pulsing green glow animation
- Default message: "Hello! I visited Bondhu Motor website and am interested in electric scooters."
- Per-product button pre-fills: "Hi, I am interested in [Brand] [Model]. Please share price and availability at Bondhu Motor, Jumainaskar Hat."
- Contact page: large standalone WhatsApp CTA button
- Use wa.me links — no API needed

COMPONENTS TO BUILD:
- Navbar: logo + nav links + mobile hamburger menu with smooth open/close
- Footer: address, WhatsApp number, links, copyright 2026 Bondhu Motor and Electric
- ProductCard: image + brand badge + name + price + 2 key specs + View Details + WhatsApp icon
- WhatsAppFloatButton: fixed position, pulsing CSS animation, pre-filled message
- SpecsTable: two-column dark styled table with all technical specs
- EMICalculator: pure JS — user enters down payment → shows approx monthly EMI for 12/24/36 months (no backend, simple formula)
- BrandLogos: horizontal auto-scroll strip — Ola, Ather, TVS, Bajaj, Hero Vida, Ampere
- TestimonialCard: customer name + area (South 24 Parganas village) + star rating + review
- FAQAccordion: smooth animated open/close for 6 questions about EV charging, range, subsidy, EMI

HOMEPAGE SECTIONS (in order):
1. Hero — full viewport, animated scooter visual, headline with gradient text, 2 CTAs
2. Brand strip — horizontal scroll of brand logos
3. Featured Products — 6 product cards in responsive grid
4. Why Choose Us — 6 feature tiles: Authorised Dealer, EMI Available, Free Test Ride, After-Sales Support, Best Price Guarantee, Subsidy Assistance
5. Testimonials — 3 customer review cards
6. WhatsApp CTA banner — full width dark section with large green WhatsApp button
7. FAQ — accordion with 6 questions

ANIMATIONS (Framer Motion):
- Hero section: fade-in + slide-up on page load
- Product cards: stagger fade-in as they enter viewport
- Page transitions: smooth fade between routes
- WhatsApp button: continuous pulse glow

FILE STRUCTURE:
/app/layout.tsx — root layout with SEO metadata + WhatsApp float button
/app/page.tsx — homepage
/app/products/page.tsx — products listing
/app/products/[slug]/page.tsx — product detail
/app/about/page.tsx
/app/contact/page.tsx
/app/not-found.tsx
/components/Navbar.tsx
/components/Footer.tsx
/components/ProductCard.tsx
/components/WhatsAppButton.tsx
/components/SpecsTable.tsx
/components/EMICalculator.tsx
/components/FAQAccordion.tsx
/components/TestimonialCard.tsx
/data/products.ts — all product data hardcoded here
/public/images/products/ — placeholder image slots
/public/robots.txt
/public/sitemap.xml

OUTPUT: Complete production-ready code for every file. Fully deployable on Vercel with zero backend.