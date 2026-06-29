"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/** Glass card with a cursor-tracking spotlight + gradient hairline.
 *  Used for services, values, case studies, etc. */
export function SpotlightCard({
  children,
  className,
  as: Tag = "div",
  ...props
}: React.HTMLAttributes<HTMLElement> & { as?: React.ElementType }) {
  const ref = React.useRef<HTMLDivElement>(null);

  function handleMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }

  return (
    <Tag
      ref={ref}
      onMouseMove={handleMove}
      className={cn(
        "group/card relative overflow-hidden rounded-3xl border border-hairline bg-space-800/60 p-px backdrop-blur-sm transition-colors duration-300 hover:border-hairline-strong",
        className,
      )}
      {...props}
    >
      {/* spotlight follows cursor */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at var(--mx) var(--my), color-mix(in oklab, var(--color-nebula-500) 16%, transparent), transparent 45%)",
        }}
      />
      <div className="relative h-full rounded-[calc(1.5rem-1px)]">{children}</div>
    </Tag>
  );
}
