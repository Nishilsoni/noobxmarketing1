"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { Menu, X, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";
import { navItems, siteConfig } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { Magnetic } from "@/components/motion/magnetic";

export function Header() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <a
        href="#main"
        className="sr-only-focusable fixed left-4 top-4 z-[100] rounded-full bg-nebula-500 px-4 py-2 text-sm font-medium text-white"
      >
        Skip to content
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled ? "py-2.5" : "py-4",
        )}
      >
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
          <div
            className={cn(
              "flex items-center justify-between rounded-full px-3 py-2 backdrop-blur-xl backdrop-saturate-150 transition-all duration-500 supports-[backdrop-filter]:backdrop-blur-xl",
              scrolled
                ? "border border-white/10 bg-space-900/80 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.7)]"
                : "border border-white/5 bg-space-950/30",
            )}
          >
            <a
              href="#hero"
              className="rounded-full pl-2 pr-3"
              aria-label={`${siteConfig.name} — home`}
            >
              <Logo />
            </a>

            <nav
              aria-label="Primary"
              className="hidden items-center gap-1 lg:flex"
            >
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-full px-3.5 py-2 text-sm font-medium text-stardust transition-colors hover:text-white"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <Magnetic className="hidden sm:block" strength={0.25}>
                <Button asChild variant="gradient" size="md">
                  <a href="#contact">
                    <Rocket className="size-4" aria-hidden />
                    Book Free Consultation
                  </a>
                </Button>
              </Magnetic>

              {/* Mobile menu trigger */}
              <Dialog.Root open={open} onOpenChange={setOpen}>
                <Dialog.Trigger asChild>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="lg:hidden"
                    aria-label="Open menu"
                  >
                    <Menu className="size-5" aria-hidden />
                  </Button>
                </Dialog.Trigger>

                <AnimatePresence>
                  {open && (
                    <Dialog.Portal forceMount>
                      <Dialog.Overlay asChild>
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="fixed inset-0 z-[60] bg-space-950/70 backdrop-blur-sm"
                        />
                      </Dialog.Overlay>
                      <Dialog.Content asChild>
                        <motion.div
                          initial={{ x: "100%" }}
                          animate={{ x: 0 }}
                          exit={{ x: "100%" }}
                          transition={{ type: "spring", stiffness: 320, damping: 34 }}
                          className="glass-strong fixed inset-y-0 right-0 z-[70] flex w-[min(86vw,22rem)] flex-col p-6"
                        >
                          <Dialog.Title className="sr-only">
                            Navigation menu
                          </Dialog.Title>
                          <Dialog.Description className="sr-only">
                            Site navigation links and primary call to action.
                          </Dialog.Description>
                          <div className="flex items-center justify-between">
                            <Logo />
                            <Dialog.Close asChild>
                              <Button
                                variant="secondary"
                                size="icon"
                                aria-label="Close menu"
                              >
                                <X className="size-5" aria-hidden />
                              </Button>
                            </Dialog.Close>
                          </div>

                          <nav
                            aria-label="Mobile"
                            className="mt-10 flex flex-col gap-1"
                          >
                            {navItems.map((item, i) => (
                              <motion.a
                                key={item.href}
                                href={item.href}
                                onClick={() => setOpen(false)}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.08 + i * 0.05 }}
                                className="rounded-2xl px-4 py-3 text-lg font-medium text-stardust transition-colors hover:bg-white/[0.05] hover:text-white"
                              >
                                {item.label}
                              </motion.a>
                            ))}
                          </nav>

                          <div className="mt-auto pt-6">
                            <Button
                              asChild
                              variant="gradient"
                              size="lg"
                              className="w-full"
                            >
                              <a href="#contact" onClick={() => setOpen(false)}>
                                <Rocket className="size-4" aria-hidden />
                                Book Free Consultation
                              </a>
                            </Button>
                          </div>
                        </motion.div>
                      </Dialog.Content>
                    </Dialog.Portal>
                  )}
                </AnimatePresence>
              </Dialog.Root>
            </div>
          </div>
        </div>

        {/* Scroll progress */}
        <motion.div
          aria-hidden
          style={{ scaleX: progress }}
          className="absolute inset-x-0 bottom-0 h-px origin-left bg-gradient-to-r from-nebula-500 via-violet-500 to-cosmos-500"
        />
      </header>
    </>
  );
}
