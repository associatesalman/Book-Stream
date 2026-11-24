import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { audiobookCategories, getAudiobookCategory } from "@/content/audiobook-categories";
import { getBooks } from "@/content/catalog";
import { pageMetadata } from "@/lib/page-metadata";
import { BookSection, CatalogHeader, SearchSummary } from "@/components/catalog/catalog-sections";

/**
 * Every slug is prerendered (generateStaticParams), so the page is static. It reads `params` at the top level, so
 * client navigations wait for the prerendered page rather than showing a placeholder shell first.
 * https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config/instant
 */
export const instant = false;

export function generateStaticParams() {
  return audiobookCategories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/audiobooks/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const category = getAudiobookCategory(slug);
  if (!category) return {};
  return pageMetadata({ ...category.seo, path: `/audiobooks/${category.slug}` });
}

export default async function AudiobookCategoryPage({ params }: PageProps<"/audiobooks/[slug]">) {
  const { slug } = await params;
  const category = getAudiobookCategory(slug);
  if (!category) notFound();

  const sections = category.sections.map((s) => ({ ...s, books: getBooks(s.slugs) }));

  return (
    <>
      <CatalogHeader
        breadcrumbs={[{ title: "Home", href: "/" }, { title: "Audiobooks", href: "/audiobooks" }, { title: category.name }]}
        eyebrow={category.name}
        title={category.heading}
        intro={category.intro}
      >
        <nav aria-label="On this page" className="mt-7">
          <ol className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {sections.map((s, i) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="font-semibold text-brand hover:underline">
                  <span className="mr-1.5 font-serif text-ink/50 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </CatalogHeader>

      {category.note ? (
        <p role="note" className="mb-8 max-w-3xl border-l-2 border-brand py-1 pl-5 text-[0.9375rem] leading-relaxed text-ink/75">
          {category.note}
        </p>
      ) : null}

      <SearchSummary books={sections.flatMap((s) => s.books)} />

      {sections.map((section, i) => (
        <BookSection
          key={section.id}
          id={section.id}
          index={i + 1}
          title={section.title}
          description={section.description}
          books={section.books}
        />
      ))}
    </>
  );
}
