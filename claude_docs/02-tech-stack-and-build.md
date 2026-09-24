# 02 · Tech Stack & Build

## Stack
- **Astro 5** (`astro@^5.18.0`) — static site generator; output is a plain static `dist/`.
- **React 19** (`react@^19` / `react-dom@^19`) via `@astrojs/react@^4.4.2` — used for
  reusable UI components, **rendered server-side only** (no hydration).
- **Tailwind CSS v4** (`tailwindcss@^4.1.0`) via `@tailwindcss/vite` — configured in CSS,
  **no `tailwind.config.js`**.
- **`@tailwindcss/typography`** — `prose` styles for blog article bodies.
- **`@astrojs/sitemap`** — generates `sitemap-index.xml` at build.
- **TypeScript** — extends `astro/tsconfigs/strict`. Path alias `@/* → src/*`.

`astro.config.mjs` wires it together:
```js
site: 'https://koolvent.in',
trailingSlash: 'always',
integrations: [react(), sitemap({ filter: p => !p.includes('/thank-you') })],
vite: { plugins: [tailwindcss()] },
```

## Commands
| Command | Purpose |
|---|---|
| `npm install` | Install deps (once). |
| `npm run dev` / `npm start` | Dev server at `http://localhost:4321`. |
| `npm run build` | Static build → `dist/`, then runs the `postbuild` TODO guard. |
| `npm run preview` | Serve the production build locally. |
| `npm run check:dist` | Run the TODO guard standalone against an existing `dist/`. |
| `npm run astro` | Astro CLI passthrough. |

## The build is the only gate
There is **no test suite, no ESLint, and no `astro check`** configured. The one automated
check is `npm run build` — it must complete with no errors.

### `.tsx` is transpiled, not type-checked
During the build, React `.tsx` files are **transpiled without type-checking**, so a type
error will **not** fail the build — it silently ships. Be deliberate with types; you don't
get a compiler safety net for component code. (Astro's own `.astro` frontmatter is checked
more strictly, but there's no `astro check` in the pipeline either.)

### The `postbuild` TODO guard
`scripts/check-no-todos.mjs` runs automatically after `build` (npm `postbuild` hook). It
recursively greps every `dist/**/*.html` for the string **`TODO`** and **exits non-zero
(fails the build) if any is found**. This is the backstop that keeps placeholder text off
the live site. `npm run check:dist` runs the same guard on its own.

> Because the guard only scans `dist/`, docs in this `claude_docs/` folder and comments in
> `src/` may freely contain the word "TODO" — they never reach `dist/`.

## Version pins — do NOT "upgrade" casually
The project is intentionally held at **Astro 5 + `@astrojs/react@4.x`**.
`@astrojs/react@5.x` targets **Astro 6** and pulls in **Vite 8 + Rolldown**, which breaks
the dev server (`Missing field moduleType` in `vite-react-refresh-wrapper`). If a real
migration to Astro 6 is needed, upgrade Astro **and** the React integration **together**
(`npx @astrojs/upgrade`) — never one without the other.

---
*Last verified: 2026-09-25.*
