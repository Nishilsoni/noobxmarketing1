import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Clock, Calendar, ArrowLeft, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { articleSchema, breadcrumbSchema } from "@/lib/seo";
import { blogPosts } from "@/data/blog";
import { siteConfig } from "@/lib/site";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

function getPost(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Article not found" };

  const path = `/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: path },
    keywords: post.tags,
    authors: [{ name: post.author.name }],
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: path,
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = blogPosts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 2);

  return (
    <article className="relative pb-8">
      <Container className="pt-28 lg:pt-32">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Blog", href: "/blog" },
            { name: post.title },
          ]}
        />

        <header className="mx-auto mt-8 max-w-3xl text-center">
          <Badge className="border-nebula-500/30 bg-nebula-500/10">
            {post.category}
          </Badge>
          <h1 className="mt-5 text-balance text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-stardust">
            <span className="flex items-center gap-2">
              <span className="flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-nebula-500 to-violet-500 text-xs font-semibold text-white">
                {post.author.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
              {post.author.name} · {post.author.role}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="size-4" aria-hidden />
              {formatDate(post.publishedAt)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-4" aria-hidden />
              {post.readingTime} min read
            </span>
          </div>
        </header>

        {/* Hero band */}
        <div className="mx-auto mt-10 aspect-[2/1] max-w-4xl overflow-hidden rounded-3xl border border-hairline">
          <div className="relative h-full w-full">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(0,255,240,0.4),transparent_55%),radial-gradient(circle_at_80%_80%,rgba(59,130,246,0.35),transparent_55%)]" />
            <div className="absolute inset-0 bg-grid opacity-40" />
          </div>
        </div>

        {/* Body */}
        <div className="prose-invert mx-auto mt-12 max-w-2xl space-y-6 text-pretty text-base leading-relaxed text-stardust">
          <p className="text-lg text-white">{post.excerpt}</p>
          <p>
            At {siteConfig.name}, we believe great marketing is equal parts art
            and science. This piece breaks down the thinking, the framework and
            the practical steps our team uses on real client missions — so you
            can apply the same principles to your own brand.
          </p>
          <h2 className="font-display text-2xl font-semibold text-white">
            Why this matters now
          </h2>
          <p>
            The digital universe is expanding faster than ever. Channels mature,
            algorithms shift and customer expectations climb. The brands that win
            aren&apos;t the ones chasing every trend — they&apos;re the ones with
            a clear system, measured against outcomes that actually move the
            business.
          </p>
          <h2 className="font-display text-2xl font-semibold text-white">
            The framework we use
          </h2>
          <p>
            Every engagement starts with discovery and research, moves into a
            data-led strategy, and only then into execution. We instrument
            everything from day one, so optimization is continuous rather than
            occasional. It&apos;s the same launch sequence that has helped our
            clients compound results across {post.category.toLowerCase()} and
            beyond.
          </p>
          <blockquote className="border-l-2 border-nebula-500 pl-5 text-lg italic text-white">
            “Strategy without measurement is a guess. Measurement without
            strategy is just noise. The magic is in pairing them.”
          </blockquote>
          <h2 className="font-display text-2xl font-semibold text-white">
            Putting it into orbit
          </h2>
          <p>
            Start small, instrument carefully, and double down on what compounds.
            If you&apos;d like a hand mapping this to your own growth goals, our
            crew is one message away.
          </p>
        </div>

        {/* CTA */}
        <div className="mx-auto mt-14 max-w-3xl">
          <SpotlightCard>
            <div className="flex flex-col items-center gap-5 p-8 text-center sm:flex-row sm:justify-between sm:text-left">
              <div>
                <h2 className="font-display text-xl font-semibold text-white">
                  Ready to launch your own growth mission?
                </h2>
                <p className="mt-1.5 text-sm text-stardust">
                  Book a free consultation with a Noobverse strategist.
                </p>
              </div>
              <Button asChild variant="gradient" size="lg" className="shrink-0">
                <a href="/#contact">
                  Book Consultation
                  <ArrowUpRight className="size-5" aria-hidden />
                </a>
              </Button>
            </div>
          </SpotlightCard>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mx-auto mt-16 max-w-4xl">
            <h2 className="font-display text-xl font-semibold text-white">
              More from {post.category}
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {related.map((r) => (
                <SpotlightCard key={r.slug} className="h-full">
                  <a href={`/blog/${r.slug}`} className="flex h-full flex-col p-6">
                    <span className="text-xs text-stardust-dim">
                      {formatDate(r.publishedAt)} · {r.readingTime} min
                    </span>
                    <h3 className="mt-3 text-balance font-display text-lg font-semibold text-white">
                      {r.title}
                    </h3>
                    <p className="mt-2 text-sm text-stardust">{r.excerpt}</p>
                  </a>
                </SpotlightCard>
              ))}
            </div>
          </div>
        )}

        <div className="mx-auto mt-14 max-w-2xl">
          <Button asChild variant="ghost">
            <a href="/blog">
              <ArrowLeft className="size-4" aria-hidden />
              Back to all articles
            </a>
          </Button>
        </div>
      </Container>

      <JsonLd
        data={[
          articleSchema(post),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />
    </article>
  );
}
