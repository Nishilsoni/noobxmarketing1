import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${siteConfig.name} collects, uses and protects your data.`,
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <Container className="max-w-3xl pt-28 pb-8 lg:pt-32">
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Privacy Policy" }]} />
      <h1 className="mt-8 text-balance text-4xl font-semibold lg:text-5xl">
        Privacy Policy
      </h1>
      <p className="mt-4 text-sm text-stardust-dim">Last updated: June 2026</p>

      <div className="mt-10 space-y-8 text-pretty leading-relaxed text-stardust">
        <section className="space-y-3">
          <h2 className="font-display text-xl font-semibold text-white">Overview</h2>
          <p>
            {siteConfig.name} respects your privacy. This policy explains what
            information we collect, how we use it, and the choices you have. By
            using our website you agree to the practices described here.
          </p>
        </section>
        <section className="space-y-3">
          <h2 className="font-display text-xl font-semibold text-white">
            Information we collect
          </h2>
          <p>
            We collect information you provide directly — such as your name,
            email, company and message when you submit a form — and limited
            technical data (like device and usage analytics) to improve our
            services.
          </p>
        </section>
        <section className="space-y-3">
          <h2 className="font-display text-xl font-semibold text-white">
            How we use your information
          </h2>
          <p>
            We use your information to respond to enquiries, deliver our
            services, send relevant updates you&apos;ve opted into, and improve
            our website. We never sell your personal data.
          </p>
        </section>
        <section className="space-y-3">
          <h2 className="font-display text-xl font-semibold text-white">Your rights</h2>
          <p>
            You may request access to, correction of, or deletion of your
            personal data at any time by emailing{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-nebula-300 underline-offset-4 hover:underline"
            >
              {siteConfig.email}
            </a>
            .
          </p>
        </section>
        <section className="space-y-3">
          <h2 className="font-display text-xl font-semibold text-white">Contact</h2>
          <p>
            Questions about this policy? Reach us at {siteConfig.email} or{" "}
            {siteConfig.phone}.
          </p>
        </section>
      </div>
    </Container>
  );
}
