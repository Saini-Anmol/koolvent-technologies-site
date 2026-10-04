# 04 · Data Layer (the content model)

Everything the site *says* lives here. Pages import these and render them. **Never
hard-code company facts into page markup.** Unknown values are written as `TODO: …` and
auto-hidden (see [08](08-placeholder-system.md)).

---

## `src/data/site.ts` — company-wide single source of truth

Exports:
- **`site`** (`as const`):
  - `name`, `shortName`, `tagline`, `description`, `url`, `foundedYear`, `location`
  - `gst`
  - `contact`: `phone`, `phoneHref`, `email`, `emailHref`, `address`, `mapsQuery`
    (`mapsQuery` feeds the Google Maps embed + directions link on `/contact/`; add a Plus
    Code prefix for a precise pin)
  - `social`: `linkedin`, `instagram`, `x` (any `#` value is treated as unset and dropped
    from the JSON-LD `sameAs` array in `BaseLayout`)
- **`navLinks`** — primary header nav: Home, Products, About, Leadership, Contact.
- **`footerLinks`** — three grouped footer columns: **Company** (About, Leadership, Company
  Profile, Careers), **Products** (All + one link per product), **Support** (Quote,
  Technical Support, Blog, Contact).

**Consumed by:** `Header`, `Footer`, `ContactForm`, `BaseLayout` (JSON-LD + OG), and nearly
every page. Change a value here and it updates everywhere.

> ⚠️ If you change the product slugs in `products.ts`, update the hard-coded product links
> in `footerLinks` to match (they are literal strings, not generated).

---

## `src/data/products.ts` — product catalogue

```ts
interface Product {
  slug: string;            // URL slug + key
  name: string;
  summary: string;         // one-line, used on cards
  image: string;           // /images/products/*.png|jpg
  accent: Accent;          // 'brand' | 'emerald' | 'amber' | 'rose'
  intro: string;           // marketing intro on the detail page
  highlights: string[];    // key features (bullets)
  applications: string[];  // typical uses (chips)
  specs: SpecRow[];        // { label, value, group? } — rows with `group` render as grouped cards
  // Optional (only the air-vent products use these today):
  keySpecs?: { label; value }[];       // at-a-glance tiles under the intro
  working?: { title; body }[];         // "How it works" numbered steps
  construction?: string[];             // "Design & construction" points
  imageFit?: 'cover' | 'contain';      // 'contain' = cut-out shot on white, no cropping
  category?: string;                   // small label under the name (air vents: 'Air Purging Valve')
}
```
Exports: **`products: Product[]`**, **`getProduct(slug)`**, **`realSpecs(p)`** (returns only
spec rows whose value is not a `TODO:` placeholder), **`productImageClass(p)`** (image
classes for `imageFit`), and the `SpecRow` type.

Current products & accents (7):
- `suction-guide` (brand), `pressure-vessel` (emerald), `hot-water-generator` (amber),
  `valve-kit` (rose). Most long-form copy is placeholder (`intro`/`highlights`/
  `applications` are real defaults; `specs` values are mostly `TODO:`).
- **Air vents** (added 2026-10-04; `.jpg` images, `imageFit: 'contain'`): `autovent`
  (amber, brass), `autovent-ss` (brand), `megavent-ss` (emerald). They have real grouped
  specs (General / Materials / Ratings), `keySpecs`, `construction`, and the shared
  `floatVentSteps` working principle. The content was rewritten from the owner's supplied
  reference, with no third-party brand.

**Appending one object here automatically creates:** its homepage card, its `/products/`
tile, and a full detail page at `/products/<slug>/` (via `getStaticPaths` in
`src/pages/products/[slug].astro`). See recipe in [12](12-common-tasks.md).

If a product has no real specs, the detail page shows a "specs configured per project"
panel instead of an empty table. The optional sections (key specs, How it works, Design &
construction) only render when their field is set.

---

## `src/data/company.ts` — company narrative

