"use client";

import * as React from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check, MoveRight, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { IphoneMockup } from "@/components/ui/iphone-mockup";
import { services } from "@/data/services";
import type { Service } from "@/types";

/* Big phones, but height-capped to the viewport so they never overflow the
   pinned stage. Width is driven by viewport height (aspect ~9:19.3). */
const PHONE = "w-[min(22rem,41vh)]";

const accent = {
  nebula: {
    tile: "from-nebula-500/30 to-nebula-500/5",
    text: "text-nebula-300",
    bar: "from-nebula-500 via-violet-500 to-cosmos-500",
  },
  cosmos: {
    tile: "from-cosmos-500/30 to-cosmos-500/5",
    text: "text-cosmos-400",
    bar: "from-cosmos-500 via-nebula-500 to-violet-500",
  },
  violet: {
    tile: "from-violet-500/30 to-violet-500/5",
    text: "text-violet-400",
    bar: "from-violet-500 via-nebula-500 to-cosmos-500",
  },
  aurora: {
    tile: "from-aurora-500/30 to-aurora-500/5",
    text: "text-aurora-400",
    bar: "from-aurora-500 via-nebula-500 to-cosmos-500",
  },
} as const;

export function Services() {
  const reduce = useReducedMotion();
  return reduce ? <StaticTrack /> : <PinnedTrack />;
}

/* ── Pinned: vertical scroll drives the horizontal glide ── */
function PinnedTrack() {
  const targetRef = React.useRef<HTMLElement>(null);
  const trackRef = React.useRef<HTMLDivElement>(null);
  const [range, setRange] = React.useState(0);

  React.useEffect(() => {
    const measure = () => {
      if (!trackRef.current) return;
      // Distance the track must travel so its last edge reaches the viewport.
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
      id="services"
      ref={targetRef}
      style={{ height: `calc(100vh + ${range}px)` }}
      className="relative"
      aria-label="Our services"
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex items-center gap-8 px-5 sm:gap-12 sm:px-8 lg:px-12"
        >
          <HeadingPanel />
          {services.map((s) => (
            <IphoneMockup key={s.slug} className={`${PHONE} shrink-0`}>
              <ServiceScreen s={s} />
            </IphoneMockup>
          ))}
          <ClosingPanel />
        </motion.div>
      </div>
    </section>
  );
}

/* ── Reduced-motion fallback: native horizontal swipe, no scroll-jacking ── */
function StaticTrack() {
  return (
    <section id="services" className="section-pad" aria-label="Our services">
      <Container>
        <Eyebrow />
        <h2 className="mt-5 max-w-2xl text-balance text-[2rem] font-semibold leading-[1.1] tracking-tight sm:text-[2.6rem]">
          Explore the <span className="text-gradient">planets of possibility</span>
        </h2>
        <p className="mt-4 max-w-xl text-pretty text-stardust">
          Eight specialised disciplines, one integrated growth system — swipe to
          explore each planet.
        </p>
      </Container>
      <div className="mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-6 sm:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {services.map((s) => (
          <IphoneMockup
            key={s.slug}
            className="w-[72vw] max-w-[16.5rem] shrink-0 snap-center"
          >
            <ServiceScreen s={s} />
          </IphoneMockup>
        ))}
      </div>
    </section>
  );
}

/* ── Left intro panel (stays at the far left of the track) ── */
function HeadingPanel() {
  return (
    <div className="flex w-[80vw] max-w-[22rem] shrink-0 flex-col justify-center pr-4 sm:w-[28rem] sm:max-w-none sm:pr-10 lg:w-[34rem]">
      <Eyebrow />
      <h2 className="mt-5 text-balance text-[2.2rem] font-semibold leading-[1.04] tracking-tight sm:text-[2.8rem] xl:text-[3.4rem]">
        Explore the <span className="text-gradient">planets of possibility</span>
      </h2>
      <p className="mt-5 max-w-md text-pretty text-base leading-relaxed text-stardust sm:text-lg">
        Eight specialised disciplines, one integrated growth system — visualised
        the way your customers experience your brand: on mobile.
      </p>
      <div className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-nebula-300">
        Scroll to explore
        <MoveRight className="size-4 animate-pulse" aria-hidden />
      </div>
    </div>
  );
}

