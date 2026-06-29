import { cn } from "@/lib/utils";

type PlanetProps = {
  size?: number;
  className?: string;
  from?: string;
  to?: string;
  ring?: boolean;
  glow?: boolean;
  id?: string;
};

/** Soft glowing gradient planet with optional ring. Purely decorative. */
export function Planet({
  size = 120,
  className,
  from = "#6c63ff",
  to = "#3b82f6",
  ring = false,
  glow = true,
  id = "p",
}: PlanetProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      aria-hidden="true"
      className={cn("overflow-visible", className)}
    >
      <defs>
        <radialGradient id={`${id}-body`} cx="35%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.9" />
          <stop offset="22%" stopColor={from} />
          <stop offset="100%" stopColor={to} />
        </radialGradient>
        <radialGradient id={`${id}-shadow`} cx="50%" cy="50%" r="50%">
          <stop offset="60%" stopColor="#000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.45" />
        </radialGradient>
        {glow && (
          <filter id={`${id}-glow`} x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="8" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        )}
      </defs>

      {ring && (
        <ellipse
          cx="60"
          cy="60"
          rx="56"
          ry="18"
          stroke={from}
          strokeOpacity="0.5"
          strokeWidth="2"
          transform="rotate(-22 60 60)"
        />
      )}

      <g filter={glow ? `url(#${id}-glow)` : undefined}>
        <circle cx="60" cy="60" r="38" fill={`url(#${id}-body)`} />
        <circle cx="60" cy="60" r="38" fill={`url(#${id}-shadow)`} />
        {/* faint surface bands */}
        <ellipse cx="60" cy="52" rx="38" ry="6" fill="#fff" opacity="0.05" />
        <ellipse cx="60" cy="70" rx="34" ry="5" fill="#000" opacity="0.08" />
      </g>

      {ring && (
        <path
          d="M 14 53 A 56 18 0 0 0 106 67"
          stroke={to}
          strokeOpacity="0.6"
          strokeWidth="2"
          fill="none"
          transform="rotate(-22 60 60)"
        />
      )}
    </svg>
  );
}
