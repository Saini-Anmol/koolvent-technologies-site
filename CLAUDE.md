# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Marketing website for **Koolvent Technologies** — a B2B HVAC & fluid-control component manufacturer (Noida, Uttar Pradesh, India, est. 2025). It sells four product families: **suction guides, pressure vessels, hot water generators, valve kits**. Static site, deployed to `koolvent.in` on Vercel.

## Commands

```bash
npm install      # once
npm run dev      # dev server at http://localhost:4321
npm run build    # static build → dist/, then runs the postbuild TODO guard
npm run preview  # serve the production build locally
```

- **The build is the only gate.** There is no test suite, linter, or `astro check` configured. `npm run build` must succeed with no errors.
- `.tsx` files are **transpiled, not type-checked**, during build, so type errors won't fail the build. Be careful with types — a broken type silently ships.
- **`npm run build` runs a `postbuild` step** (`scripts/check-no-todos.mjs`) that greps every generated `dist/**/*.html` for the string `TODO` and **fails the build if any is found**. This is the safety net that keeps placeholder text off the live site. `npm run check:dist` runs the same guard standalone against an existing `dist/`.

## Stack & the rules that matter most

**Astro 5 + React 19 + Tailwind CSS v4.** TypeScript is `astro/tsconfigs/strict`.

1. **Pages are `.astro` in `src/pages/`; reusable UI is React `.tsx` in `src/components/`.** Astro requires page files to be `.astro`/`.md`. `.astro` pages import React like `import Foo from '@/components/Foo.tsx'`. Use the `@/` alias (`@/* → src/*`, defined in `tsconfig.json`) everywhere — no `../../` relative imports.

2. **The site ships almost no client-side JavaScript, and it must stay that way.** React components are rendered **server-side only** — there are intentionally **no `client:` directives anywhere**. The only interactivity (mobile menu toggle, header scroll-shadow, hero cursor-spotlight, scroll-reveal) is **one inline `<script>` at the bottom of `src/layouts/BaseLayout.astro`** that hooks into DOM `id`s / `data-` attributes the components render (`#site-header`, `#nav-toggle`, `#mobile-nav`, `#hero`, `#hero-spot`, `.reveal`). When you need interactivity, extend that pattern (tiny vanilla script + markup hooks) — **do not** add `client:load`/`client:visible` (that pulls ~195 KB of React runtime for no reason).

3. **Tailwind v4 is configured in CSS, not JS.** `src/styles/global.css` has `@import "tailwindcss"`, `@plugin "@tailwindcss/typography"`, and an `@theme {}` block defining the `brand-*` color scale (a cool technical blue) and `--font-display`/`--font-sans` tokens. There is no `tailwind.config.js`. Use Tailwind `slate` for neutrals/text, `font-display` (Plus Jakarta Sans) for headings, `font-sans` (Inter) for body. Fonts load from Google Fonts in `BaseLayout`.

4. **`trailingSlash: 'always'`** (`astro.config.mjs`, mirrored in `vercel.json`) — **every internal link must end with `/`** (`/products/`, `/products/suction-guide/`, `/blog/<slug>/`). A link without a trailing slash breaks.

5. **Version pin — do not "upgrade" casually.** Stays on **Astro 5** + **`@astrojs/react@4.x`**. `@astrojs/react@5.x` targets Astro 6 and drags in Vite 8 + Rolldown, which breaks the dev server (`Missing field moduleType` in `vite-react-refresh-wrapper`). If you ever move to Astro 6, upgrade Astro and the React integration together (`npx @astrojs/upgrade`).

## Content lives in data, not markup

To change copy/products/team/etc., **edit `src/data/*.ts` and `src/content/blog/*.md`** — the pages render from them. Do not hard-code company facts into page markup.

