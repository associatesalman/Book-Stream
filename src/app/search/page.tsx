import type { Metadata } from "next";
import { Suspense } from "react";
import Form from "next/form";
import Link from "next/link";
import { Search } from "lucide-react";

import { catalog } from "@/content/catalog";
import { MIN_QUERY_LENGTH, searchCatalog } from "@/lib/catalog-search";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { BookGrid } from "@/components/catalog/book-card";
import { Breadcrumbs } from "@/components/services/service-sections";

export const metadata: Metadata = {
  title: "Search Audiobooks",
  description: `Search the ${catalog.length} audiobooks in the ${siteConfig.name} catalogue by title, author or narrator.`,
  alternates: { canonical: "/search" },
  // Result pages are query-specific; keep them out of search engine indexes.
  robots: { index: false, follow: true },
};

function firstParam(value: string | string[] | undefined) {
  return (Array.isArray(value) ? value[0] : value) ?? "";
}

function SearchForm({ defaultValue = "" }: { defaultValue?: string }) {
  return (
    <Form action="/search" role="search" className="mt-8 flex max-w-2xl flex-col gap-3 sm:flex-row">
      <label htmlFor="search-page-input" className="sr-only">
        Search audiobooks by title, author or narrator
      </label>
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-ink/45" aria-hidden />
        <input
          // Re-mount when the query changes so the field always reflects the URL.
          key={defaultValue}
          id="search-page-input"
          name="q"
          type="search"
          defaultValue={defaultValue}
          autoComplete="off"
          enterKeyHint="search"
          placeholder="Search by title, author or narrator"
          className="h-12 w-full rounded-md border border-input bg-white pr-4 pl-12 [&::-webkit-search-cancel-button]:appearance-none text-base text-ink outline-none placeholder:text-ink/45 focus:border-brand focus:ring-3 focus:ring-ring/20"
        />
      </div>
      <Button type="submit" size="xl">
        Search
      </Button>
    </Form>
  );
}

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

async function SearchResults({ searchParams }: { searchParams: SearchParams }) {
  const query = firstParam((await searchParams).q).trim();
  const results = searchCatalog(query);

  return (
    <>
      <SearchForm defaultValue={query} />

      <div className="mt-10 border-t border-border pt-6" aria-live="polite">
        {query.length === 0 ? (
          <div className="max-w-xl">
            <h2 className="text-lg font-semibold text-ink">Start with a title, author or narrator</h2>
            <p className="mt-2 leading-relaxed text-ink/70">
              Enter at least {MIN_QUERY_LENGTH} characters. Partial words work too — for example, part of a title or an author’s surname.
            </p>
          </div>
        ) : query.length < MIN_QUERY_LENGTH ? (
          <p className="text-ink/70">Please enter at least {MIN_QUERY_LENGTH} characters to search.</p>
        ) : results.length === 0 ? (
          <div className="max-w-xl">
            <h2 className="text-lg font-semibold text-ink">No audiobooks match “{query}”</h2>
            <p className="mt-2 leading-relaxed text-ink/70">
              Check the spelling, try fewer words, or search by the author’s name instead. You can also browse every title by category.
            </p>
            <Button asChild size="lg" variant="outline" className="mt-6">
              <Link href="/audiobooks">Browse all audiobooks</Link>
            </Button>
          </div>
        ) : (
          <>
            <h2 className="text-sm text-ink/70">
              <span className="font-semibold text-ink">{results.length}</span> {results.length === 1 ? "result" : "results"} for{" "}
              <span className="font-semibold text-ink">“{query}”</span>
            </h2>
            <BookGrid books={results.map((r) => r.book)} headingLevel="h3" className="mt-6" />
          </>
        )}
      </div>
    </>
  );
}

export default function SearchPage({ searchParams }: { searchParams: SearchParams }) {
  return (
    <section aria-labelledby="page-heading" className="bg-white">
      <div className="container-page pt-8 pb-20 sm:pt-10 sm:pb-24">
        <Breadcrumbs items={[{ title: "Home", href: "/" }, { title: "Search" }]} />
        <h1 id="page-heading" className="mt-8 font-serif text-[2.25rem] leading-tight font-semibold tracking-[-0.02em] text-ink sm:text-5xl">
          Search audiobooks
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink/70">
          Search the Book Stream catalogue by title, author or narrator. Narrator details appear only where the listing names one.
        </p>
        <Suspense fallback={<SearchForm />}>
          <SearchResults searchParams={searchParams} />
        </Suspense>
      </div>
    </section>
  );
}
