import type { CaseStudy } from "@/types";

export const caseStudies: CaseStudy[] = [
  {
    slug: "nova-skincare",
    client: "Nova Skincare",
    industry: "DTC Beauty",
    service: "SEO Supernova + Content Constellation",
    summary:
      "A bootstrapped skincare brand stuck on page three. We rebuilt their technical foundation and content engine to dominate high-intent search.",
    metrics: [
      { label: "Organic Traffic", value: "312%", delta: "+312% YoY" },
      { label: "Keywords in Top 3", value: "184" },
      { label: "Revenue from Organic", value: "₹16Cr" },
    ],
    accent: "nebula",
  },
  {
    slug: "orbit-fintech",
    client: "Orbit Fintech",
    industry: "B2B SaaS",
    service: "PPC Planet + Website Design Nebula",
    summary:
      "A Series-A fintech burning budget on paid search. We re-architected campaigns and landing pages around qualified pipeline.",
    metrics: [
      { label: "Cost Per Lead", value: "-47%", delta: "-47%" },
      { label: "Demo Conversion", value: "5.8%", delta: "+210%" },
      { label: "Pipeline Generated", value: "₹36Cr" },
    ],
    accent: "cosmos",
  },
  {
    slug: "lumen-fitness",
    client: "Lumen Fitness",
    industry: "Health & Wellness",
    service: "Social Media Universe + Video Realm",
    summary:
      "A boutique studio chain looking to scale beyond word of mouth. We built a short-form video engine that turned members into a movement.",
    metrics: [
      { label: "Social Reach", value: "8.4M", delta: "+540%" },
      { label: "New Memberships", value: "3,200+" },
      { label: "Engagement Rate", value: "11.2%" },
    ],
    accent: "violet",
  },
  {
    slug: "stellar-retail",
    client: "Stellar Retail Co.",
    industry: "E-commerce",
    service: "Email Orbit + CRO",
    summary:
      "An established retailer leaving money on the table. We rebuilt lifecycle email and reactivation flows to recover lost revenue.",
    metrics: [
      { label: "Email Revenue", value: "+38%" },
      { label: "Abandoned-Cart Recovery", value: "₹5.2Cr" },
      { label: "List Growth", value: "+62%" },
    ],
    accent: "aurora",
  },
];
