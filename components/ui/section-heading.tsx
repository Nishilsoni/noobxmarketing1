import * as React from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";

/** Consistent eyebrow + title + description block for section tops.
 *  Eyebrow is an understated accent-line label (no pill). */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
  titleClassName,
  as = "h2",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "center" | "left";
  className?: string;
  titleClassName?: string;
  as?: "h1" | "h2";
}) {
  const Tag = as;
  const centered = align === "center";
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        centered ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow && (
        <Reveal>
          <span
            className={cn(
              "flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-nebula-300",
              centered && "justify-center",
            )}
          >
            <span className="h-px w-7 bg-gradient-to-r from-transparent to-nebula-400/70" />
            {eyebrow}
            {centered && (
              <span className="h-px w-7 bg-gradient-to-l from-transparent to-nebula-400/70" />
            )}
          </span>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <Tag
          className={cn(
            "max-w-3xl text-balance text-[2rem] font-semibold leading-[1.08] tracking-tight sm:text-[2.6rem] lg:text-[3.25rem]",
            titleClassName,
          )}
        >
          {title}
        </Tag>
      </Reveal>
      {description && (
        <Reveal delay={0.1}>
          <p
            className={cn(
              "max-w-2xl text-pretty text-base leading-relaxed text-stardust sm:text-lg",
              centered && "mx-auto",
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
