import type { Metadata } from "next";
import { Home, ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { OrbitalSystem } from "@/components/effects/orbital-system";

export const metadata: Metadata = {
  title: "Lost in space — 404",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <Container className="flex min-h-[80svh] flex-col items-center justify-center py-32 text-center">
      <div className="animate-float-slow w-44 sm:w-56">
        <OrbitalSystem />
      </div>
      <p className="mt-8 font-display text-6xl font-bold text-gradient sm:text-7xl">
        404
      </p>
      <h1 className="mt-4 text-balance text-2xl font-semibold sm:text-3xl">
        You&apos;ve drifted off the map
      </h1>
      <p className="mt-3 max-w-md text-pretty text-stardust">
        This corner of the Noobverse doesn&apos;t exist — or has been pulled into
        a black hole. Let&apos;s get you back to familiar stars.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button asChild variant="gradient" size="lg">
          <a href="/">
            <Home className="size-5" aria-hidden />
            Back to home
          </a>
        </Button>
        <Button asChild variant="secondary" size="lg">
          <a href="/blog">
            <ArrowLeft className="size-5" aria-hidden />
            Read the blog
          </a>
        </Button>
      </div>
    </Container>
  );
}
