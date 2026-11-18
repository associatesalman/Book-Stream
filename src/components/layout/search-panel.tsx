"use client";

import { useDeferredValue, useEffect, useId, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Form from "next/form";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Search, X } from "lucide-react";

import { MIN_QUERY_LENGTH, searchCatalog, searchHref } from "@/lib/catalog-search";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type SearchPanelProps = {
  open: boolean;
  onClose: () => void;
};

const MAX_RESULTS = 6;

/**
 * Header search over the shared catalogue (title, author, narrator).
 * - Typing shows up to six matches; each opens that book's supplied listing in a new tab.
 * - Enter or the Search button opens /search?q=… with every match.
 * - ↓/↑ move between the input and results, Escape closes and returns focus to the toggle.
 */
export function SearchPanel({ open, onClose }: SearchPanelProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const deferred = useDeferredValue(query);
  const ids = { list: useId(), status: useId() };

  const results = useMemo(() => searchCatalog(deferred), [deferred]);
  const trimmed = deferred.trim();
  const tooShort = trimmed.length > 0 && trimmed.length < MIN_QUERY_LENGTH;
  const shown = results.slice(0, MAX_RESULTS);

  const close = () => {
    onClose();
    // Return focus to the header toggle that opened the panel.
    requestAnimationFrame(() => document.querySelector<HTMLElement>('[aria-controls="site-search"]')?.focus());
  };

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const resultLinks = () => Array.from(listRef.current?.querySelectorAll<HTMLAnchorElement>("a[data-result]") ?? []);

  const onPanelKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      close();
      return;
    }
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    const links = resultLinks();
    if (links.length === 0) return;
    const current = links.indexOf(document.activeElement as HTMLAnchorElement);
    e.preventDefault();
    if (e.key === "ArrowDown") {
      links[current === -1 ? 0 : Math.min(current + 1, links.length - 1)].focus();
    } else if (current <= 0) {
      inputRef.current?.focus();
    } else {
      links[current - 1].focus();
    }
  };

  if (!open) return null;

  let status: string;
  if (trimmed.length === 0) status = "Type a title, author or narrator to search the catalogue.";
  else if (tooShort) status = `Type at least ${MIN_QUERY_LENGTH} characters to search.`;
  else if (results.length === 0) status = `No audiobooks match “${trimmed}”.`;
  else status = `${results.length} ${results.length === 1 ? "audiobook matches" : "audiobooks match"} “${trimmed}”.`;

  return (
    <div id="site-search" className="border-t border-border bg-white" onKeyDown={onPanelKeyDown}>
      <div className="container-page py-4 sm:py-5">
        <Form action="/search" role="search" className="flex items-center gap-2 sm:gap-3" onSubmit={onClose}>
          <label htmlFor="site-search-input" className="sr-only">
            Search audiobooks by title, author or narrator
          </label>
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-ink/45" aria-hidden />
            <input
              ref={inputRef}
              id="site-search-input"
              name="q"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoComplete="off"
              spellCheck={false}
              enterKeyHint="search"
              placeholder="Search by title, author or narrator"
              aria-controls={shown.length ? ids.list : undefined}
              aria-describedby={ids.status}
              className="h-12 w-full rounded-md border border-input bg-white pr-4 pl-12 [&::-webkit-search-cancel-button]:appearance-none text-base text-ink outline-none placeholder:text-ink/45 focus:border-brand focus:ring-3 focus:ring-ring/20"
            />
          </div>
          <Button type="submit" size="xl" className="hidden sm:inline-flex">
            Search
          </Button>
          <Button type="submit" size="icon-lg" className="size-12 sm:hidden" aria-label="Search">
            <ArrowRight className="size-5" />
          </Button>
          <Button type="button" variant="ghost" size="icon-lg" className="hidden size-12 sm:inline-flex" onClick={close} aria-label="Close search">
            <X className="size-5" />
          </Button>
        </Form>

        <div className="mt-3">
          <p id={ids.status} role="status" aria-live="polite" className={cn("text-sm", results.length ? "sr-only" : "py-2 text-ink/60")}>
            {status}
          </p>

          {shown.length > 0 ? (
            <div ref={listRef} className="overflow-hidden rounded-md border border-border">
              <ul id={ids.list} aria-label="Search results" className="max-h-[min(60vh,28rem)] divide-y divide-border overflow-y-auto">
                {shown.map(({ book, matchedOn }) => (
                  <li key={book.slug}>
                    <a
                      data-result
                      href={book.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={onClose}
                      className="flex items-center gap-4 px-3 py-3 outline-none hover:bg-ink/[0.03] focus-visible:bg-ink/[0.03] focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-inset sm:px-4"
                    >
                      <span className="relative size-14 shrink-0 overflow-hidden rounded-[2px] bg-white ring-1 ring-ink/10">
                        <Image src={book.cover} alt="" fill sizes="56px" className="object-contain" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-serif font-semibold text-ink">{book.title}</span>
                        {book.author ? <span className="block truncate text-sm text-ink/70">{book.author}</span> : null}
                        {book.narrators?.length ? (
                          <span className={cn("block truncate text-sm", matchedOn === "narrator" ? "text-brand" : "text-ink/55")}>
                            Narrated by {book.narrators.join(" and ")}
                          </span>
                        ) : null}
                      </span>
                      <ArrowUpRight className="size-4 shrink-0 text-brand" aria-hidden />
                      <span className="sr-only">(opens listing in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
              <Link
                data-result
                href={searchHref(trimmed)}
                onClick={onClose}
                className="flex items-center justify-between gap-3 border-t border-border px-4 py-3 text-sm font-semibold text-brand hover:underline focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none focus-visible:ring-inset"
              >
                {results.length > MAX_RESULTS ? `See all ${results.length} results for “${trimmed}”` : `Open results page for “${trimmed}”`}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
