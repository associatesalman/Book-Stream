import { catalog, getBooks } from "@/content/catalog";
import { getAudiobookCategory } from "@/content/audiobook-categories";
import { pageMetadata } from "@/lib/page-metadata";
import { BookSection, CatalogHeader, SearchSummary } from "@/components/catalog/catalog-sections";

export const metadata = pageMetadata({
  title: "Audiobooks",
  description: `Browse all ${catalog.length} audiobooks on Book Stream: romance, fiction, classics, mystery, science fiction and more, with search and a category sidebar.`,
  path: "/audiobooks",
});

const intro = [
  {
    title: "What an audiobook is",
    body: "A complete book, read aloud and recorded, so you can take in a story or an idea by listening instead of reading the page.",
  },
  {
    title: "Why narration matters",
    body: "A narrator sets the pace, gives each character a voice and carries the tone, so dialogue, tension and humour come through as the author intended.",
  },
  {
    title: "Listening that fits your day",
    body: "Audiobooks travel with you on a commute, keep you company through chores and workouts, help you unwind at night or let you learn on the go.",
  },
  {
    title: "A genre for every mood",
    body: "Romance and drama for feeling, mysteries for puzzling, science fiction for wondering what if, and classics for stories that have lasted.",
  },
];

/** Picks that span the romance page's four groups, so this section previews its range. */
const romancePicks = [
  "her-sizzling-billionaire",
  "obeying-mr-kingsley",
  "the-billionaires-cupcake",
  "noise-upstairs",
  "my-billionaire-husband-signed-our-divorce",
  "he-rejected-me-for-my-twin-sister",
  "torin",
  "pack-position",
  "heavens-fall",
  "shot-through-the-heart",
  "breakaway",
  "through-the-smoke",
  "christmas-in-tennessee",
  "the-duke-of-frost",
  "vintage-vine",
];

function sectionSlugs(categorySlug: string, sectionIds?: string[]) {
  const category = getAudiobookCategory(categorySlug);
  if (!category) throw new Error(`Unknown category "${categorySlug}".`);
  return category.sections.filter((s) => !sectionIds || sectionIds.includes(s.id)).flatMap((s) => s.slugs);
}

export default function AudiobooksPage() {
  return (
    <>
      <CatalogHeader
        breadcrumbs={[{ title: "Home", href: "/" }, { title: "Audiobooks" }]}
        eyebrow="Audiobooks"
        title="Stories and ideas, ready when you are."
        intro={`Browse the full Book Stream collection of ${catalog.length} audiobooks, from romance and modern fiction to timeless classics, mysteries and science fiction.`}
      />

      {/* Concise introduction to listening */}
      <section aria-labelledby="about-audiobooks-heading" className="border-t border-ink/10 py-10">
        <h2 id="about-audiobooks-heading" className="sr-only">
          About audiobooks
        </h2>
        <dl className="grid gap-7 sm:grid-cols-2 sm:gap-x-10">
          {intro.map((item) => (
            <div key={item.title} className="border-l-2 border-brand pl-5">
              <dt className="font-semibold text-ink">{item.title}</dt>
              <dd className="mt-2 text-[0.9375rem] leading-relaxed text-ink/70">{item.body}</dd>
            </div>
          ))}
        </dl>
      </section>

      <SearchSummary books={catalog} />

      {/* 01 — every title, A to Z; the sidebar search filters it */}
      <BookSection
        id="explore"
        index={1}
        title="Explore the Collection"
        description="Every title in the catalogue, A to Z. Use the search in the sidebar to narrow it, or pick a category to open its page."
        books={catalog}
        pageSize={20}
      />

      {/* Curated previews; hidden during a search because the full list above already shows every match */}
      <BookSection
        id="romance"
        index={2}
        title="Love Stories in Every Shade"
        description="Billionaires and second chances, shifters and sports stars, holidays and Regency ballrooms."
        books={getBooks(romancePicks)}
        more={{ label: "All romance", href: "/audiobooks/romance" }}
        hideWhenSearching
      />

      <BookSection
        id="mystery"
        index={3}
        title="Mystery, Crime & Suspense"
        description="Cozy mysteries, period detective fiction, wilderness suspense and true crime."
        books={getBooks(sectionSlugs("mystery-thriller"))}
        more={{ label: "Mystery & Thriller", href: "/audiobooks/mystery-thriller" }}
        hideWhenSearching
      />

      <BookSection
        id="classics"
        index={4}
        title="Classics & Stories Reimagined"
        description="Enduring novels and poetry, alongside new takes on Pride and Prejudice."
        books={getBooks(sectionSlugs("fiction", ["classics", "pride-and-prejudice"]))}
        more={{ label: "All fiction", href: "/audiobooks/fiction" }}
        hideWhenSearching
      />
    </>
  );
}
