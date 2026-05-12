import type { TeamMember } from '@/data/team';
import { isPlaceholder } from '@/lib/content';

interface TeamCardProps {
  member: TeamMember;
}

const PLACEHOLDER_IMAGE = '/images/team/placeholder.svg';

/** Up-to-two initials from a name (for the avatar fallback). */
function getInitials(name: string): string {
  if (isPlaceholder(name)) return '?';
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

export default function TeamCard({ member }: TeamCardProps) {
  const noPhoto = !member.image || member.image === PLACEHOLDER_IMAGE;
  const initials = getInitials(member.name);
  const showBio = !isPlaceholder(member.bio);

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
      {/* Photo / avatar */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        {noPhoto ? (
          <div
            className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-50 via-white to-emerald-50"
            aria-hidden="true"
          >
            <div className="flex h-24 w-24 select-none items-center justify-center rounded-full bg-brand-600 text-3xl font-bold text-white shadow-sm">
              {initials}
            </div>
          </div>
        ) : (
          <img
            src={member.image}
            alt={member.name}
            loading="lazy"
            className="h-full w-full object-cover object-top"
          />
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-lg font-semibold text-slate-900">{member.name}</h3>
        <p className="mt-0.5 text-sm font-semibold text-brand-600">{member.role}</p>
        {showBio && <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">{member.bio}</p>}

        {member.linkedin && (
          <div className="mt-5 border-t border-slate-100 pt-4">
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-800"
              aria-label={`${member.name} on LinkedIn`}
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.447 20.452H16.893V14.883C16.893 13.555 16.866 11.846 15.041 11.846C13.191 11.846 12.905 13.291 12.905 14.785V20.452H9.351V9H12.765V10.561H12.811C13.288 9.661 14.448 8.711 16.181 8.711C19.782 8.711 20.448 11.081 20.448 14.166V20.452H20.447ZM5.337 7.433C4.193 7.433 3.274 6.507 3.274 5.368C3.274 4.23 4.194 3.305 5.337 3.305C6.477 3.305 7.401 4.23 7.401 5.368C7.401 6.507 6.476 7.433 5.337 7.433ZM7.119 20.452H3.555V9H7.119V20.452ZM22.225 0H1.771C0.792 0 0 0.774 0 1.729V22.271C0 23.227 0.792 24 1.771 24H22.222C23.2 24 24 23.227 24 22.271V1.729C24 0.774 23.2 0 22.222 0H22.225Z" />
              </svg>
              LinkedIn
            </a>
          </div>
        )}
      </div>
    </article>
  );
}
