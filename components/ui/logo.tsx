import { cn } from "@/lib/utils";

/** NoobxMarketing wordmark with an orbiting-star brand mark. */
export function Logo({
  className,
  withText = true,
}: {
  className?: string;
  withText?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span className="relative inline-flex size-9 items-center justify-center">
        <svg viewBox="0 0 40 40" className="size-9" aria-hidden="true">
          <defs>
            <linearGradient id="logo-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#6c63ff" />
              <stop offset="55%" stopColor="#7c3aed" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
          <circle cx="20" cy="20" r="18" fill="url(#logo-grad)" opacity="0.18" />
          {/* orbit */}
          <ellipse
            cx="20"
            cy="20"
            rx="16"
            ry="7"
            stroke="url(#logo-grad)"
            strokeWidth="1.6"
            fill="none"
            transform="rotate(-30 20 20)"
          />
          {/* core star */}
          <circle cx="20" cy="20" r="5.5" fill="url(#logo-grad)" />
          <circle cx="20" cy="20" r="5.5" fill="#fff" opacity="0.15" />
          {/* orbiting satellite */}
          <circle cx="33" cy="13" r="2.4" fill="#8b84ff" />
        </svg>
      </span>
      {withText && (
        <span className="font-display text-lg font-semibold tracking-tight text-white">
          Noob<span className="text-gradient">x</span>Marketing
        </span>
      )}
    </span>
  );
}
