import Image, { type StaticImageData } from "next/image";
import { ArrowUpRight } from "lucide-react";

import { bookCategories, type BookCategory } from "@/content/books";
import { cn } from "@/lib/utils";

export type BookCardData = {
  slug: string;
  title: string;
  author?: string;
  category: BookCategory;
  description: string;
  /** Only present where the source material names a narrator. */
  narrators?: string[];
  cover: StaticImageData;
  href: string;
};

const focusRing = "rounded-[2px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";
const newTab = { target: "_blank", rel: "noopener noreferrer" } as const;

/**
 * Audiobook card shared by the homepage collection and the catalogue pages.
 * Cover, title and CTA all open the same supplied listing URL in a new tab.
 * Static by design: no hover movement.
 */
export function BookCard({
  book,
  headingLevel = "h3",
  sizes = "(min-width: 1280px) 220px, (min-width: 1024px) 22vw, (min-width: 768px) 30vw, (min-width: 360px) 45vw, 90vw",
  className,
}: {
  book: BookCardData;
  headingLevel?: "h2" | "h3" | "h4";
  sizes?: string;
  className?: string;
}) {
  const Heading = headingLevel;
  const altText = book.author ? `Cover of ${book.title} by ${book.author}` : `Cover of ${book.title}`;

  return (
    <article
      className={cn("flex w-full flex-col rounded-[4px] border border-ink/10 bg-white p-3 hover:border-brand sm:p-4", className)}
    >
      {/* Cover duplicates the title link, so it is removed from the tab order. */}
      <a href={book.href} {...newTab} tabIndex={-1} aria-hidden className="block">
        <div className="relative aspect-square overflow-hidden rounded-[2px] bg-white ring-1 ring-ink/10">
          <Image src={book.cover} alt={altText} fill sizes={sizes} className="object-contain" />
        </div>
      </a>

      <p className="mt-4 text-[0.6875rem] font-semibold tracking-[0.12em] text-brand uppercase">{bookCategories[book.category]}</p>

      <Heading className="mt-1.5 font-serif text-[1.0625rem] leading-snug font-semibold text-ink">
        <a href={book.href} {...newTab} className={`hover:text-brand hover:underline ${focusRing}`}>
          {book.title}
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </Heading>

      {book.author ? <p className="mt-0.5 text-sm text-ink/75">{book.author}</p> : null}
      {book.narrators?.length ? <p className="mt-0.5 text-[0.8125rem] text-ink/60">Narrated by {book.narrators.join(" and ")}</p> : null}

      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink/70">{book.description}</p>

      <div className="mt-auto pt-4">
        <a
          href={book.href}
          {...newTab}
          aria-label={`Explore audiobook: ${book.title} (opens in a new tab)`}
          className={`inline-flex items-center gap-1 text-[0.8125rem] font-semibold whitespace-nowrap text-brand hover:underline sm:text-sm ${focusRing}`}
        >
          Explore Audiobook
          <ArrowUpRight className="size-3.5 shrink-0 sm:size-4" aria-hidden />
        </a>
      </div>
    </article>
  );
}

/** Dense, aligned grid: 1 → 2 → 3 → 4 → 5 columns. */
export const bookGridClass =
  "grid grid-cols-1 gap-3 min-[360px]:grid-cols-2 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5";

export function BookGrid({ books, headingLevel, className }: { books: BookCardData[]; headingLevel?: "h2" | "h3" | "h4"; className?: string }) {
  return (
    <ul className={cn(bookGridClass, className)}>
      {books.map((book) => (
        <li key={book.slug} className="flex">
          <BookCard book={book} headingLevel={headingLevel} />
        </li>
      ))}
    </ul>
  );
}
