import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  align?: 'left' | 'center';
  /** Render light text for use on dark backgrounds. */
  tone?: 'dark' | 'light';
  className?: string;
  children?: ReactNode;
}

export default function SectionHeading({
  eyebrow,
  title,
  align = 'center',
  tone = 'dark',
  className,
  children,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'max-w-2xl',
        align === 'center' ? 'mx-auto text-center' : 'text-left',
        className,
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            'text-sm font-semibold uppercase tracking-wider',
            tone === 'light' ? 'text-brand-300' : 'text-brand-600',
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          'mt-2 text-3xl font-bold tracking-tight sm:text-4xl',
          tone === 'light' ? 'text-white' : 'text-slate-900',
        )}
      >
        {title}
      </h2>
      {children && (
        <div
          className={cn(
            'mt-4 text-lg leading-relaxed',
            tone === 'light' ? 'text-slate-300' : 'text-slate-600',
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
}
