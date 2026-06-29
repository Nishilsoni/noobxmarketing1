# NoobxMarketing 🚀

> Launch Your Brand Into The Digital Universe.

A premium, space-themed marketing website for **NoobxMarketing**, built to feel like a
high-end SaaS product (Stripe / Linear / Vercel / Framer aesthetic) while being
enterprise-grade on SEO, performance and accessibility.

## ✨ Tech Stack

| Area        | Choice |
|-------------|--------|
| Framework   | **Next.js 16** (App Router) · React 19 · TypeScript |
| Styling     | **Tailwind CSS v4** (CSS-first theme) · CVA · clsx · tailwind-merge |
| UI          | Radix UI primitives (Dialog, Accordion, Slot) · custom design system |
| Animation   | **Framer Motion** · **Lenis** smooth scroll · canvas starfield |
| Icons       | Lucide React (+ inline brand SVGs) |
| Forms       | React Hook Form · **Zod** validation (client + server) |
| SEO         | Metadata API · JSON-LD · dynamic OG images · sitemap · robots · manifest |
| Analytics   | GA4 · Microsoft Clarity · Meta Pixel (all env-gated, opt-in) |

## 🗂️ Architecture

```
app/                    # Routes, layout, metadata, SEO files, API
  ├─ layout.tsx         # Fonts, metadata, providers, site-wide JSON-LD
  ├─ page.tsx           # Home (all sections composed)
  ├─ blog/              # Blog index + dynamic [slug] articles (SSG)
  ├─ privacy/ terms/    # Legal pages
  ├─ api/lead/          # Contact + newsletter submission endpoint
  ├─ opengraph-image.tsx# Dynamic OG image (next/og)
  ├─ sitemap.ts robots.ts manifest.ts
components/
  ├─ ui/                # Button, Card, Badge, Container, Logo, icons…
  ├─ layout/            # Header (glass nav), Footer, Newsletter
  ├─ sections/          # Hero, Trust, About, Services, WhyUs, Process,
  │                     #   CaseStudies, Testimonials, Blog, FAQ, Contact
  ├─ effects/           # CosmicBackground, Starfield, Astronaut, Planet
  ├─ motion/            # Reveal, Stagger, Magnetic, Counter
  ├─ providers/         # Lenis smooth-scroll provider
  ├─ analytics/  seo/   # Analytics scripts · JSON-LD renderer
data/                   # CMS-ready content (services, FAQ, blog, …)
lib/                    # site config, utils, SEO schemas, validations
types/                  # Shared content types
```

Every section is modular and reusable. Server Components are used by default;
Client Components only where interactivity (motion, forms, carousels) requires it.

## 🚀 Getting Started

```bash
npm install
cp .env.example .env.local   # fill in optional keys
npm run dev                  # http://localhost:3000
```

Scripts: `dev` · `build` · `start` · `lint` · `typecheck`.

## 🔧 Configuration

All brand, contact and navigation data lives in [`lib/site.ts`](lib/site.ts).
Environment variables are documented in [`.env.example`](.env.example):

- `NEXT_PUBLIC_SITE_URL` — canonical URL (drives metadata, sitemap, JSON-LD).
- `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_CLARITY_ID`, `NEXT_PUBLIC_META_PIXEL_ID` —
  analytics auto-disable when blank, so dev stays clean and private.
- `CONTACT_FORM_ENDPOINT` — where leads are forwarded (Resend, Formspree, etc.).
  Without it, submissions are validated and logged so the demo works instantly.
- `NEXT_PUBLIC_CALENDLY_URL` — scheduling link used by the contact CTA.

## 🧩 Content & CMS

Content is sourced from typed files in [`data/`](data/), whose shapes mirror a
Sanity dataset (see [`types/`](types/)). Swapping in Sanity is a drop-in change:
point the section components at your GROQ queries instead of the local arrays —
no UI changes required.

## 🔍 SEO

- Semantic HTML5, single `<h1>` per page, correct heading hierarchy.
- Per-page dynamic metadata, canonical URLs, Open Graph + Twitter cards.
- JSON-LD: Organization, ProfessionalService (LocalBusiness), WebSite,
  Service catalog, FAQPage, BreadcrumbList, BlogPosting.
- Dynamic OG image, `sitemap.xml`, `robots.txt`, web manifest, breadcrumbs.

## ♿ Accessibility

WCAG 2.2 AA-minded: keyboard-navigable, focus-visible rings, skip link,
ARIA labelling, semantic landmarks, `prefers-reduced-motion` respected across
every animation, and AA-compliant contrast on the dark palette.

## ⚡ Performance

- `next/font` (Space Grotesk + Inter) with `display: swap` + preconnect.
- Static prerendering for every page; only the lead API is dynamic.
- AVIF/WebP via `next/image`, package-import optimization, code splitting.
- Canvas starfield is DPR-capped, pauses off-screen, and disables on reduced motion.

## 🌐 Deployment (Vercel)

Push to a Git repo, import into Vercel, set the env vars above, and deploy.
The build is fully static-friendly and CDN-cacheable out of the box.
