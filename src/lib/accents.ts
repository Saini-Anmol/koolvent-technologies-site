/**
 * The site uses a small, Google-ish four-colour accent system on top of the
 * primary brand blue. Each product family gets one accent, and the same
 * colours rotate through capability grids, icon chips, etc.
 *
 * Keep the class strings *literal* (not built with template strings) so
 * Tailwind's content scanner picks them up.
 */
export type Accent = 'brand' | 'emerald' | 'amber' | 'rose';

export interface AccentClasses {
  /** soft tinted background + matching text, e.g. for chips / icon tiles */
  soft: string;
  /** text colour for links / labels on light backgrounds */
  text: string;
  /** text colour applied on parent `group` hover */
  textGroupHover: string;
  /** solid background, e.g. for a top accent bar */
  bar: string;
  /** subtle ring applied on parent `group` hover */
  ring: string;
  /** soft glow gradient (for blurred blobs behind cards / heroes) */
  glow: string;
}

export const accents: Record<Accent, AccentClasses> = {
  brand: {
    soft: 'bg-brand-50 text-brand-700',
    text: 'text-brand-700',
    textGroupHover: 'group-hover:text-brand-700',
    bar: 'bg-brand-500',
    ring: 'group-hover:ring-brand-300',
    glow: 'from-brand-500/25 to-brand-400/5',
  },
  emerald: {
    soft: 'bg-emerald-50 text-emerald-700',
    text: 'text-emerald-700',
    textGroupHover: 'group-hover:text-emerald-700',
    bar: 'bg-emerald-500',
    ring: 'group-hover:ring-emerald-300',
    glow: 'from-emerald-500/25 to-emerald-400/5',
  },
  amber: {
    soft: 'bg-amber-50 text-amber-700',
    text: 'text-amber-700',
    textGroupHover: 'group-hover:text-amber-700',
    bar: 'bg-amber-400',
    ring: 'group-hover:ring-amber-300',
    glow: 'from-amber-400/25 to-amber-300/5',
  },
  rose: {
    soft: 'bg-rose-50 text-rose-700',
    text: 'text-rose-700',
    textGroupHover: 'group-hover:text-rose-700',
    bar: 'bg-rose-400',
    ring: 'group-hover:ring-rose-300',
    glow: 'from-rose-400/25 to-rose-300/5',
  },
};

/** The accent palette in display order — handy for rotating through a grid. */
export const accentOrder: Accent[] = ['brand', 'emerald', 'amber', 'rose'];
