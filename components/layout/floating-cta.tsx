"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Phone, CalendarClock, X } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

const waUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
  siteConfig.whatsappMessage,
)}`;

/** Floating WhatsApp button (all viewports) + a sticky "Book a call" bar
 *  on mobile that appears once the user scrolls past the hero. */
export function FloatingCTA() {
  const [showBar, setShowBar] = React.useState(false);
  const [dismissed, setDismissed] = React.useState(false);
  const reduce = useReducedMotion();

  React.useEffect(() => {
    const onScroll = () => setShowBar(window.scrollY > window.innerHeight * 0.9);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const barVisible = showBar && !dismissed;

  return (
    <>
      {/* WhatsApp — raised on mobile when the sticky bar is showing */}
      <motion.a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 260, damping: 18 }}
        className={cn(
          "group fixed right-5 z-40 inline-flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-6px_rgba(37,211,102,0.6)] transition-all hover:scale-105",
          barVisible ? "bottom-24 sm:bottom-6" : "bottom-6",
        )}
      >
        {!reduce && (
          <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-30 [animation-duration:2.5s]" />
        )}
        <svg viewBox="0 0 24 24" fill="currentColor" className="relative size-7" aria-hidden="true">
          <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.51 5.26l-.999 3.648 3.728-.979zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" />
        </svg>
      </motion.a>

      {/* Sticky mobile call-to-action bar */}
      <AnimatePresence>
        {barVisible && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 30 }}
            className="fixed inset-x-3 bottom-3 z-40 lg:hidden"
          >
            <div className="glass-strong flex items-center gap-2 rounded-2xl border border-hairline-strong p-2 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.7)]">
              <a
                href={siteConfig.phoneHref}
                aria-label="Call us"
                className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl border border-hairline text-stardust transition-colors hover:text-white"
              >
                <Phone className="size-5" aria-hidden />
              </a>
              <a
                href="#contact"
                onClick={() => setDismissed(true)}
                className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-[linear-gradient(110deg,var(--color-nebula-500),var(--color-violet-500),var(--color-cosmos-500))] text-sm font-medium text-white"
              >
                <CalendarClock className="size-4" aria-hidden />
                Book Free Consultation
              </a>
              <button
                onClick={() => setDismissed(true)}
                aria-label="Dismiss"
                className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl text-stardust-dim transition-colors hover:text-white"
              >
                <X className="size-4" aria-hidden />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
