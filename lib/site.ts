/**
 * Central site configuration. Single source of truth for brand,
 * contact, navigation and SEO defaults. Keeping this typed and
 * centralised makes the whole app trivially re-themeable / CMS-ready.
 */

export const siteConfig = {
  name: "NoobxMarketing",
  legalName: "NoobxMarketing LLC",
  tagline: "Launch Your Brand Into The Digital Universe",
  description:
    "NoobxMarketing is a premium digital marketing agency engineering SEO, paid media, content and design systems that send ambitious brands into orbit. Data-driven growth, cosmic creativity.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://noobxmarketing.com",
  ogImage: "/og.png",
  locale: "en_IN",
  email: "hello@noobxmarketing.com",
  phone: "+91 98250 12345",
  phoneHref: "tel:+919825012345",
  address: {
    street: "Orbit Plaza, SG Highway",
    city: "Ahmedabad",
    region: "GJ",
    postalCode: "380015",
    country: "IN",
  },
  geo: { lat: 23.0225, lng: 72.5714 },
  foundingYear: 2019,
  calendly:
    process.env.NEXT_PUBLIC_CALENDLY_URL ||
    "https://calendly.com/noobxmarketing/consultation",
  socials: {
    twitter: "https://twitter.com/noobxmarketing",
    linkedin: "https://www.linkedin.com/company/noobxmarketing",
    instagram: "https://www.instagram.com/noobxmarketing",
    youtube: "https://www.youtube.com/@noobxmarketing",
    dribbble: "https://dribbble.com/noobxmarketing",
  },
  twitterHandle: "@noobxmarketing",
} as const;

export type NavItem = { label: string; href: string };

export const navItems: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Case Studies", href: "#case-studies" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export const footerNav: { title: string; links: NavItem[] }[] = [
  {
    title: "Agency",
    links: [
      { label: "About the Noobverse", href: "#about" },
      { label: "Our Process", href: "#process" },
      { label: "Case Studies", href: "#case-studies" },
      { label: "Testimonials", href: "#testimonials" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "SEO Supernova", href: "#services" },
      { label: "PPC Planet", href: "#services" },
      { label: "Social Media Universe", href: "#services" },
      { label: "Content Constellation", href: "#services" },
      { label: "Website Design Nebula", href: "#services" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "#blog" },
      { label: "FAQ", href: "#faq" },
      { label: "Book a Consultation", href: "#contact" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];
