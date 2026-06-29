import { ChevronRight } from "lucide-react";

type Crumb = { name: string; href?: string };

/** Accessible breadcrumb trail. Pair with breadcrumbSchema() for SEO. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-stardust-dim">
        {items.map((c, i) => {
          const last = i === items.length - 1;
          return (
            <li key={c.name} className="flex items-center gap-1.5">
              {c.href && !last ? (
                <a href={c.href} className="transition-colors hover:text-white">
                  {c.name}
                </a>
              ) : (
                <span aria-current={last ? "page" : undefined} className="text-stardust">
                  {c.name}
                </span>
              )}
              {!last && <ChevronRight className="size-3.5" aria-hidden />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
