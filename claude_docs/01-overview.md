# 01 · Overview

## What this is
The marketing website for **Koolvent Technologies**, a B2B manufacturer of HVAC &
fluid-control components based in **Noida, Uttar Pradesh, India**. It is a **static site**
built with Astro and deployed to **`koolvent.in`** on Vercel.

It sells **seven products**:
1. **Suction Guide** — combination strainer + flow-conditioning fitting for pump inlets.
2. **Pressure Vessel** — code-built vessels for expansion/storage/buffer duties.
3. **Hot Water Generator** — packaged hot-water units.
4. **Valve Kit** — pre-assembled isolation/balancing/control valve packages.
5. **Autovent** — forged-brass automatic air vent (air purging valve).
6. **Autovent SS304/316** — stainless-steel automatic air vent.
7. **Megavent SS304/316** — high-capacity stainless-steel air vent with a conical body.

The audience is engineering-led B2B: consultants, contractors, and end-clients specifying
components for commercial buildings, hospitals, data centres, hotels, and infrastructure.

## Current company facts (source of truth: `src/data/site.ts`)
These change over time — always confirm against `src/data/site.ts` before quoting them.
As of the last verification:

| Field | Value |
|---|---|
| Name | Koolvent Technologies |
| Tagline | Precision-engineered HVAC & fluid-control components |
| Location | Noida, Uttar Pradesh, India |
| Address | Noida, Uttar Pradesh, India (no street address supplied yet) |
| Phone | +91 9958573584 |
| Email | enquiry@koolvent.in |
| GST | `NA` (removed; hidden on the site — see [08](08-placeholder-system.md)) |
| Production URL | https://koolvent.in |
| Socials | LinkedIn / Instagram / X all `#` (placeholders, hidden from JSON-LD `sameAs`) |

### ⚠️ Known data inconsistencies to be aware of
**Founding year.** `site.foundedYear` is **2026**, and these read from it: the homepage
hero badge ("Est. 2026"), the homepage About copy and stat card, the company-profile
"Founded" row, and the JSON-LD `foundingDate`. These places still say **2025**:
- `src/data/company.ts`: `overview`, both `milestones` years, and the "Established" fact
- `src/data/careers.ts`: the "Growth with a growing company" benefit
- `src/pages/about.astro`: the hard-coded `PageHero` lead
- `CLAUDE.md` and `README.md` ("est. 2025")

So `/company-profile/` currently shows both 2026 (snapshot) and 2025 (facts and milestones)
on the same page. If asked to fix the founding year, reconcile **all** of these places
together. See [04](04-data-layer.md).

**"10+ product families".** This claim appears in `company.ts` `facts`, the homepage hero
proof list (`heroProof`), and the homepage About stat card. `products.ts` has **7**
products (4 families + 3 air vents). Check with the owner before changing it.

## Page map (routes)
`/` · `/products/` · `/products/<slug>/` · `/about/` · `/leadership/` ·
`/company-profile/` · `/contact/` · `/quote/` · `/support/` · `/careers/` ·
`/blog/` · `/blog/<slug>/` · `/thank-you/` (noindex, out of sitemap) · `/404`.

Full detail for each route: [06-pages-and-routes.md](06-pages-and-routes.md).

## The core idea of the codebase
**Content lives in data, not markup.** Pages are thin: they import typed data from
`src/data/*.ts` (and markdown from `src/content/blog/`) and render it through a small set
of reusable components. To change what the site *says*, you edit data files. To change how
it *looks/behaves*, you edit components, `global.css`, or the layout.

A **placeholder system** (`TODO:` strings + `isPlaceholder()` + a post-build guard) makes
it safe to ship before the owner has supplied every real fact: unknown values are hidden
gracefully, and the build fails if any placeholder text leaks into visible HTML.

---
*Last verified: 2026-10-04.*