- **`src/data/site.ts`** — single source of truth for company-wide values: `site` (name, tagline, description, url, foundedYear, location, gst, `contact`, `social`), `navLinks` (header nav), `footerLinks` (grouped footer columns).
- **`src/data/products.ts`** — `products: Product[]` (`slug`, `name`, `summary`, `image`, `accent`, `intro`, `highlights[]`, `applications[]`, `specs[]`) + `getProduct(slug)` + `realSpecs(p)` (drops `TODO:` spec rows). **Appending one entry here automatically creates its homepage card, its `/products/` tile, and a full detail page at `/products/<slug>/`** (via `getStaticPaths` in `src/pages/products/[slug].astro`).
- **`src/data/company.ts`** — `mission`, `vision`, `overview`, `values[]`, `milestones[]`, `certifications[]`, `industries[]`, `facts[]`. Drives About + Company Profile.
- **`src/data/team.ts`** — `leadership: TeamMember[]` (currently Shivam & Adil, both "Founder"). Drives `/leadership/`.
- **`src/data/faq.ts`** — `faqs: Faq[]`. Drives the Support page accordion.
- **`src/data/careers.ts`** — `openings[]` (empty by default), `benefits[]`, `howToApply`. Drives `/careers/`.
- **`src/content/blog/*.md`** + `src/content.config.ts` — Astro content collection loaded via `glob`. Frontmatter schema: `title`, `description`, `pubDate` (required), plus optional `updatedDate`, `author` (defaults to "Koolvent Technologies"), `heroImage`, `tags[]`, `draft`. The **slug = filename without `.md`** (used as `post.id`). `/blog/` lists posts; `/blog/[...slug].astro` renders one via `<Content />` inside a `prose` container.

## Placeholder content system (`TODO:`) — important

Company-specific facts the owner hasn't supplied yet are written as **`TODO: …`** strings in the data files. These are **never shown to visitors**:

- **`src/lib/content.ts`** — `isPlaceholder(value)` returns true for empty/nullish or any string starting with `todo` (case-insensitive). `realEntries(items, key)` filters a list to entries whose `key` is real.
- Pages/components use these to hide placeholders and show graceful fallbacks: a product with no real specs shows a "specs configured per project" panel; `/leadership/` shows an "engineering-led team / profiles coming soon" state until `team.ts` has real names; the certifications grid shows "documentation available on request" until real certs are added; `TeamCard` shows an initials avatar until a real photo is set.
- **The `postbuild` guard is the backstop** — if any `TODO` text ever reaches rendered HTML, the build fails.
- **When adding placeholder content, always write it as `TODO: …`** so it's caught. **Never invent real-looking names, certifications, prices, GST numbers, or precise specs** — keep unknowns as `TODO:`.

## Layout & shared components

**`src/layouts/BaseLayout.astro`** wraps every page: full `<head>` (per-page `title`/`description`, canonical URL, Open Graph + Twitter cards, Organization JSON-LD built from `site`, Google Fonts, favicon), a skip-to-content link, `<Header pathname={...}>`, `<main id="main">` with a `<slot/>`, `<Footer>`, and the single inline interactivity script. Props: `title?`, `description?`, `ogImage?`, `ogType?` (`'website'|'article'`), `noindex?`.

Build pages out of these components (study `src/pages/index.astro` for house style):

| Component | Role / key props |
|---|---|
| `Section` | Full-bleed bg + centered `max-w-7xl` container. `bg="white\|slate\|dark"`, `spacing="normal\|tight"`, `id`, `className`, `innerClassName`. |
| `PageHero` | Standard interior-page header. `eyebrow?`, `title`, `lead?`, `breadcrumbs?`, `tone="light\|dark"`, `size="md\|sm"`, children for CTAs. Light + colourful by default (soft blue/green/amber glows). |
| `SectionHeading` | `eyebrow?`, `title`, `align="left\|center"`, `tone="dark\|light"` (light = for dark bgs), children as supporting copy. |
| `Button` | Renders an `<a>`. `href`, `variant="primary\|gradient\|secondary\|ghost\|white\|outline-dark"`, `size="md\|lg"`. **For real form submits use a styled `<button>`, not this.** |
| `CtaBand` | Reusable closing CTA band. `title`, `lead?`, `primary?`, `secondary?`, `variant="gradient\|dark\|light"`. Defaults `primary` to the quote page. |
| `CapabilityGrid` | 4-up value/feature grid. `defaultCapabilities(city)` provides the standard four; pass `items` to override. Rotates accent colours by index. |
| `Breadcrumbs` | `items: Crumb[]` (`{label, href?}`), `tone`. |
| `ProductCard` | `product`, `index?` (stagger). Whole card links to the detail page; accent bar + colour from `product.accent`. |
| `SpecTable` | `rows: {label, value}[]`. Two-column on `sm+`, stacks on mobile. |
| `TeamCard` | `member`. Initials avatar when no photo; hides bio when it's a placeholder. |
| `Milestones` | `items: {year, title, description}[]` vertical timeline. |
| `BlogCard` | `post: CollectionEntry<'blog'>`. Gradient placeholder when no `heroImage`. |
| `ContactForm` | `kind="contact"\|"quote"`. See Forms below. |
| `Header` / `Footer` | Render from `site`/`navLinks`/`footerLinks`; server-rendered, wired by the inline script. |

