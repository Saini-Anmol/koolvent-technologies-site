/**
 * Company-wide narrative data — mission, values, milestones, certifications, etc.
 *
 * Most of this is sensible default copy you can refine. Entries that need
 * the owner's verified figures/wording are written as `TODO:` — those are
 * automatically hidden on the site (the pages filter placeholder content)
 * until real values are supplied. Never publish a certification claim before
 * the certificate is in hand.
 */

export const mission =
  'To deliver precision-engineered HVAC and fluid-control components that raise the reliability and efficiency of every installation we support.';

export const vision =
  'To be a trusted manufacturer of HVAC and fluid-control components, recognised for engineering quality, configurability and responsive service.';

/** A few sentences expanding the company story (homepage About themes carried through). */
export const overview =
  'Founded in 2025 and headquartered in Noida, Uttar Pradesh, Koolvent Technologies was established to address a clear gap in the market: the need for precision-engineered, project-configurable HVAC and fluid-control components backed by genuine engineering support. Our team brings together expertise in thermal systems, fluid dynamics and industrial fabrication to produce components — suction guides, pressure vessels, hot water generators and valve kits — that hold up to the demanding requirements of commercial buildings, healthcare facilities, data centres and large-scale infrastructure projects.';

/** 4–6 company values. */
export const values: { title: string; description: string }[] = [
  {
    title: 'Engineering rigour',
    description:
      'Every component is evaluated against recognised codes and real-world performance data. We do not cut corners on material selection, tolerances or testing.',
  },
  {
    title: 'Quality first',
    description:
      'From raw material to finished product, quality checks are embedded at every stage of manufacturing — not bolted on at the end.',
  },
  {
    title: 'Customer focus',
    description:
      'We work closely with consultants, contractors and end-clients to understand the specification before anything is built — and stay involved through delivery and beyond.',
  },
  {
    title: 'Reliability',
    description:
      'Our components sit in critical systems. We take that seriously — delivering on time, to spec, with documentation that satisfies demanding project requirements.',
  },
  {
    title: 'Continuous improvement',
    description:
      'We invest in tooling, processes and people so each product generation is better than the last — in performance, serviceability and ease of installation.',
  },
  {
    title: 'Integrity',
    description:
      'Transparent pricing, honest lead times and accurate technical data. We say what we mean and build what we promise.',
  },
];

/** A short company timeline. Extend with real milestones as they occur. */
export const milestones: { year: string; title: string; description: string }[] = [
  {
    year: '2025',
    title: 'Koolvent Technologies founded',
    description:
      'Established in Noida to manufacture precision-engineered, project-configurable HVAC and fluid-control components for the Indian and regional market.',
  },
  {
    year: '2025',
    title: 'Core product range introduced',
    description:
      'Our core product families brought to market — suction guides, pressure vessels, hot water generators and valve kits — plus configurable variants, each tailored to project requirements.',
  },
];

/**
 * Quality certifications and standards.
 *
 * IMPORTANT: do NOT publish a specific certification (ISO, BIS, IBR, CE,
 * ASME, etc.) until the certificate is formally issued and in hand. These
 * placeholder entries are hidden on the site; replace each `name` with the
 * real certification once verified and it will appear automatically.
 */
export const certifications: { name: string; description?: string }[] = [
  {
    name: 'TODO: Quality management certification (e.g. ISO 9001:2015)',
    description: 'TODO: add once the certificate has been issued and verified.',
  },
  {
    name: 'TODO: Pressure-vessel design / fabrication standard (e.g. IBR / ASME / PED)',
    description: 'TODO: confirm the applicable standard and certification status.',
  },
  {
    name: 'TODO: Product-level certification (e.g. BIS / CE / third-party inspection)',
    description: 'TODO: add once confirmed.',
  },
];

/** Industries and sectors Koolvent serves. */
export const industries: string[] = [
  'Commercial buildings',
  'Hospitality & hotels',
  'Healthcare & hospitals',
  'Data centres',
  'Manufacturing & industry',
  'Infrastructure & utilities',
  'Educational institutions',
  'Residential high-rise',
];

/** "By the numbers" — only verified, non-placeholder figures are shown. */
export const facts: { label: string; value: string }[] = [
  { label: 'Established', value: '2025' },
  { label: 'Product families', value: '10+' },
  { label: 'Industries served', value: '8+' },
  { label: 'Engineered & made in', value: 'Noida, India' },
  // Add verified figures (facility area, team size, projects delivered, …) here.
  { label: 'Facility area (sq ft)', value: 'TODO' },
  { label: 'Projects delivered', value: 'TODO' },
];
