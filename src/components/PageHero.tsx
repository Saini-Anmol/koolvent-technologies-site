import type { ReactNode } from 'react';
import Breadcrumbs, { type Crumb } from '@/components/Breadcrumbs';
import { cn } from '@/lib/cn';

interface PageHeroProps {
  /** Small uppercase label above the title. */
  eyebrow?: string;
  title: ReactNode;
  /** Supporting paragraph under the title. */
  lead?: ReactNode;
  /** Optional breadcrumb trail. */
  breadcrumbs?: Crumb[];
  /** Light (white, colourful accents) by default; dark for high-contrast pages. */
  tone?: 'light' | 'dark';
  /** `sm` for shorter interior headers. */
  size?: 'md' | 'sm';
  /** Optional extra content (e.g. buttons) under the lead. */
  children?: ReactNode;
}

/**
 * Standard interior-page header. Light + colourful by default (a white band
 * with soft blue / green / amber glows), with an optional dark variant.
 */
export default function PageHero({
  eyebrow,
  title,
  lead,
  breadcrumbs,
  tone = 'light',
  size = 'md',
  children,
}: PageHeroProps) {
  const dark = tone === 'dark';
  const pad = size === 'sm' ? 'py-10 sm:py-12 lg:py-14' : 'py-14 sm:py-16 lg:py-20';

  return (
    <section
      className={cn(
        'relative isolate overflow-hidden',
        dark ? 'bg-slate-950 text-white' : 'bg-white text-slate-700',
      )}
    >
      {/* Colourful background */}
      {dark ? (
        <>
          <div className="bg-grid absolute inset-0 opacity-50" aria-hidden="true" />
          <div className="absolute -left-32 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-brand-600/25 blur-3xl" aria-hidden="true" />
          <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-emerald-500/15 blur-3xl" aria-hidden="true" />
          <div className="absolute -right-10 bottom-0 h-64 w-64 rounded-full bg-amber-400/10 blur-3xl" aria-hidden="true" />
        </>
      ) : (
        <>
          <div className="absolute inset-0 bg-gradient-to-b from-brand-50/60 via-white to-white" aria-hidden="true" />
          <div className="absolute -left-24 -top-16 h-72 w-72 rounded-full bg-brand-300/25 blur-3xl" aria-hidden="true" />
          <div className="absolute right-1/4 -top-10 h-56 w-56 rounded-full bg-emerald-300/20 blur-3xl" aria-hidden="true" />
          <div className="absolute -right-16 top-1/3 h-64 w-64 rounded-full bg-amber-200/30 blur-3xl" aria-hidden="true" />
        </>
      )}

      <div className={cn('relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8', pad)}>
        {breadcrumbs && breadcrumbs.length > 0 && (
          <div className="mb-5">
            <Breadcrumbs items={breadcrumbs} tone={dark ? 'light' : 'dark'} />
          </div>
        )}
        {eyebrow && (
          <p
            className={cn(
              'text-sm font-semibold uppercase tracking-wider',
              dark ? 'text-brand-300' : 'text-brand-600',
            )}
          >
            {eyebrow}
          </p>
        )}
        <h1
          className={cn(
            'mt-2 max-w-3xl font-bold tracking-tight',
            size === 'sm'
              ? 'text-2xl sm:text-3xl lg:text-4xl'
              : 'text-3xl sm:text-4xl lg:text-5xl',
            dark ? 'text-white' : 'text-slate-900',
          )}
        >
          {title}
        </h1>
        {lead && (
          <p
            className={cn(
              'mt-4 max-w-2xl text-lg leading-relaxed',
              dark ? 'text-slate-300' : 'text-slate-600',
            )}
          >
            {lead}
          </p>
        )}
        {children && <div className="mt-7 flex flex-wrap gap-3">{children}</div>}
      </div>
    </section>
  );
}
