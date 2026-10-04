# 09 · Forms (Web3Forms, no backend)

The site has no server. The contact and quote forms are handled by **Web3Forms**, a
third-party form-to-email service, via a plain HTML `POST` — **no client JS**.

## Component: `src/components/ContactForm.tsx` — `{ kind?: 'contact' | 'quote' }`
Used on:
- `/contact/` → `<ContactForm />` (no prop; `kind` defaults to `'contact'`)
- `/quote/` → `<ContactForm kind="quote" />` (adds **Product of interest** (from
  `products`), **Estimated quantity**, **Project location**, **Required by / timeline**)

### The key
Reads `import.meta.env.PUBLIC_WEB3FORMS_KEY`. Astro exposes `PUBLIC_`-prefixed env vars at
**build time**, so the key is baked into the static HTML.

- **Key set** → renders the real form, which posts to `https://api.web3forms.com/submit`:
  - Hidden fields: `access_key`; `subject` ("New website enquiry — Koolvent" or
    "New quote request — Koolvent"); `from_name` ("Koolvent Technologies website");
    `redirect` to `${site.url}/thank-you/`.
  - A hidden **honeypot** checkbox (`botcheck`).
  - "Your details" fields: `name`*, `email`*, `phone`, `company`.
  - Quote only, "Your requirement" fields: `product_of_interest` (a `<select>` of product
    names plus "Other / not sure"), `estimated_quantity`, `project_location`, `required_by`.
  - `message`* and a styled `<button type="submit">`.

  Fields marked * are `required`.

  Because `redirect` is built from `site.url` (production), a submission from
  `localhost` or a Vercel preview still lands on the live `koolvent.in/thank-you/`.
- **Key absent** → renders a **friendly fallback card** ("email / call us directly") using
  `site.contact.emailHref` / `phoneHref`, so visitors never see a broken form.

On success, Web3Forms redirects the visitor to **`/thank-you/`** (noindex, out of sitemap).

## Setup
1. Get a free key at <https://web3forms.com> (enter the destination email — where
   submissions should be delivered).
2. Local: copy `.env.example` → `.env` and set `PUBLIC_WEB3FORMS_KEY=...` (`.env` is
   gitignored — never commit real keys).
3. Production: set the same var in **Vercel → Project → Settings → Environment Variables**,
   then redeploy (it's build-time).

## Notes / gotchas
- Because the key is build-time, **changing it requires a rebuild/redeploy** to take effect.
- The submit control is a real `<button>`, **not** the `Button` component (which renders an
  `<a>`). Keep it that way for actual submits.
- The honeypot `botcheck` field must stay hidden — it filters bots.

---
*Last verified: 2026-10-04.*
