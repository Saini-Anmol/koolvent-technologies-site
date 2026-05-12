/**
 * Product catalogue.
 *
 * Add a new product by appending an object here — it automatically shows
 * up on the homepage, the /products listing, and gets its own detail
 * page at /products/<slug>/.
 *
 * All long-form copy below is PLACEHOLDER (marked `TODO:`); swap in the
 * real specs, applications and certifications when available. Spec rows
 * whose value is still `TODO:` are automatically hidden on the site — see
 * `realSpecs()` below — so it is safe to ship with placeholders.
 */
import type { Accent } from '@/lib/accents';
import { isPlaceholder } from '@/lib/content';

export interface Product {
  /** URL slug, also used as the React-less key. */
  slug: string;
  name: string;
  /** One-line summary used on cards. */
  summary: string;
  /** Image in /public/images/products/. */
  image: string;
  /** Accent colour for this product family across the site. */
  accent: Accent;
  /** Short marketing intro shown at the top of the detail page. */
  intro: string;
  /** Bullet list of key features / benefits. */
  highlights: string[];
  /** Typical applications. */
  applications: string[];
  /** Spec table rows — { label, value }. */
  specs: { label: string; value: string }[];
}

export const products: Product[] = [
  {
    slug: 'suction-guide',
    name: 'Suction Guide',
    summary: 'Combination strainer and flow-conditioning fitting for pump inlets.',
    image: '/images/products/suction-guide.png',
    accent: 'brand',
    // TODO: real product copy
    intro:
      'Koolvent suction guides combine a fine-mesh strainer, a flow-straightening vane and an angled body to protect pumps and condition inlet flow — replacing a long-radius elbow plus a separate strainer in a single compact fitting.',
    highlights: [
      'Integrated start-up and permanent strainer screens',
      'Built-in flow straighteners for stable pump performance',
      'Compact angled body shortens the inlet pipe run',
      'Inlet gauge port for monitoring suction pressure',
    ],
    applications: [
      'Chilled-water and condenser-water pumping systems',
      'Heating hot-water circulation',
      'Booster and pressurisation sets',
    ],
    specs: [
      { label: 'Sizes', value: 'TODO: e.g. DN50–DN300' },
      { label: 'Body material', value: 'TODO: e.g. fabricated carbon steel' },
      { label: 'Connection', value: 'TODO: flanged / grooved' },
      { label: 'Max. working pressure', value: 'TODO' },
      { label: 'Certifications', value: 'TODO' },
    ],
  },
  {
    slug: 'pressure-vessel',
    name: 'Pressure Vessel',
    summary: 'Code-built vessels for expansion, storage and buffer duties.',
    image: '/images/products/pressure-vessel.png',
    accent: 'emerald',
    // TODO: real product copy
    intro:
      'Our pressure vessels are designed and fabricated to recognised codes for expansion, hydro-pneumatic and buffer-storage applications, with finishes and connections tailored to the installation.',
    highlights: [
      'Designed to relevant pressure-vessel codes',
      'Replaceable or fixed bladder options',
      'Vertical or horizontal configurations',
      'Corrosion-resistant internal and external finishes',
    ],
    applications: [
      'Thermal expansion control in closed loops',
      'Hydro-pneumatic pressure boosting',
      'Chilled / hot water buffer storage',
    ],
    specs: [
      { label: 'Capacities', value: 'TODO' },
      { label: 'Design pressure', value: 'TODO' },
      { label: 'Design code', value: 'TODO' },
      { label: 'Orientation', value: 'Vertical / horizontal' },
      { label: 'Certifications', value: 'TODO' },
    ],
  },
  {
    slug: 'hot-water-generator',
    name: 'Hot Water Generator',
    summary: 'Packaged units for reliable, energy-efficient hot water.',
    image: '/images/products/hot-water-generator.png',
    accent: 'amber',
    // TODO: real product copy
    intro:
      'Koolvent hot water generators deliver consistent process and comfort hot water with efficient heat transfer, robust controls and serviceable construction.',
    highlights: [
      'High heat-transfer-area design for efficiency',
      'Insulated, low standing-loss construction',
      'Integrated controls and safety devices',
      'Serviceable internals for long working life',
    ],
    applications: [
      'Comfort heating hot-water supply',
      'Process hot water for light industry',
      'Hospitality and institutional facilities',
    ],
    specs: [
      { label: 'Output range', value: 'TODO' },
      { label: 'Heat source', value: 'TODO' },
      { label: 'Operating temperature', value: 'TODO' },
      { label: 'Controls', value: 'TODO' },
      { label: 'Certifications', value: 'TODO' },
    ],
  },
  {
    slug: 'valve-kit',
    name: 'Valve Kit',
    summary: 'Pre-assembled isolation, balancing and control valve packages.',
    image: '/images/products/valve-kit.png',
    accent: 'rose',
    // TODO: real product copy
    intro:
      'Our valve kits bundle the isolation, balancing, control and accessory valves a terminal unit needs into one labelled, pre-assembled package — cutting installation time and on-site errors.',
    highlights: [
      'Matched isolation, balancing and control valves',
      'Pre-assembled and labelled for quick install',
      'Optional flexible hoses and unions',
      'Configured per coil / terminal-unit schedule',
    ],
    applications: [
      'Fan-coil units and chilled beams',
      'Air-handling-unit coils',
      'Reheat and radiant terminal units',
    ],
    specs: [
      { label: 'Sizes', value: 'TODO' },
      { label: 'Valve types', value: 'TODO: PICV / 2-port / 3-port etc.' },
      { label: 'Connections', value: 'TODO' },
      { label: 'Pressure / temperature rating', value: 'TODO' },
      { label: 'Certifications', value: 'TODO' },
    ],
  },
];

export const getProduct = (slug: string) =>
  products.find((p) => p.slug === slug);

/** Spec rows that have a real value (placeholder `TODO:` rows are dropped). */
export const realSpecs = (p: Product) =>
  p.specs.filter((row) => !isPlaceholder(row.value));
