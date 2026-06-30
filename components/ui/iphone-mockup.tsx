import * as React from "react";
import { cn } from "@/lib/utils";

/** A polished iPhone mockup (titanium frame, Dynamic Island, status bar,
 *  side buttons). Pass the on-screen UI as children. Pure CSS — no deps. */
export function IphoneMockup({
  children,
  className,
  time = "9:41",
}: {
  children: React.ReactNode;
  className?: string;
  time?: string;
}) {
  return (
    <div className={cn("relative shrink-0", className)}>
      {/* Side buttons */}
      <span className="absolute -left-[2px] top-[22%] h-7 w-[2px] rounded-l bg-white/20" />
      <span className="absolute -left-[2px] top-[32%] h-12 w-[2px] rounded-l bg-white/20" />
      <span className="absolute -left-[2px] top-[46%] h-12 w-[2px] rounded-l bg-white/20" />
      <span className="absolute -right-[2px] top-[36%] h-16 w-[2px] rounded-r bg-white/20" />

      {/* Titanium frame */}
      <div className="relative rounded-[2.7rem] bg-[linear-gradient(150deg,#3a3f57_0%,#14182b_45%,#23283e_100%)] p-[3px] shadow-[0_40px_80px_-24px_rgba(0,0,0,0.85)]">
        <div className="rounded-[2.55rem] bg-[#0a0e1c] p-[7px]">
          {/* Screen */}
          <div className="relative aspect-[9/19.3] overflow-hidden rounded-[2.1rem] bg-space-950">
            {/* Wallpaper glow */}
            <div className="absolute inset-0 bg-[radial-gradient(120%_70%_at_50%_-10%,#1a1450_0%,#0b1026_55%,#050816_100%)]" />
            <div className="absolute -right-10 top-1/3 size-40 rounded-full bg-[radial-gradient(circle,rgba(108,99,255,0.25),transparent_65%)] blur-2xl" />

            {/* Status bar */}
            <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-6 pt-3 text-[10px] font-semibold text-white">
              <span className="tracking-tight">{time}</span>
              <span className="flex items-center gap-1.5">
                <SignalIcon />
                <WifiIcon />
                <BatteryIcon />
              </span>
            </div>

            {/* Dynamic Island */}
            <div className="absolute left-1/2 top-[0.7rem] z-30 flex h-[1.7rem] w-[5.6rem] -translate-x-1/2 items-center justify-end gap-2 rounded-full bg-black pr-2.5">
              <span className="size-1.5 rounded-full bg-[#1c2436]" />
              <span className="size-2 rounded-full bg-[radial-gradient(circle_at_30%_30%,#3a4a6a,#0a0e1c)] ring-1 ring-white/5" />
            </div>

            {/* App content */}
            <div className="absolute inset-0 z-10 flex flex-col px-3.5 pb-3.5 pt-12">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SignalIcon() {
  return (
    <svg width="16" height="11" viewBox="0 0 16 11" fill="currentColor" aria-hidden="true">
      <rect x="0" y="7" width="3" height="4" rx="1" />
      <rect x="4.5" y="5" width="3" height="6" rx="1" />
      <rect x="9" y="2.5" width="3" height="8.5" rx="1" />
      <rect x="13.5" y="0" width="3" height="11" rx="1" opacity="0.4" />
    </svg>
  );
}

function WifiIcon() {
  return (
    <svg width="15" height="11" viewBox="0 0 15 11" fill="currentColor" aria-hidden="true">
      <path d="M7.5 2.2c2.5 0 4.8 1 6.4 2.6l-1.3 1.3A7 7 0 0 0 7.5 4 7 7 0 0 0 2.4 6.1L1.1 4.8A9 9 0 0 1 7.5 2.2Z" />
      <path d="M7.5 5.6c1.5 0 2.9.6 3.9 1.6l-1.4 1.4a3.6 3.6 0 0 0-5 0L3.6 7.2a5.5 5.5 0 0 1 3.9-1.6Z" />
      <circle cx="7.5" cy="9.6" r="1.3" />
    </svg>
  );
}

function BatteryIcon() {
  return (
    <svg width="25" height="12" viewBox="0 0 25 12" fill="none" aria-hidden="true">
      <rect x="0.5" y="0.5" width="21" height="11" rx="3" stroke="currentColor" strokeOpacity="0.4" />
      <rect x="2" y="2" width="16" height="8" rx="1.5" fill="currentColor" />
      <rect x="23" y="4" width="1.5" height="4" rx="0.75" fill="currentColor" fillOpacity="0.5" />
    </svg>
  );
}
