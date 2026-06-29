"use client";

import * as React from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";
import { testimonials } from "@/data/testimonials";

export function Testimonials() {
  const trackRef = React.useRef<HTMLDivElement>(null);
  const [active, setActive] = React.useState(0);
  const [paused, setPaused] = React.useState(false);

  const scrollToIndex = React.useCallback((i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const cards = Array.from(track.children) as HTMLElement[];
    const idx = ((i % cards.length) + cards.length) % cards.length;
    const card = cards[idx];
    if (card) {
      track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: "smooth" });
    }
  }, []);

  // Track active card from scroll position
  React.useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const cards = Array.from(track.children) as HTMLElement[];
        const center = track.scrollLeft + track.clientWidth / 2;
        let best = 0;
        let bestDist = Infinity;
        cards.forEach((c, i) => {
          const cCenter = c.offsetLeft - track.offsetLeft + c.clientWidth / 2;
          const d = Math.abs(cCenter - center);
          if (d < bestDist) {
            bestDist = d;
            best = i;
          }
        });
        setActive(best);
      });
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Auto-advance
  React.useEffect(() => {
    if (paused) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = setInterval(() => {
      setActive((prev) => {
        const next = (prev + 1) % testimonials.length;
        scrollToIndex(next);
        return next;
      });
    }, 4800);
    return () => clearInterval(id);
  }, [paused, scrollToIndex]);

  return (
    <section id="testimonials" className="section-pad relative scroll-mt-24">
      <Container>
        <SectionHeading
          eyebrow="Testimonials"
          title={
            <>
              Loved by the brands we&apos;ve{" "}
              <span className="text-gradient">sent into orbit</span>
            </>
          }
          description="Don't take our word for it. Here's what mission commanders across the galaxy say about flying with us."
        />
      </Container>

      <div
        className="relative mt-14"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-space-950 to-transparent sm:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-space-950 to-transparent sm:w-24" />

        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-5 pb-4 sm:px-8 lg:px-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          role="region"
          aria-roledescription="carousel"
          aria-label="Client testimonials"
          tabIndex={0}
        >
          {testimonials.map((t, i) => (
            <figure
              key={t.name}
              className="group relative w-[85vw] shrink-0 snap-center sm:w-[60vw] lg:w-[31rem]"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${testimonials.length}`}
            >
              <div className="flex h-full flex-col rounded-3xl border border-hairline glass p-7 transition-colors duration-300 hover:border-hairline-strong lg:p-8">
                <Quote className="size-8 text-nebula-400/40" aria-hidden />
                <div className="mt-4 flex gap-0.5" aria-label={`${t.rating} out of 5 stars`}>
                  {Array.from({ length: t.rating }).map((_, s) => (
                    <Star key={s} className="size-4 fill-amber-300 text-amber-300" aria-hidden />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-pretty text-base leading-relaxed text-stardust lg:text-lg">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-hairline pt-5">
                  <span className="flex size-11 items-center justify-center rounded-full bg-gradient-to-br from-nebula-500 to-violet-500 font-display text-sm font-semibold text-white">
                    {t.initials}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-white">
                      {t.name}
                    </span>
                    <span className="block text-xs text-stardust">
                      {t.role}, {t.company}
                    </span>
                  </span>
                </figcaption>
              </div>
            </figure>
          ))}
        </div>

        {/* Controls */}
        <Container className="mt-6 flex items-center justify-between">
          <div className="flex gap-2" role="tablist" aria-label="Choose testimonial">
            {testimonials.map((t, i) => (
              <button
                key={t.name}
                role="tab"
                aria-selected={active === i}
                aria-label={`Go to testimonial ${i + 1}`}
                onClick={() => scrollToIndex(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  active === i
                    ? "w-8 bg-nebula-400"
                    : "w-1.5 bg-hairline-strong hover:bg-stardust-dim",
                )}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => scrollToIndex(active - 1)}
              aria-label="Previous testimonial"
              className="inline-flex size-11 items-center justify-center rounded-full border border-hairline text-stardust transition-all hover:border-hairline-strong hover:text-white"
            >
              <ChevronLeft className="size-5" aria-hidden />
            </button>
            <button
              onClick={() => scrollToIndex(active + 1)}
              aria-label="Next testimonial"
              className="inline-flex size-11 items-center justify-center rounded-full border border-hairline text-stardust transition-all hover:border-hairline-strong hover:text-white"
            >
              <ChevronRight className="size-5" aria-hidden />
            </button>
          </div>
        </Container>
      </div>
    </section>
  );
}
