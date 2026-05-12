interface MilestoneItem {
  year: string;
  title: string;
  description: string;
}

interface MilestonesProps {
  items: MilestoneItem[];
}

/**
 * Vertical timeline component.
 * Renders a connecting line with year markers and entry text.
 * Responsive: full-width on mobile, slightly indented on larger screens.
 */
export default function Milestones({ items }: MilestonesProps) {
  return (
    <ol className="relative space-y-0">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <li key={`${item.year}-${index}`} className="relative flex gap-6 pb-10 last:pb-0">
            {/* Vertical line + dot */}
            <div className="flex flex-col items-center">
              {/* Dot */}
              <div
                className="relative z-10 flex h-10 w-10 flex-none items-center justify-center rounded-full border-2 border-brand-500 bg-white shadow-sm"
                aria-hidden="true"
              >
                <div className="h-3 w-3 rounded-full bg-brand-500" />
              </div>
              {/* Connector line */}
              {!isLast && (
                <div className="mt-1 flex-1 w-px bg-brand-200 min-h-[2rem]" aria-hidden="true" />
              )}
            </div>

            {/* Content */}
            <div className="pb-2 pt-1.5">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-600">
                {item.year}
              </p>
              <h3 className="mt-1 font-display text-base font-semibold text-slate-900 sm:text-lg">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.description}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
