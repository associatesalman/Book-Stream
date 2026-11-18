"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { CatalogBook } from "@/content/catalog";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/services/service-sections";
import { BookGrid } from "@/components/catalog/book-card";
import { matchesQuery, useCatalogSearch } from "@/components/catalog/catalog-search";

/** Grid inside the catalogue's right-hand column (the sidebar takes the left). */
const gridClass = "mt-6 lg:grid-cols-3 xl:grid-cols-4";

/** Compact page header for catalogue pages: breadcrumbs, eyebrow, title, short intro. */
export function CatalogHeader({
  breadcrumbs,
  eyebrow,
  title,
  intro,
  children,
}: {
  breadcrumbs: { title: string; href?: string }[];
  eyebrow: string;
  title: string;
  intro: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="pb-8">
      <Breadcrumbs items={breadcrumbs} />
      <p className="eyebrow mt-6 flex items-center gap-3 text-brand">
        <span aria-hidden className="h-px w-8 bg-brand" />
        {eyebrow}
      </p>
      <h1 className="mt-4 max-w-3xl font-serif text-[2.25rem] leading-[1.06] font-semibold tracking-[-0.025em] text-ink sm:text-[2.75rem] lg:text-[3.25rem]">
        {title}
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink/70">{intro}</p>
      {children}
    </header>
  );
}

/** Result summary for the current page while a search is active. */
export function SearchSummary({ books }: { books: CatalogBook[] }) {
  const { query, setQuery } = useCatalogSearch();
  const q = query.trim();
  const unique = new Map(books.map((b) => [b.slug, b]));
  const count = q ? [...unique.values()].filter((b) => matchesQuery(b, q)).length : unique.size;
  return (
    <div aria-live="polite" className="border-t border-ink/10 py-4 text-sm">
      {q ? (
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-ink/75">
          <span>
            {count === 0 ? "No audiobooks on this page match" : `${count} audiobook${count === 1 ? "" : "s"} match`}{" "}
            <span className="font-semibold text-ink">“{q}”</span>
          </span>
          <button type="button" onClick={() => setQuery("")} className="font-semibold text-brand hover:underline">
            Clear search
          </button>
        </p>
      ) : (
        <p className="text-ink/60">
          {count} audiobook{count === 1 ? "" : "s"}
        </p>
      )}
    </div>
  );
}

/**
 * One titled block of book cards, filtered by the sidebar search.
 * Hidden while searching when nothing in it matches (or when `hideWhenSearching`, to avoid
 * repeating books that another section on the page already lists).
 */
export function BookSection({
  id,
  index,
  title,
  description,
  books,
  more,
  pageSize,
  hideWhenSearching = false,
}: {
  id: string;
  index?: number;
  title: string;
  description?: string;
  books: CatalogBook[];
  more?: { label: string; href: string };
  /** Reveal this many at a time with a "Load more" button. */
  pageSize?: number;
  hideWhenSearching?: boolean;
}) {
  const { query } = useCatalogSearch();
  const [visible, setVisible] = useState(pageSize ?? books.length);
  const [lastQuery, setLastQuery] = useState(query);
  const searching = query.trim() !== "";

  // Start from the first page again whenever the search changes.
  if (lastQuery !== query) {
    setLastQuery(query);
    setVisible(pageSize ?? books.length);
  }

  const matches = searching ? books.filter((b) => matchesQuery(b, query)) : books;
  if (searching && (hideWhenSearching || matches.length === 0)) return null;

  const shown = matches.slice(0, visible);
  const headingId = `${id}-heading`;

  return (
    <section id={id} aria-labelledby={headingId} className="border-t border-ink/10 py-10 lg:py-12">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          {index !== undefined ? <p className="font-serif text-sm font-semibold text-brand tabular-nums">{String(index).padStart(2, "0")}</p> : null}
          <h2 id={headingId} className="mt-1 font-serif text-[1.625rem] leading-tight font-semibold tracking-[-0.01em] text-ink sm:text-[1.875rem]">
            {title}
          </h2>
          {description ? <p className="mt-2 leading-relaxed text-ink/70">{description}</p> : null}
        </div>
        <div className="flex shrink-0 items-center gap-5 text-sm">
          <span className="text-ink/60 tabular-nums">
            {searching ? `${matches.length} of ${books.length}` : books.length} {books.length === 1 ? "title" : "titles"}
          </span>
          {more ? (
            <Link href={more.href} className="inline-flex items-center gap-1.5 font-semibold text-brand hover:underline">
              {more.label}
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          ) : null}
        </div>
      </div>

      <BookGrid books={shown} className={gridClass} />

      {shown.length < matches.length ? (
        <div className="mt-10 flex justify-center">
          <Button type="button" size="xl" variant="outline" onClick={() => setVisible((v) => v + (pageSize ?? matches.length))}>
            Load more audiobooks
            <span className="text-ink/55 tabular-nums">({matches.length - shown.length} more)</span>
          </Button>
        </div>
      ) : null}
    </section>
  );
}
