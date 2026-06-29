import * as React from "react";
import { cn } from "@/lib/utils";

/** Pill label used for eyebrows and tags. */
export function Badge({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-hairline bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium tracking-wide text-stardust backdrop-blur-sm",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
