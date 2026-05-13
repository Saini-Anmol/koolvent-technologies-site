/**
 * Single source of truth for company-wide details.
 *
 * NOTE: items marked `TODO:` are placeholders — replace with the real
 * values when available. They are intentionally obvious so nothing
 * fake ships unnoticed.
 */
export const site = {
  name: 'Koolvent Technologies',
  shortName: 'Koolvent',
  tagline: 'Precision-engineered HVAC & fluid-control components',
  description:
    'Koolvent Technologies designs and manufactures certified HVAC and fluid-control components — suction guides, pressure vessels, hot water generators and valve kits — for industrial, commercial and infrastructure projects.',
  url: 'https://koolvent.in',
  foundedYear: 2025,
  location: 'Noida, Uttar Pradesh, India',

  // TODO: confirm the correct GST number (header & footer disagreed in the
  // original site — 'xxxxxxx' vs '06BUEPB4342M1ZQ').
  gst: '06BUEPB4342M1ZQ',

  contact: {
    phone: '+91 97213 03258',
    phoneHref: 'tel:+919721303258',
    // TODO: replace with the real company inbox.
    email: 'info@koolvent.in',
    emailHref: 'mailto:info@koolvent.in',
    address: 'C-23, A Block, Sector 15, Noida, Uttar Pradesh 201301, India',
    // Used for the Google Maps embed & directions link (Plus Code = precise pin).
    mapsQuery: 'H8M5+44H C-23, A Block, Sector 15, Noida, Uttar Pradesh 201301',
  },

  social: {
    // TODO: real profile URLs (currently '#').
    linkedin: '#',
    instagram: '#',
    x: '#',
  },
} as const;

/** Primary site navigation. */
export const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products/' },
  { label: 'About', href: '/about/' },
  { label: 'Leadership', href: '/leadership/' },
  { label: 'Contact', href: '/contact/' },
] as const;

/** Grouped links shown in the footer. */
export const footerLinks = [
  {
    heading: 'Company',
    links: [
      { label: 'About Us', href: '/about/' },
      { label: 'Leadership', href: '/leadership/' },
      { label: 'Company Profile', href: '/company-profile/' },
      { label: 'Careers', href: '/careers/' },
    ],
  },
  {
    heading: 'Products',
    links: [
      { label: 'All Products', href: '/products/' },
      { label: 'Suction Guides', href: '/products/suction-guide/' },
      { label: 'Pressure Vessels', href: '/products/pressure-vessel/' },
      { label: 'Hot Water Generators', href: '/products/hot-water-generator/' },
      { label: 'Valve Kits', href: '/products/valve-kit/' },
    ],
  },
  {
    heading: 'Support',
    links: [
      { label: 'Request a Quote', href: '/quote/' },
      { label: 'Technical Support', href: '/support/' },
      { label: 'Blog & Insights', href: '/blog/' },
      { label: 'Contact', href: '/contact/' },
    ],
  },
] as const;
