/**
 * Careers page data.
 *
 * `openings` is empty by default — the Careers page shows a friendly
 * "no current openings" state and invites speculative applications. Add
 * roles to the array (shape below) when you're hiring; any role whose
 * `summary` is left as `TODO:` is hidden automatically.
 */

import { site } from '@/data/site';

export interface Opening {
  title: string;
  location: string;
  type: string;
  summary: string;
}

export interface Benefit {
  title: string;
  description: string;
}

export const openings: Opening[] = [
  // Example shape — uncomment / edit when hiring:
  // {
  //   title: 'Design Engineer',
  //   location: 'Noida, India',
  //   type: 'Full-time',
  //   summary: 'Design and detail HVAC and fluid-control components, prepare drawings and calculations to relevant codes, and support production.',
  // },
];

export const benefits: Benefit[] = [
  {
    title: 'Engineering-first culture',
    description:
      'We are a product company at heart. Every team member is encouraged to understand the engineering behind what we build and to contribute ideas for improvement.',
  },
  {
    title: 'Growth with a growing company',
    description:
      'Founded in 2025, Koolvent is at an early, fast-moving stage. Joining now means real ownership, real impact and room to grow your role as the business scales.',
  },
  {
    title: 'Work that matters',
    description:
      'The components we make end up in hospitals, hotels, data centres and industrial plants. The work is real, the standards are high and the quality of what we ship matters.',
  },
  {
    title: 'Learning & development',
    description:
      'We support professional development through training, access to relevant industry knowledge and on-the-job mentoring from experienced engineers and commercial staff.',
  },
  {
    title: 'A tight, skilled team',
    description:
      'Our team is small and capable. You will work directly with founders and senior technical staff — clear goals, honest feedback, no unnecessary layers.',
  },
  {
    title: 'Fair, transparent compensation',
    description:
      'We aim to benchmark pay to the market and review it regularly, with performance-linked incentives and benefits commensurate with your experience and contribution.',
  },
];

export const howToApply = `To apply, send your CV and a short cover note to ${site.contact.email} with the role (or your area of expertise) in the subject line. We review every application and will be in touch if your profile is a strong match. Speculative applications are welcome — if you are a talented engineer, salesperson or operations professional, we would like to hear from you even if no matching role is listed.`;
