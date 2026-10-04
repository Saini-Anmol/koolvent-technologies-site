import type { SpecRow } from '@/data/products';
import { accents, accentOrder } from '@/lib/accents';
import { cn } from '@/lib/cn';

interface SpecGroupsProps {
  /** Rows with a `group` — rendered as one card per group, in first-seen order. */
  rows: SpecRow[];
  className?: string;
}

/**
 * Grouped technical data (e.g. General / Materials / Ratings). Cards sit
 * side by side on `lg+` and stack on smaller screens.
 */
export default function SpecGroups({ rows, className }: SpecGroupsProps) {
  const groups: { title: string; rows: SpecRow[] }[] = [];
  for (const row of rows) {
    const title = row.group ?? 'Specifications';
    let g = groups.find((x) => x.title === title);
    if (!g) groups.push((g = { title, rows: [] }));
    g.rows.push(row);
  }

  return (
    <div className={cn('grid items-start gap-6 lg:grid-cols-3', className)}>
      {groups.map((g, i) => (
        <div
          key={g.title}
          className="reveal overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
          data-reveal-delay={i * 80}
        >
          <div className="flex items-center gap-3 border-b border-slate-200 bg-slate-50 px-5 py-3.5">
            <span className={cn('h-2 w-2 rounded-full', accents[accentOrder[i % accentOrder.length]].bar)} aria-hidden="true" />
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-slate-900">{g.title}</h3>
          </div>
          <dl className="divide-y divide-slate-100">
            {g.rows.map((row) => (
              <div key={row.label} className="flex items-start justify-between gap-4 px-5 py-3 text-sm">
                <dt className="text-slate-500">{row.label}</dt>
                <dd className="text-right font-semibold text-slate-800">{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
    </div>
  );
}
