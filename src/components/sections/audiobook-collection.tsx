import { books } from "@/content/books";
import { SectionHeading } from "@/components/shared/section-heading";
import { BookGrid } from "@/components/catalog/book-card";

/**
 * Homepage audiobook collection: a plain, static grid of the https.docx titles.
 * Uses the shared catalogue card. Intentionally no animation, carousel or hover movement.
 */
export function AudiobookCollection() {
  return (
    <section id="audiobooks" aria-labelledby="collection-heading" className="bg-white py-20 sm:py-24 lg:py-28">
      <div className="container-page">
        <SectionHeading
          id="collection-heading"
          title="Find Your Next Can’t-Pause Story"
          description="From fresh perspectives to unforgettable adventures, explore a collection of audiobooks made for curious minds and inspired listening."
        />

        <BookGrid books={books} className="mt-12 lg:mt-14" />
      </div>
    </section>
  );
}
