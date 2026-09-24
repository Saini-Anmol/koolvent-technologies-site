# claude_docs — Codebase Knowledge Base

**This folder is the single, detailed reference for the entire Koolvent Technologies
website codebase.** It exists so that any Claude Code session (or human) can get fully
up to speed without re-reading every source file.

> **AUTO-READ CONTRACT (for Claude):** At the **start of every session**, read the files
> in this folder **before making any change or answering any non-trivial question about
> the codebase**. Start with this README, then read the numbered file(s) relevant to the
> task. For a broad task (refactor, new page, "go through the codebase"), read all of
> them. These docs are the source of truth for *how* the project is built; the actual
> `src/` files remain the source of truth for *current content/values*. If you find a
> doc that disagrees with the code, trust the code and **update the doc**.

## How these docs are organised

| File | What it covers |
|---|---|
| [00-quick-reference.md](00-quick-reference.md) | One-screen cheat sheet: commands, rules, "where do I change X". Read this first. |
| [01-overview.md](01-overview.md) | What the site is, the business, current company facts, page map. |
| [02-tech-stack-and-build.md](02-tech-stack-and-build.md) | Astro/React/Tailwind stack, commands, the build gate, version pins. |
| [03-project-structure.md](03-project-structure.md) | Full annotated file/folder tree. |
| [04-data-layer.md](04-data-layer.md) | Every `src/data/*.ts` file + the blog content collection (the content model). |
| [05-components.md](05-components.md) | Every component in `src/components/` with its props and behaviour. |
| [06-pages-and-routes.md](06-pages-and-routes.md) | Every route in `src/pages/`, what data it pulls, how it renders. |
| [07-styling-motion-accents.md](07-styling-motion-accents.md) | `global.css`, design tokens, the accent system, all motion utilities. |
| [08-placeholder-system.md](08-placeholder-system.md) | The `TODO:` placeholder system + `isPlaceholder` + the post-build guard. |
| [09-forms.md](09-forms.md) | The Web3Forms contact/quote form and its keyless fallback. |
| [10-deployment.md](10-deployment.md) | Vercel hosting, Hostinger DNS/email, headers, sitemap, env vars. |
| [11-conventions-and-gotchas.md](11-conventions-and-gotchas.md) | House rules, hard constraints, and traps that will bite you. |
| [12-common-tasks.md](12-common-tasks.md) | Step-by-step recipes: add a product, page, blog post, team member, etc. |

## Relationship to `CLAUDE.md`

`CLAUDE.md` (repo root) is the short, always-loaded operating brief. **This folder is the
long form** — it goes deeper into every file and includes recipes and gotchas. Keep the
two consistent: if a fundamental rule changes, update both.

## Keeping these docs current

When you change the codebase in a way that affects architecture, data shape, components,
routes, styling tokens, build behaviour, or deployment, **update the relevant doc in the
same change**. Small copy tweaks in `src/data/*` do not require doc updates; structural
changes do. There is a "Last verified" line at the bottom of each doc — bump it when you
touch that doc.
