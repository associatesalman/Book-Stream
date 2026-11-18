/**
 * The complete Book Stream audiobook catalogue: one record per unique book across all four
 * source documents in public/ (https.docx, Book 1.docx, Book 11.docx, Book 12.docx).
 *
 * - books.ts holds the 25 https.docx titles (also used by the homepage collection).
 * - books-extra.ts holds the 76 titles that are new in the other three documents.
 * - Duplicates are merged by listing ID: The Practical Pretender appears in https.docx (entry 10)
 *   and Book 1.docx (entry 11); it is one record with both sources listed.
 * - Not imported: https.docx entry 8 ("Echoes From Within", Carol Dawn), whose URL is truncated
 *   in the source and has no listing ID.
 */

import type { StaticImageData } from "next/image";

import { bookCategories, books, type BookCategory } from "@/content/books";
import { extraBooks } from "@/content/books-extra";

export type BookSource = { document: string; entry: number };

export type CatalogBook = {
  slug: string;
  title: string;
  author?: string;
  category: BookCategory;
  /** Short genre detail taken from cover or listing text, when the source gives one. */
  subgenre?: string;
  description: string;
  /** Narrators, only where a source document names them. Never filled in otherwise. */
  narrators?: string[];
  cover: StaticImageData;
  /** Destination URL exactly as supplied in the source document. */
  href: string;
  sources: BookSource[];
};

/** Subgenres for the https.docx titles, restating their existing descriptions only. */
const httpsSubgenres: Partial<Record<string, string>> = {
  unbind: "Science fiction series",
  "the-orphaned-songbird": "Victorian romance",
  ignite: "Science fiction series",
  "not-alone": "Science fiction series",
  ours: "Contemporary romance",
  "an-outcasts-wish": "Highland romance",
  "unwanted-approach": "Marriage drama",
  "the-bind": "Novella",
  yours: "Contemporary romance",
  pure: "Ranch romance",
  "into-nowhere": "Real-life disappearances",
  "1984": "Dystopian classic",
  "through-the-smoke": "Christian romance",
  kade: "Sci-fi romance",
  "snowflake-creek-box-set": "Christmas stories",
  "treasure-island": "Classic adventure",
  "fourth-and-long": "Christian sports romance",
};

/**
 * Narrators stated in the source material. Only four titles name a narrator (in their
 * descriptions, taken from the cover text); every other title has no narrator information.
 */
const sourceNarrators: Partial<Record<string, string[]>> = {
  "pride-and-prejudice": ["Alex Mercer"],
  "caroline-bingleys-grand-plan": ["Clare Saxby"],
  "vintage-vine": ["CJ Bloom", "Duncan Cole"],
  "wuthering-heights": ["Alex Mercer"],
};

/** Same listing found in more than one document (matched by listing ID). */
const extraSources: Partial<Record<string, BookSource[]>> = {
  "the-practical-pretender": [{ document: "Book 1.docx", entry: 11 }],
};

export const catalog: CatalogBook[] = [
  ...books.map((b) => ({
    slug: b.slug,
    title: b.title,
    author: b.author,
    category: b.category,
    subgenre: httpsSubgenres[b.slug],
    description: b.description,
    narrators: sourceNarrators[b.slug],
    cover: b.cover,
    href: b.href,
    sources: [{ document: "https.docx", entry: b.sourceEntry }, ...(extraSources[b.slug] ?? [])],
  })),
  ...extraBooks.map((b) => ({
    slug: b.slug,
    title: b.title,
    author: b.author,
    category: b.category,
    subgenre: b.subgenre,
    description: b.description,
    narrators: sourceNarrators[b.slug],
    cover: b.cover,
    href: b.href,
    sources: [b.source],
  })),
].sort((a, b) => a.title.localeCompare(b.title, "en", { sensitivity: "base" }));

const bySlug = new Map(catalog.map((b) => [b.slug, b]));

/* Guard: every narrator listed above must be named in that book's source description. */
for (const [slug, names] of Object.entries(sourceNarrators)) {
  const book = bySlug.get(slug);
  if (!book || !names?.every((name) => book.description.includes(name))) {
    throw new Error(`Narrator data for "${slug}" does not match its source description.`);
  }
}

export function getBooks(slugs: readonly string[]): CatalogBook[] {
  return slugs.map((slug) => {
    const book = bySlug.get(slug);
    if (!book) throw new Error(`Catalogue book "${slug}" does not exist.`);
    return book;
  });
}

export function categoryLabel(category: BookCategory) {
  return bookCategories[category];
}

/** Categories present in the catalogue, in display order, with counts (for filters). */
export const catalogCategories = (Object.keys(bookCategories) as BookCategory[])
  .map((key) => ({ key, label: bookCategories[key], count: catalog.filter((b) => b.category === key).length }))
  .filter((c) => c.count > 0)
  .sort((a, b) => (a.key === "general" ? 1 : b.key === "general" ? -1 : b.count - a.count));
