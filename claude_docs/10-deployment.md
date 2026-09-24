# 10 · Deployment

## Topology (important — don't break this)
- **Hosting:** the site is built to a static `dist/` and deployed to **Vercel**
  (auto-detects Astro). Production domain: **`koolvent.in`**.
- **Domain registrar:** bought on **Hostinger**.
- **DNS + email:** stay at **Hostinger**. When fixing anything DNS-related, only touch the
  records that point the domain at Vercel — **do not** remove/alter the MX or other email
  records at Hostinger, or company email breaks. (See the README for DNS specifics.)

## Build → output
- `npm run build` → static `dist/` → then the `postbuild` TODO guard. Vercel runs the same
  build; a `TODO` leak or build error fails the deploy.
- `astro.config.mjs` sets `site: 'https://koolvent.in'` (used for canonical URLs, Open
  Graph, and the `@astrojs/sitemap` output). The sitemap **filters out `/thank-you`**.

## `vercel.json`
- `trailingSlash: true` — mirrors Astro's `trailingSlash: 'always'`. Keep them in sync.
- **Security headers** on all routes: `X-Content-Type-Options: nosniff`,
  `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy: strict-origin-when-cross-origin`,
  `Permissions-Policy: geolocation=(), microphone=(), camera=()`.
- **Caching:** `/_astro/*` → `public, max-age=31536000, immutable` (hashed assets);
  `favicon.svg` / `robots.txt` → 1-day cache.

## Environment variables
- `PUBLIC_WEB3FORMS_KEY` — powers the forms; set it in Vercel → Settings → Environment
  Variables (build-time; redeploy after changing). See [09-forms.md](09-forms.md).

## `public/` assets
Served as-is at the site root: `favicon.svg`, `robots.txt`, and `images/` (logo, hero
photo, product PNGs, team placeholder).

> **Known asset limitation:** product PNGs in `public/images/products/` are large raw files
> (~1 MB each), and `pressure-vessel.png` has a baked-in label. A worthwhile (non-blocking)
> follow-up: clean renders moved to `src/assets/` + Astro's `<Image>` for resize/webp.
> Also outstanding: a purpose-made 1200×630 `public/og-image.png` social card (currently
> `BaseLayout` falls back to the logo).

---
*Last verified: 2026-09-25.*
