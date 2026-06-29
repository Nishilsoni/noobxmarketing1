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
