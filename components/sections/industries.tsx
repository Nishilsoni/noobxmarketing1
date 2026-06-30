"use client";

import * as React from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  MoveRight,
  TrendingUp,
  House,
  ChartColumnIncreasing,
  Sparkles,
  User,
  Rocket,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { IphoneMockup } from "@/components/ui/iphone-mockup";
import { useMediaQuery } from "@/hooks/use-media-query";
import { industries, type Industry } from "@/data/industries";

const PHONE_DESKTOP = "w-[18rem]";
const PHONE_MOBILE = "w-[78vw] max-w-[16.5rem] shrink-0 snap-center";

export function Industries() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const reduce = useReducedMotion();
  return isDesktop && !reduce ? <PinnedTrack /> : <SwipeTrack />;
}

/* ── Desktop: scroll vertically → phones glide horizontally (pinned) ── */
function PinnedTrack() {
  const targetRef = React.useRef<HTMLElement>(null);
  const trackRef = React.useRef<HTMLDivElement>(null);
  const [range, setRange] = React.useState(0);

  React.useEffect(() => {
    const measure = () => {
      if (!trackRef.current) return;
      setRange(Math.max(0, trackRef.current.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    const t = setTimeout(measure, 400);
    return () => {
      window.removeEventListener("resize", measure);
      clearTimeout(t);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -range]);

  return (
    <section
      id="industries"
      ref={targetRef}
      style={{ height: `calc(100vh + ${range}px)` }}
      className="relative"
      aria-label="Industries we power"
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex items-center gap-10 px-6 lg:px-10"
        >
          <HeadingPanel />
          {industries.map((ind, i) => (
            <IphoneMockup key={ind.name} className={PHONE_DESKTOP}>
              <IndustryScreen ind={ind} index={i} />
            </IphoneMockup>
          ))}
          <IphoneMockup className={PHONE_DESKTOP}>
            <CtaScreen />
          </IphoneMockup>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Mobile / reduced-motion: native horizontal swipe ── */
function SwipeTrack() {
  return (
    <section id="industries" className="section-pad" aria-label="Industries we power">
      <Container>
        <Eyebrow />
        <h2 className="mt-5 max-w-2xl text-balance text-[2rem] font-semibold leading-[1.1] tracking-tight sm:text-[2.6rem]">
          Growth for every <span className="text-gradient">galaxy of business</span>
        </h2>
        <p className="mt-4 max-w-xl text-pretty text-stardust">
          Deep expertise across the industries that matter — swipe to explore the
          worlds we help brands conquer.
        </p>
      </Container>
      <div className="mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-6 sm:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {industries.map((ind, i) => (
          <IphoneMockup key={ind.name} className={PHONE_MOBILE}>
            <IndustryScreen ind={ind} index={i} />
          </IphoneMockup>
        ))}
        <IphoneMockup className={PHONE_MOBILE}>
          <CtaScreen />
        </IphoneMockup>
      </div>
    </section>
  );
}

/* ── Phone screens ── */
const MOMENTUM = [86, 92, 78, 88, 72, 84, 95, 80];

function IndustryScreen({ ind, index }: { ind: Industry; index: number }) {
  const momentum = MOMENTUM[index % MOMENTUM.length];
  return (
    <div className="flex h-full flex-col text-left">
      {/* App bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="size-4 rounded-full bg-gradient-to-br from-nebula-400 to-cosmos-500" />
          <span className="text-[11px] font-semibold text-white">Noob X Growth</span>
        </div>
        <span className="flex items-center gap-1 rounded-full bg-aurora-500/15 px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-wide text-aurora-400">
          <span className="size-1 rounded-full bg-aurora-400" /> Live
        </span>
      </div>

      <p className="mt-4 text-[8px] font-semibold uppercase tracking-[0.2em] text-stardust-dim">
        Industry
      </p>
      <h3 className="mt-1 font-display text-[15px] font-semibold leading-tight text-white">
        {ind.name}
      </h3>

      {/* Hero metric card */}
      <div className="relative mt-3 overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(150deg,rgba(0,255,240,0.18),rgba(18,25,44,0.4))] p-3">
        <div className="flex items-start justify-between">
          <span className="flex size-8 items-center justify-center rounded-xl bg-white/10 text-nebula-200">
            <Icon name={ind.icon} className="size-4" />
          </span>
          <span className="flex items-center gap-0.5 text-[9px] font-semibold text-aurora-400">
            <TrendingUp className="size-3" aria-hidden /> trending
          </span>
        </div>
        <div className="mt-2 font-display text-2xl font-bold leading-none text-gradient">
          {ind.stat.value}
        </div>
        <div className="mt-1 text-[9px] text-stardust">{ind.stat.label}</div>
        <Sparkline />
      </div>

      {/* Momentum */}
      <div className="mt-3">
        <div className="flex items-center justify-between text-[9px] text-stardust-dim">
          <span>Growth momentum</span>
          <span className="font-semibold text-white">{momentum}%</span>
        </div>
        <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-nebula-500 via-violet-500 to-cosmos-500"
            style={{ width: `${momentum}%` }}
          />
        </div>
      </div>

      <p className="mt-3 line-clamp-3 text-[10px] leading-relaxed text-stardust">
        {ind.blurb}
      </p>

      <TabBar />
    </div>
  );
}

function CtaScreen() {
  return (
    <div className="flex h-full flex-col text-left">
      <div className="flex items-center gap-1.5">
        <span className="size-4 rounded-full bg-gradient-to-br from-nebula-400 to-cosmos-500" />
        <span className="text-[11px] font-semibold text-white">Noob X Growth</span>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <span className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-nebula-500/30 to-violet-500/10 text-nebula-200">
          <Rocket className="size-6" aria-hidden />
        </span>
        <h3 className="mt-4 font-display text-base font-semibold leading-tight text-white">
          Don&apos;t see your industry?
        </h3>
        <p className="mt-2 text-[10px] leading-relaxed text-stardust">
          We adapt our playbook to any market. Let&apos;s map your growth mission.
        </p>
        <a
          href="#contact"
          className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-[linear-gradient(110deg,var(--color-nebula-400),var(--color-nebula-500)_45%,var(--color-cosmos-400))] px-4 py-2 text-[11px] font-semibold text-space-950"
        >
          Map my growth <ArrowRight className="size-3" aria-hidden />
        </a>
      </div>

      <TabBar />
    </div>
  );
}

function Sparkline() {
  return (
    <svg
      viewBox="0 0 120 32"
      className="mt-2 h-7 w-full"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="spark-stroke" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#00fff0" />
          <stop offset="100%" stopColor="#34d399" />
        </linearGradient>
        <linearGradient id="spark-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00fff0" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#00fff0" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0 26 L18 22 L36 24 L54 15 L72 18 L90 9 L108 11 L120 3 V32 H0 Z"
        fill="url(#spark-fill)"
      />
      <path
        d="M0 26 L18 22 L36 24 L54 15 L72 18 L90 9 L108 11 L120 3"
        fill="none"
        stroke="url(#spark-stroke)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TabBar() {
  const items = [House, ChartColumnIncreasing, Sparkles, User];
  return (
    <div className="mt-auto flex items-center justify-around rounded-2xl border border-white/10 bg-white/[0.04] px-2 py-2">
      {items.map((I, i) => (
        <I
          key={i}
          className={`size-4 ${i === 0 ? "text-nebula-300" : "text-stardust-dim"}`}
          aria-hidden
        />
      ))}
    </div>
  );
}

function HeadingPanel() {
  return (
    <div className="flex w-[32rem] shrink-0 flex-col justify-center pr-8">
      <Eyebrow />
      <h2 className="mt-5 text-balance text-[2.6rem] font-semibold leading-[1.05] tracking-tight xl:text-[3.25rem]">
        Growth for every <span className="text-gradient">galaxy of business</span>
      </h2>
      <p className="mt-5 max-w-md text-pretty text-lg leading-relaxed text-stardust">
        Deep expertise across the industries that matter — visualised the way your
        customers experience your brand: on mobile.
      </p>
      <div className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-nebula-300">
        Scroll to explore
        <MoveRight className="size-4 animate-pulse" aria-hidden />
      </div>
    </div>
  );
}

function Eyebrow() {
  return (
    <span className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-nebula-300">
      <span className="h-px w-7 bg-gradient-to-r from-transparent to-nebula-400/70" />
      Industries We Power
    </span>
  );
}
