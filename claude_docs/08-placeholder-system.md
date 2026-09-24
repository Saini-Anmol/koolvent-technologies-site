# 08 · The Placeholder System (`TODO:`)

The owner hasn't supplied every real fact yet (exact specs, certifications, some figures,
GST, social URLs). Rather than invent or ship blanks, the codebase uses an explicit
placeholder convention that is **never shown to visitors** and is **enforced by the build**.

## The convention
Any unsupplied company-specific value is written as a string starting with **`TODO:`**
(e.g. `value: 'TODO: e.g. DN50–DN300'`). Write **all** placeholder content this way so it's
caught by the guard and hidden by the helpers.

**Never invent** real-looking names, certifications, prices, GST numbers, or precise specs.
Keep unknowns as `TODO:`.

## The helper (`src/lib/content.ts`)
```ts
isPlaceholder(value): boolean
// true when value is empty/nullish, starts with "todo" (case-insensitive),
// OR is "NA" / "N/A" (case-insensitive).

realEntries(items, key): T[]
// keeps only items whose item[key] is not a placeholder.
```

> **Note:** `isPlaceholder` also treats **`NA` / `N/A`** as "not available". This was added
> so that fields explicitly set to `NA` (e.g. `site.gst = 'NA'`) are hidden the same way as
> `TODO:` — the GST line then disappears from the footer, contact page, and company-profile
> snapshot instead of rendering "GST: NA".

## How pages use it
Pages filter or conditionally render so placeholders never appear:
- Product with no real specs → `realSpecs(p)` is empty → detail page shows a "specs
  configured per project" panel instead of a table.
- `/leadership/` → `realEntries(leadership, 'name')`; empty → "engineering-led team /
  profiles coming soon" state. `TeamCard` also hides a placeholder `bio` and shows an
  initials avatar when there's no real photo.
- Certifications grid → `realEntries(certifications, 'name')`; empty → "documentation
  available on request".
- `facts` → `realEntries(facts, 'value')`; company-profile "snapshot" and GST filtered with
  `isPlaceholder`.
- FAQ / careers openings → filtered by `isPlaceholder` on `answer` / `summary`.
- GST line (footer, contact) → rendered only when `!isPlaceholder(site.gst)`.

## The backstop (`scripts/check-no-todos.mjs`)
Runs automatically as the npm **`postbuild`** step (and via `npm run check:dist`). It
recursively scans **`dist/**/*.html`** for the literal string **`TODO`** and **fails the
build** if any is found — printing the offending files. So if a placeholder ever leaks into
rendered HTML, the build breaks before it can ship.

Because it only scans `dist/`, the word "TODO" is fine in source comments and in these
`claude_docs/` files — they never reach `dist/`.

## When adding content
- Real value available → put the real value in.
- Not available → write `TODO: <hint about what's needed>` and make sure the consuming
  page/component hides it (most already do via the helpers).
- If you add a **new** placeholder field that a page renders directly, wrap it in an
  `isPlaceholder(...)` check or filter, or the build guard will (correctly) fail.

---
*Last verified: 2026-09-25.*
