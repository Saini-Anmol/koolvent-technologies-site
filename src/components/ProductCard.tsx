import type { Product } from '@/data/products';
import { accents } from '@/lib/accents';
import { cn } from '@/lib/cn';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const href = `/products/${product.slug}/`;
  const a = accents[product.accent];
  return (
    <article
      className={cn(
        'reveal group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm ring-1 ring-transparent transition-all hover:-translate-y-1 hover:shadow-lg',
        a.ring,
      )}
    >
      <div className={cn('h-1.5 w-full', a.bar)} aria-hidden="true" />
      <div className="aspect-[4/3] overflow-hidden bg-slate-50">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className={cn('font-display text-lg font-semibold text-slate-900 transition-colors', a.textGroupHover)}>
          <a href={href} className="after:absolute after:inset-0">
            {product.name}
          </a>
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{product.summary}</p>
        <span className={cn('mt-4 inline-flex items-center gap-1 text-sm font-semibold', a.text)}>
          Learn more
          <svg
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </span>
      </div>
    </article>
  );
}
