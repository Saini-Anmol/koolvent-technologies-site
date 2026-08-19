# Koolvent Technologies — website

Marketing website for **Koolvent Technologies**, a B2B manufacturer of precision-engineered
HVAC & fluid-control components (Noida, India, est. 2025). Built with
[Astro 5](https://astro.build/) + [React 19](https://react.dev/) components +
[Tailwind CSS v4](https://tailwindcss.com/), deployed as a static site to
[`koolvent.in`](https://koolvent.in) on Vercel.

Astro renders the pages (fast static HTML, SEO-friendly); UI is written as React
components (`src/components/*.tsx`) that are **rendered server-side only**, so the site
ships almost no JavaScript. The little interactivity that exists (mobile menu, header
scroll shadow, hero cursor spotlight, scroll-reveal) is a single inline vanilla script in
the layout.

## Quick start

```bash
npm install      # once
npm run dev      # dev server at http://localhost:4321
npm run build    # static output → dist/  (also runs the TODO guard; must succeed clean)
npm run preview  # serve the production build locally
```

`npm run build` is the project's only gate — there is no test suite or linter. After
building it runs `scripts/check-no-todos.mjs`, which **fails the build if any `TODO`
placeholder text reached the generated HTML** (see [Placeholder content](#placeholder-content)).

> **Version note — don't upgrade casually.** The project stays on **Astro 5** +
> **`@astrojs/react@4.x`** on purpose. `@astrojs/react@5.x` targets Astro 6 and pulls in
> Vite 8 + Rolldown, which currently breaks the dev server (`Missing field moduleType` in
> `vite-react-refresh-wrapper`). If you move to Astro 6, upgrade Astro and the React
> integration together (`npx @astrojs/upgrade`).

## Tech stack

| | |
|---|---|
| Framework | Astro 5 (static output) |
| UI components | React 19 (`.tsx`), server-rendered only — **no `client:` directives** |
| Styling | Tailwind CSS v4, configured in CSS (`src/styles/global.css`) — no `tailwind.config.js` |
| Fonts | Plus Jakarta Sans (headings), Inter (body) — via Google Fonts |
| Forms | [Web3Forms](https://web3forms.com) (no backend) |
| Sitemap | `@astrojs/sitemap` |
| Hosting | Vercel (static) · domain + email on Hostinger |
| Path alias | `@/* → src/*` |

## Pages

| Route | File | Notes |
|---|---|---|
| `/` | `src/pages/index.astro` | Animated hero, capabilities, about, products grid, CTA |
| `/products/` | `src/pages/products/index.astro` | Product listing |
| `/products/<slug>/` | `src/pages/products/[slug].astro` | One page per entry in `src/data/products.ts` |
| `/about/` | `src/pages/about.astro` | Story, mission/vision, values, industries, stats |
| `/leadership/` | `src/pages/leadership.astro` | Team grid (from `src/data/team.ts`) |
| `/company-profile/` | `src/pages/company-profile.astro` | Formal corporate overview + milestones |
| `/contact/` | `src/pages/contact.astro` | Details + map link + contact form |
| `/quote/` | `src/pages/quote.astro` | Quote-request form |
| `/support/` | `src/pages/support.astro` | Channels + FAQ accordion + resources |
| `/careers/` | `src/pages/careers.astro` | Culture, openings (from `src/data/careers.ts`) |
| `/blog/` + `/blog/<slug>/` | `src/pages/blog/*` | Content collection (`src/content/blog/*.md`) |
| `/thank-you/` | `src/pages/thank-you.astro` | Post-submit page (noindex, excluded from sitemap) |
| `/404` | `src/pages/404.astro` | |

All internal links use a **trailing slash** (`trailingSlash: 'always'`) — always link with one.

## Project layout

```
public/                       static assets served as-is
  images/                     logo, product images, hero, team photos
  favicon.svg, robots.txt
src/
  data/                       content as data — edit these to change copy:
    site.ts                   company info, nav & footer links (single source of truth)
    products.ts               product catalogue (drives cards, listing & detail pages)
    company.ts                mission, vision, values, milestones, certs, industries, facts
    team.ts                   leadership profiles
    faq.ts                    support FAQ
    careers.ts                openings, benefits, how-to-apply
  content/blog/               Markdown blog posts (Astro content collection)
  content.config.ts           blog collection frontmatter schema
  layouts/BaseLayout.astro    <head> (SEO/OG/JSON-LD), header + footer, the one inline script
  components/                 React (.tsx) — Section, PageHero, SectionHeading, Button,
                              CtaBand, CapabilityGrid, Breadcrumbs, ProductCard, SpecTable,
                              TeamCard, Milestones, BlogCard, ContactForm, Header, Footer
  lib/                        cn.ts (className combiner), accents.ts (4-colour accent system),
                              content.ts (isPlaceholder / realEntries — hide TODO content)
  pages/                      routes (.astro)
  styles/global.css           Tailwind import + design tokens (brand colours, fonts) + motion
scripts/check-no-todos.mjs    post-build guard — fails the build if TODO text reaches dist/
reference/original-index.html the original single-file site, kept for reference only
astro.config.mjs, vercel.json, tsconfig.json
```

## Editing content

**To change copy, edit the data files in `src/data/` (and `src/content/blog/` for posts)** —
the pages render from them, so you rarely touch page markup.

- **Add a product:** append an object to `products` in `src/data/products.ts`. Its homepage
  card, `/products/` tile, and full detail page at `/products/<slug>/` appear automatically.
  Give it an `accent` (`brand` / `emerald` / `amber` / `rose`) and an image under
  `public/images/products/`.
- **Add a blog post:** drop a Markdown file in `src/content/blog/`. Required frontmatter:
  `title`, `description`, `pubDate`; optional `updatedDate`, `author`, `heroImage`, `tags`,
  `draft`. The filename (minus `.md`) becomes the URL slug.
- **Company facts:** `src/data/site.ts` (name, contact, GST, social, nav/footer links).

### Placeholder content

Facts the owner hasn't supplied yet are written as **`TODO: …`** in the data files. These are
**never shown to visitors** — pages hide them and show a graceful fallback instead (e.g. a
product with no real specs shows a "specs configured per project" panel; `/leadership/` shows
"profiles coming soon" until real names are added). As a backstop, **`npm run build` fails if
any `TODO` text reaches the generated HTML.** When you add unknown content, write it as
`TODO: …` — and never invent real-looking names, certifications, GST numbers, or specs.

### Design system

Clean, colourful, professional B2B industrial. A primary brand blue plus a small four-colour
accent palette (blue / emerald / amber / rose — see `src/lib/accents.ts`) used for product
families, icon chips, section accents and gradient flourishes. Pill-shaped buttons, light
`PageHero`s (dark variant available), a reusable `CtaBand`, and `CapabilityGrid`. Headings use
Plus Jakarta Sans, body uses Inter. `brand-600` is the primary-action colour; the other three
accents carry meaning — keep colour disciplined. Motion utilities live in `global.css` and all
respect `prefers-reduced-motion`; add `class="reveal"` to fade blocks in on scroll.

## Contact / quote forms (Web3Forms)

The Contact and Quote forms post to [Web3Forms](https://web3forms.com) — no backend needed.
They read the access key from `import.meta.env.PUBLIC_WEB3FORMS_KEY`. Until it's set, the form
is replaced by a friendly "email / call us directly" card so visitors always see something
usable. Successful submissions redirect to `/thank-you/`.

1. Get a free key at [web3forms.com](https://web3forms.com) (enter the inbox that should
   receive submissions).
2. `cp .env.example .env` and set `PUBLIC_WEB3FORMS_KEY=...` (`.env` is gitignored).
3. On Vercel, add the same variable under **Project → Settings → Environment Variables**,
   then redeploy.

## Deploying — Vercel + the `koolvent.in` domain (bought on Hostinger)

The site is a static build (`dist/`); Vercel auto-detects Astro.

1. **Push this repo to GitHub** (or GitLab/Bitbucket).
2. On **vercel.com** → *Add New… → Project* → import the repo. Framework preset **Astro**
   (build command `npm run build`, output directory `dist`). Deploy.
3. Add the env var `PUBLIC_WEB3FORMS_KEY` (see the forms section) and redeploy.
4. **Connect the domain:** *Project → Settings → Domains* → add `koolvent.in` and
   `www.koolvent.in`. Vercel shows the DNS records to create.
5. **Point DNS at Vercel from Hostinger** (keep Hostinger's nameservers so email keeps
   working): Hostinger → *Domains → koolvent.in → DNS zone*:
   - **A record** — host `@`, value `76.76.21.21` (confirm against what Vercel shows).
   - **CNAME record** — host `www`, value `cname.vercel-dns.com`.
   - Remove any conflicting old `@` / `www` records. **Do not touch the `MX` / mail records** —
     email is hosted on Hostinger.
6. DNS propagates in minutes–hours; Vercel issues HTTPS automatically. Set the primary domain
   (e.g. redirect `www` → apex) in *Settings → Domains*.

`astro.config.mjs` already sets `site: 'https://koolvent.in'` (canonical URLs + sitemap) and
`vercel.json` adds security headers, long-cache `immutable` headers for hashed `/_astro/*`
assets, and `trailingSlash: true`.

## Outstanding content / assets (`TODO:`)

Most copy has sensible defaults. The remaining company-specific items are **hidden until
supplied** — search the repo for `TODO:`:

- **Company** — confirm the GST number, real company email, address (`src/data/site.ts`).
- **Leadership** — real bios, LinkedIn URLs and photos under `public/images/team/`
  (`src/data/team.ts`). Until then `/leadership/` shows a "profiles coming soon" state.
- **Products** — real sizes, materials, connections and ratings per spec table
  (`src/data/products.ts`). `TODO:` spec rows are dropped; a product with none shows a
  "specs configured per project" panel.
- **Certifications** — add to `src/data/company.ts` **only once each certificate is in hand.**
- **Numbers / milestones / facility photo** — verified figures and a real photo
  (`src/data/company.ts`).
- **Social** — real LinkedIn / Instagram / X URLs (`src/data/site.ts`).
- **Contact map** — optionally swap the "Open in Google Maps" link for an embedded map
  (`src/pages/contact.astro`).
- **Company profile PDF** — optional; drop it in `public/` and link it.
- **Social card** — a 1200×630 PNG at `public/og-image.png` (referenced in `BaseLayout.astro`;
  currently falls back to the logo).
- **Forms** — set `PUBLIC_WEB3FORMS_KEY` (see above).

### Known image limitation (not blocking)
The product PNGs in `public/images/products/` are large raw files (~1 MB each) and
`pressure-vessel.png` has a baked-in label. Replacing them with clean, consistent renders and
moving images to `src/assets/` + Astro's `<Image>` (resize / webp) is a worthwhile follow-up.
