# 12 · Common Tasks (recipes)

Practical, copy-the-pattern guides. After any change, run `npm run build` — it's the only
gate, and it must pass (including the TODO guard).

## Add / edit a product
1. Edit `src/data/products.ts`; append a `Product` object (`slug`, `name`, `summary`,
   `image`, `accent`, `intro`, `highlights[]`, `applications[]`, `specs[]`).
2. Drop the image in `public/images/products/<slug>.png` and point `image` at it.
3. Use real copy where you have it; write unknowns as `TODO:` (spec rows with `TODO:` values
   auto-hide via `realSpecs`).
4. That's it — the homepage card, the `/products/` tile, and `/products/<slug>/` are
   generated automatically. **Also** add a footer link in `site.ts → footerLinks` (Products
   group) if you want it in the footer (those links are literal).
5. Pick an `accent` from `'brand' | 'emerald' | 'amber' | 'rose'`.

## Change a company fact (phone, email, address, name, GST, socials, nav, footer)
Edit `src/data/site.ts`. It's the single source of truth; the header, footer, contact page,
forms, and JSON-LD all read from it. For the contact-page map, update `contact.mapsQuery`
too (add a Plus Code prefix for a precise pin). To hide a value, set it to `NA`/`N/A` or
`TODO:` (both are treated as placeholders and hidden).

## Add a blog post
1. Create `src/content/blog/<slug>.md`. Filename (minus `.md`) = the URL slug (`post.id`).
2. Frontmatter (required: `title`, `description`, `pubDate`; optional: `updatedDate`,
   `author`, `heroImage`, `tags`, `draft`). See schema in [04](04-data-layer.md).
3. Write the body in Markdown (renders inside a `prose` container).
4. `draft: true` keeps it off `/blog/` until you're ready.

## Add / edit a team member
Edit `src/data/team.ts` (`leadership[]`). Real `bio` shows; a `TODO:` bio is hidden. Put a
photo in `public/images/team/` and set `image`; otherwise the card shows an initials avatar.
Set `linkedin` to show a LinkedIn link. Members with a `TODO:` `name` are hidden entirely.

## Edit FAQ / careers
- FAQ: `src/data/faq.ts` (`faqs[]`, `{question, answer}`). `TODO:` answers hide.
- Careers: `src/data/careers.ts` — add roles to `openings[]` (`TODO:` summary hides them;
  empty array → "no current openings" state). `benefits[]` and `howToApply` are also here.

## Add a new page
1. Create `src/pages/<name>.astro`, wrap content in `BaseLayout` (set `title`/`description`,
   `noindex` for utility pages).
2. Compose from components: `PageHero`, `Section`, `SectionHeading`, `CtaBand`, etc.
3. Use trailing-slash internal links.
4. Add it to `navLinks` and/or `footerLinks` in `site.ts` if it should be discoverable.
5. Dynamic route? Export `getStaticPaths` (see `products/[slug].astro` or
   `blog/[...slug].astro`).

## Add interactivity (a toggle, an accordion, etc.)
Do **not** add `client:*`. Instead:
1. Render markup with `id`/`data-` hooks from a component.
2. Extend the inline `<script>` at the bottom of `BaseLayout.astro` with a small vanilla
   handler that reads those hooks. Gate motion behind `prefers-reduced-motion`.

## Change colours, fonts, or motion
Edit `src/styles/global.css`: brand scale + font tokens in `@theme`; motion/decoration
utilities under `@layer utilities` (keep the `prefers-reduced-motion` block in sync). For
accent-to-family mapping, edit `src/lib/accents.ts` (keep class strings literal).

## Enable the forms
Set `PUBLIC_WEB3FORMS_KEY` in `.env` (local) and Vercel (prod), then rebuild. See [09](09-forms.md).

## Verify before shipping
```bash
npm run build     # must pass; postbuild guard must report "No TODO placeholders"
npm run preview   # eyeball the production build locally
```

---
*Last verified: 2026-09-25.*
