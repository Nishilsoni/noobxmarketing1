import { cn } from "@/lib/utils";

/** A premium, glowing orbital system: a lit planet with a tilted ring,
 *  concentric orbits and slowly orbiting satellites. Replaces the
 *  mascot illustration with a refined, high-end space visual.
 *  Pure CSS/SVG, fully responsive, decorative only. */
export function OrbitalSystem({ className }: { className?: string }) {
  return (
    <div
      className={cn("relative aspect-square w-full", className)}
      role="img"
      aria-label="Glowing planet orbited by satellites"
    >
      {/* Ambient bloom */}
      <div className="absolute inset-[12%] rounded-full bg-[radial-gradient(circle,rgba(108,99,255,0.35),transparent_62%)] blur-2xl" />

      {/* Concentric orbit rings (fade at edges for depth) */}
      <div className="absolute inset-0 rounded-full border border-white/10 [mask-image:radial-gradient(circle,transparent_56%,#000_57%)] opacity-70" />
      <div className="absolute inset-[13%] rounded-full border border-white/[0.08]" />
      <div className="absolute inset-[27%] rounded-full border border-white/[0.06]" />

      {/* Tilted planetary ring (behind the planet) */}
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full overflow-visible"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="ring-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#8b84ff" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.6" />
          </linearGradient>
        </defs>
        <g transform="rotate(-22 50 50)">
          <ellipse
            cx="50"
            cy="50"
            rx="42"
            ry="14"
            fill="none"
            stroke="url(#ring-grad)"
            strokeWidth="1.1"
          />
        </g>
      </svg>

      {/* Orbiting satellites — each wrapper spins, moon sits at top */}
      <Orbit inset="0%" duration="34s">
        <Moon size="3.5%" from="#8b84ff" to="#6c63ff" />
      </Orbit>
      <Orbit inset="13%" duration="22s" reverse>
        <Moon size="2.6%" from="#60a5fa" to="#3b82f6" />
      </Orbit>
      <Orbit inset="27%" duration="16s">
        <Moon size="2%" from="#34d399" to="#10b981" />
      </Orbit>

      {/* Central planet */}
      <div
        className="absolute inset-[37%] z-10 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 32% 26%, #c4bdff 0%, #8b84ff 22%, #6c63ff 42%, #3a2a8c 72%, #140d36 100%)",
          boxShadow:
            "inset -16px -18px 38px rgba(5,4,18,0.65), inset 14px 12px 30px rgba(255,255,255,0.18), 0 0 60px rgba(108,99,255,0.5), 0 0 120px rgba(124,58,237,0.25)",
        }}
      >
        {/* specular highlight */}
        <div className="absolute left-[20%] top-[16%] size-[26%] rounded-full bg-white/55 blur-md" />
        {/* atmospheric crescent */}
        <div className="absolute inset-0 rounded-full shadow-[inset_8px_6px_22px_rgba(167,164,255,0.45)]" />
        {/* faint surface bands */}
        <div
          className="absolute inset-0 rounded-full opacity-[0.12] mix-blend-overlay"
          style={{
            background:
              "repeating-linear-gradient(115deg, transparent 0 8px, rgba(255,255,255,0.6) 8px 9px)",
          }}
        />
      </div>

      {/* Tilted planetary ring front arc (over the planet, for depth) */}
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 z-20 h-full w-full overflow-visible"
        aria-hidden="true"
      >
        <g transform="rotate(-22 50 50)">
          <path
            d="M 8 50 A 42 14 0 0 0 92 50"
            fill="none"
            stroke="url(#ring-grad)"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </g>
      </svg>

      {/* Accent stars */}
      <Star className="left-[8%] top-[20%]" />
      <Star className="right-[12%] top-[14%] [animation-delay:-2s]" />
      <Star className="bottom-[16%] left-[18%] [animation-delay:-4s]" />
      <Star className="right-[16%] bottom-[24%] [animation-delay:-1s]" />
    </div>
  );
}

function Orbit({
  inset,
  duration,
  reverse,
  children,
}: {
  inset: string;
  duration: string;
  reverse?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className="animate-spin-slow absolute"
      style={{
        inset,
        animationDuration: duration,
        animationDirection: reverse ? "reverse" : "normal",
      }}
    >
      {children}
    </div>
  );
}

function Moon({
  size,
  from,
  to,
}: {
  size: string;
  from: string;
  to: string;
}) {
  return (
    <span
      className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full"
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle at 30% 30%, #fff, ${from} 45%, ${to} 100%)`,
        boxShadow: `0 0 12px 1px ${from}aa`,
      }}
    />
  );
}

function Star({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "absolute size-1 rounded-full bg-white shadow-[0_0_8px_2px_rgba(255,255,255,0.7)]",
        "animate-[twinkle_3s_ease-in-out_infinite]",
        className,
      )}
    />
  );
}
