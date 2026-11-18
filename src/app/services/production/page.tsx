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

const service = getService("production");

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
          <div className="relative aspect-[4/3] overflow-hidden rounded-[4px] bg-cloud">
            <Image
              src="/images/services/production-engineer.jpg"
              alt="Close-up of an engineer's hands adjusting faders on a digital mixing console"
              fill
              sizes="(min-width: 1024px) 36vw, 100vw"
              className="object-cover"
            />
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
