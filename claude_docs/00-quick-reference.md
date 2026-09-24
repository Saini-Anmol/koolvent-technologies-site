# 00 · Quick Reference (cheat sheet)

## Commands
```bash
npm install      # once
npm run dev      # dev server → http://localhost:4321
npm run build    # static build → dist/, then the postbuild TODO guard runs
npm run preview  # serve the production build locally
npm run check:dist  # run the TODO guard standalone against an existing dist/
```
**The build is the only gate** — no test suite, no linter, no `astro check`.
`npm run build` must succeed with zero errors.

## The five rules that will break the site if ignored
1. **Every internal link ends with `/`** (`trailingSlash: 'always'`). `/products/`, not `/products`.
2. **No `client:*` directives.** React renders server-side only. Interactivity = the one
   inline `<script>` in `BaseLayout.astro` + DOM `id`/`data-` hooks. (See [07](07-styling-motion-accents.md), [11](11-conventions-and-gotchas.md).)
3. **Placeholders are written `TODO: …`** and are auto-hidden; if any `TODO` reaches
   rendered HTML the build fails. Never invent real-looking names/certs/specs/GST. (See [08](08-placeholder-system.md).)
4. **Accent Tailwind classes stay literal** — never build them by string interpolation, or
   Tailwind's scanner won't emit them. (See [07](07-styling-motion-accents.md).)
5. **Don't upgrade Astro/React casually.** Pinned to Astro 5 + `@astrojs/react@4.x`. (See [02](02-tech-stack-and-build.md).)

## "Where do I change X?"
| To change… | Edit… |
|---|---|
| Company name, tagline, phone, email, address, GST, socials, nav, footer links | `src/data/site.ts` |
| Products (and their detail pages) | `src/data/products.ts` |
| Mission/vision/values/milestones/certifications/industries/stats | `src/data/company.ts` |
| Leadership team | `src/data/team.ts` |
| Support-page FAQ | `src/data/faq.ts` |
| Careers openings/benefits | `src/data/careers.ts` |
| Blog posts | `src/content/blog/*.md` |
| Colors / fonts / motion | `src/styles/global.css` |
| Accent palette mapping | `src/lib/accents.ts` |
| `<head>`, SEO, JSON-LD, the interactivity script | `src/layouts/BaseLayout.astro` |
| Deploy headers / caching | `vercel.json` |
| Production domain | `astro.config.mjs` |

**Never hard-code company facts into page markup** — pull them from `src/data/*`.

## Import style
Use the `@/` alias (`@/* → src/*`). No `../../` relative imports.
`.astro` pages import React components with the `.tsx` extension:
`import Button from '@/components/Button.tsx'`.

## Contact/quote form
Set `PUBLIC_WEB3FORMS_KEY` in `.env` (and in Vercel). Without it, forms show a
"email/call us" card instead of breaking. (See [09](09-forms.md).)

---
*Last verified: 2026-09-25.*
