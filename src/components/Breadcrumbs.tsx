export interface Crumb {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: Crumb[];
  /** Use light text on dark backgrounds. */
  tone?: 'dark' | 'light';
}

export default function Breadcrumbs({ items, tone = 'dark' }: BreadcrumbsProps) {
  const linkClass =
    tone === 'light'
      ? 'fx-link text-slate-400 hover:text-white'
      : 'fx-link text-slate-500 hover:text-brand-700';
  const currentClass = tone === 'light' ? 'text-slate-200' : 'text-slate-700';
  const sepClass = tone === 'light' ? 'text-slate-600' : 'text-slate-300';

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={`${item.label}-${i}`} className="flex items-center gap-1.5">
              {item.href && !last ? (
                <a href={item.href} className={linkClass}>
                  {item.label}
                </a>
              ) : (
                <span className={last ? currentClass : linkClass} aria-current={last ? 'page' : undefined}>
                  {item.label}
                </span>
              )}
              {!last && (
                <svg className={`h-4 w-4 ${sepClass}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M7.21 14.77a.75.75 0 0 1 .02-1.06L11.168 10 7.23 6.29a.75.75 0 1 1 1.04-1.08l4.5 4.25a.75.75 0 0 1 0 1.08l-4.5 4.25a.75.75 0 0 1-1.06-.02z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
