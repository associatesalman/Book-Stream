import Image from "next/image";

import { getService, productionPrep, services } from "@/content/services";
import { serviceMetadata } from "@/lib/service-metadata";
import { SectionHeading } from "@/components/shared/section-heading";
import {
  BenefitsSection,
  CONTACT_HREF,
  ClosingCta,
  FaqSection,
  ItemList,
  OverviewSection,
  PageHero,
  ProcessSection,
  RelatedServices,
  ScopeSection,
  ServiceSection,
} from "@/components/services/service-sections";
import { ScopeVideo } from "@/components/services/scope-video";

const service = getService("production");

const SCOPE_IMAGE = encodeURI("/audiobook prod service/hero section.jpg");
const SCOPE_VIDEO = encodeURI("/audiobook prod service/audiobook production scope.mp4");

export const metadata = serviceMetadata(service);

export default function ProductionPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ title: "Home", href: "/" }, { title: "Services", href: "/services" }, { title: service.title }]}
        eyebrow={service.title}
        icon={service.icon}
        headline={service.hero.headline}
        intro={service.hero.intro}
        image={service.hero.image}
        primaryCta={{ label: "Discuss your manuscript", href: CONTACT_HREF }}
        secondaryCta={{ label: "All services", href: "/services" }}
      />

      <OverviewSection service={service} />

      <ScopeSection
        service={service}
        variant="list"
        aside={
          /* Supplied media (public/audiobook prod service). Column widths are 4:3 so the 3:4 photo and the 9:16
             video sit at the same height. */
          <div className="grid grid-cols-[4fr_3fr] gap-3 sm:gap-4">
            <div className="relative aspect-[3/4] overflow-hidden rounded-[4px] bg-cloud">
              <Image
                src={SCOPE_IMAGE}
                alt="A narration booth: a studio microphone with a pop filter beside a music stand holding a printed manuscript and a copy of From Fail to Grace, with an engineer visible through the control-room window"
                fill
                sizes="(min-width: 1024px) 20rem, 55vw"
                className="object-cover"
              />
            </div>
            <ScopeVideo src={SCOPE_VIDEO} poster={SCOPE_IMAGE} label="Audiobook production in the studio (muted video)" />
          </div>
        }
      />

      <ProcessSection service={service} layout="vertical" />

      {/* Service-specific: preparing for recording */}
      <ServiceSection id="prepare">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <SectionHeading
            id="prepare-heading"
            eyebrow="Before recording"
            title="What helps before the first session"
            description="Most production delays come from changes after recording starts. Having these ready makes the process smoother for everyone."
            className="lg:col-span-5"
          />
          <ItemList items={productionPrep} className="lg:col-span-7" />
        </div>
      </ServiceSection>

      <BenefitsSection service={service} />
      <FaqSection faqs={service.faqs} serviceTitle={service.title} />
      <RelatedServices current={service.slug} all={services} />
      <ClosingCta heading={service.cta.heading} body={service.cta.body} secondary={{ label: "After production: distribution", href: "/services/distribution" }} />
    </>
  );
}
