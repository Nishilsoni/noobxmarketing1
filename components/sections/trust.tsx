import { Container } from "@/components/ui/container";
import { Counter } from "@/components/motion/counter";
import { Icon } from "@/components/ui/icon";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import { trustStats } from "@/data/stats";

const brands = [
  "Nova Skincare",
  "Orbit Fintech",
  "Lumen Fitness",
  "Stellar Retail",
  "Helios Travel",
  "Vertex Logistics",
  "Aurora Labs",
  "Quasar Foods",
];

export function Trust() {
  return (
    <section aria-labelledby="trust-heading" className="relative py-16 lg:py-20">
      <Container>
        <Reveal className="text-center">
          <h2
            id="trust-heading"
            className="text-sm font-medium uppercase tracking-[0.2em] text-stardust-dim"
          >
            Powering measurable growth across the galaxy
          </h2>
        </Reveal>

        {/* Brand marquee */}
        <div className="relative mt-8 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
          <div className="flex w-max animate-marquee items-center gap-12">
            {[...brands, ...brands].map((b, i) => (
              <span
                key={`${b}-${i}`}
                className="whitespace-nowrap font-display text-lg font-medium text-stardust-dim/70 transition-colors hover:text-stardust"
              >
                {b}
              </span>
            ))}
          </div>
        </div>

        {/* Counters */}
        <StaggerGroup className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-hairline bg-hairline md:grid-cols-3 lg:grid-cols-5">
          {trustStats.map((s) => (
            <StaggerItem key={s.label}>
              <div className="group flex h-full flex-col items-center justify-center gap-2 bg-space-900/60 px-4 py-8 text-center backdrop-blur-sm transition-colors hover:bg-space-800/70">
                <span className="flex size-10 items-center justify-center rounded-xl bg-nebula-500/12 text-nebula-300 transition-transform group-hover:scale-110">
                  <Icon name={s.icon} className="size-5" />
                </span>
                <div className="font-display text-3xl font-semibold text-white sm:text-4xl">
                  <Counter value={s.value} suffix={s.suffix} prefix={s.prefix} />
                </div>
                <div className="text-sm text-stardust">{s.label}</div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