/* ── Closing CTA panel after the last phone ── */
function ClosingPanel() {
  return (
    <div className="flex w-[78vw] max-w-[24rem] shrink-0 flex-col justify-center pr-6 sm:w-[26rem]">
      <h3 className="text-balance text-[1.8rem] font-semibold leading-tight tracking-tight sm:text-[2.2rem]">
        Ready to launch your <span className="text-gradient">growth mission?</span>
      </h3>
      <p className="mt-4 max-w-sm text-pretty text-stardust">
        Engage a single planet or commission a full-funnel campaign across the
        Noobverse.
      </p>
      <a
        href="#contact"
        className="mt-7 inline-flex w-fit items-center gap-2 rounded-full bg-[linear-gradient(110deg,var(--color-nebula-400),var(--color-nebula-500)_45%,var(--color-cosmos-400))] px-6 py-3 text-sm font-semibold text-space-950"
      >
        Map my growth <ArrowUpRight className="size-4" aria-hidden />
      </a>
    </div>
  );
}

function Eyebrow() {
  return (
    <span className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-nebula-300">
      <Sparkles className="size-4" aria-hidden />
      Our Services
    </span>
  );
}

/* ── Phone screen — sizes scale with the phone via container-query units ── */
function ServiceScreen({ s }: { s: Service }) {
  const a = accent[s.accent];
  return (
    <div className="@container flex h-full flex-col text-left">
      {/* App bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[2cqw]">
          <span className="size-[5cqw] rounded-full bg-gradient-to-br from-nebula-400 to-cosmos-500" />
          <span className="text-[4.6cqw] font-semibold text-white">Noob X Growth</span>
        </div>
        <span className="flex items-center gap-[1.5cqw] rounded-full bg-aurora-500/15 px-[2cqw] py-[0.8cqw] text-[3.2cqw] font-semibold uppercase tracking-wide text-aurora-400">
          <span className="size-[1.6cqw] rounded-full bg-aurora-400" /> Live
        </span>
      </div>

      <span
        className={`mt-[6cqw] flex size-[16cqw] items-center justify-center rounded-[4cqw] bg-gradient-to-br ${a.tile} ${a.text}`}
      >
        <Icon name={s.icon} className="size-[8cqw]" />
      </span>

      <p className="mt-[4cqw] text-[3.2cqw] font-semibold uppercase tracking-[0.2em] text-stardust-dim">
        {s.planet}
      </p>
      <h3 className="mt-[1.5cqw] font-display text-[7cqw] font-semibold leading-tight text-white">
        {s.name}
      </h3>
      <p className="mt-[3cqw] line-clamp-3 text-[4.2cqw] leading-relaxed text-stardust">
        {s.summary}
      </p>

      <ul className="mt-[4cqw] space-y-[2.4cqw]">
        {s.features.slice(0, 3).map((f) => (
          <li
            key={f}
            className="flex items-start gap-[2cqw] text-[4cqw] leading-snug text-stardust"
          >
            <Check className={`mt-[0.6cqw] size-[4cqw] shrink-0 ${a.text}`} aria-hidden />
            <span className="line-clamp-1">{f}</span>
          </li>
        ))}
      </ul>

      {/* Stat */}
      <div className="mt-[5cqw] rounded-[4cqw] border border-white/10 bg-white/[0.04] p-[4cqw] backdrop-blur-sm">
        <div className={`font-display text-[9cqw] font-bold leading-none ${a.text}`}>
          {s.stat.value}
        </div>
        <div className="mt-[1.5cqw] text-[3.4cqw] leading-tight text-stardust-dim">
          {s.stat.label}
        </div>
        <div className="mt-[3cqw] h-[1.6cqw] overflow-hidden rounded-full bg-white/10">
          <div className={`h-full w-4/5 rounded-full bg-gradient-to-r ${a.bar}`} />
        </div>
      </div>

      <a
        href="#contact"
        aria-label={`Learn more about ${s.name}`}
        className="mt-[4cqw] flex items-center justify-between rounded-[3.5cqw] border border-hairline bg-white/[0.03] px-[4cqw] py-[3cqw] text-[4cqw] font-semibold text-white backdrop-blur-sm transition-colors hover:border-hairline-strong"
      >
        Start this mission
        <ArrowUpRight className={`size-[5cqw] ${a.text}`} aria-hidden />
      </a>

      <TabBar accentText={a.text} />
    </div>
  );
}

function TabBar({ accentText }: { accentText: string }) {
  const items = ["layout", "lineChart", "sparkles", "users"] as const;
  return (
    <div className="mt-auto flex items-center justify-around rounded-[4cqw] border border-white/10 bg-white/[0.04] px-[3cqw] py-[2.5cqw] backdrop-blur-sm">
      {items.map((name, i) => (
        <Icon
          key={name}
          name={name}
          className={`size-[5.5cqw] ${i === 0 ? accentText : "text-stardust-dim"}`}
        />
      ))}
    </div>
  );
}
