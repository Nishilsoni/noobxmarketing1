/** Shared content types. Mirrors the shape a CMS (Sanity) would return,
 *  so swapping `/data` for live content is a drop-in change. */

export type IconName =
  | "search"
  | "target"
  | "share"
  | "pen"
  | "mail"
  | "layout"
  | "palette"
  | "clapperboard"
  | "rocket"
  | "sparkles"
  | "compass"
  | "lineChart"
  | "shieldCheck"
  | "users"
  | "globe"
  | "zap"
  | "trophy"
  | "telescope"
  | "orbit"
  | "gauge"
  | "trendingUp"
  | "messageSquare";

export interface Service {
  slug: string;
  name: string;
  planet: string;
  icon: IconName;
  tagline: string;
  summary: string;
  description: string;
  features: string[];
  stat: { value: string; label: string };
  accent: "nebula" | "cosmos" | "violet" | "aurora";
}

export interface Stat {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  icon: IconName;
}

export interface Value {
  title: string;
  description: string;
  icon: IconName;
}

export interface TimelineStep {
  phase: string;
  title: string;
  description: string;
  icon: IconName;
}

export interface CaseStudy {
  slug: string;
  client: string;
  industry: string;
  service: string;
  summary: string;
  metrics: { label: string; value: string; delta?: string }[];
  accent: "nebula" | "cosmos" | "violet" | "aurora";
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  rating: number;
  initials: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  readingTime: number;
  publishedAt: string;
  author: { name: string; role: string };
  featured?: boolean;
}

export interface ComparisonRow {
  feature: string;
  noobx: string;
  traditional: string;
}
