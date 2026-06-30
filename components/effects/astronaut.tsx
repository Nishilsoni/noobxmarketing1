import { cn } from "@/lib/utils";

/** "Noobie" — the Noob X Marketing astronaut mascot. A refined, minimal
 *  SVG illustration with a glassmorphic visor. Decorative only. */
export function Astronaut({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 360"
      fill="none"
      role="img"
      aria-label="Noobie, the Noob X Marketing astronaut, floating in space"
      className={cn("h-full w-full overflow-visible", className)}
    >
      <defs>
        <linearGradient id="suit" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f4f6ff" />
          <stop offset="55%" stopColor="#cfd6ee" />
          <stop offset="100%" stopColor="#9aa6cf" />
        </linearGradient>
        <linearGradient id="suit-shadow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#b9c2e4" />
          <stop offset="100%" stopColor="#7b86b3" />
        </linearGradient>
        <radialGradient id="visor" cx="38%" cy="32%" r="75%">
          <stop offset="0%" stopColor="#1b2547" />
          <stop offset="45%" stopColor="#0c122c" />
          <stop offset="100%" stopColor="#05081a" />
        </radialGradient>
        <linearGradient id="visor-glass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#4dfff5" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#10b981" stopOpacity="0.15" />
        </linearGradient>
        <radialGradient id="halo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00fff0" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#00fff0" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="pack" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3b4470" />
          <stop offset="100%" stopColor="#222a4d" />
        </linearGradient>
      </defs>

      {/* Ambient halo */}
      <circle cx="160" cy="150" r="150" fill="url(#halo)" />

      {/* Backpack */}
      <rect x="108" y="150" width="104" height="96" rx="26" fill="url(#pack)" />

      {/* Left arm */}
      <path
        d="M104 184c-26 4-44 22-46 52-1 14 18 18 24 6 8-16 18-26 34-28z"
        fill="url(#suit-shadow)"
      />
      <circle cx="78" cy="236" r="16" fill="url(#suit)" />

      {/* Right arm (raised, waving) */}
      <path
        d="M214 176c26-6 50 6 60 34 5 13-12 22-21 11-11-13-24-19-40-18z"
        fill="url(#suit)"
      />
      <circle cx="266" cy="206" r="16" fill="url(#suit)" />

      {/* Torso */}
      <path
        d="M118 178c0-23 19-40 42-40h0c23 0 42 17 42 40v44c0 30-19 52-42 52s-42-22-42-52z"
        fill="url(#suit)"
      />
      {/* Torso shading */}
      <path
        d="M160 138c23 0 42 17 42 40v44c0 30-19 52-42 52z"
        fill="url(#suit-shadow)"
        opacity="0.55"
      />

      {/* Chest control panel */}
      <rect x="142" y="196" width="36" height="26" rx="7" fill="#0c122c" />
      <circle cx="151" cy="209" r="3.4" fill="#10b981" />
      <circle cx="161" cy="209" r="3.4" fill="#00fff0" />
      <circle cx="171" cy="209" r="3.4" fill="#3b82f6" />

      {/* Legs */}
      <path d="M132 268c-4 28-8 50-6 64 1 10 20 10 22 0 3-20 6-38 10-54z" fill="url(#suit)" />
      <path d="M188 268c4 28 8 50 6 64-1 10-20 10-22 0-3-20-6-38-10-54z" fill="url(#suit-shadow)" />
      <ellipse cx="134" cy="338" rx="16" ry="10" fill="#0c122c" />
      <ellipse cx="186" cy="338" rx="16" ry="10" fill="#0c122c" />

      {/* Helmet */}
      <circle cx="160" cy="96" r="68" fill="url(#suit)" />
      <circle cx="160" cy="96" r="68" fill="url(#suit-shadow)" opacity="0.25" />
      {/* Visor */}
      <circle cx="160" cy="96" r="52" fill="url(#visor)" />
      <circle cx="160" cy="96" r="52" fill="url(#visor-glass)" opacity="0.5" />
      {/* Visor reflection highlight */}
      <path
        d="M128 70c10-16 30-26 50-24-18 4-34 16-42 34-4 10-16 8-12-4z"
        fill="#fff"
        opacity="0.45"
      />
      {/* Tiny reflected stars in visor */}
      <circle cx="150" cy="110" r="2" fill="#fff" opacity="0.8" />
      <circle cx="176" cy="96" r="1.6" fill="#4dfff5" opacity="0.9" />
      <circle cx="166" cy="120" r="1.3" fill="#fff" opacity="0.7" />
      <circle cx="184" cy="116" r="1.2" fill="#60a5fa" opacity="0.8" />

      {/* Helmet rim accent */}
      <circle
        cx="160"
        cy="96"
        r="52"
        stroke="#00fff0"
        strokeOpacity="0.6"
        strokeWidth="2"
        fill="none"
      />
    </svg>
  );
}
