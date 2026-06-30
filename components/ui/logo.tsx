import { cn } from "@/lib/utils";

/** Noob X Marketing logo: the brand mark (public/NOOBverse.png) + wordmark.
 *  No container/card — the mark sits directly on the page. */
export function Logo({
  className,
  withText = true,
}: {
  className?: string;
  withText?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/NOOBverse.png"
        alt={withText ? "" : "Noob X Marketing"}
        width={36}
        height={36}
        className="size-9 shrink-0 object-contain"
        loading="eager"
        decoding="async"
      />
      {withText && (
        <span className="font-display text-lg font-semibold tracking-tight text-white">
          Noob <span className="text-gradient">X</span> Marketing
        </span>
      )}
    </span>
  );
}
