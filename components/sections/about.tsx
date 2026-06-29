import { Compass, Telescope } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Icon } from "@/components/ui/icon";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import { Planet } from "@/components/effects/planet";
import { mission, vision, aboutIntro, coreValues } from "@/data/about";

export function About() {
  return (
    <section id="about" className="section-pad relative scroll-mt-24">
      <Container>
        <SectionHeading
          eyebrow="About the Noobverse"
          title={
            <>
              We&apos;re not just an agency.{" "}
              <span className="text-gradient">We&apos;re your mission control.</span>
            </>
          }
          description={aboutIntro}
        />

        {/* Mission / Vision */}
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <Reveal direction="right">
            <SpotlightCard className="h-full">
              <div className="relative h-full p-8 lg:p-10">
                <div className="absolute -right-6 -top-6 opacity-60">
                  <Planet id="mission" size={90} from="#6c63ff" to="#7c3aed" glow />
                </div>
                <span className="flex size-12 items-center justify-center rounded-2xl bg-nebula-500/15 text-nebula-300">
                  <Compass className="size-6" aria-hidden />
                </span>
                <h3 className="mt-6 font-display text-2xl font-semibold text-white">
                  Our Mission
                </h3>
                <p className="mt-3 text-pretty leading-relaxed text-stardust">
                  {mission}
                </p>
              </div>
            </SpotlightCard>
          </Reveal>

          <Reveal direction="left" delay={0.05}>
            <SpotlightCard className="h-full">
              <div className="relative h-full p-8 lg:p-10">
                <div className="absolute -right-6 -top-6 opacity-60">
                  <Planet id="vision" size={90} from="#3b82f6" to="#10b981" glow />
                </div>
                <span className="flex size-12 items-center justify-center rounded-2xl bg-cosmos-500/15 text-cosmos-400">
                  <Telescope className="size-6" aria-hidden />
                </span>
                <h3 className="mt-6 font-display text-2xl font-semibold text-white">
                  Our Vision
                </h3>
                <p className="mt-3 text-pretty leading-relaxed text-stardust">
                  {vision}
                </p>
              </div>
            </SpotlightCard>
          </Reveal>
        </div>

        {/* Core values */}
        <div className="mt-20">
          <Reveal>
            <h3 className="text-center font-display text-2xl font-semibold text-white">
              The values that guide every orbit
            </h3>
          </Reveal>
          <StaggerGroup className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {coreValues.map((v) => (
              <StaggerItem key={v.title}>
                <SpotlightCard className="h-full">
                  <div className="flex h-full flex-col p-6">
                    <span className="flex size-11 items-center justify-center rounded-2xl bg-gradient-to-br from-nebula-500/20 to-violet-500/10 text-nebula-300">
                      <Icon name={v.icon} className="size-5" />
                    </span>
                    <h4 className="mt-5 font-display text-lg font-semibold text-white">
                      {v.title}
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-stardust">
                      {v.description}
                    </p>
                  </div>
                </SpotlightCard>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </Container>
    </section>
  );
}
