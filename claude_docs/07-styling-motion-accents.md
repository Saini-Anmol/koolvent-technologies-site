# 07 · Styling, Motion & the Accent System

## Tailwind v4 — configured in CSS, not JS
There is **no `tailwind.config.js`**. Everything is in `src/styles/global.css`:
- `@import "tailwindcss";`
- `@plugin "@tailwindcss/typography";` (the `prose` classes for blog bodies)
- an `@theme { … }` block defining design tokens.

Tailwind is enabled through the Vite plugin (`@tailwindcss/vite`) in `astro.config.mjs`.

### Design tokens (`@theme`)
- **Fonts:** `--font-sans` = **Inter**, `--font-display` = **Plus Jakarta Sans** (both
  loaded from Google Fonts in `BaseLayout`). Use `font-display` for headings, `font-sans`
  for body. Base CSS already applies `font-display` to `h1–h6` and `font-sans` to `body`.
- **Brand colour scale** `--color-brand-50 … 950` — a cool technical blue ("kool"). Use as
  `brand-600` (primary action), `brand-50/100` (soft tints), etc.
- Neutrals use Tailwind's built-in **`slate`**; dark sections use **`slate-950`**.

### Base layer
`html` has `scroll-behavior: smooth`; `body` is `bg-white font-sans text-slate-700`;
headings get `font-display` + balanced wrapping; focus-visible outlines are `brand-600`;
all `<a>` get a colour transition.

## The accent system (`src/lib/accents.ts`)
A Google-ish four-colour palette layered on the brand blue:
```ts
type Accent = 'brand' | 'emerald' | 'amber' | 'rose';
```
`accents[accent]` returns an object of **literal Tailwind class strings**:
`soft` (tinted bg+text), `text`, `textGroupHover`, `bar` (solid bar), `ring`
(group-hover ring), `glow` (gradient for blurred blobs). `accentOrder` is the display order.

**Usage pattern:** each product family is assigned one accent (`product.accent`); the same
palette rotates through capability grids, chips, glows, the homepage marquee dots, etc.

> 🔴 **Critical rule:** keep these class strings **literal**. Never build accent classes
> with template interpolation like `` `bg-${color}-50` `` — Tailwind v4's content scanner
> only emits classes it can see as complete literal strings, so interpolated classes will
> silently not exist. Always go through `accents[...]`.

## Motion & decorative utilities (all in `global.css`, all gated behind `prefers-reduced-motion`)
Defined under `@layer utilities`; a `@media (prefers-reduced-motion: reduce)` block
neutralises them all.

| Utility | Effect |
|---|---|
| `.reveal` / `.reveal-left` / `.reveal-right` / `.reveal-scale` | Scroll-in reveal. Hidden until the inline script adds `.is-visible`. Stagger with `data-reveal-delay="<ms>"`. |
| `.animate-fade-up` | Above-the-fold entrance; stagger via inline `style="--d: <ms>"`. |
| `.blob-a/-b/-c` + `.animate-glow` | Drifting / pulsing decorative colour blobs. |
| `.animate-float` / `.animate-float-slow` | Gentle float for small chips/cards. |
| `.text-flow` | Animated 4-colour gradient text (used in the hero headline). |
| `.animate-marquee` + `.mask-fade-x` | Infinite marquee strip with faded edges. |
| `.animate-bob` | Subtle bob for the hero scroll cue. |
| `.aurora-halo` | Slowly rotating multicolour halo (hero). |
| `.grid-floor` | Receding perspective grid "floor" (hero effect; note: not currently placed in `index.astro`, available for use). |
| `.cursor-spot` | Soft spotlight following the cursor; JS sets `--mx`/`--my`. |
| `.bg-grid` | Faint grid texture for dark sections. |
| `.strip-flow` | The slim flowing gradient strip in header & footer. |
| `.fx-link` | Underline that grows on hover/focus (works inline & multi-line). |

**Keep motion subtle** — no particles, no parallax, nothing distracting. This is a
professional B2B industrial aesthetic.

## The interactivity script (`BaseLayout.astro`, bottom)
One inline vanilla `<script>` powers **all** client behaviour. It:
1. **Mobile menu** — toggles `#mobile-nav` `hidden`, flips `#nav-toggle` `aria-expanded` +
   the open/close SVG icons.
2. **Header scroll shadow** — sets/removes `data-scrolled` on `#site-header` past 8px.
3. **Hero cursor spotlight** — on fine-pointer, non-reduced-motion devices, updates
   `--mx`/`--my` on `#hero-spot` from `#hero` pointer moves (rAF-throttled).
4. **Scroll reveal** — `IntersectionObserver` adds `.is-visible` to `.reveal` elements
   (honouring `data-reveal-delay`); if reduced-motion or no IO, reveals everything
   immediately.

**To add interactivity:** extend this script + add matching `id`/`data-` hooks in markup.
**Do not** add `client:load`/`client:visible` (that ships ~195 KB of React runtime).

## Visual direction (house style)
Clean, colourful, professional B2B industrial: generous whitespace, subtle
`border-slate-200` borders, `rounded-xl`/`rounded-2xl`, soft shadows, pill buttons.
`brand-600` is the primary-action colour; the other three accents map to meaning (product
families). `slate-950` for dark sections.

---
*Last verified: 2026-09-25.*
