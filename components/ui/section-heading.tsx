import * as React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/reveal";

/** Consistent eyebrow + title + description block for section tops. */
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
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow && (
        <Reveal>
          <Badge>
            <span className="size-1.5 rounded-full bg-nebula-400 shadow-[0_0_8px_2px_rgba(108,99,255,0.7)]" />
            {eyebrow}
          </Badge>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <Tag
          className={cn(
            "max-w-3xl text-balance text-3xl font-semibold sm:text-4xl lg:text-5xl",
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
              align === "center" ? "mx-auto" : "",
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
