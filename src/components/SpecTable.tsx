import { cn } from '@/lib/cn';

interface SpecRow {
  label: string;
  value: string;
}

interface SpecTableProps {
  rows: SpecRow[];
  className?: string;
}

/**
 * Specification list. Renders as a clean two-column table on `sm+` and
 * stacks label-over-value on mobile so long real values never get cramped.
 */
export default function SpecTable({ rows, className }: SpecTableProps) {
  return (
    <dl className={cn('overflow-hidden rounded-2xl border border-slate-200', className)}>
      {rows.map((row, i) => (
        <div
          key={`${row.label}-${i}`}
          className={cn(
            'grid gap-1 px-5 py-4 sm:grid-cols-3 sm:gap-4',
            'border-b border-slate-200 last:border-0',
            i % 2 === 1 && 'bg-slate-50/70',
          )}
        >
          <dt className="text-sm font-medium text-slate-500">{row.label}</dt>
          <dd className="text-sm font-semibold text-slate-800 sm:col-span-2">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}
