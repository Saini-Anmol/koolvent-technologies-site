import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Bg = 'white' | 'slate' | 'dark';

interface SectionProps {
  id?: string;
  /** Background treatment. */
  bg?: Bg;
  /** Vertical rhythm. `tight` for denser bands. */
  spacing?: 'normal' | 'tight';
  /** Extra classes on the <section>. */
  className?: string;
  /** Extra classes on the inner max-width container. */
  innerClassName?: string;
  children: ReactNode;
}

const backgrounds: Record<Bg, string> = {
  white: 'bg-white text-slate-700',
  slate: 'bg-slate-50 text-slate-700',
  dark: 'bg-slate-950 text-slate-300',
};

/** Standard page section: full-bleed background + centered max-w-7xl container. */
export default function Section({
  id,
  bg = 'white',
  spacing = 'normal',
  className,
  innerClassName,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        backgrounds[bg],
        spacing === 'tight' ? 'py-12 sm:py-14' : 'py-16 sm:py-20 lg:py-24',
        id ? 'scroll-mt-20' : undefined,
        className,
      )}
    >
      <div className={cn('mx-auto max-w-7xl px-4 sm:px-6 lg:px-8', innerClassName)}>{children}</div>
    </section>
  );
}
