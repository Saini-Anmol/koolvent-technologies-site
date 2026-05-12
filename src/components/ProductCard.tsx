import type { Product } from '@/data/products';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const href = `/products/${product.slug}/`;
  return (
    <article className="reveal group relative flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition-shadow hover:shadow-lg">
      <div className="aspect-[4/3] overflow-hidden bg-slate-100">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-lg font-semibold text-slate-900 group-hover:text-brand-700">
          <a href={href} className="after:absolute after:inset-0">
            {product.name}
          </a>
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{product.summary}</p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-700">
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
