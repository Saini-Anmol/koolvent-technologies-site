# 05 · Components

All in `src/components/`, React `.tsx`, **rendered server-side only** (no `client:*`, no
hydration). They emit static HTML/CSS; any interactivity comes from the inline script in
`BaseLayout.astro` reading `id`/`data-` hooks. Study `src/pages/index.astro` for house
style. Class strings are joined with `cn()` (`src/lib/cn.ts`).

## Layout / chrome
### `Header.tsx` — `{ pathname }`
Sticky, server-rendered top bar. Logo + wordmark, desktop nav from `navLinks`, a "Get a
Quote" CTA, and a mobile menu button. Active-link state via `isActive(href)`. Interactivity
hooks (wired by BaseLayout's script): `#site-header` (scroll shadow via `data-scrolled`),
`#nav-toggle` (button, toggles `aria-expanded` + icon swap), `#mobile-nav` (`hidden`
toggled). Top edge shows the `.strip-flow` gradient strip.

### `Footer.tsx` — no props
Brand column (logo, description, GST line **only when `!isPlaceholder(site.gst)`**), the
three `footerLinks` columns, social icons (LinkedIn/Instagram/X/Email — each `href` from
`site`), copyright + `site.location`. Also renders the `.strip-flow` strip.

## Page-building primitives
### `Section.tsx` — `{ id?, bg?, spacing?, className?, innerClassName?, children }`
Full-bleed background + centered `max-w-7xl` container. `bg`: `white | slate | dark`.
`spacing`: `normal` (`py-16 sm:py-20 lg:py-24`) | `tight`. Adds `scroll-mt-20` when `id` set.

### `SectionHeading.tsx` — `{ eyebrow?, title, align?, tone?, className?, children? }`
Eyebrow + `<h2>` + optional supporting copy (children). `align`: `left | center` (default
center). `tone`: `dark` (default, dark text) | `light` (for dark backgrounds).

### `PageHero.tsx` — `{ eyebrow?, title, lead?, breadcrumbs?, tone?, size?, children? }`
Standard interior-page header. **Light + colourful by default** (white band with soft
blue/green/amber blobs); `tone="dark"` for a slate-950 variant. `size`: `md | sm`.
`breadcrumbs` renders `Breadcrumbs`. `children` = CTA buttons under the lead. Entrance uses
staggered `.animate-fade-up` via a `--d` custom property.

### `Button.tsx` — `{ href, variant?, size?, className?, children }`
**Renders an `<a>`** (a link, not a form control). `variant`: `primary | gradient |
secondary | ghost | white | outline-dark`. `size`: `md | lg`.
⚠️ **For a real form submit, use a styled `<button>`, not this** (see `ContactForm`).

### `CtaBand.tsx` — `{ title, lead?, primary?, secondary?, variant? }`
Reusable closing call-to-action band. `variant`: `gradient` (default, brand gradient) |
`dark` | `light`. `primary` defaults to `{ Request a quote → /quote/ }`. Write distinct
copy per page.

### `Breadcrumbs.tsx` — `{ items: Crumb[], tone? }`
`Crumb = { label, href? }`. Last item is rendered as current (`aria-current="page"`),
non-last with `href` become links. `tone`: `dark | light`.

## Content-specific
### `CapabilityGrid.tsx` — `{ items?, className? }`
4-up value/feature grid; rotates accent colours by index. `defaultCapabilities(cityName =
'Noida')` supplies the standard four (Engineered to code / Built in India / Made to your
spec / Supported end to end) with inline SVG icons. Pass `items` to override. Cards use
`.reveal` + `data-reveal-delay`.

### `ProductCard.tsx` — `{ product, index? }`
Whole-card link to `/products/<slug>/` (via an `::after` overlay on the title link). Accent
bar + hover ring/text colour come from `product.accent`. `index` staggers the scroll
reveal. Uses `.reveal reveal-scale`.

### `SpecTable.tsx` — `{ rows: {label,value}[], className? }`
`<dl>` styled as a two-column table on `sm+`, stacks label-over-value on mobile. Zebra
striping on odd rows. Feed it `realSpecs(product)` so placeholder rows are excluded.

### `TeamCard.tsx` — `{ member }`
Photo, or an **initials avatar** when `image` is missing/the placeholder SVG. **Hides the
bio** when it's a `TODO:` placeholder. Shows a LinkedIn link only if `member.linkedin` set.

### `Milestones.tsx` — `{ items: {year,title,description}[] }`
Vertical timeline with connecting line + year markers. Used on `/company-profile/`.

### `BlogCard.tsx` — `{ post: CollectionEntry<'blog'> }`
Card for a blog post. Hero image or a **gradient placeholder** when no `heroImage`. Shows
tags, title (whole-card link to `/blog/<id>/`), clamped description, author + formatted
`pubDate`.

### `ContactForm.tsx` — `{ kind?: 'contact' | 'quote' }`
The only interactive-ish component, but still **no client JS** — it's a plain HTML form
posting to Web3Forms. See [09-forms.md](09-forms.md) for full detail (fields, honeypot,
keyless fallback, redirect to `/thank-you/`).

---
*Last verified: 2026-09-25.*
