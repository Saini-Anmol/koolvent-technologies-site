# 11 · Conventions & Gotchas

## Hard constraints (breaking these breaks the site)
1. **Trailing slash on every internal link.** `trailingSlash: 'always'` in `astro.config.mjs`
   (mirrored in `vercel.json`). `/products/`, `/products/suction-guide/`, `/blog/<slug>/`.
   A link without the slash breaks routing.
2. **No `client:*` directives / no hydration.** Components render server-side only.
   Interactivity = the one inline script in `BaseLayout.astro` + `id`/`data-` hooks. Adding
   `client:load`/`client:visible` pulls ~195 KB of React runtime for no reason.
3. **Placeholders must be `TODO: …`.** The post-build guard fails on any `TODO` in rendered
   HTML. Never invent real-looking names, certs, prices, GST, or precise specs.
4. **Accent classes stay literal** — never interpolate Tailwind class names; go through
   `accents[...]` (`src/lib/accents.ts`), or the scanner won't emit them.
5. **Don't upgrade Astro/React casually** — pinned to Astro 5 + `@astrojs/react@4.x`
   (`@astrojs/react@5` → Astro 6 + Vite 8/Rolldown → breaks the dev server). Upgrade both
   together via `npx @astrojs/upgrade` only when deliberately migrating.

## Conventions
- **`@/` alias everywhere** (`@/* → src/*`); no `../../` relative imports.
- **`.astro` pages import React with the `.tsx` extension**: `import Foo from
  '@/components/Foo.tsx'`.
- **Content in data, not markup** — edit `src/data/*.ts` / `src/content/blog/*.md`; don't
  hard-code company facts into pages.
- **`cn()`** (`src/lib/cn.ts`) joins class strings; use it for conditional classes.
- **Fonts:** `font-display` (Plus Jakarta Sans) for headings, `font-sans` (Inter) for body.
- **Colours:** `brand-*` for primary, `slate` for neutrals, the four accents for meaning.
- **Motion:** subtle only, always behind `prefers-reduced-motion`. Reuse the `global.css`
  utilities; add `.reveal` (+ optional `data-reveal-delay`) for scroll-in.
- Build pages from the existing components; copy the patterns in `src/pages/index.astro`.

## Gotchas / traps
- **Type errors in `.tsx` don't fail the build** (transpiled, not type-checked). No safety
  net — be careful, especially with props and data shapes.
- **`isPlaceholder` also hides `NA`/`N/A`**, not just `TODO:` — intentional (see [08](08-placeholder-system.md)),
  but worth remembering if a legitimate value ever happens to be literally "NA".
- **Env vars are build-time.** Changing `PUBLIC_WEB3FORMS_KEY` needs a rebuild/redeploy.
- **Footer/product links are literal** in `site.ts`; if you rename a product slug, update
  those footer links too.
- **Founding-year inconsistency** exists right now: `site.foundedYear = 2026` vs
  `company.ts` (and some page copy) saying **2025**. Fix all together if asked.
- **`CLAUDE.md` may lag the data** (e.g. it still says the team is "Shivam & Adil"; the data
  has one member). Trust `src/` over prose docs, and update the doc.
- **`reference/original-index.html`** is the old single-file site — reference only, **not
  part of the build**; don't wire it into anything.
- **The `.strip-flow`, blobs, aurora, etc.** are decorative and `aria-hidden`; keep them out
  of the accessibility tree.

## Accessibility baked in (keep it)
Skip-to-content link, `aria-current` on active nav, `aria-hidden` on decorative elements,
focus-visible outlines, reduced-motion handling, honeypot on forms, alt text on meaningful
images (empty `alt` on decorative ones).

---
*Last verified: 2026-09-25.*
