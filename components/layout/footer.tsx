import { Mail, Phone, MapPin } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { NewsletterForm } from "@/components/layout/newsletter-form";
import { siteConfig, footerNav } from "@/lib/site";
import {
  LinkedInIcon,
  XIcon,
  InstagramIcon,
  YouTubeIcon,
  PinterestIcon,
} from "@/components/ui/social-icons";

const socials = [
  { label: "LinkedIn", href: siteConfig.socials.linkedin, Icon: LinkedInIcon },
  { label: "X (Twitter)", href: siteConfig.socials.twitter, Icon: XIcon },
  { label: "Instagram", href: siteConfig.socials.instagram, Icon: InstagramIcon },
  { label: "YouTube", href: siteConfig.socials.youtube, Icon: YouTubeIcon },
  { label: "Pinterest", href: siteConfig.socials.pinterest, Icon: PinterestIcon },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative mt-24 border-t border-hairline">
      <Container className="py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand + newsletter */}
          <div className="lg:col-span-5">
            <Logo />
            <p className="mt-5 max-w-sm text-pretty text-sm leading-relaxed text-stardust">
              Premium digital marketing engineered to launch ambitious brands
              into orbit. Data-driven strategy, cosmic creativity, measurable
              results.
            </p>

            <div className="mt-7 max-w-sm">
              <p className="mb-2 text-sm font-medium text-white">
                Join the Noobverse dispatch
              </p>
              <NewsletterForm />
            </div>

            <ul className="mt-7 space-y-2 text-sm text-stardust">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="inline-flex items-center gap-2.5 transition-colors hover:text-white"
                >
                  <Mail className="size-4 text-nebula-400" aria-hidden />
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.phoneHref}
                  className="inline-flex items-center gap-2.5 transition-colors hover:text-white"
                >
                  <Phone className="size-4 text-nebula-400" aria-hidden />
                  {siteConfig.phone}
                </a>
              </li>
              <li className="inline-flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-nebula-400" aria-hidden />
                <span>
                  {siteConfig.address.street}, {siteConfig.address.city},{" "}
                  {siteConfig.address.region} {siteConfig.address.postalCode}
                </span>
              </li>
            </ul>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
            {footerNav.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h2 className="text-sm font-semibold tracking-wide text-white">
                  {col.title}
                </h2>
                <ul className="mt-4 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-stardust transition-colors hover:text-white"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-6 border-t border-hairline pt-8 sm:flex-row">
          <p className="text-xs text-stardust-dim">
            © {year} {siteConfig.legalName}. All rights reserved. Made among the
            stars.
          </p>
          <ul className="flex items-center gap-2">
            {socials.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex size-10 items-center justify-center rounded-full border border-hairline text-stardust transition-all hover:-translate-y-0.5 hover:border-hairline-strong hover:text-white"
                >
                  <Icon className="size-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
