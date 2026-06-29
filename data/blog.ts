import type { BlogPost } from "@/types";

export const blogPosts: BlogPost[] = [
  {
    slug: "seo-compounding-growth-engine",
    title: "Why SEO Is the Compounding Growth Engine Every Brand Underrates",
    excerpt:
      "Paid media stops the moment you stop paying. Organic search keeps working while you sleep — here's how to build a flywheel that compounds.",
    category: "SEO",
    tags: ["SEO", "Organic Growth", "Strategy"],
    readingTime: 7,
    publishedAt: "2026-05-18",
    author: { name: "Amara Osei", role: "Head of SEO" },
    featured: true,
  },
  {
    slug: "ppc-quality-score-roi",
    title: "The Quality Score Playbook: Cutting PPC Costs Without Cutting Reach",
    excerpt:
      "Most accounts overpay for clicks they could earn cheaper. A practical framework for raising quality score and stretching every media dollar.",
    category: "Paid Media",
    tags: ["PPC", "Google Ads", "ROI"],
    readingTime: 6,
    publishedAt: "2026-05-02",
    author: { name: "Daniel Reyes", role: "Paid Media Lead" },
  },
  {
    slug: "short-form-video-system",
    title: "Building a Short-Form Video System That Doesn't Burn Out Your Team",
    excerpt:
      "Virality is a system, not a fluke. How to design a repeatable reel engine that produces consistently without creative exhaustion.",
    category: "Social",
    tags: ["Video", "Social Media", "Content"],
    readingTime: 8,
    publishedAt: "2026-04-21",
    author: { name: "Priya Nair", role: "Creative Director" },
  },
  {
    slug: "lifecycle-email-revenue",
    title: "Lifecycle Email: The Highest-ROI Channel Hiding in Plain Sight",
    excerpt:
      "With an average return of ₹42 for every ₹1 spent, email is still unmatched. The flows every brand should automate first.",
    category: "Email",
    tags: ["Email", "Automation", "Retention"],
    readingTime: 5,
    publishedAt: "2026-04-09",
    author: { name: "Sofia Marchetti", role: "Lifecycle Strategist" },
  },
  {
    slug: "core-web-vitals-conversion",
    title: "How Core Web Vitals Quietly Decide Your Conversion Rate",
    excerpt:
      "94% of first impressions are design-related — and speed is design. What a faster site really does to bounce rate and revenue.",
    category: "Web Design",
    tags: ["Performance", "CRO", "UX"],
    readingTime: 6,
    publishedAt: "2026-03-27",
    author: { name: "Marcus Feld", role: "Web Lead" },
  },
  {
    slug: "data-driven-brand-storytelling",
    title: "Data-Driven Brand Storytelling: Creativity Meets the Analytics Engine",
    excerpt:
      "The best campaigns feel like art and perform like science. How to let data sharpen — not strangle — your creative instincts.",
    category: "Strategy",
    tags: ["Branding", "Content", "Analytics"],
    readingTime: 7,
    publishedAt: "2026-03-12",
    author: { name: "Amara Osei", role: "Head of SEO" },
  },
];

export const blogCategories = [
  "All",
  "SEO",
  "Paid Media",
  "Social",
  "Email",
  "Web Design",
  "Strategy",
] as const;
