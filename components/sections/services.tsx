import { ArrowUpRight, Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Icon } from "@/components/ui/icon";
import { StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import { services } from "@/data/services";
import type { Service } from "@/types";

const accentMap: Record<
  Service["accent"],
  { iconBg: string; iconText: string; stat: string; ring: string }
> = {
  nebula: {
    iconBg: "from-nebula-500/25 to-nebula-500/5",
    iconText: "text-nebula-300",
    stat: "text-nebula-300",
    ring: "group-hover/card:shadow-[0_0_50px_-12px_rgba(0,255,240,0.5)]",
  },
  cosmos: {
    iconBg: "from-cosmos-500/25 to-cosmos-500/5",
    iconText: "text-cosmos-400",
    stat: "text-cosmos-400",
    ring: "group-hover/card:shadow-[0_0_50px_-12px_rgba(59,130,246,0.5)]",
  },
  violet: {
    iconBg: "from-violet-500/25 to-violet-500/5",
    iconText: "text-violet-400",
    stat: "text-violet-400",
    ring: "group-hover/card:shadow-[0_0_50px_-12px_rgba(124,58,237,0.5)]",
  },
  aurora: {
    iconBg: "from-aurora-500/25 to-aurora-500/5",
    iconText: "text-aurora-400",
    stat: "text-aurora-400",
    ring: "group-hover/card:shadow-[0_0_50px_-12px_rgba(16,185,129,0.5)]",
  },
};

export function Services() {
  return (
    <section id="services" className="section-pad relative scroll-mt-24">
      <Container>
        <SectionHeading
          eyebrow="Our Services"
          title={
            <>
              Explore the <span className="text-gradient">planets of possibility</span>
            </>
          }
          description="Eight specialised disciplines, one integrated growth system. Engage a single planet or commission a full-funnel mission across the Noobverse."
        />

        <StaggerGroup
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          stagger={0.06}
        >
          {services.map((s) => {
            const a = accentMap[s.accent];
            return (
              <StaggerItem key={s.slug} className="h-full">
                <SpotlightCard className={`h-full transition-shadow duration-500 ${a.ring}`}>
                  <article className="flex h-full flex-col p-6">
                    <div className="flex items-center justify-between">
                      <span
                        className={`flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br ${a.iconBg} ${a.iconText} transition-transform duration-300 group-hover/card:scale-110 group-hover/card:-rotate-6`}
                      >
                        <Icon name={s.icon} className="size-6" />
                      </span>
                      <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-stardust-dim">
                        {s.planet}
                      </span>
                    </div>

                    <h3 className="mt-5 font-display text-xl font-semibold text-white">
                      {s.name}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-stardust">
                      {s.summary}
                    </p>

                    <ul className="mt-4 space-y-2">
                      {s.features.slice(0, 3).map((f) => (
                        <li
                          key={f}
                          className="flex items-start gap-2 text-[13px] text-stardust"
                        >
                          <Check
                            className={`mt-0.5 size-3.5 shrink-0 ${a.iconText}`}
                            aria-hidden
                          />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto pt-6">
                      <div className="flex items-end justify-between border-t border-hairline pt-4">
                        <div>
                          <div className={`font-display text-xl font-semibold ${a.stat}`}>
                            {s.stat.value}
                          </div>
                          <div className="text-[11px] text-stardust-dim">
                            {s.stat.label}
                          </div>
                        </div>
                        <a
                          href="#contact"
                          aria-label={`Learn more about ${s.name}`}
                          className="inline-flex size-9 items-center justify-center rounded-full border border-hairline text-stardust transition-all hover:border-hairline-strong hover:text-white group-hover/card:bg-white/5"
                        >
                          <ArrowUpRight className="size-4" aria-hidden />
                        </a>
                      </div>
                    </div>
                  </article>
                </SpotlightCard>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </Container>
    </section>
  );
}
