"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { faqs } from "@/data/faq";

export function FAQ() {
  return (
    <section id="faq" className="section-pad relative scroll-mt-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* Left rail */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              align="left"
              eyebrow="FAQ"
              title={
                <>
                  Questions from{" "}
                  <span className="text-gradient">across the galaxy</span>
                </>
              }
              description="Everything you need to know before we launch. Still curious? Our crew is one message away."
            />
            <Reveal delay={0.1} className="mt-8">
              <Button asChild variant="secondary" size="lg">
                <a href="#contact">Talk to a strategist</a>
              </Button>
            </Reveal>
          </div>

          {/* Accordion */}
          <Reveal amount={0.1}>
            <Accordion.Root
              type="single"
              collapsible
              defaultValue="item-0"
              className="space-y-3"
            >
              {faqs.map((f, i) => (
                <Accordion.Item
                  key={i}
                  value={`item-${i}`}
                  className="overflow-hidden rounded-2xl border border-hairline bg-space-800/50 backdrop-blur-sm transition-colors data-[state=open]:border-hairline-strong data-[state=open]:bg-space-800/70"
                >
                  <Accordion.Header>
                    <Accordion.Trigger className="group flex w-full items-center justify-between gap-4 px-6 py-5 text-left">
                      <span className="font-display text-base font-medium text-white sm:text-lg">
                        {f.question}
                      </span>
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-hairline text-stardust transition-all duration-300 group-data-[state=open]:rotate-45 group-data-[state=open]:border-nebula-500/50 group-data-[state=open]:bg-nebula-500/15 group-data-[state=open]:text-nebula-300">
                        <Plus className="size-4" aria-hidden />
                      </span>
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                    <p className="px-6 pb-6 pr-14 text-pretty leading-relaxed text-stardust">
                      {f.answer}
                    </p>
                  </Accordion.Content>
                </Accordion.Item>
              ))}
            </Accordion.Root>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