- `cn()` className helper: `src/lib/cn.ts` (joins truthy strings).
- Add `class="reveal"` (optionally `reveal-left`/`reveal-right`/`reveal-scale`, and `data-reveal-delay="<ms>"`) to blocks that should fade in on scroll.

### The accent system (`src/lib/accents.ts`)

A Google-ish four-colour palette on top of the primary brand blue: `type Accent = 'brand' | 'emerald' | 'amber' | 'rose'`. Each product family is assigned one accent; the same colours rotate through capability grids, icon chips, glows, etc. `accents[accent]` returns literal Tailwind class strings (`soft`, `text`, `textGroupHover`, `bar`, `ring`, `glow`); `accentOrder` is the display order. **Keep these class strings literal — never build them with template interpolation, or Tailwind's content scanner won't emit them.**

### Motion / decorative utilities (all in `global.css`, all gated behind `prefers-reduced-motion`)

`.animate-fade-up` (staggered entrance via `--d`), `.reveal`/`.reveal-left`/`.reveal-right`/`.reveal-scale` (scroll-in, toggled by the inline script; stagger via `data-reveal-delay`), `.blob-a/b/c` + `.animate-glow` (drifting/pulsing glows), `.animate-float[-slow]`, `.text-flow` (animated 4-colour gradient text), `.animate-marquee` + `.mask-fade-x`, `.animate-bob` (scroll cue), `.aurora-halo` + `.grid-floor` + `.cursor-spot` (homepage hero effects), `.strip-flow` (the slim gradient strip in header/footer), `.bg-grid` (faint grid on dark sections), `.fx-link` (grow-on-hover underline). Keep motion subtle — no particles, no parallax.

### Visual direction

Clean, colourful, professional B2B industrial: generous whitespace, subtle `border-slate-200` borders, `rounded-xl`/`rounded-2xl`, soft shadows, pill-shaped buttons. `brand-600` is the primary-action colour; the other three accents are tied to meaning (product families). `slate-950` for dark sections. No heavy or distracting animation.

## Pages (routes)

`/` (index), `/products/`, `/products/<slug>/`, `/about/`, `/leadership/`, `/company-profile/`, `/contact/`, `/quote/`, `/support/`, `/careers/`, `/blog/`, `/blog/<slug>/`, `/thank-you/` (post-submit, `noindex`, excluded from sitemap), `/404`.

## Forms (Web3Forms — no backend)

`ContactForm.tsx` is used on `/contact/` (`kind="contact"`) and `/quote/` (`kind="quote"`; adds product/quantity/location/timeline fields). It posts to **Web3Forms** and reads `import.meta.env.PUBLIC_WEB3FORMS_KEY` (Astro exposes `PUBLIC_`-prefixed vars at build time). **If the key is unset, it renders a "email / call us directly" card instead of a broken form** — so visitors always see something usable. Successful submissions redirect to `/thank-you/`. There's a hidden honeypot (`botcheck`) field. Set the key in `.env` (gitignored; see `.env.example`) and in Vercel → Project → Settings → Environment Variables.

## Deployment

Static output (`dist/`); Vercel auto-detects Astro. `vercel.json` adds security headers, long-cache (`immutable`) headers for `/_astro/*`, a 1-day cache for `favicon.svg`/`robots.txt`, and `trailingSlash: true`. Production domain is set in `astro.config.mjs` (`site: 'https://koolvent.in'`) for canonical URLs and the `@astrojs/sitemap` output (which filters out `/thank-you`). Domain bought on Hostinger; DNS + email stay at Hostinger, hosting on Vercel — see README for DNS specifics.

## Misc

- `public/` is served as-is: `images/` (logo, product PNGs, hero, team), `favicon.svg`, `robots.txt`.
- `reference/original-index.html` is the original single-file HTML site, kept **for reference only** — not part of the build.
- **Known image limitation:** product PNGs in `public/images/products/` are large raw files (~1 MB each) and `pressure-vessel.png` has a baked-in label. Replacing them with clean renders and moving to `src/assets/` + Astro's `<Image>` (resize/webp) is a worthwhile follow-up — not blocking.
- **OG social card:** `BaseLayout` currently falls back to the logo; a purpose-made 1200×630 PNG at `public/og-image.png` is a `TODO`.
