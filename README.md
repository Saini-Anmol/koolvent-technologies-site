# Koolvent Technologies — website

Marketing site for Koolvent Technologies, built with [Astro](https://astro.build/) +
[React](https://react.dev/) components + [Tailwind CSS v4](https://tailwindcss.com/).

Astro renders the pages (fast static HTML, SEO-friendly); UI is written as React
components (`src/components/*.tsx`). Most components render server-side only, so the
site ships almost no JavaScript — small interactive bits (mobile menu, scroll
effects, scroll-reveal) are a single inline vanilla script in the layout.

## Develop

```bash
npm install     # once
npm run dev      # http://localhost:4321
npm run build    # static output → dist/
npm run preview  # serve the production build locally
```

## Project layout

```
public/              static assets served as-is (images, favicon, robots.txt)
  images/            logo + product images
src/
  data/              content as data — site.ts, products.ts (edit these to change copy)
  layouts/           BaseLayout.astro — <head>, SEO/OG meta, header + footer, JS
  components/         React components (.tsx): Header, Footer, Button, SectionHeading, ProductCard
  pages/             routes (.astro — Astro requires page files to be .astro/.md)
  lib/cn.ts          tiny className combiner
  styles/global.css  Tailwind import + design tokens (brand colour scale, fonts)
reference/           the original single-file index.html, kept for reference
```

## Content that still needs real values

Anything marked `TODO:` in `src/data/*.ts` and in page front-matter is a placeholder —
GST number, full address, company email, founder names/bios, product specs, the
About-section facility photo, and social-profile URLs. Replace these with the real
content; the structure is already wired up.

## Deploying (Vercel)

The project outputs a static site (`dist/`). On Vercel, import the repo — it
auto-detects Astro (build `npm run build`, output `dist`). Add `koolvent.in` as a
custom domain in the Vercel dashboard. The production domain is also set in
`astro.config.mjs` (`site:`) for canonical URLs and the sitemap.

## Status

Done: Astro + React + Tailwind scaffold, design system, React component library,
polished homepage (hero with featured product, capabilities, about, products grid, CTA),
header/footer, 404, sitemap, SEO/OG meta. Still to come: product detail pages,
About / Leadership / Company-profile pages, Contact / Quote / Support / Careers, blog,
and wiring the contact form (planned via Web3Forms).
