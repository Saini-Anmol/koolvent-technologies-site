/**
 * Leadership team data.
 *
 * Add real bios and photos as they become available:
 *  - `bio`: replace the `TODO:` text with a 2–3 sentence professional bio.
 *           Until then the card simply shows name + role (no placeholder text).
 *  - `image`: drop a photo under `/public/images/team/` (e.g. `shivam.jpg`)
 *             and point `image` at it. Until then a neutral initials avatar
 *             is shown.
 *  - `linkedin`: add a profile URL to show a LinkedIn link on the card.
 *
 * Entries whose `name` is still a `TODO:` placeholder are hidden on the site.
 */

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  /** Path relative to the site root. Use '/images/team/placeholder.svg' until a real photo is available. */
  image: string;
  linkedin?: string;
}

export const leadership: TeamMember[] = [
  {
    name: 'Shivam',
    role: 'Founder',
    bio: 'TODO: Short professional bio for Shivam — background, areas of expertise and role in founding Koolvent. 2–3 sentences.',
    image: '/images/team/placeholder.svg',
    linkedin: undefined, // TODO: Add LinkedIn profile URL
  },
  {
    name: 'Adil',
    role: 'Founder',
    bio: 'TODO: Short professional bio for Adil — background, areas of expertise and role in founding Koolvent. 2–3 sentences.',
    image: '/images/team/placeholder.svg',
    linkedin: undefined, // TODO: Add LinkedIn profile URL
  },
];
