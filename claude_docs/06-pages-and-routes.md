# 06 · Pages & Routes

Pages are `.astro` files in `src/pages/`. Each wraps its content in `BaseLayout` (passing
`title`/`description`, sometimes `noindex`/`ogType`/`ogImage`) and composes the components
from [05](05-components.md). **All internal links end with `/`.**

| Route | File | Data it pulls | Notes |
|---|---|---|---|
| `/` | `index.astro` | `products`, `site`, `accents` | Big animated hero (photo + aurora + blobs + grid + cursor-spotlight), marquee strip, `CapabilityGrid`, product grid, about split, `CtaBand`. The showcase of house style. |
| `/products/` | `products/index.astro` | `products` | Hero + product grid (`ProductCard`) + "why Koolvent" (`CapabilityGrid`) + CTA. |
| `/products/<slug>/` | `products/[slug].astro` | `products`, `realSpecs`, `accents` | **`getStaticPaths` from `products[]`** → one page per product. Overview (image + intro + highlights), applications chips, spec table **or** "configured per project" fallback, related products, CTA. |
| `/about/` | `about.astro` | `site`, `company` (mission/vision/overview/values/industries/facts), `realEntries` | Company story, values, industries, real facts only. |
| `/leadership/` | `leadership.astro` | `team` (`realEntries(leadership,'name')`), `company.values` | Team grid (`TeamCard`); if no real members, shows an "engineering-led team / profiles coming soon" state. |
| `/company-profile/` | `company-profile.astro` | `site`, `products`, `company` (overview/milestones/certifications/industries/facts) | "Snapshot" table (filters placeholder rows incl. GST), `Milestones` timeline, real certs only (else "documentation on request"). |
| `/contact/` | `contact.astro` | `site` | Address/phone/email cards + **Google Maps embed** built from `site.contact.mapsQuery` + `ContactForm kind="contact"`. GST line shown only if not placeholder. |
| `/quote/` | `quote.astro` | `products`, `site` | `ContactForm kind="quote"` (adds product/quantity/location/timeline) + "what happens next" sidebar. |
| `/support/` | `support.astro` | `site`, `faqs` (real only) | Support channels + FAQ accordion. |
| `/careers/` | `careers.astro` | `site`, `careers` (openings/benefits/howToApply) | Benefits grid; real openings or a "no current openings / apply speculatively" state. |
| `/blog/` | `blog/index.astro` | `getCollection('blog')` non-draft, newest-first | Grid of `BlogCard`; empty state when no posts. |
| `/blog/<slug>/` | `blog/[...slug].astro` | `getCollection('blog')` + `render(post)` | **`getStaticPaths` from the collection**; `<Content />` in a `prose` container; `ogType="article"`, `ogImage={heroImage}`. |
| `/thank-you/` | `thank-you.astro` | `site` | Post-submit confirmation. **`noindex`**, excluded from the sitemap (via `astro.config.mjs` filter). |
| `/404` | `404.astro` | — | Not-found page. `noindex`. |

## `BaseLayout.astro` (wraps every page)
Props: `title?`, `description?` (defaults to `site.description`), `ogImage?` (defaults to
the logo — a purpose-made 1200×630 `public/og-image.png` is still a `TODO`), `ogType?`
(`'website' | 'article'`), `noindex?`.

Builds: `<title>` (`"<title> — <site.name>"`, or `"<name> — <tagline>"` on the home page),
meta description, canonical URL, Open Graph + Twitter cards, **Organization JSON-LD** (from
`site`, with `sameAs` filtered to non-`#` socials), Google Fonts (Inter + Plus Jakarta
Sans), favicon. Then: skip-to-content link, `<Header pathname={Astro.url.pathname}>`,
`<main id="main"><slot/></main>`, `<Footer>`, and **the single inline `<script>`** that
powers all interactivity (see [07](07-styling-motion-accents.md) / [11](11-conventions-and-gotchas.md)).

## Adding a page
Create `src/pages/<name>.astro`, wrap in `BaseLayout`, build from components, use
trailing-slash links, and add it to `navLinks`/`footerLinks` in `site.ts` if it should be
discoverable. Dynamic routes need a `getStaticPaths`. See [12](12-common-tasks.md).

---
*Last verified: 2026-09-25.*
