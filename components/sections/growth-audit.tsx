"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Loader2,
  CheckCircle2,
  Globe,
  Telescope,
  Gauge,
  FileSearch,
  ShieldCheck,
  Clock,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  auditSchema,
  auditGoals,
  auditFocus,
  budgetOptions,
  type AuditValues,
} from "@/lib/validations";

const TOTAL = 3;

const fieldBase =
  "w-full rounded-xl border border-hairline bg-space-950/40 px-4 py-3 text-sm text-white placeholder:text-stardust-dim transition-colors focus:border-nebula-400 focus:outline-none focus:ring-2 focus:ring-nebula-500/30";

const perks = [
  { icon: FileSearch, text: "A tailored review of your search, ads & site" },
  { icon: Gauge, text: "Quick-win opportunities ranked by impact" },
  { icon: ShieldCheck, text: "No obligation — keep the insights either way" },
];

export function GrowthAudit() {
  const [step, setStep] = React.useState(0);
  const [dir, setDir] = React.useState(1);
  const [submitted, setSubmitted] = React.useState(false);
  const [sending, setSending] = React.useState(false);
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const [values, setValues] = React.useState<AuditValues>({
    website: "",
    goal: "",
    focus: [],
    budget: "",
    name: "",
    email: "",
    hp: "",
  });

  function set<K extends keyof AuditValues>(key: K, val: AuditValues[K]) {
    setValues((v) => ({ ...v, [key]: val }));
    setErrors((e) => ({ ...e, [key]: "" }));
  }

  function toggleFocus(item: string) {
    setValues((v) => ({
      ...v,
      focus: v.focus.includes(item)
        ? v.focus.filter((f) => f !== item)
        : [...v.focus, item],
    }));
    setErrors((e) => ({ ...e, focus: "" }));
  }

  function validateStep(s: number) {
    const e: Record<string, string> = {};
    if (s === 0) {
      if (!/^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/i.test(values.website))
        e.website = "Enter a valid website, e.g. yourbrand.com";
      if (!values.goal) e.goal = "Pick your primary goal.";
    }
    if (s === 1) {
      if (values.focus.length === 0) e.focus = "Choose at least one focus area.";
      if (!values.budget) e.budget = "Select a budget range.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function next() {
    if (!validateStep(step)) return;
    setDir(1);
    setStep((s) => Math.min(s + 1, TOTAL - 1));
  }
  function back() {
    setDir(-1);
    setStep((s) => Math.max(s - 1, 0));
  }

  async function submit() {
    const parsed = auditSchema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      const e: Record<string, string> = {};
      for (const [k, v] of Object.entries(fieldErrors)) if (v?.[0]) e[k] = v[0];
      setErrors(e);
      return;
    }
    setSending(true);
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "audit", ...values }),
      });
    } catch {
      /* fail open */
    }
    setSending(false);
    setSubmitted(true);
  }

  return (
    <section id="audit" className="section-pad relative scroll-mt-24">
      <Container>
        <div className="overflow-hidden rounded-[2rem] border border-hairline glass-strong">
          <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
            {/* ── Value panel ─────────────────────────── */}
            <div className="relative overflow-hidden border-b border-hairline p-8 lg:border-b-0 lg:border-r lg:p-12">
              <div className="absolute -left-16 -top-16 size-64 rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.25),transparent_65%)] blur-2xl" />
              <div className="relative">
                <SectionHeading
                  align="left"
                  eyebrow="Free Growth Audit"
                  title={
                    <>
                      Run a free{" "}
                      <span className="text-gradient">mission diagnostic</span>
                    </>
                  }
                  description="Tell us about your brand and we'll send back a personalized growth audit — where you're leaking opportunity and how to fix it."
                  titleClassName="text-3xl lg:text-4xl"
                />
                <ul className="mt-8 space-y-4">
                  {perks.map(({ icon: Icon, text }) => (
                    <li key={text} className="flex items-start gap-3">
                      <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl bg-nebula-500/12 text-nebula-300">
                        <Icon className="size-4.5" aria-hidden />
                      </span>
                      <span className="text-sm leading-relaxed text-stardust">
                        {text}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-hairline bg-white/[0.04] px-4 py-2 text-xs text-stardust">
                  <Clock className="size-3.5 text-aurora-400" aria-hidden />
                  Delivered within 2 business days
                </div>
              </div>
            </div>

            {/* ── Stepper form ────────────────────────── */}
            <div className="p-8 lg:p-12">
              {submitted ? (
                <div className="flex h-full flex-col items-center justify-center py-12 text-center">
                  <span className="flex size-16 items-center justify-center rounded-full bg-aurora-500/15 text-aurora-400">
                    <CheckCircle2 className="size-8" aria-hidden />
                  </span>
                  <h3 className="mt-6 font-display text-2xl font-semibold text-white">
                    Mission diagnostic queued 🛰️
                  </h3>
                  <p className="mt-3 max-w-sm text-pretty text-stardust">
                    Our crew is analysing{" "}
                    <span className="font-medium text-white">
                      {values.website.replace(/^https?:\/\//, "")}
                    </span>
                    . Your personalized audit will land in your inbox within two
                    business days.
                  </p>
                  <Button
                    asChild
                    variant="gradient"
                    size="lg"
                    className="mt-8"
                  >
                    <a href="#contact">Can&apos;t wait? Book a call</a>
                  </Button>
                </div>
              ) : (
                <>
                  {/* Progress */}
                  <div className="mb-8">
                    <div className="flex items-center justify-between text-xs text-stardust-dim">
                      <span>
                        Step {step + 1} of {TOTAL}
                      </span>
                      <span>{Math.round(((step + 1) / TOTAL) * 100)}%</span>
                    </div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-nebula-500 via-violet-500 to-cosmos-500"
                        initial={false}
                        animate={{ width: `${((step + 1) / TOTAL) * 100}%` }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </div>
                  </div>

                  <div className="relative min-h-[20rem]">
                    <AnimatePresence mode="wait" custom={dir}>
                      <motion.div
                        key={step}
                        custom={dir}
                        initial={{ opacity: 0, x: dir * 28 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: dir * -28 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      >
                        {step === 0 && (
                          <div className="space-y-6">
                            <FieldShell
                              label="Your website"
                              error={errors.website}
                              htmlFor="audit-website"
                              icon={<Globe className="size-4" aria-hidden />}
                            >
                              <input
                                id="audit-website"
                                className={cn(fieldBase, "pl-10", errors.website && "border-red-400/60")}
                                placeholder="yourbrand.com"
                                value={values.website}
                                onChange={(e) => set("website", e.target.value)}
                              />
                            </FieldShell>

                            <div>
                              <p className="mb-3 text-sm font-medium text-white">
                                What&apos;s your primary goal?
                              </p>
                              <ChipGroup
                                options={auditGoals}
                                selected={[values.goal]}
                                onSelect={(o) => set("goal", o)}
                              />
                              {errors.goal && <ErrorText>{errors.goal}</ErrorText>}
                            </div>
                          </div>
                        )}

                        {step === 1 && (
                          <div className="space-y-6">
                            <div>
                              <p className="mb-3 text-sm font-medium text-white">
                                Which areas should we focus on?{" "}
                                <span className="text-stardust-dim">(select all that apply)</span>
                              </p>
                              <ChipGroup
                                options={auditFocus}
                                selected={values.focus}
                                onSelect={toggleFocus}
                                multi
                              />
                              {errors.focus && <ErrorText>{errors.focus}</ErrorText>}
                            </div>

                            <div>
                              <p className="mb-3 text-sm font-medium text-white">
                                Monthly marketing budget
                              </p>
                              <ChipGroup
                                options={budgetOptions}
                                selected={[values.budget]}
                                onSelect={(o) => set("budget", o)}
                              />
                              {errors.budget && <ErrorText>{errors.budget}</ErrorText>}
                            </div>
                          </div>
                        )}

                        {step === 2 && (
                          <div className="space-y-5">
                            <div className="flex items-center gap-2 rounded-xl border border-hairline bg-nebula-500/[0.06] px-4 py-3 text-sm text-stardust">
                              <Telescope className="size-4 shrink-0 text-nebula-300" aria-hidden />
                              Almost there — where should we send your audit?
                            </div>
                            <FieldShell label="Full name" error={errors.name} htmlFor="audit-name">
                              <input
                                id="audit-name"
                                autoComplete="name"
                                className={cn(fieldBase, errors.name && "border-red-400/60")}
                                placeholder="Ada Lovelace"
                                value={values.name}
                                onChange={(e) => set("name", e.target.value)}
                              />
                            </FieldShell>
                            <FieldShell label="Work email" error={errors.email} htmlFor="audit-email">
                              <input
                                id="audit-email"
                                type="email"
                                autoComplete="email"
                                className={cn(fieldBase, errors.email && "border-red-400/60")}
                                placeholder="you@galaxy.com"
                                value={values.email}
                                onChange={(e) => set("email", e.target.value)}
                              />
                            </FieldShell>
                            {/* honeypot */}
                            <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
                              <label htmlFor="audit-hp">Leave empty</label>
                              <input
                                id="audit-hp"
                                tabIndex={-1}
                                autoComplete="off"
                                value={values.hp}
                                onChange={(e) => set("hp", e.target.value)}
                              />
                            </div>
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Controls */}
                  <div className="mt-8 flex items-center justify-between gap-3">
                    {step > 0 ? (
                      <Button variant="ghost" onClick={back}>
                        <ArrowLeft className="size-4" aria-hidden />
                        Back
                      </Button>
                    ) : (
                      <span />
                    )}
                    {step < TOTAL - 1 ? (
                      <Button variant="primary" onClick={next}>
                        Continue
                        <ArrowRight className="size-4" aria-hidden />
                      </Button>
                    ) : (
                      <Button variant="gradient" onClick={submit} disabled={sending}>
                        {sending ? (
                          <>
                            <Loader2 className="size-4 animate-spin" aria-hidden />
                            Sending…
                          </>
                        ) : (
                          <>
                            <Check className="size-4" aria-hidden />
                            Get my free audit
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function ChipGroup({
  options,
  selected,
  onSelect,
  multi,
}: {
  options: readonly string[];
  selected: string[];
  onSelect: (o: string) => void;
  multi?: boolean;
}) {
  return (
    <div className="flex flex-wrap gap-2" role={multi ? "group" : "radiogroup"}>
      {options.map((o) => {
        const active = selected.includes(o);
        return (
          <button
            key={o}
            type="button"
            role={multi ? "checkbox" : "radio"}
            aria-checked={active}
            onClick={() => onSelect(o)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-all",
              active
                ? "border-nebula-500/50 bg-nebula-500/15 text-white"
                : "border-hairline text-stardust hover:border-hairline-strong hover:text-white",
            )}
          >
            {active && <Check className="size-3.5 text-nebula-300" aria-hidden />}
            {o}
          </button>
        );
      })}
    </div>
  );
}

function FieldShell({
  label,
  htmlFor,
  error,
  icon,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-white">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-stardust-dim">
            {icon}
          </span>
        )}
        {children}
      </div>
      {error && <ErrorText>{error}</ErrorText>}
    </div>
  );
}

function ErrorText({ children }: { children: React.ReactNode }) {
  return (
    <p role="alert" className="mt-1.5 text-xs text-red-300">
      {children}
    </p>
  );
}
