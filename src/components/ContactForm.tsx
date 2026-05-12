/**
 * ContactForm — server-rendered Web3Forms form (no client JS required).
 *
 * Set PUBLIC_WEB3FORMS_KEY in `.env` (free key at web3forms.com) to enable
 * submissions. When the key is absent the form is replaced with a friendly
 * "reach us directly" card so visitors always see something usable.
 */
import { products } from '@/data/products';
import { site } from '@/data/site';

// Astro exposes PUBLIC_-prefixed env vars at build time.
const WEB3FORMS_KEY = import.meta.env.PUBLIC_WEB3FORMS_KEY as string | undefined;

interface ContactFormProps {
  kind?: 'contact' | 'quote';
}

const inputClass =
  'w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-slate-900 placeholder-slate-400 transition focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/40';
const labelClass = 'mb-1.5 block text-sm font-medium text-slate-700';
const fieldClass = 'flex flex-col';
const req = (
  <span className="text-rose-500" aria-hidden="true">
    {' '}
    *
  </span>
);

export default function ContactForm({ kind = 'contact' }: ContactFormProps) {
  const isQuote = kind === 'quote';
  const subject = isQuote ? 'New quote request — Koolvent' : 'New website enquiry — Koolvent';

  if (!WEB3FORMS_KEY) {
    // Friendly fallback so visitors never see a "form broken" message.
    return (
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8">
        <h3 className="font-display text-lg font-semibold text-slate-900">
          {isQuote ? 'Send us your requirements' : 'Get in touch'}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          {isQuote
            ? 'Email us the product family, sizes or spec, quantity, project location and timeline, and our engineering team will respond with a tailored proposal.'
            : "Email or call us and we'll get back to you promptly."}
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a
            href={site.contact.emailHref}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
            {site.contact.email}
          </a>
          <a
            href={site.contact.phoneHref}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 transition hover:bg-slate-100"
          >
            <svg className="h-4 w-4 text-brand-600" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.5.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.6c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.5.1.4 0 .8-.3 1l-2.3 2.3z" />
            </svg>
            {site.contact.phone}
          </a>
        </div>
      </div>
    );
  }

  return (
    <form action="https://api.web3forms.com/submit" method="POST" className="space-y-6">
      <input type="hidden" name="access_key" value={WEB3FORMS_KEY} />
      <input type="hidden" name="subject" value={subject} />
      <input type="hidden" name="from_name" value="Koolvent Technologies website" />
      <input type="hidden" name="redirect" value={`${site.url}/thank-you/`} />
      {/* Honeypot — must stay hidden */}
      <input
        type="checkbox"
        name="botcheck"
        className="hidden"
        style={{ display: 'none' }}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <fieldset className="space-y-6">
        <legend className="text-sm font-semibold text-slate-900">Your details</legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className={fieldClass}>
            <label htmlFor="cf-name" className={labelClass}>
              Full name{req}
            </label>
            <input id="cf-name" name="name" type="text" required autoComplete="name" placeholder="Jane Smith" className={inputClass} />
          </div>
          <div className={fieldClass}>
            <label htmlFor="cf-email" className={labelClass}>
              Email address{req}
            </label>
            <input id="cf-email" name="email" type="email" required autoComplete="email" placeholder="jane@company.com" className={inputClass} />
          </div>
          <div className={fieldClass}>
            <label htmlFor="cf-phone" className={labelClass}>
              Phone
            </label>
            <input id="cf-phone" name="phone" type="tel" autoComplete="tel" placeholder="+91 98000 00000" className={inputClass} />
          </div>
          <div className={fieldClass}>
            <label htmlFor="cf-company" className={labelClass}>
              Company / organisation
            </label>
            <input id="cf-company" name="company" type="text" autoComplete="organization" placeholder="Acme Engineering Ltd." className={inputClass} />
          </div>
        </div>
      </fieldset>

      {isQuote && (
        <fieldset className="space-y-6">
          <legend className="text-sm font-semibold text-slate-900">Your requirement</legend>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className={fieldClass}>
              <label htmlFor="cf-product" className={labelClass}>
                Product of interest
              </label>
              <select id="cf-product" name="product_of_interest" className={inputClass} defaultValue="">
                <option value="" disabled>
                  Select a product…
                </option>
                {products.map((p) => (
                  <option key={p.slug} value={p.name}>
                    {p.name}
                  </option>
                ))}
                <option value="Other / not sure">Other / not sure</option>
              </select>
            </div>
            <div className={fieldClass}>
              <label htmlFor="cf-quantity" className={labelClass}>
                Estimated quantity
              </label>
              <input id="cf-quantity" name="estimated_quantity" type="text" placeholder="e.g. 12 units, mixed sizes" className={inputClass} />
            </div>
            <div className={fieldClass}>
              <label htmlFor="cf-location" className={labelClass}>
                Project location
              </label>
              <input id="cf-location" name="project_location" type="text" placeholder="City, State / Country" className={inputClass} />
            </div>
            <div className={fieldClass}>
              <label htmlFor="cf-timeline" className={labelClass}>
                Required by / timeline
              </label>
              <input id="cf-timeline" name="required_by" type="text" placeholder="e.g. within 8 weeks" className={inputClass} />
            </div>
          </div>
        </fieldset>
      )}

      <div className={fieldClass}>
        <label htmlFor="cf-message" className={labelClass}>
          Message{req}
        </label>
        <textarea
          id="cf-message"
          name="message"
          required
          rows={isQuote ? 5 : 6}
          placeholder={
            isQuote
              ? 'Describe the application and any specific sizes, materials, pressure ratings or other requirements…'
              : 'How can we help you?'
          }
          className={inputClass}
        />
      </div>

      <button
        type="submit"
        className="inline-flex w-full items-center justify-center rounded-full bg-brand-600 px-6 py-3 text-base font-semibold text-white shadow-sm shadow-brand-600/20 transition hover:bg-brand-700 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 sm:w-auto"
      >
        {isQuote ? 'Send quote request' : 'Send message'}
      </button>
    </form>
  );
}
