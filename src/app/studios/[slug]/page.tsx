import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getStudioLocation, studioHref, studioLocations, STUDIOS_HREF } from "@/content/studios";
import { pageMetadata } from "@/lib/page-metadata";
import {
  BookCollage,
  DepartmentSectionBlock,
  ENQUIRY_HREF,
  PrimaryAction,
  SecondaryAction,
  StudioEnquiry,
  StudioHero,
} from "@/components/studios/studio-sections";

/**
 * Every slug is prerendered (generateStaticParams), so the page is static. It reads `params` at the top level, so
 * client navigations wait for the prerendered page rather than showing a placeholder shell first.
 * https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config/instant
 */
export const instant = false;

export function generateStaticParams() {
  return studioLocations.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: PageProps<"/studios/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const location = getStudioLocation(slug);
  if (!location) return {};
  return pageMetadata({ ...location.seo, path: studioHref(location.slug) });
}

/** Five sections: hero with overview, two department sections, book collage, enquiry. */
export default async function StudioLocationPage({ params }: PageProps<"/studios/[slug]">) {
  const { slug } = await params;
  const location = getStudioLocation(slug);
  if (!location) notFound();

  const { hero, contact } = location;
  const [recording, postProduction] = location.departmentSections;
  const other = studioLocations.find((l) => l.slug !== location.slug);

  /* Confirmed details only: unconfirmed (null) fields are left out. */
  const details = [
    { label: "Location", value: location.region },
    { label: "Address", value: contact.address },
    { label: "Phone", value: contact.phone },
    { label: "Hours", value: contact.hours },
  ].filter((d): d is { label: string; value: string } => Boolean(d.value));

  return (
    <>
      {/* 1 — Hero and studio overview */}
      <StudioHero
        breadcrumbs={[{ title: "Home", href: "/" }, { title: "Studios", href: STUDIOS_HREF }, { title: location.name }]}
        eyebrow={location.region}
        title={hero.headline}
        description={hero.description}
        points={hero.points}
        image={hero.image}
        note={location.imageNote}
        actions={
          <>
            <PrimaryAction href={ENQUIRY_HREF}>Enquire about this studio</PrimaryAction>
            <SecondaryAction href={STUDIOS_HREF}>All studios</SecondaryAction>
          </>
        }
      />

      {/* 2 and 3 — Production departments */}
      <DepartmentSectionBlock section={recording} />
      <DepartmentSectionBlock section={postProduction} />

      {/* 4 — Book collage + description */}
      <BookCollage location={location} />

      {/* 5 — Contact / enquiry */}
      <StudioEnquiry
        heading={`Record your audiobook in ${location.name}`}
        body="Tell us about the book, the narration you have in mind and your timing. We’ll confirm availability and the next steps."
        details={details}
        secondary={other ? { label: `View the ${other.name} studio`, href: studioHref(other.slug) } : undefined}
      />
    </>
  );
}
