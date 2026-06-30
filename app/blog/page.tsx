import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Blog } from "@/components/sections/blog";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

export const metadata: Metadata = {
  title: "Blog — Growth Insights from the Noobverse",
  description:
    "Practical SEO, paid media, content, email and design strategy from the specialists at Noob X Marketing. Field notes from the frontier of growth.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog — Growth Insights from the Noobverse · Noob X Marketing",
    description:
      "Practical SEO, paid media, content, email and design strategy from the Noob X Marketing crew.",
    url: "/blog",
    type: "website",
  },
};

export default function BlogIndexPage() {
  return (
    <>
      <Container className="pt-28 lg:pt-32">
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Blog" }]} />
      </Container>
      <Blog />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ])}
      />
    </>
  );
}
