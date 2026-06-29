import type { Stat } from "@/types";

/** Headline trust metrics (animated counters). */
export const trustStats: Stat[] = [
  { value: 420, suffix: "+", label: "Projects Launched", icon: "rocket" },
  { value: 7, suffix: " yrs", label: "Years In Orbit", icon: "orbit" },
  { value: 98, suffix: "%", label: "Client Satisfaction", icon: "sparkles" },
  { value: 92, suffix: "%", label: "Campaign Success Rate", icon: "trophy" },
  { value: 24, suffix: "", label: "Countries Served", icon: "globe" },
];

/** Live KPI tiles shown in the hero. */
export const heroStats: Stat[] = [
  { value: 150, prefix: "+", suffix: "%", label: "Organic Traffic", icon: "trendingUp" },
  { value: 12, prefix: "", suffix: "K+", label: "Leads Generated", icon: "users" },
  { value: 4.2, prefix: "", suffix: "x", label: "Avg. Campaign ROI", icon: "lineChart" },
  { value: 96, prefix: "", suffix: "/100", label: "Avg. SEO Score", icon: "gauge" },
];
