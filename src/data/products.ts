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
  /**
   * Spec table rows — { label, value }. Set `group` (e.g. 'General',
   * 'Materials', 'Ratings') on the rows to render them as grouped cards.
   */
  specs: SpecRow[];
  /** Optional at-a-glance figures shown under the intro (3–4 items). */
  keySpecs?: { label: string; value: string }[];
  /** Optional "How it works" steps. */
  working?: { title: string; body: string }[];
  /** Optional "Design & construction" points. */
  construction?: string[];
  /** `contain` for cut-out product shots on white (no cropping). Default `cover`. */
  imageFit?: 'cover' | 'contain';
  /** Optional small label shown under the product name (e.g. 'Air Purging Valve'). */
  category?: string;
}

export interface SpecRow {
  label: string;
  value: string;
  group?: string;
}

/** Float-operated air vent principle — shared by the air-vent family. */
const floatVentSteps = [
  { title: 'Normal running', body: 'Water fills the body and lifts the float, holding the vent valve shut.' },
  { title: 'Air collects', body: 'Trapped air rises to the top of the body, pushing the water level and float down.' },
  { title: 'Air is released', body: 'The falling float pulls the valve off its seat and the air discharges.' },
  { title: 'Valve recloses', body: 'Water refills the body, lifts the float and reseals the valve automatically.' },
];

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
  {
    slug: 'autovent',
    name: 'Autovent',
    summary: 'Forged-brass automatic air vent that keeps water circuits free of trapped air.',
    image: '/images/products/autovent.jpg',
    imageFit: 'contain',
    category: 'Air Purging Valve',
    accent: 'amber',
    intro:
      'A compact, float-operated air vent in forged brass. It releases trapped air from closed water systems automatically, and its shut-off connector lets you fit or remove it without draining the line.',
    highlights: [
      'Fully automatic — no manual bleeding needed',
      'Removes trapped air that causes air locks, noise and corrosion',
      'Helps maintain full flow and heat-transfer efficiency',
      'Shut-off connector closes automatically when the vent is unscrewed',
      'Service or replace the vent without draining the system',
      'Four sizes: 10, 15, 20 and 25 mm',
      'Rated PN16, 0 °C to 120 °C',
      'Every body tested to 24 bar',
    ],
    keySpecs: [
      { label: 'Sizes', value: '10–25 mm' },
      { label: 'Pressure', value: 'PN16' },
      { label: 'Temperature', value: '0–120 °C' },
      { label: 'Body', value: 'Forged brass' },
    ],
    working: floatVentSteps,
    construction: [
      'Simple design — a free-floating valve with very few moving parts',
      'Body and top cover in forged brass (IS 8737 / IS 319)',
      'Corrosion-resistant brass and PP working parts',
      'Delrin float arm with SS304 spring and screw',
      'NBR O-ring seal between body and cover',
      'Brass hex-nut shut-off connector included with every size',
      'Designed for working pressures up to PN16 (150 psig)',
    ],
    applications: [
      'High points in chilled- and hot-water pipework',
      'Fan-coil units and AHU coils',
      'Boilers, calorifiers and heating circuits',
      'Expansion and buffer vessels',
      'Pump sets and plant-room headers',
    ],
    specs: [
      { group: 'General', label: 'Type', value: 'Automatic, full brass body with HD/LD float and shut-off connector' },
      { group: 'General', label: 'Sizes', value: '10, 15, 20, 25 mm' },
      { group: 'General', label: 'Connection', value: 'Screwed end' },
      { group: 'General', label: 'Suitable media', value: 'Water' },
      { group: 'Materials', label: 'Body', value: 'Forged brass, IS 8737 / IS 319 Gr. DCB-I / DCB-II' },
      { group: 'Materials', label: 'Top cover', value: 'Forged brass, IS 8737 / IS 319 Gr. DCB-I / DCB-II' },
      { group: 'Materials', label: 'Float', value: 'HD / LD' },
      { group: 'Materials', label: 'Arm', value: 'Delrin' },
      { group: 'Materials', label: 'O-ring', value: 'NBR' },
      { group: 'Materials', label: 'Spring & screw', value: 'SS304' },
      { group: 'Materials', label: 'Connector', value: 'Brass hex nut, IS 319 Gr. DCB-I' },
      { group: 'Ratings', label: 'Operating temperature', value: '0 °C to 120 °C' },
      { group: 'Ratings', label: 'Working pressure', value: 'PN16' },
      { group: 'Ratings', label: 'Body test pressure', value: '24 bar' },
      { group: 'Ratings', label: 'Orifice area', value: '1.5 mm² (10 mm) · 3.2 mm² (15–25 mm)' },
    ],
  },
  {
    slug: 'autovent-ss',
    name: 'Autovent SS304/316',
    summary: 'Stainless-steel automatic air vent for chilled-water, brine and corrosive duties.',
    image: '/images/products/autovent-ss.jpg',
    imageFit: 'contain',
    category: 'Air Purging Valve',
    accent: 'brand',
    intro:
      'A stainless-steel version of our automatic air vent for duties where brass is not suitable. A male taper thread lets it mount directly on top of an isolation valve.',
    highlights: [
      'Fully automatic — no manual bleeding needed',
      'Cast stainless body in CF8 (SS304) or CF8M (SS316)',
      'Suits water and brine, including corrosive duties',
      'Stainless arm, spring and screw; EPDM seal',
      'BSPT male thread — mounts directly on an isolation valve',
      'Rated PN16, −10 °C to 90 °C',
      'Body tested to 33 bar',
    ],
    keySpecs: [
      { label: 'Size', value: '25 mm' },
      { label: 'Pressure', value: 'PN16' },
      { label: 'Temperature', value: '−10–90 °C' },
      { label: 'Body', value: 'CF8 / CF8M' },
    ],
    working: floatVentSteps,
    construction: [
      'Simple design — a free-floating valve with very few moving parts',
      'Body and top cover cast in ASTM A351 CF8 / CF8M stainless steel',
      'Corrosion-resistant SS304 / SS316 working parts',
      'Float in HD / LD or SS304 / SS316 to suit the duty',
      'EPDM O-ring, suitable for water and brine',
      'Designed for working pressures up to PN16',
    ],
    applications: [
      'Chilled-water and brine systems',
      'Corrosive or treated-water circuits',
      'Process cooling and industrial plant',
      'Coastal or humid installations where brass corrodes',
    ],
    specs: [
      { group: 'General', label: 'Type', value: 'Automatic' },
      { group: 'General', label: 'Connection size', value: '25 mm (B3)' },
      { group: 'General', label: 'Connection', value: 'BSPT (male)' },
      { group: 'General', label: 'Suitable media', value: 'Water / brine' },
      { group: 'Materials', label: 'Body', value: 'ASTM A351 CF8 / CF8M' },
      { group: 'Materials', label: 'Top cover', value: 'ASTM A351 CF8 / CF8M' },
      { group: 'Materials', label: 'Float', value: 'HD / LD or SS304 / SS316' },
      { group: 'Materials', label: 'Arm', value: 'SS304 / SS316' },
      { group: 'Materials', label: 'O-ring', value: 'EPDM' },
      { group: 'Materials', label: 'Spring & screw', value: 'SS304 / SS316' },
      { group: 'Ratings', label: 'Operating temperature', value: '−10 °C to 90 °C' },
      { group: 'Ratings', label: 'Working pressure', value: 'PN16' },
      { group: 'Ratings', label: 'Body test pressure', value: '33 bar (without float)' },
      { group: 'Ratings', label: 'Orifice', value: '1.5 mm' },
    ],
  },
  {
    slug: 'megavent-ss',
    name: 'Megavent SS304/316',
    summary: 'High-capacity stainless-steel air vent with a conical body for hydronic systems.',
    image: '/images/products/megavent-ss.jpg',
    imageFit: 'contain',
    category: 'Air Purging Valve',
    accent: 'emerald',
    intro:
      'A high-efficiency air purger for hydronic systems. Trapped air causes corrosion and cuts heat-transfer efficiency — the Megavent’s conical body and larger orifice remove it quickly and reliably.',
    highlights: [
      'Conical body for faster, more efficient venting',
      'Larger 3 mm orifice for high air-release capacity',
      'Adjustable screw to control venting',
      'All-metal internals, including a stainless float',
      '20 mm hose nozzle for a piped drain',
      'Easy to open for cleaning and maintenance',
      'Rated PN16, −10 °C to 90 °C; body tested to 33 bar',
    ],
    keySpecs: [
      { label: 'Size', value: '25 mm' },
      { label: 'Pressure', value: 'PN16' },
      { label: 'Temperature', value: '−10–90 °C' },
      { label: 'Body', value: 'CF8 / CF8M' },
    ],
    working: floatVentSteps,
    construction: [
      'Conical body design increases venting efficiency',
      'Body cast in ASTM A351 CF8 / CF8M stainless steel',
      'SS304 / SS316 float and venting mechanism — all-metal internals',
      'EPDM O-ring and seating',
      'Adjustable SS304 / SS316 vent control screw',
      '20 mm hose nozzle to pipe away discharge',
      'Simple to open for cleaning and maintenance',
    ],
    applications: [
      'Hydronic heating and cooling systems',
      'Plant-room headers and main risers',
      'Boiler and chiller circuits',
      'Large-volume water and brine systems',
      'Process and industrial pipework',
    ],
    specs: [
      { group: 'General', label: 'Type', value: 'Automatic' },
      { group: 'General', label: 'Connection size', value: '25 mm' },
      { group: 'General', label: 'Connection', value: 'BSP male taper (screwed); flanged option' },
      { group: 'General', label: 'Suitable media', value: 'Water / brine' },
      { group: 'Materials', label: 'Body', value: 'ASTM A351 CF8 / CF8M' },
      { group: 'Materials', label: 'Float', value: 'SS304 / SS316' },
      { group: 'Materials', label: 'Mechanism', value: 'SS304 / SS316' },
      { group: 'Materials', label: 'O-ring & seating', value: 'EPDM' },
      { group: 'Materials', label: 'Vent control screw', value: 'SS304 / SS316' },
      { group: 'Ratings', label: 'Operating temperature', value: '−10 °C to 90 °C' },
      { group: 'Ratings', label: 'Working pressure', value: 'PN16' },
      { group: 'Ratings', label: 'Body test pressure', value: '33 bar' },
      { group: 'Ratings', label: 'Orifice area', value: '3 mm' },
      { group: 'Ratings', label: 'Drain nozzle', value: '20 mm hose nozzle' },
    ],
  },
];

/** Image classes for a product photo — `contain` keeps cut-out shots uncropped. */
export const productImageClass = (p: Product) =>
  p.imageFit === 'contain' ? 'bg-white object-contain p-4' : 'object-cover';

export const getProduct = (slug: string) =>
  products.find((p) => p.slug === slug);

/** Spec rows that have a real value (placeholder `TODO:` rows are dropped). */
export const realSpecs = (p: Product) =>
  p.specs.filter((row) => !isPlaceholder(row.value));
