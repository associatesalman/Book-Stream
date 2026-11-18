"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Check, ChevronDown, Search, X } from "lucide-react";

import { audiobookCategories, categoryBookCount } from "@/content/audiobook-categories";
import { catalog } from "@/content/catalog";
import { cn } from "@/lib/utils";
import { useCatalogSearch } from "@/components/catalog/catalog-search";

/** The only category navigation in the catalogue: each item is a real route. Counts come from the catalogue data. */
const items = [
  { href: "/audiobooks", label: "All Audiobooks", count: catalog.length },
  ...audiobookCategories.map((c) => ({ href: `/audiobooks/${c.slug}`, label: c.name, count: categoryBookCount(c) })),
];

/**
 * Catalogue control area shared by /audiobooks and every /audiobooks/[slug] page:
 * search, then one vertical list of category links. The active item follows the URL, so
 * direct visits, refreshes and back/forward all highlight the right category.
 * Desktop: sticky left sidebar. Mobile: one compact panel whose category list opens on demand.
 */
export function CatalogSidebar() {
  const pathname = usePathname();
  const { query, setQuery } = useCatalogSearch();
  const [open, setOpen] = useState(false);
  const [openedAt, setOpenedAt] = useState(pathname);
  const searchId = useId();
  const listId = useId();

  // Collapse the mobile list after navigating to another category.
  if (openedAt !== pathname) {
    setOpenedAt(pathname);
    setOpen(false);
  }

  const active = items.find((i) => i.href === pathname) ?? null;

  return (
    <aside aria-label="Audiobook catalogue" className="lg:sticky lg:top-28 lg:self-start">
      <div className="rounded-[4px] border border-ink/10 bg-white p-4 lg:p-5">
        <form role="search" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor={searchId} className="text-sm font-semibold text-ink">
            Search audiobooks
          </label>
          <div className="relative mt-2">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4.5 -translate-y-1/2 text-ink/50" aria-hidden />
            <input
              id={searchId}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Title, author, genre"
              autoComplete="off"
              className="h-11 w-full rounded-md border border-ink/20 bg-white pr-2 pl-9.5 text-base text-ink outline-none placeholder:text-ink/45 focus:border-brand focus:ring-3 focus:ring-brand/20"
            />
          </div>
          {query ? (
            <button type="button" onClick={() => setQuery("")} className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline">
              <X className="size-4" aria-hidden />
              Clear search
            </button>
          ) : null}
        </form>

        <nav aria-label="Audiobook categories" className="mt-5 border-t border-ink/10 pt-4">
          {/* Mobile toggle: shows the current category; the list itself is the same nav as on desktop */}
          <button
            type="button"
            aria-expanded={open}
            aria-controls={listId}
            onClick={() => setOpen((v) => !v)}
            className="flex w-full items-center justify-between gap-3 rounded-md border border-ink/20 px-3.5 py-2.5 text-left text-sm lg:hidden"
          >
            <span>
              <span className="text-ink/60">Category: </span>
              <span className="font-semibold text-ink">{active?.label ?? "Choose a category"}</span>
            </span>
            <ChevronDown className={cn("size-4.5 text-ink/60", open && "rotate-180")} aria-hidden />
          </button>

          <p className="mb-2 hidden text-sm font-semibold text-ink lg:block">Categories</p>
          <ul id={listId} className={cn("mt-2 space-y-1 lg:mt-0 lg:block", open ? "block" : "hidden")}>
            {items.map((item) => {
              const current = item.href === pathname;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={current ? "page" : undefined}
                    className={cn(
                      "flex items-center gap-2 rounded-md border-l-2 py-2 pr-2 pl-3 text-sm focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-brand",
                      current ? "border-brand bg-brand font-semibold text-white" : "border-transparent text-ink/80 hover:border-brand hover:text-brand",
                    )}
                  >
                    <span className="flex-1">{item.label}</span>
                    <span className={cn("tabular-nums", current ? "text-white/85" : "text-ink/45")}>{item.count}</span>
                    {current ? <Check className="size-4 shrink-0" aria-hidden /> : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
