"use client";

import * as React from "react";
import { Search, Clock, ArrowUpRight, Calendar } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { cn } from "@/lib/utils";
import { blogPosts, blogCategories } from "@/data/blog";
import type { BlogPost } from "@/types";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function Blog() {
  const [query, setQuery] = React.useState("");
  const [category, setCategory] = React.useState<(typeof blogCategories)[number]>(
    "All",
  );

  const isDefault = category === "All" && query.trim() === "";
  const featured = blogPosts.find((p) => p.featured);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return blogPosts.filter((p) => {
      const inCat = category === "All" || p.category === category;
      const inQuery =
        q === "" ||
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q));
      return inCat && inQuery;
    });
  }, [query, category]);

  // When showing default view, exclude the featured post from the grid.
  const gridPosts = isDefault
    ? filtered.filter((p) => !p.featured)
    : filtered;

  return (
    <section id="blog" className="section-pad relative scroll-mt-24">
      <Container>
        <SectionHeading
          eyebrow="From the Noobverse"
          title={
            <>
              Insights from the{" "}
              <span className="text-gradient">frontier of growth</span>
            </>
          }
          description="Practical strategy, fresh tactics and field notes from our missions — written by the specialists who run them."
        />

        {/* Controls */}
        <div className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
            {blogCategories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                aria-pressed={category === c}
                className={cn(
                  "rounded-full border px-4 py-1.5 text-sm font-medium transition-all",
                  category === c
                    ? "border-nebula-500/40 bg-nebula-500/15 text-white"
                    : "border-hairline text-stardust hover:border-hairline-strong hover:text-white",
                )}
              >
                {c}
              </button>
            ))}
          </div>

          <label className="relative w-full lg:w-72">
            <span className="sr-only">Search articles</span>
            <Search
              className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-stardust-dim"
              aria-hidden
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles…"
              className="w-full rounded-full border border-hairline bg-white/[0.04] py-2.5 pl-11 pr-4 text-sm text-white placeholder:text-stardust-dim transition-colors focus:border-nebula-400 focus:outline-none"
            />
          </label>
        </div>

        {/* Featured */}
        {isDefault && featured && (
          <div className="mt-8">
            <SpotlightCard>
              <a
                href={`/blog/${featured.slug}`}
                className="group/feat grid gap-6 p-7 lg:grid-cols-[1.4fr_1fr] lg:items-center lg:p-9"
              >
                <div>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="rounded-full bg-nebula-500/15 px-3 py-1 font-medium text-nebula-300">
                      Featured · {featured.category}
                    </span>
                    <span className="inline-flex items-center gap-1 text-stardust-dim">
                      <Clock className="size-3.5" aria-hidden />
                      {featured.readingTime} min read
                    </span>
                  </div>
                  <h3 className="mt-4 text-balance font-display text-2xl font-semibold text-white lg:text-3xl">
                    {featured.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-pretty leading-relaxed text-stardust">
                    {featured.excerpt}
                  </p>
                  <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-nebula-300">
                    Read article
                    <ArrowUpRight className="size-4 transition-transform group-hover/feat:translate-x-0.5 group-hover/feat:-translate-y-0.5" aria-hidden />
                  </div>
                </div>
                <div className="relative hidden aspect-[4/3] overflow-hidden rounded-2xl border border-hairline lg:block">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(108,99,255,0.35),transparent_55%),radial-gradient(circle_at_80%_80%,rgba(59,130,246,0.3),transparent_55%)]" />
                  <div className="absolute inset-0 bg-grid opacity-40" />
                  <span className="absolute bottom-4 left-4 text-xs text-stardust">
                    {formatDate(featured.publishedAt)} · {featured.author.name}
                  </span>
                </div>
              </a>
            </SpotlightCard>
          </div>
        )}

        {/* Grid */}
        {gridPosts.length > 0 ? (
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {gridPosts.map((p) => (
              <BlogCard key={p.slug} post={p} />
            ))}
          </div>
        ) : (
          <p className="mt-12 text-center text-stardust">
            No transmissions found for that query. Try another search.
          </p>
        )}
      </Container>
    </section>
  );
}

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <SpotlightCard className="h-full">
      <a href={`/blog/${post.slug}`} className="flex h-full flex-col p-6">
        <div className="flex items-center justify-between text-xs">
          <span className="rounded-full border border-hairline bg-white/[0.04] px-3 py-1 font-medium text-stardust">
            {post.category}
          </span>
          <span className="inline-flex items-center gap-1 text-stardust-dim">
            <Clock className="size-3.5" aria-hidden />
            {post.readingTime} min
          </span>
        </div>
        <h3 className="mt-4 text-balance font-display text-lg font-semibold leading-snug text-white">
          {post.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-stardust">
          {post.excerpt}
        </p>
        <div className="mt-5 flex items-center justify-between border-t border-hairline pt-4 text-xs text-stardust-dim">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="size-3.5" aria-hidden />
            {formatDate(post.publishedAt)}
          </span>
          <span>{post.author.name}</span>
        </div>
      </a>
    </SpotlightCard>
  );
}