Exports:
- **`mission`**, **`vision`**, **`overview`** — strings.
- **`values[]`** — `{ title, description }` (6 company values).
- **`milestones[]`** — `{ year, title, description }` timeline (rendered by `Milestones`).
- **`certifications[]`** — `{ name, description? }`. **All currently `TODO:` and hidden.**
  ⚠️ Never publish a specific cert (ISO/BIS/IBR/CE/ASME…) until the certificate is in hand.
- **`industries[]`** — string list of sectors served.
- **`facts[]`** — `{ label, value }` "by the numbers". Current real rows: Established
  (2025), Product families (10+), Industries served (8+), Engineered & made in (Noida,
  India). "Facility area" and "Projects delivered" are `TODO` and hidden. Pages filter with
  `realEntries(facts, 'value')`.

**Drives:** `/about/` and `/company-profile/`. `/leadership/` also uses `values` for its
empty state.

> ⚠️ Founding-year inconsistency: this file says **2025** in `overview`, `milestones`, and
> the "Established" fact, but `site.foundedYear` is **2026**. The full list of places to
> reconcile is in [01](01-overview.md) ("Known data inconsistencies").
> The "10+ product families" fact doesn't match the 7 products either.

---

## `src/data/team.ts` — leadership

```ts
interface TeamMember { name; role; bio; image; linkedin?; }
```
Export **`leadership: TeamMember[]`**. Currently **one** member: `Shivam — Founder and CEO`
(bio is a `TODO:` placeholder → hidden; image is the placeholder SVG → initials avatar).
`linkedin` is `undefined`, so no LinkedIn link shows. Entries whose `name` is a `TODO:`
placeholder are hidden. Drives `/leadership/` via `TeamCard`. The section heading adapts
to the count ("Meet the founder" vs "Meet the founders").

---

## `src/data/faq.ts` — support FAQ

Export **`faqs: Faq[]`** (`{ question, answer }`). 8 sensible default Q&As (lead times,
custom spec, documentation, export, MOQ, warranty, on-site support, how to quote). Any
answer left as `TODO:` is hidden. Drives the `/support/` accordion.

---

## `src/data/careers.ts` — careers

Exports:
- **`openings: Opening[]`** (`{ title, location, type, summary }`) — **empty by default**;
  the page shows a friendly "no current openings / speculative applications welcome" state.
  Roles whose `summary` is `TODO:` are hidden.
- **`benefits: Benefit[]`** (`{ title, description }`) — 6 culture/benefit blurbs. One of
  them hard-codes "Founded in 2025" (see the founding-year note above).
- **`howToApply`** — string (interpolates `site.contact.email`).

Drives `/careers/`.

---

## `src/content/blog/*.md` + `src/content.config.ts` — blog content collection

Astro content collection named **`blog`**, loaded with `glob({ pattern: '**/*.md', base:
'./src/content/blog' })`. Frontmatter schema (Zod):

| Field | Type | Notes |
|---|---|---|
| `title` | string | required |
| `description` | string | required |
| `pubDate` | date (`z.coerce.date()`) | required |
| `updatedDate` | date | optional |
| `author` | string | defaults to `"Koolvent Technologies"` |
| `heroImage` | string | optional; falls back to a gradient placeholder in `BlogCard` |
| `tags` | string[] | defaults to `[]` |
| `draft` | boolean | defaults `false`; `/blog/` filters out drafts |

**Slug = filename without `.md`**, exposed as `post.id`. Current posts (all
`draft: false`, no `heroImage`):
`understanding-suction-guides` (2025-08-14), `pressure-vessels-in-hvac-systems`
(2025-11-03), `specifying-valve-kits-for-terminal-units` (2026-02-20).

`/blog/` lists non-draft posts newest-first; `/blog/[...slug].astro` renders one via
`<Content />` (from `render(post)`) inside a `prose` container.

> ⚠️ `draft` only hides a post from the `/blog/` listing. `[...slug].astro` builds a page
> for **every** post, so a draft still gets a live URL at `/blog/<slug>/` and goes into the
> sitemap.

---
*Last verified: 2026-10-04.*
