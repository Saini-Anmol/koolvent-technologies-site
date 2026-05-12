import type { ReactNode } from 'react';
import { accents, accentOrder, type Accent } from '@/lib/accents';
import { cn } from '@/lib/cn';

interface Capability {
  title: string;
  body: string;
  icon: ReactNode;
  accent?: Accent;
}

const iconCls = 'h-6 w-6';

const defaultIcons: ReactNode[] = [
  // shield-check — engineered to code
  <svg key="i1" className={iconCls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
  </svg>,
  // location-marker — built in India
  <svg key="i2" className={iconCls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>,
  // adjustments — made to spec
  <svg key="i3" className={iconCls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h10M18 7h2M4 17h2M10 17h10M14 4v6M8 14v6" />
  </svg>,
  // lifebuoy — supported end to end
  <svg key="i4" className={iconCls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="3.5" />
    <path strokeLinecap="round" d="M14.5 9.5l3-3M6.5 17.5l3-3M9.5 9.5l-3-3M14.5 14.5l3 3" />
  </svg>,
];

export const defaultCapabilities = (cityName = 'Noida'): Capability[] => [
  {
    title: 'Engineered to code',
    body: 'Components designed and fabricated to recognised industry standards, ready for certification on demanding projects.',
    icon: defaultIcons[0],
  },
  {
    title: 'Built in India',
    body: `Manufactured in ${cityName}, supporting industrial, commercial and infrastructure work across the region and beyond.`,
    icon: defaultIcons[1],
  },
  {
    title: 'Made to your spec',
    body: 'Sizes, materials, connections and finishes configured to the schedule — not forced into a fixed catalogue.',
    icon: defaultIcons[2],
  },
  {
    title: 'Supported end to end',
    body: 'From selection and submittals through delivery and after-sales support, our engineers stay involved.',
    icon: defaultIcons[3],
  },
];

interface CapabilityGridProps {
  items?: Capability[];
  className?: string;
}

export default function CapabilityGrid({ items, className }: CapabilityGridProps) {
  const list = items ?? defaultCapabilities();
  return (
    <div className={cn('grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4', className)}>
      {list.map((c, i) => {
        const a = accents[c.accent ?? accentOrder[i % accentOrder.length]];
        return (
          <div key={c.title} className="reveal">
            <div className={cn('inline-flex h-12 w-12 items-center justify-center rounded-2xl', a.soft)}>
              {c.icon}
            </div>
            <h3 className="mt-4 font-display text-lg font-semibold text-slate-900">{c.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{c.body}</p>
          </div>
        );
      })}
    </div>
  );
}
