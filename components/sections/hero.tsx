"use client";

import * as React from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { Rocket, ArrowRight, Star } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { OrbitalSystem } from "@/components/effects/orbital-system";
import { Counter } from "@/components/motion/counter";
import { Magnetic } from "@/components/motion/magnetic";
import { heroStats } from "@/data/stats";
import { Icon } from "@/components/ui/icon";
import { EASE_OUT_EXPO } from "@/lib/motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, delay: 0.1 + i * 0.08, ease: EASE_OUT_EXPO },
  }),
};

export function Hero() {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduce) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  // Parallax transform for the orbital system
  const orbX = useTransform(sx, [-0.5, 0.5], [16, -16]);
  const orbY = useTransform(sy, [-0.5, 0.5], [12, -12]);

  return (
    <section
      id="hero"
      onMouseMove={onMove}
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-16 lg:pt-32"
    >
      <Container className="relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
          {/* ── Left: copy ─────────────────────────────── */}
          <div className="max-w-2xl">
            <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show">
              <span className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-nebula-300">
                <span className="h-px w-7 bg-gradient-to-r from-transparent to-nebula-400/70" />
                Welcome to the Noobverse
              </span>
            </motion.div>

            <motion.h1
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="mt-6 text-balance text-4xl font-semibold leading-[1.04] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl"
            >
              Launch Your Brand Into The{" "}
              <span className="text-gradient">Digital Universe</span>
            </motion.h1>

            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-stardust"
            >
              We engineer SEO, paid media, content and design systems that send
              ambitious brands into orbit. Data-driven strategy meets cosmic
              creativity — for growth you can actually measure.
            </motion.p>

            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Magnetic strength={0.3}>
                <Button asChild variant="gradient" size="lg">
                  <a href="#contact">
                    <Rocket className="size-5" aria-hidden />
                    Book Consultation
                  </a>
                </Button>
              </Magnetic>
              <Button asChild variant="secondary" size="lg">
                <a href="#services">
                  Explore Services
                  <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" aria-hidden />
                </a>
              </Button>
            </motion.div>

            <motion.div
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-stardust"
            >
              <div className="flex items-center gap-1.5">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="size-4 fill-amber-300 text-amber-300"
                      aria-hidden
                    />
                  ))}
                </div>
                <span className="font-medium text-white">4.9/5</span>
                <span>average client rating</span>
              </div>
              <span className="hidden h-4 w-px bg-hairline-strong sm:block" />
              <span>
                Trusted by <span className="font-medium text-white">420+</span>{" "}
                brands across 24 countries
              </span>
            </motion.div>
          </div>

          {/* ── Right: orbital system + stats ──────────── */}
          <div className="relative mx-auto aspect-square w-full max-w-md lg:max-w-none">
            {/* Orbital system with subtle mouse parallax */}
            <motion.div
              style={{ x: orbX, y: orbY }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: EASE_OUT_EXPO, delay: 0.2 }}
              className="relative z-0 h-full w-full"
            >
              <div className="animate-float-slow h-full w-full">
                <OrbitalSystem />
              </div>
            </motion.div>

            {/* Floating KPI cards */}
            <HeroStatCard
              className="left-0 top-1/3 sm:-left-6"
              index={0}
              delay={0.5}
            />
            <HeroStatCard
              className="right-0 top-12 sm:-right-4"
              index={1}
              delay={0.65}
            />
            <HeroStatCard
              className="-bottom-2 left-6 sm:left-2"
              index={2}
              delay={0.8}
            />
            <HeroStatCard
              className="bottom-16 right-0 sm:-right-6"
              index={3}
              delay={0.95}
            />
          </div>
        </div>
      </Container>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 lg:block"
      >
        <div className="flex h-9 w-5 items-start justify-center rounded-full border border-hairline-strong p-1">
          <motion.span
            animate={reduce ? {} : { y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="size-1.5 rounded-full bg-stardust"
          />
        </div>
      </motion.div>
    </section>
  );
}

function HeroStatCard({
  index,
  className,
  delay,
}: {
  index: number;
  className?: string;
  delay: number;
}) {
  const s = heroStats[index];
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay, ease: EASE_OUT_EXPO }}
      className={`absolute z-20 ${className ?? ""}`}
    >
      <div className="animate-float-slower glass rounded-2xl px-3.5 py-2.5 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.7)]">
        <div className="flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-xl bg-nebula-500/15 text-nebula-300">
            <Icon name={s.icon} className="size-4" />
          </span>
          <div>
            <div className="font-display text-base font-semibold leading-none text-white">
              <Counter
                value={s.value}
                prefix={s.prefix}
                suffix={s.suffix}
                duration={2.2}
              />
            </div>
            <div className="mt-1 text-[11px] leading-none text-stardust">
              {s.label}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
