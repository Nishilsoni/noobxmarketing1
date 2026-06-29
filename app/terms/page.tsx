import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `The terms governing your use of the ${siteConfig.name} website and services.`,
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <Container className="max-w-3xl pt-28 pb-8 lg:pt-32">
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Terms of Service" }]} />
      <h1 className="mt-8 text-balance text-4xl font-semibold lg:text-5xl">
        Terms of Service
      </h1>
      <p className="mt-4 text-sm text-stardust-dim">Last updated: June 2026</p>

      <div className="mt-10 space-y-8 text-pretty leading-relaxed text-stardust">
        <section className="space-y-3">
          <h2 className="font-display text-xl font-semibold text-white">
            Acceptance of terms
          </h2>
          <p>
            By accessing {siteConfig.name}, you agree to be bound by these terms.
            If you do not agree, please discontinue use of the website.
          </p>
        </section>
        <section className="space-y-3">
          <h2 className="font-display text-xl font-semibold text-white">
            Use of the website
          </h2>
          <p>
            You agree to use the website lawfully and not to misuse, disrupt or
            attempt to gain unauthorized access to any part of our systems.
          </p>
        </section>
        <section className="space-y-3">
          <h2 className="font-display text-xl font-semibold text-white">
            Intellectual property
          </h2>
          <p>
            All content, branding and design on this website are the property of
            {" "}
            {siteConfig.legalName} unless otherwise stated, and may not be
            reproduced without permission.
          </p>
        </section>
        <section className="space-y-3">
          <h2 className="font-display text-xl font-semibold text-white">
            Limitation of liability
          </h2>
          <p>
            The website is provided “as is”. To the fullest extent permitted by
            law, {siteConfig.name} disclaims all warranties and is not liable for
            any indirect or consequential damages arising from its use.
          </p>
        </section>
        <section className="space-y-3">
          <h2 className="font-display text-xl font-semibold text-white">Contact</h2>
          <p>
            For questions about these terms, contact {siteConfig.email}.
          </p>
        </section>
      </div>
    </Container>
  );
}
