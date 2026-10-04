# 06 · Pages & Routes

Pages are `.astro` files in `src/pages/`. Each wraps its content in `BaseLayout` (passing
`title`/`description`, sometimes `noindex`/`ogType`/`ogImage`) and composes the components
from [05](05-components.md). **All internal links end with `/`.**

| Route | File | Data it pulls | Notes |
|---|---|---|---|
| `/` | `index.astro` | `products`, `site`, `accents` | Big animated hero: `fabrication.jpg` photo (`onerror` falls back to `hot-water-generator.png`), aurora halo, blobs, masked `.bg-grid` texture, cursor spotlight, "Est. {site.foundedYear}" badge and hard-coded `heroProof` list. Then the marquee strip (product names + sectors), `CapabilityGrid`, product grid (`#what-we-make`), About split (uses `site.foundedYear`; hard-coded "10+ product families" stat card), `CtaBand`. Uses `BaseLayout` with no `title`. The showcase of house style. |
| `/products/` | `products/index.astro` | `products` | Hero + product grid (`ProductCard`) + "why Koolvent" (`CapabilityGrid`) + CTA. |
| `/products/<slug>/` | `products/[slug].astro` | `products`, `realSpecs`, `accents` | **`getStaticPaths` from `products[]`** → one page per product. Section order: Overview (image + intro + optional `keySpecs` tiles + highlights) → optional **How it works** (`working`, numbered step cards) → optional **Design & construction** (`construction`) → Applications chips → Technical data (`SpecGroups` if rows have a `group`, else `SpecTable`, else the "configured per project" fallback) → related products → CTA. |
| `/about/` | `about.astro` | `site`, `company` (mission/vision/overview/values/industries/facts), `realEntries` | Story (overview + first 3 values panel), mission & vision, values, industry chips, dark "by the numbers" band (real facts only; hidden if none), `CtaBand`. ⚠️ The hero lead hard-codes "Founded in 2025". |
| `/leadership/` | `leadership.astro` | `team` (`realEntries(leadership,'name')`), `company.values` | Team grid (`TeamCard`), headed "Meet the founder(s)" depending on count. If there are no real members, shows a "Led by engineers" state with the 6 values instead. |
| `/company-profile/` | `company-profile.astro` | `site`, `products`, `company` (overview/milestones/certifications/industries/facts) | "Snapshot" `<dl>` (rows filtered with `isPlaceholder`, so GST `NA` drops out) + real facts, "What we do" overview + product-family tiles, `Milestones` timeline (only milestones with real `year`/`title`; section hidden if none), real certs only (else a "documentation on request" panel), hard-coded "Quality & engineering approach" section, `CtaBand`. |
| `/contact/` | `contact.astro` | `site` | Contact details column: address (+ GST line only if not placeholder), phone, email, a static "Business hours" note, a keyless **Google Maps iframe** + "Get directions" link (both built from `site.contact.mapsQuery`), and quote/support shortcut links. Form column: `<ContactForm />` (defaults to `kind="contact"`). No `CtaBand`. |
| `/quote/` | `quote.astro` | `products`, `site` | `<ContactForm kind="quote" />` (adds product/quantity/location/timeline). Sidebar: a hard-coded 4-step "What happens next" list, product-family links, and a call/email fallback. No `CtaBand`. |
| `/support/` | `support.astro` | `site`, `faqs` (real only) | Three support channels (phone, email, on-site), a native `<details>` FAQ accordion (no JS), a "Datasheets & documentation" section, `CtaBand`. |
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
`<main id="main"><slot/></main>`, `<Footer>`, and **the single `<script>`** that powers
all interactivity (see [07](07-styling-motion-accents.md) / [11](11-conventions-and-gotchas.md)).

JSON-LD details: `foundingDate` comes from `site.foundedYear`. The address is split from
`site.location` (locality = first comma part, region = second part, country fixed to
`IN`). `contactPoint` is `sales` with the phone and email. `noindex` emits
`<meta name="robots" content="noindex, nofollow">`. `og:locale` is `en_IN`.

## Adding a page
Create `src/pages/<name>.astro`, wrap in `BaseLayout`, build from components, use
trailing-slash links, and add it to `navLinks`/`footerLinks` in `site.ts` if it should be
discoverable. Dynamic routes need a `getStaticPaths`. See [12](12-common-tasks.md).

---
*Last verified: 2026-10-04.*
