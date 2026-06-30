import { Check, X } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Icon } from "@/components/ui/icon";
import { Logo } from "@/components/ui/logo";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import { differentiators } from "@/data/about";
import { comparison } from "@/data/comparison";

export function WhyUs() {
  return (
    <section id="why-us" className="section-pad relative scroll-mt-24">
      <Container>
        <SectionHeading
          eyebrow="Why Noob X Marketing"
          title={
            <>
              A different breed of{" "}
              <span className="text-gradient">growth partner</span>
            </>
          }
          description="In a crowded universe of agencies, four things make us shine — and they show up in everything we do."
        />

        {/* Differentiator pillars */}
        <StaggerGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {differentiators.map((d) => (
            <StaggerItem key={d.title} className="h-full">
              <SpotlightCard className="h-full">
                <div className="flex h-full flex-col p-6">
                  <span className="flex size-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cosmos-500/20 to-nebula-500/10 text-cosmos-400">
                    <Icon name={d.icon} className="size-5" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold text-white">
                    {d.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-stardust">
                    {d.description}
                  </p>
                </div>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </StaggerGroup>

        {/* Comparison — table on desktop, stacked cards on mobile */}
        <Reveal className="mt-16" amount={0.15}>
          {/* Desktop / tablet table */}
          <div className="hidden overflow-hidden rounded-3xl border border-hairline glass md:block">
            <div className="grid grid-cols-[1.2fr_1fr_1fr] border-b border-hairline">
              <div className="p-5" />
              <div className="flex items-center justify-center gap-2 border-l border-hairline bg-nebula-500/10 p-5">
                <Logo withText={false} />
                <span className="font-display text-sm font-semibold text-white lg:text-base">
                  Noob X Marketing
                </span>
              </div>
              <div className="flex items-center justify-center border-l border-hairline p-5">
                <span className="text-center font-display text-sm font-semibold text-stardust-dim lg:text-base">
                  Traditional Agencies
                </span>
              </div>
            </div>

            {comparison.map((row, i) => (
              <div
                key={row.feature}
                className={`grid grid-cols-[1.2fr_1fr_1fr] ${
                  i !== comparison.length - 1 ? "border-b border-hairline" : ""
                }`}
              >
                <div className="flex items-center p-5 text-sm font-medium text-white">
                  {row.feature}
                </div>
                <div className="flex items-start gap-2 border-l border-hairline bg-nebula-500/[0.06] p-5 text-sm text-stardust">
                  <Check className="mt-0.5 size-4 shrink-0 text-aurora-400" aria-hidden />
                  <span>{row.noobx}</span>
                </div>
                <div className="flex items-start gap-2 border-l border-hairline p-5 text-sm text-stardust-dim">
                  <X className="mt-0.5 size-4 shrink-0 text-stardust-dim/60" aria-hidden />
                  <span>{row.traditional}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile stacked cards */}
          <div className="space-y-4 md:hidden">
            {comparison.map((row) => (
              <div
                key={row.feature}
                className="rounded-2xl border border-hairline glass p-5"
              >
                <p className="font-display text-sm font-semibold text-white">
                  {row.feature}
                </p>
                <div className="mt-3 space-y-2">
                  <div className="flex items-start gap-2.5 rounded-xl border border-nebula-500/25 bg-nebula-500/[0.08] p-3 backdrop-blur-sm">
                    <Check className="mt-0.5 size-4 shrink-0 text-aurora-400" aria-hidden />
                    <div>
                      <span className="text-[11px] font-semibold uppercase tracking-wide text-nebula-300">
                        Noob X Marketing
                      </span>
                      <span className="mt-1 block text-sm text-stardust">
                        {row.noobx}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5 rounded-xl border border-hairline bg-white/[0.03] p-3 backdrop-blur-sm">
                    <X className="mt-0.5 size-4 shrink-0 text-stardust-dim/60" aria-hidden />
                    <div>
                      <span className="text-[11px] font-semibold uppercase tracking-wide text-stardust-dim">
                        Traditional Agencies
                      </span>
                      <span className="mt-1 block text-sm text-stardust-dim">
                        {row.traditional}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
