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
              <stop offset="0%" stopColor="#4dfff5" />
              <stop offset="55%" stopColor="#00fff0" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
            <radialGradient id="logo-planet" cx="34%" cy="30%" r="75%">
              <stop offset="0%" stopColor="#c4fffb" />
              <stop offset="45%" stopColor="#00fff0" />
              <stop offset="100%" stopColor="#055f59" />
            </radialGradient>
          </defs>
          {/* soft glow */}
          <circle cx="20" cy="20" r="18" fill="url(#logo-grad)" opacity="0.14" />
          {/* orbit ring (behind planet) */}
          <ellipse
            cx="20"
            cy="20"
            rx="17"
            ry="6"
            stroke="url(#logo-grad)"
            strokeWidth="1.5"
            fill="none"
            transform="rotate(-25 20 20)"
          />
          {/* planet */}
          <circle cx="20" cy="20" r="8" fill="url(#logo-planet)" />
          <circle cx="17" cy="17" r="2.4" fill="#fff" opacity="0.55" />
          {/* orbiting satellite */}
          <circle cx="35" cy="13" r="2" fill="#4dfff5" />
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
