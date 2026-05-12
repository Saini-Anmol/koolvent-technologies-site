import type { CollectionEntry } from 'astro:content';

interface BlogCardProps {
  post: CollectionEntry<'blog'>;
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-GB', { dateStyle: 'long' }).format(date);
}

export default function BlogCard({ post }: BlogCardProps) {
  const href = `/blog/${post.id}/`;
  const { title, description, pubDate, author, tags, heroImage } = post.data;

  return (
    <article className="reveal group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
      {/* Hero image or gradient placeholder */}
      <div className="aspect-[16/9] overflow-hidden bg-slate-100">
        {heroImage ? (
          <img
            src={heroImage}
            alt={title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            className="h-full w-full bg-gradient-to-br from-brand-700 via-brand-600 to-brand-400"
            aria-hidden="true"
          >
            <div className="flex h-full items-center justify-center">
              <svg
                className="h-12 w-12 text-white/30"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9z"
                />
              </svg>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        {/* Tags */}
        {tags.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-medium text-brand-700"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h3 className="font-display text-lg font-semibold leading-snug text-slate-900 group-hover:text-brand-700">
          <a href={href} className="after:absolute after:inset-0">
            {title}
          </a>
        </h3>

        {/* Description */}
        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 line-clamp-3">
          {description}
        </p>

        {/* Footer: author + date */}
        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
          <span className="text-xs font-medium text-slate-500">{author}</span>
          <time dateTime={pubDate.toISOString().slice(0, 10)} className="text-xs text-slate-500">
            {formatDate(pubDate)}
          </time>
        </div>
      </div>
    </article>
  );
}
