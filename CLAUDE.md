# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Marketing website for **Koolvent Technologies** — a B2B HVAC & fluid-control component manufacturer (Noida, India, est. 2025). Static site, deployed to `koolvent.in` on Vercel.

## Commands

```bash
npm install      # once
npm run dev      # dev server at http://localhost:4321
npm run build    # static build → dist/  (also the only "test": it must build clean)
npm run preview  # serve the production build locally
```

There is no test suite, linter, or `astro check` configured. The build (`npm run build`) is the gate — it must succeed with no errors. `.tsx` files are transpiled (not type-checked) during build, so type errors won't fail the build; be careful with types.

## Stack & the one rule that matters most

**Astro 5 + React 19 + Tailwind CSS v4.**

- **Pages** are `.astro` files in `src/pages/` (Astro requires this). **Reusable UI** is React `.tsx` in `src/components/`. `.astro` pages import React components like `import Foo from '@/components/Foo.tsx'`. Use the `@/` alias (`@/* → src/*`) everywhere.
- **The site ships almost no client-side JavaScript, and it should stay that way.** React components are rendered **server-side only** — there are intentionally **no `client:` directives** anywhere. The little interactivity that exists (mobile menu toggle, header scroll-shadow, scroll-reveal animation) is **one small inline `<script>` in `src/layouts/BaseLayout.astro`** that hooks into DOM `id`s/`data-` attributes the components render. When you need interactivity, prefer this pattern (a tiny vanilla script + markup hooks) over hydrating a React island — adding `client:load` etc. pulls in ~195 KB of React runtime for no good reason.
- **Tailwind v4** is configured in CSS, not a JS config: `src/styles/global.css` has `@import "tailwindcss"`, `@plugin "@tailwindcss/typography"`, and an `@theme {}` block defining the `brand-*` color scale (a cool blue) and the `--font-display` token. Use Tailwind `slate` for neutrals/text. `font-display` (Plus Jakarta Sans) for headings, `font-sans` (Inter) for body.
- **Version pin (do not "upgrade" casually):** stays on **Astro 5** + **`@astrojs/react@4.x`**. `@astrojs/react@5.x` targets Astro 6 and drags in Vite 8 + Rolldown, which breaks the dev server (`Missing field moduleType` in `vite-react-refresh-wrapper`). Upgrade Astro and the React integration together if you ever move to Astro 6.
- `trailingSlash: 'always'` in `astro.config.mjs` — **every internal link must end with `/`** (`/products/`, `/products/suction-guide/`, `/blog/<slug>/`).

## Content lives in data, not markup

To change copy/products/team/etc., edit `src/data/*.ts` and `src/content/blog/*.md` — the pages render from them:

- `src/data/site.ts` — company info (name, contact, GST, location, social), `navLinks`, `footerLinks`. Single source of truth for company-wide values.
- `src/data/products.ts` — `products: Product[]` (slug, name, summary, image, accent, intro, highlights[], applications[], specs[]) + `getProduct(slug)`. **Adding an entry here automatically adds its card on the homepage, its tile on `/products/`, and a full detail page at `/products/<slug>/`** (via `getStaticPaths` in `src/pages/products/[slug].astro`).
- `src/data/company.ts`, `src/data/team.ts`, `src/data/faq.ts`, `src/data/careers.ts` — drive the About/Company-profile, Leadership, Support, and Careers pages.
- `src/content/blog/*.md` + `src/content.config.ts` — Astro content collection. `/blog/` lists posts; `/blog/[...slug].astro` renders one (the entry `id` = filename without extension is the slug).
- **`TODO:` markers everywhere = placeholder content** the owner must replace (GST, address, founder names/photos, product specs, certifications, FAQ answers, Google Maps embed, company-profile PDF, social URLs, OG image, etc.). Don't invent real-looking names, certifications, prices, or precise specs — keep them `TODO:`.

## Layout & shared components

- `src/layouts/BaseLayout.astro` wraps every page: `<head>` (per-page `title`/`description`, canonical, Open Graph / Twitter cards, Organization JSON-LD, fonts, favicon), `<Header>`, `<main>`, `<Footer>`, and the single inline interactivity script. Pages use `<BaseLayout title="..." description="..." [ogType="article"] [ogImage="..."] [noindex]>`.
- Build pages out of these (study `src/pages/index.astro` for the house style): `Section` (full-bleed bg + centered `max-w-7xl` container, `bg="white|slate|dark"`, `spacing="normal|tight"`), `PageHero` (the standard dark interior-page header with `eyebrow`/`title`/`lead`/`breadcrumbs`), `SectionHeading`, `Button` (renders an `<a>` — for form submits use a real `<button>` styled to match), `Breadcrumbs`. Plus `ProductCard`, `SpecTable`, `TeamCard`, `Milestones`, `BlogCard`, `ContactForm`. `cn()` className helper at `src/lib/cn.ts`.
- Add `class="reveal"` to cards/blocks that should fade in on scroll.
- Visual direction: clean, restrained, professional B2B industrial — generous whitespace, subtle `border-slate-200` borders, `rounded-xl`/`rounded-2xl`, soft shadows, `brand-*` for accents/CTAs, `slate-950` for dark sections. No heavy/distracting animation.

## Forms

`ContactForm.tsx` (used on `/contact/` as `kind="contact"` and `/quote/` as `kind="quote"`) posts to **Web3Forms** — no backend. It reads `import.meta.env.PUBLIC_WEB3FORMS_KEY`; if unset it renders a "not yet configured" notice instead of a working form. Set the key in `.env` (gitignored; see `.env.example`) and in the Vercel project env vars. Successful submissions redirect to `/thank-you/`.

## Deployment

Static output (`dist/`). Vercel auto-detects Astro. `vercel.json` adds security headers, long-cache headers for `/_astro/*`, and `trailingSlash: true`. Production domain is also set in `astro.config.mjs` (`site:`) for canonical URLs and the `@astrojs/sitemap`-generated sitemap (which excludes `/thank-you/`).

## Misc

- `reference/original-index.html` is the original single-file HTML site, kept for reference only — not part of the build.
- `public/` is served as-is (images under `public/images/`, `favicon.svg`, `robots.txt`).
