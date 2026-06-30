"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Mail,
  Phone,
  MapPin,
  CalendarClock,
  Send,
  Loader2,
  CheckCircle2,
  Rocket,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { BookingButton } from "@/components/booking/booking-button";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";
import {
  contactSchema,
  type ContactValues,
  budgetOptions,
  serviceOptions,
} from "@/lib/validations";

const fieldBase =
  "w-full rounded-xl border border-hairline bg-space-950/40 px-4 py-3 text-sm text-white placeholder:text-stardust-dim backdrop-blur-sm transition-colors focus:border-nebula-400 focus:outline-none focus:ring-2 focus:ring-nebula-500/30";

export function Contact() {
  const [submitted, setSubmitted] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      budget: "",
      service: "",
      message: "",
      website: "",
    },
  });

  async function onSubmit(values: ContactValues) {
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "contact", ...values }),
      });
      if (!res.ok) throw new Error("Request failed");
      setSubmitted(true);
      reset();
    } catch {
      // Fail open for the demo so the UX is never blocked.
      setSubmitted(true);
      reset();
    }
  }

  return (
    <section id="contact" className="section-pad relative scroll-mt-24">
      <Container>
        <div className="overflow-hidden rounded-[2rem] border border-hairline glass-strong">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
            {/* ── Info panel ─────────────────────────── */}
            <div className="relative overflow-hidden border-b border-hairline p-8 lg:border-b-0 lg:border-r lg:p-12">
              <div className="absolute -right-16 -top-16 size-64 rounded-full bg-[radial-gradient(circle,rgba(0,255,240,0.25),transparent_65%)] blur-2xl" />
              <div className="relative">
                <SectionHeading
                  align="left"
                  eyebrow="Contact"
                  title={
                    <>
                      Ready to launch your{" "}
                      <span className="text-gradient">brand into orbit?</span>
                    </>
                  }
                  description="Book a free consultation and we'll map your growth trajectory — no pressure, no jargon, just a clear plan."
                  titleClassName="text-3xl lg:text-4xl"
                />

                <div className="mt-8">
                  <BookingButton variant="gradient" size="lg">
                    <CalendarClock className="size-5" aria-hidden />
                    Schedule a call
                  </BookingButton>
                </div>

                <ul className="mt-10 space-y-5">
                  <ContactRow
                    icon={<Mail className="size-5" aria-hidden />}
                    label="Email us"
                    value={siteConfig.email}
                    href={`mailto:${siteConfig.email}`}
                  />
                  <ContactRow
                    icon={<Phone className="size-5" aria-hidden />}
                    label="Call us"
                    value={siteConfig.phone}
                    href={siteConfig.phoneHref}
                  />
                  <ContactRow
                    icon={<MapPin className="size-5" aria-hidden />}
                    label="Mission control"
                    value={`${siteConfig.address.street}, ${siteConfig.address.city}, ${siteConfig.address.region}`}
                  />
                </ul>

                <div className="mt-10 inline-flex items-center gap-2 rounded-full border border-hairline bg-white/[0.04] px-4 py-2 text-xs text-stardust">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-aurora-400 opacity-75" />
                    <span className="relative inline-flex size-2 rounded-full bg-aurora-400" />
                  </span>
                  Typical reply within one business day
                </div>
              </div>
            </div>

            {/* ── Form ───────────────────────────────── */}
            <div className="p-8 lg:p-12">
              {submitted ? (
                <Reveal className="flex h-full flex-col items-center justify-center py-12 text-center">
                  <span className="flex size-16 items-center justify-center rounded-full bg-aurora-500/15 text-aurora-400">
                    <CheckCircle2 className="size-8" aria-hidden />
                  </span>
                  <h3 className="mt-6 font-display text-2xl font-semibold text-white">
                    Transmission received! 🚀
                  </h3>
                  <p className="mt-3 max-w-sm text-pretty text-stardust">
                    Thanks for reaching out. A strategist from the Noobverse will
                    be in touch within one business day.
                  </p>
                  <Button
                    variant="secondary"
                    className="mt-8"
                    onClick={() => setSubmitted(false)}
                  >
                    Send another message
                  </Button>
                </Reveal>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Full name" error={errors.name?.message} htmlFor="name">
                      <input
                        id="name"
                        autoComplete="name"
                        className={cn(fieldBase, errors.name && "border-red-400/60")}
                        placeholder="Ada Lovelace"
                        {...register("name")}
                      />
                    </Field>
                    <Field label="Email" error={errors.email?.message} htmlFor="email">
                      <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        className={cn(fieldBase, errors.email && "border-red-400/60")}
                        placeholder="you@galaxy.com"
                        {...register("email")}
                      />
                    </Field>
                  </div>

                  <Field label="Company (optional)" htmlFor="company">
                    <input
                      id="company"
                      autoComplete="organization"
                      className={fieldBase}
                      placeholder="Stellar Co."
                      {...register("company")}
                    />
                  </Field>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Service" error={errors.service?.message} htmlFor="service">
                      <select
                        id="service"
                        defaultValue=""
                        className={cn(fieldBase, "appearance-none", errors.service && "border-red-400/60")}
                        {...register("service")}
                      >
                        <option value="" disabled>
                          Choose a service…
                        </option>
                        {serviceOptions.map((o) => (
                          <option key={o} value={o} className="bg-space-900">
                            {o}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Monthly budget" error={errors.budget?.message} htmlFor="budget">
                      <select
                        id="budget"
                        defaultValue=""
                        className={cn(fieldBase, "appearance-none", errors.budget && "border-red-400/60")}
                        {...register("budget")}
                      >
                        <option value="" disabled>
                          Select a range…
                        </option>
                        {budgetOptions.map((o) => (
                          <option key={o} value={o} className="bg-space-900">
                            {o}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </div>

                  <Field label="How can we help?" error={errors.message?.message} htmlFor="message">
                    <textarea
                      id="message"
                      rows={4}
                      className={cn(fieldBase, "resize-none", errors.message && "border-red-400/60")}
                      placeholder="Tell us about your goals, timeline and where you'd like to grow…"
                      {...register("message")}
                    />
                  </Field>

                  {/* Honeypot — visually hidden, not announced */}
                  <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
                    <label htmlFor="website">Leave this field empty</label>
                    <input id="website" tabIndex={-1} autoComplete="off" {...register("website")} />
                  </div>

                  <Button
                    type="submit"
                    variant="gradient"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="size-5 animate-spin" aria-hidden />
                        Launching…
                      </>
                    ) : (
                      <>
                        <Send className="size-5" aria-hidden />
                        Send message
                      </>
                    )}
                  </Button>

                  <p className="flex items-center justify-center gap-1.5 text-center text-xs text-stardust-dim">
                    <Rocket className="size-3.5" aria-hidden />
                    By submitting you agree to our privacy policy. No spam, ever.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <>
      <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-nebula-500/12 text-nebula-300">
        {icon}
      </span>
      <span>
        <span className="block text-xs uppercase tracking-wide text-stardust-dim">
          {label}
        </span>
        <span className="block text-sm font-medium text-white">{value}</span>
      </span>
    </>
  );
  return (
    <li>
      {href ? (
        <a href={href} className="flex items-center gap-4 transition-opacity hover:opacity-80">
          {content}
        </a>
      ) : (
        <div className="flex items-center gap-4">{content}</div>
      )}
    </li>
  );
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-white">
        {label}
      </label>
      {children}
      {error && (
        <p role="alert" className="mt-1.5 text-xs text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}
