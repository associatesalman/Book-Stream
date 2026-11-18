"use client";

import { createContext, useContext, useMemo, useState } from "react";

import { bookCategories } from "@/content/books";
import type { CatalogBook } from "@/content/catalog";

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[’']/g, "")
    .toLowerCase();
}

function searchText(book: CatalogBook) {
  return normalize([book.title, book.author ?? "", bookCategories[book.category], book.subgenre ?? "", book.description].join(" "));
}

/** True when every search term appears in the book's title, author, category, subgenre or description. */
export function matchesQuery(book: CatalogBook, query: string) {
  const terms = normalize(query).split(/\s+/).filter(Boolean);
  if (terms.length === 0) return true;
  const text = searchText(book);
  return terms.every((t) => text.includes(t));
}

type SearchState = { query: string; setQuery: (value: string) => void };

const CatalogSearchContext = createContext<SearchState | null>(null);

/**
 * Search state shared by the catalogue sidebar and the book sections on the current page.
 * Lives in the /audiobooks layout, so a search carries over when moving between categories.
 */
export function CatalogSearchProvider({ children }: { children: React.ReactNode }) {
  const [query, setQuery] = useState("");
  const value = useMemo(() => ({ query, setQuery }), [query]);
  return <CatalogSearchContext.Provider value={value}>{children}</CatalogSearchContext.Provider>;
}

export function useCatalogSearch() {
  const ctx = useContext(CatalogSearchContext);
  if (!ctx) throw new Error("useCatalogSearch must be used inside CatalogSearchProvider.");
  return ctx;
}
