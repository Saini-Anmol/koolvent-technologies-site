import Button from '@/components/Button';
import { cn } from '@/lib/cn';

interface Action {
  label: string;
  href: string;
}

interface CtaBandProps {
  title: string;
  lead?: string;
  primary?: Action;
  secondary?: Action;
  /** `gradient` (colourful) by default; `dark` or `light` for variety. */
  variant?: 'gradient' | 'dark' | 'light';
}

/** Reusable closing call-to-action band — write distinct copy per page. */
export default function CtaBand({
  title,
  lead,
  primary = { label: 'Request a quote', href: '/quote/' },
  secondary,
  variant = 'gradient',
}: CtaBandProps) {
  const dark = variant !== 'light';

  return (
    <section
      className={cn(
        'relative isolate overflow-hidden',
        variant === 'gradient' && 'bg-gradient-to-br from-brand-700 via-brand-600 to-brand-500',
        variant === 'dark' && 'bg-slate-950',
        variant === 'light' && 'bg-brand-50',
      )}
    >
      {dark && (
        <>
          <div className="bg-grid absolute inset-0 opacity-30" aria-hidden="true" />
          <div className="absolute -right-16 -top-16 h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl" aria-hidden="true" />
          <div className="absolute -left-10 bottom-0 h-64 w-64 rounded-full bg-amber-300/15 blur-3xl" aria-hidden="true" />
        </>
      )}
      <div className="relative mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-4 py-14 sm:px-6 lg:flex-row lg:items-center lg:px-8 lg:py-16">
        <div className="max-w-2xl">
          <h2
            className={cn(
              'text-2xl font-bold tracking-tight sm:text-3xl',
              dark ? 'text-white' : 'text-slate-900',
            )}
          >
            {title}
          </h2>
          {lead && (
            <p className={cn('mt-3 text-lg', dark ? 'text-white/85' : 'text-slate-600')}>{lead}</p>
          )}
        </div>
        <div className="flex flex-shrink-0 flex-wrap gap-3">
          <Button href={primary.href} size="lg" variant={dark ? 'white' : 'primary'}>
            {primary.label}
          </Button>
          {secondary && (
            <Button
              href={secondary.href}
              size="lg"
              variant={dark ? 'outline-dark' : 'ghost'}
            >
              {secondary.label}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
