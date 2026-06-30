import { z } from "zod";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Please enter your full name.")
    .max(80, "That name is a little too long."),
  email: z
    .string()
    .min(1, "Email is required.")
    .regex(emailRegex, "Please enter a valid email address."),
  company: z.string().max(120).optional().or(z.literal("")),
  budget: z.string().min(1, "Please select a budget range."),
  service: z.string().min(1, "Please choose a service."),
  message: z
    .string()
    .min(10, "Tell us a little more (at least 10 characters).")
    .max(2000, "Message is too long."),
  // Honeypot — must stay empty.
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactValues = z.infer<typeof contactSchema>;

export const budgetOptions = [
  "Under ₹50K / month",
  "₹50K – ₹2L / month",
  "₹2L – ₹5L / month",
  "₹5L+ / month",
  "One-off project",
];

export const serviceOptions = [
  "SEO Supernova",
  "PPC Planet",
  "Social Media Universe",
  "Content Constellation",
  "Email Orbit",
  "Website Design Nebula",
  "Graphic Design Galaxy",
  "Video Creation Realm",
  "Full-funnel growth",
  "Not sure yet",
];

/* ───────────────── Free Growth Audit (lead magnet) ───────────────── */

const urlishRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/i;

export const auditSchema = z.object({
  website: z
    .string()
    .min(3, "Please enter your website.")
    .regex(urlishRegex, "Enter a valid website, e.g. yourbrand.com"),
  goal: z.string().min(1, "Pick your primary goal."),
  focus: z.array(z.string()).min(1, "Choose at least one focus area."),
  budget: z.string().min(1, "Select a budget range."),
  name: z
    .string()
    .min(2, "Please enter your name.")
    .max(80, "That name is a little too long."),
  email: z
    .string()
    .min(1, "Email is required.")
    .regex(emailRegex, "Please enter a valid email address."),
  // Honeypot — must stay empty.
  hp: z.string().max(0).optional().or(z.literal("")),
});

export type AuditValues = z.infer<typeof auditSchema>;

export const auditGoals = [
  "More leads & sales",
  "Higher search rankings",
  "Grow brand awareness",
  "Launch a new product",
  "Improve my website",
  "Not sure — guide me",
];

export const auditFocus = [
  "SEO",
  "Paid Ads (PPC)",
  "Social Media",
  "Content",
  "Email",
  "Website / Design",
  "Video / Reels",
];

