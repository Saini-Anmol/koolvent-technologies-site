# Koolvent Technologies — website

Marketing site for Koolvent Technologies, built with [Astro](https://astro.build/) +
[React](https://react.dev/) components + [Tailwind CSS v4](https://tailwindcss.com/).

Astro renders the pages (fast static HTML, SEO-friendly); UI is written as React
components (`src/components/*.tsx`). Most components render server-side only, so the
site ships almost no JavaScript — small interactive bits (mobile menu, scroll
effects, scroll-reveal) are a single inline vanilla script in the layout.

## Develop

```bash
npm install      # once
npm run dev      # http://localhost:4321
npm run build    # static output → dist/
npm run preview  # serve the production build locally
```

> **Version note:** stays on **Astro 5** + **`@astrojs/react@4.x`** on purpose.
> `@astrojs/react@5.x` is for Astro 6 and pulls in Vite 8 + Rolldown, which currently
> breaks the dev server (`Missing field moduleType` in `vite-react-refresh-wrapper`).
> Upgrade Astro and the React integration together (`npx @astrojs/upgrade`) if/when
> you want to move to Astro 6.

## Pages

| Route | File |
|---|---|
| `/` | `src/pages/index.astro` — hero, capabilities, about, products grid, CTA |
| `/products/` | `src/pages/products/index.astro` — listing |
| `/products/<slug>/` | `src/pages/products/[slug].astro` — one per entry in `src/data/products.ts` |
| `/about/` | `src/pages/about.astro` — story, mission/vision, values, industries, stats |
| `/leadership/` | `src/pages/leadership.astro` — team grid (from `src/data/team.ts`) |
| `/company-profile/` | `src/pages/company-profile.astro` — formal corporate overview + milestones |
| `/contact/` | `src/pages/contact.astro` — details + map + contact form |
| `/quote/` | `src/pages/quote.astro` — quote-request form |
| `/support/` | `src/pages/support.astro` — channels + FAQ accordion + resources |
| `/careers/` | `src/pages/careers.astro` — culture, openings (from `src/data/careers.ts`) |
| `/blog/` + `/blog/<slug>/` | `src/pages/blog/*` — content collection (`src/content/blog/*.md`) |
| `/thank-you/` | post-form-submit page (noindex) |
| `/404` | `src/pages/404.astro` |

## Project layout

```
public/                static assets served as-is
  images/              logo, product images, team photos
  favicon.svg, robots.txt
src/
  data/                content as data — site.ts, products.ts, company.ts, team.ts, faq.ts, careers.ts
  content/blog/         Markdown blog posts (Astro content collection)
  content.config.ts     blog collection schema
  layouts/BaseLayout.astro   <head>, SEO/OG meta, JSON-LD, skip link, header + footer, the one inline script
  components/           React components (.tsx) — Header, Footer, Button, Section, SectionHeading,
                        PageHero, Breadcrumbs, CtaBand, CapabilityGrid, ProductCard, SpecTable,
                        TeamCard, Milestones, ContactForm, BlogCard
  lib/                  cn.ts (className combiner), accents.ts (4-colour accent system),
                        content.ts (isPlaceholder / realEntries — hide `TODO:` content)
  pages/                routes (.astro — Astro requires page files to be .astro/.md)
  styles/global.css     Tailwind import + design tokens (brand colour scale, fonts)
scripts/check-no-todos.mjs   post-build guard — fails the build if `TODO` text reaches dist/
reference/              the original single-file index.html, kept for reference
```

To change copy/data, edit the files in `src/data/` (and `src/content/blog/` for posts) —
the pages render from them. Adding a product to `src/data/products.ts` automatically adds
its card, listing entry, and detail page. Anything written as `TODO: …` in the data is
hidden on the site (pages filter it via `lib/content.ts`) until you replace it — and
`npm run build` fails if `TODO` text ever reaches the generated HTML (`scripts/check-no-todos.mjs`).

### Design system
Light, colourful, "Google-ish": a primary brand blue plus a small four-colour accent palette
(blue / emerald / amber / rose — see `lib/accents.ts`) used for product families, icon chips,
section accents and gradient flourishes. Pill-shaped buttons (`Button.tsx`), light colourful
`PageHero`s (`tone="dark"` available), a reusable colourful `CtaBand`, and `CapabilityGrid`.
Headings use Plus Jakarta Sans, body uses Inter. Keep colour disciplined — `brand-600` is the
primary-action colour; the other three are accents tied to meaning.

## Contact / quote forms (Web3Forms)

The forms post to [Web3Forms](https://web3forms.com) — no backend needed. They read the
access key from `import.meta.env.PUBLIC_WEB3FORMS_KEY`. Until that's set, the form is replaced
by a friendly "email / call us directly" card so visitors always see something usable.

1. Get a free key at web3forms.com (enter the inbox you want submissions delivered to).
2. `cp .env.example .env` and put the key in `PUBLIC_WEB3FORMS_KEY=...` (`.env` is gitignored).
3. On Vercel, add the same variable in **Project → Settings → Environment Variables**.

## Deploying (Vercel)

Static output (`dist/`). Import the repo on Vercel — it auto-detects Astro (build
`npm run build`, output `dist`). `vercel.json` adds basic security headers, long-cache
headers for hashed assets, and `trailingSlash: true`. Add `koolvent.in` as a custom domain
in the dashboard. The production domain is also set in `astro.config.mjs` (`site:`) for
canonical URLs and the sitemap. Don't forget the `PUBLIC_WEB3FORMS_KEY` env var (above).

## Content / assets still needed

Most copy now has sensible defaults. The remaining `TODO:`-marked items are company-specific
facts that are **hidden until you supply them** (search the repo for `TODO:`):

- **Company:** confirm the GST number, add the full registered address & company email — `src/data/site.ts`
- **Leadership:** real names, roles, bios, LinkedIn URLs and photos (under `public/images/team/`) — `src/data/team.ts`. Until then `/leadership/` shows an "engineering-led team / profiles coming soon" page; fill `team.ts` and the team grid appears automatically.
- **Products:** sizes, materials, connections, ratings per spec table — `src/data/products.ts`. Rows left as `TODO:` are dropped; if a product has none, its detail page shows a "specs configured per project" panel instead.
- **Certifications:** add to `src/data/company.ts` **only once each certificate is in hand** — the company-profile cert grid appears automatically; until then it shows a "documentation available on request" panel.
- **Numbers / milestones / facility photo:** verified figures and a real facility/team photo — `src/data/company.ts` (the About page currently uses a colourful CSS panel, no stock photo).
- **Social:** real LinkedIn / Instagram / X URLs — `src/data/site.ts`
- **Contact:** swap the "Open in Google Maps" link for a proper embedded map if you want one — `src/pages/contact.astro`
- **Company profile PDF (optional):** if you produce one, drop it in `public/` and link it.
- **Forms:** `PUBLIC_WEB3FORMS_KEY` (see above).
- **Social card:** a 1200×630 PNG at `public/og-image.png` — referenced in `src/layouts/BaseLayout.astro`.

### Known image limitations (not blocking)
The product PNGs in `public/images/products/` are raw (~1 MB each) and one (`pressure-vessel.png`)
has a baked-in "Pressure Vessel" label in the corner. Replacing them with clean, consistent
renders and moving images to `src/assets/` + Astro's `<Image>` (for resizing/`webp`) is a worthwhile
follow-up.

## Status

Built: full site — homepage, products listing + detail pages, About / Leadership / Company
Profile, Contact / Quote / Support / Careers, Blog (listing + posts), Thank-you, 404.
Light + colourful design system, sitemap, robots.txt, per-page SEO/OG meta, Organization
JSON-LD, skip link, `vercel.json`, post-build `TODO` guard. No `TODO` placeholder text reaches
the live site — remaining `TODO:` items in `src/data/*` are hidden until you supply real values.
