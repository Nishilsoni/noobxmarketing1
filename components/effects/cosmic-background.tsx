import { Starfield } from "@/components/effects/starfield";

/** Global fixed ambient background: deep-space gradient, aurora blooms,
 *  twinkling starfield and a faint grid. Rendered once in the layout. */
export function CosmicBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-space-950"
    >
      {/* Base vertical depth gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(125%_125%_at_50%_-10%,#0b1026_0%,#050816_55%,#03040c_100%)]" />

      {/* Aurora blooms */}
      <div className="animate-aurora absolute -left-1/4 -top-1/3 h-[70vmax] w-[70vmax] rounded-full bg-[radial-gradient(circle,rgba(108,99,255,0.18),transparent_60%)] blur-3xl" />
      <div
        className="animate-aurora absolute -right-1/4 top-1/4 h-[60vmax] w-[60vmax] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.14),transparent_60%)] blur-3xl"
        style={{ animationDelay: "-7s", animationDuration: "26s" }}
      />
      <div
        className="animate-aurora absolute -bottom-1/3 left-1/3 h-[55vmax] w-[55vmax] rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.14),transparent_60%)] blur-3xl"
        style={{ animationDelay: "-13s", animationDuration: "30s" }}
      />

      {/* Twinkling stars */}
      <Starfield />

      {/* Faint grid for structure */}
      <div className="absolute inset-0 opacity-[0.5] [mask-image:radial-gradient(ellipse_90%_70%_at_50%_0%,#000_30%,transparent_75%)]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:70px_70px]" />
      </div>

      {/* Bottom vignette */}
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-space-950 to-transparent" />
    </div>
  );
}
