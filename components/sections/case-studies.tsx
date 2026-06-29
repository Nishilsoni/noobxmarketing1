import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Button } from "@/components/ui/button";
import { StaggerGroup, StaggerItem, Reveal } from "@/components/motion/reveal";
import { caseStudies } from "@/data/case-studies";
import type { CaseStudy } from "@/types";

const accentText: Record<CaseStudy["accent"], string> = {
  nebula: "text-nebula-300",
  cosmos: "text-cosmos-400",
  violet: "text-violet-400",
  aurora: "text-aurora-400",
};

export function CaseStudies() {
  return (
    <section id="case-studies" className="section-pad relative scroll-mt-24">
      <Container>
        <SectionHeading
          eyebrow="Case Studies"
          title={
            <>
              Real brands. <span className="text-gradient">Real orbital velocity.</span>
            </>
          }
          description="A glimpse at the missions we've flown. Every result is measured, attributed and built to last."
        />

        <StaggerGroup className="mt-14 grid gap-6 lg:grid-cols-2">
          {caseStudies.map((cs) => (
            <StaggerItem key={cs.slug} className="h-full">
              <SpotlightCard className="h-full">
                <article className="flex h-full flex-col p-7 lg:p-8">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="font-display text-xl font-semibold text-white">
                        {cs.client}
                      </h3>
                      <p className="mt-1 text-xs uppercase tracking-[0.16em] text-stardust-dim">
                        {cs.industry}
                      </p>
                    </div>
                    <span className="rounded-full border border-hairline bg-white/[0.04] px-3 py-1 text-[11px] font-medium text-stardust">
                      {cs.service}
                    </span>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-stardust">
                    {cs.summary}
                  </p>

                  <div className="mt-6 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline">
                    {cs.metrics.map((m) => (
                      <div
                        key={m.label}
                        className="bg-space-900/70 p-4 text-center"
                      >
                        <div
                          className={`font-display text-xl font-bold sm:text-2xl ${accentText[cs.accent]}`}
                        >
                          {m.value}
                        </div>
                        <div className="mt-1 text-[11px] leading-tight text-stardust-dim">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto pt-6">
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-white transition-colors hover:text-nebula-300"
                    >
                      Read the full mission report
                      <ArrowUpRight className="size-4" aria-hidden />
                    </a>
                  </div>
                </article>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <Reveal className="mt-12 flex justify-center">
          <Button asChild variant="secondary" size="lg">
            <a href="#contact">
              Start your success story
              <ArrowUpRight className="size-5" aria-hidden />
            </a>
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
