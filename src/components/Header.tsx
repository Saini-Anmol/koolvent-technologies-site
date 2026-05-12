import { site, navLinks } from '@/data/site';
import { cn } from '@/lib/cn';

interface HeaderProps {
  /** Current pathname, passed from the Astro layout for active-link state. */
  pathname: string;
}

/**
 * Static, server-rendered header. The mobile-menu toggle and the
 * scroll-shadow are wired up by a tiny vanilla script in BaseLayout so
 * the page ships no framework runtime for this.
 */
export default function Header({ pathname }: HeaderProps) {
  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header
      id="site-header"
      className="sticky top-0 z-50 border-b border-transparent bg-white/85 backdrop-blur transition-shadow data-[scrolled]:border-slate-200 data-[scrolled]:shadow-sm"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <a href="/" className="flex items-center gap-3" aria-label={`${site.name} — home`}>
          <img
            src="/images/koolvent-logo.png"
            alt=""
            width={40}
            height={40}
            className="h-10 w-10 rounded-md object-contain"
          />
          <span className="flex flex-col leading-tight">
            <span className="font-display text-base font-extrabold tracking-tight text-slate-900 sm:text-lg">
              KOOLVENT<span className="text-brand-600"> TECHNOLOGIES</span>
            </span>
            <span className="hidden text-[11px] font-medium uppercase tracking-wider text-slate-400 sm:block">
              HVAC &amp; Fluid-Control Components
            </span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? 'page' : undefined}
              className={cn(
                'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                isActive(link.href)
                  ? 'text-brand-700'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900',
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="/quote/"
            className="hidden rounded-md bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-700 sm:inline-block"
          >
            Get a Quote
          </a>

          {/* Mobile menu button */}
          <button
            id="nav-toggle"
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-slate-600 hover:bg-slate-100 md:hidden"
            aria-controls="mobile-nav"
            aria-expanded="false"
          >
            <span className="sr-only">Toggle navigation menu</span>
            <svg data-icon="open" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg data-icon="close" className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      <nav id="mobile-nav" hidden className="border-t border-slate-200 bg-white md:hidden" aria-label="Primary">
        <div className="space-y-1 px-4 py-3 sm:px-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? 'page' : undefined}
              className={cn(
                'block rounded-md px-3 py-2 text-base font-medium',
                isActive(link.href) ? 'bg-brand-50 text-brand-700' : 'text-slate-700 hover:bg-slate-50',
              )}
            >
              {link.label}
            </a>
          ))}
          <a
            href="/quote/"
            className="mt-2 block rounded-md bg-brand-600 px-3 py-2 text-center text-base font-semibold text-white"
          >
            Get a Quote
          </a>
        </div>
      </nav>
    </header>
  );
}
