/**
 * Site search over the shared audiobook catalogue (src/content/catalog.ts).
 * Used by the header search dropdown and the /search results page, so both always agree
 * with the Audiobooks pages. Matches title, author and narrator (where a narrator is known).
 */

import { catalog, type CatalogBook } from "@/content/catalog";

/** Lowercase, strip accents and apostrophes, so "bronte" finds "Brontë" and "bingleys" finds "Bingley’s". */
export function normalizeSearch(value: string) {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[’'‘`]/g, "")
    .toLowerCase()
    .trim();
}

export type MatchField = "title" | "author" | "narrator";

export type SearchResult = {
  book: CatalogBook;
  /** The strongest field the query matched, for ranking and for telling the user why it appeared. */
  matchedOn: MatchField;
};

type Indexed = { book: CatalogBook; title: string; author: string; narrators: string; all: string };

const index: Indexed[] = catalog.map((book) => {
  const title = normalizeSearch(book.title);
  const author = normalizeSearch(book.author ?? "");
  const narrators = normalizeSearch((book.narrators ?? []).join(" "));
  return { book, title, author, narrators, all: `${title} ${author} ${narrators}` };
});

/** Minimum query length; shorter queries return nothing rather than most of the catalogue. */
export const MIN_QUERY_LENGTH = 2;

/**
 * Case-insensitive, partial matching: every word in the query must appear somewhere in the
 * title, author or narrator text. Results are ranked title-first, then author, then narrator.
 */
export function searchCatalog(query: string): SearchResult[] {
  const q = normalizeSearch(query);
  if (q.length < MIN_QUERY_LENGTH) return [];
  const terms = q.split(/\s+/).filter(Boolean);

  const scored: { result: SearchResult; score: number }[] = [];
  for (const entry of index) {
    if (!terms.every((t) => entry.all.includes(t))) continue;

    let matchedOn: MatchField;
    let score: number;
    if (entry.title.startsWith(q)) [matchedOn, score] = ["title", 0];
    else if (entry.title.includes(q)) [matchedOn, score] = ["title", 1];
    else if (terms.every((t) => entry.title.includes(t))) [matchedOn, score] = ["title", 2];
    else if (entry.author.includes(q)) [matchedOn, score] = ["author", 3];
    else if (entry.narrators.includes(q)) [matchedOn, score] = ["narrator", 4];
    else if (terms.some((t) => entry.title.includes(t))) [matchedOn, score] = ["title", 5];
    else if (terms.some((t) => entry.author.includes(t))) [matchedOn, score] = ["author", 6];
    else [matchedOn, score] = ["narrator", 7];

    scored.push({ result: { book: entry.book, matchedOn }, score });
  }

  return scored
    .sort((a, b) => a.score - b.score || a.result.book.title.localeCompare(b.result.book.title, "en", { sensitivity: "base" }))
    .map((s) => s.result);
}

/** "/search?q=…" for a query. */
export function searchHref(query: string) {
  const q = query.trim();
  return q ? `/search?q=${encodeURIComponent(q)}` : "/search";
}
