import type { IconName } from "@/types";

export interface Industry {
  name: string;
  icon: IconName;
  blurb: string;
  stat: { value: string; label: string };
}

/** Industries we serve — shown in the horizontal-scroll showcase. */
export const industries: Industry[] = [
  {
    name: "E-commerce & D2C",
    icon: "rocket",
    blurb:
      "Full-funnel growth for online stores — from discovery to checkout and repeat purchase.",
    stat: { value: "3.4x", label: "avg. return on ad spend" },
  },
  {
    name: "SaaS & Technology",
    icon: "gauge",
    blurb:
      "Pipeline-focused demand generation and content that turns trials into customers.",
    stat: { value: "-41%", label: "lower cost per qualified lead" },
  },
  {
    name: "Fintech",
    icon: "lineChart",
    blurb:
      "Trust-led campaigns and compliant creative that convert high-intent audiences.",
    stat: { value: "+210%", label: "demo conversions" },
  },
  {
    name: "Healthcare & Wellness",
    icon: "shieldCheck",
    blurb:
      "Sensitive, credibility-first marketing that grows patients and members responsibly.",
    stat: { value: "+150%", label: "qualified enquiries" },
  },
  {
    name: "Real Estate",
    icon: "telescope",
    blurb:
      "Hyper-local SEO and paid campaigns that fill your pipeline with serious buyers.",
    stat: { value: "+64%", label: "site-visit bookings" },
  },
  {
    name: "Education & EdTech",
    icon: "compass",
    blurb:
      "Enrolment-driving funnels and content that build authority with learners and parents.",
    stat: { value: "+88%", label: "course sign-ups" },
  },
  {
    name: "Travel & Hospitality",
    icon: "globe",
    blurb:
      "Story-led social and search that turn wanderlust into direct bookings.",
    stat: { value: "+540%", label: "social reach" },
  },
  {
    name: "Professional Services",
    icon: "users",
    blurb:
      "Thought-leadership and lead-gen that position you as the obvious expert choice.",
    stat: { value: "+3.1x", label: "inbound leads" },
  },
];
