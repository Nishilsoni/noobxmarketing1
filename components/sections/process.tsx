"use client";

import * as React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Icon } from "@/components/ui/icon";
import { timeline } from "@/data/about";
import { EASE_OUT_EXPO } from "@/lib/motion";

export function Process() {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 65%", "end 65%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="process" className="section-pad relative scroll-mt-24">
      <Container>
        <SectionHeading
          eyebrow="Our Process"
          title={
            <>
              Your launch sequence to{" "}
              <span className="text-gradient">measurable growth</span>
            </>
          }
          description="A proven six-phase methodology that turns ambition into orbit. Transparent, collaborative and engineered to compound results."
        />

        <div ref={ref} className="relative mt-16">
          {/* Connector line */}
          <div
            aria-hidden
            className="absolute left-6 top-0 h-full w-px -translate-x-1/2 bg-hairline md:left-1/2"
          >
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-gradient-to-b from-nebula-500 via-violet-500 to-cosmos-500"
            />
          </div>

          <ol className="space-y-8 md:space-y-0">
            {timeline.map((step, i) => {
              const left = i % 2 === 0;
              return (
                <li
                  key={step.phase}
                  className="relative md:grid md:grid-cols-2 md:gap-12"
                >
                  {/* Node */}
                  <span
                    aria-hidden
                    className="absolute left-6 top-1.5 z-10 flex size-3.5 -translate-x-1/2 items-center justify-center rounded-full bg-nebula-500 ring-4 ring-space-950 md:left-1/2"
                  >
                    <span className="absolute size-3.5 animate-ping rounded-full bg-nebula-500/50" />
                  </span>

                  <motion.div
                    initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
                    className={`ml-14 md:ml-0 md:py-8 ${
                      left
                        ? "md:col-start-1 md:pr-12 md:text-right"
                        : "md:col-start-2 md:pl-12"
                    }`}
                  >
                    <div className="group rounded-3xl border border-hairline bg-space-800/60 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-hairline-strong">
                      <div
                        className={`flex items-center gap-3 ${
                          left ? "md:flex-row-reverse" : ""
                        }`}
                      >
                        <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-nebula-500/20 to-violet-500/10 text-nebula-300 transition-transform group-hover:scale-110">
                          <Icon name={step.icon} className="size-5" />
                        </span>
                        <span className="font-display text-3xl font-bold text-white/10">
                          {step.phase}
                        </span>
                      </div>
                      <h3 className="mt-4 font-display text-xl font-semibold text-white">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-stardust">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}
