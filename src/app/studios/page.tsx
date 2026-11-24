import type { Metadata } from "next";

import { studiosPage } from "@/content/studios";
import { pageMetadata } from "@/lib/page-metadata";
import { SectionHeading } from "@/components/shared/section-heading";
import {
  CapabilityList,
  ENQUIRY_HREF,
  ImageTextSplit,
  LocationCards,
  PrimaryAction,
  SecondaryAction,
  StudioEnquiry,
  StudioHero,
  StudioSection,
} from "@/components/studios/studio-sections";

export const metadata: Metadata = pageMetadata({ ...studiosPage.seo, path: "/studios" });

/** Five sections: hero, introduction, locations, capabilities, enquiry. */
export default function StudiosPage() {
  const { hero, intro, locations, capabilities, cta, photographyNote } = studiosPage;

  return (
    <>
      {/* 1 — Hero */}
      <StudioHero
        breadcrumbs={[{ title: "Home", href: "/" }, { title: "Studios" }]}
        eyebrow={hero.eyebrow}
        title={hero.headline}
        description={hero.intro}
        image={hero.image}
        note={photographyNote}
        actions={
          <>
            {/* data-lenis-ignore: an instant jump, with no smooth-scroll motion. */}
            <SecondaryAction href="#locations" data-lenis-ignore>
              {hero.anchorLabel}
            </SecondaryAction>
            <PrimaryAction href={ENQUIRY_HREF}>Enquire</PrimaryAction>
          </>
        }
      />

      {/* 2 — Introduction */}
      <ImageTextSplit id="intro" eyebrow={intro.eyebrow} heading={intro.heading} paragraphs={intro.paragraphs} image={intro.image} />

      {/* 3 — Locations */}
      <StudioSection id="locations">
        <SectionHeading id="locations-heading" eyebrow={locations.eyebrow} title={locations.heading} description={locations.intro} />
        <div className="mt-12">
          <LocationCards />
        </div>
      </StudioSection>

      {/* 4 — Recording capabilities */}
      <StudioSection id="capabilities">
        <SectionHeading id="capabilities-heading" eyebrow={capabilities.eyebrow} title={capabilities.heading} description={capabilities.intro} />
        <div className="mt-12">
          <CapabilityList items={capabilities.items} />
        </div>
      </StudioSection>

      {/* 5 — Enquiry */}
      <StudioEnquiry heading={cta.heading} body={cta.body} />
    </>
  );
}
