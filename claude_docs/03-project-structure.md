# 03 · Project Structure

Annotated tree (excludes `node_modules/`, `dist/`, `.astro/`, `.git/`).

```
koolvent/
├── astro.config.mjs         # Astro config: site URL, trailingSlash, react+sitemap+tailwind
├── vercel.json              # Vercel: security headers, cache headers, trailingSlash
├── tsconfig.json            # extends astro strict; @/* → src/* alias
├── package.json             # deps + scripts (build runs postbuild TODO guard)
├── CLAUDE.md                # short always-loaded operating brief for Claude
├── README.md                # human README (setup, DNS notes)
├── .env / .env.example      # PUBLIC_WEB3FORMS_KEY (gitignored .env)
│
├── claude_docs/             # ← THIS knowledge base (detailed codebase docs)
│
├── scripts/
│   └── check-no-todos.mjs   # postbuild guard: fails build if "TODO" is in any dist/*.html
│
├── reference/
│   └── original-index.html  # original single-file site — REFERENCE ONLY, not built
│
├── public/                  # served as-is at site root
│   ├── favicon.svg
│   ├── robots.txt
│   └── images/
│       ├── koolvent-logo.png
│       ├── hero/fabrication.jpg          # homepage hero photo
│       ├── products/*.png                # one per product (large ~1MB raw PNGs)
│       └── team/placeholder.svg          # avatar fallback
│
└── src/
    ├── content.config.ts    # blog content collection schema (glob loader)
    │
    ├── layouts/
    │   └── BaseLayout.astro  # <head>, SEO, JSON-LD, header/footer, THE inline interactivity script
    │
    ├── pages/               # routes (one file = one route)
    │   ├── index.astro           # /
    │   ├── products/
    │   │   ├── index.astro       # /products/
    │   │   └── [slug].astro      # /products/<slug>/  (getStaticPaths from products[])
    │   ├── about.astro           # /about/
    │   ├── leadership.astro      # /leadership/
    │   ├── company-profile.astro # /company-profile/
    │   ├── contact.astro         # /contact/
    │   ├── quote.astro           # /quote/
    │   ├── support.astro         # /support/
    │   ├── careers.astro         # /careers/
    │   ├── blog/
    │   │   ├── index.astro       # /blog/
    │   │   └── [...slug].astro   # /blog/<slug>/  (getStaticPaths from collection)
    │   ├── thank-you.astro       # /thank-you/  (noindex, excluded from sitemap)
    │   └── 404.astro             # /404
    │
    ├── components/          # reusable UI (React .tsx, rendered server-side)
    │   ├── Header.tsx  Footer.tsx
    │   ├── Button.tsx  Section.tsx  SectionHeading.tsx  PageHero.tsx
    │   ├── CtaBand.tsx  CapabilityGrid.tsx  Breadcrumbs.tsx
    │   ├── ProductCard.tsx  SpecTable.tsx
    │   ├── TeamCard.tsx  Milestones.tsx
    │   ├── BlogCard.tsx
    │   └── ContactForm.tsx
    │
    ├── data/               # the content model (edit these to change copy)
    │   ├── site.ts         # company-wide: site{}, navLinks, footerLinks
    │   ├── products.ts     # products[] + getProduct() + realSpecs()
    │   ├── company.ts      # mission/vision/overview/values/milestones/certs/industries/facts
    │   ├── team.ts         # leadership[]
    │   ├── faq.ts          # faqs[]
    │   └── careers.ts      # openings[]/benefits[]/howToApply
    │
    ├── content/
    │   └── blog/           # *.md posts; filename (minus .md) = slug = post.id
    │       ├── understanding-suction-guides.md
    │       ├── pressure-vessels-in-hvac-systems.md
    │       └── specifying-valve-kits-for-terminal-units.md
    │
    ├── lib/                # small helpers
    │   ├── accents.ts      # 4-colour accent system (literal Tailwind class strings)
    │   ├── content.ts      # isPlaceholder(), realEntries()  ← placeholder system
    │   └── cn.ts           # tiny className joiner
    │
    └── styles/
        └── global.css      # @import tailwindcss, @theme tokens (brand scale + fonts), all motion utils
```

### Where files come from / feed into
- **Pages** (`.astro`) import **components** (`.tsx`) and **data** (`.ts`) + **content**
  (`.md`). Pages must be `.astro`/`.md` (Astro requirement).
- **`BaseLayout.astro`** wraps every page and is the only place with client JS.
- **`src/data/*`** is the editable content model; **`src/lib/*`** are pure helpers with no
  side effects.

---
*Last verified: 2026-09-25.*
