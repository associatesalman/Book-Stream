import { getService, marketingKit, services } from "@/content/services";
import { serviceMetadata } from "@/lib/service-metadata";
import { SectionHeading } from "@/components/shared/section-heading";
import { MarketingKitMockup } from "@/components/services/mockups";
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

const service = getService("marketing");

export const metadata = serviceMetadata(service);

export default function MarketingPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ title: "Home", href: "/" }, { title: "Services", href: "/services" }, { title: service.title }]}
        eyebrow={service.title}
        icon={service.icon}
        headline={service.hero.headline}
        intro={service.hero.intro}
        image={service.hero.image}
        primaryCta={{ label: "Plan a campaign", href: CONTACT_HREF }}
        secondaryCta={{ label: "All services", href: "/services" }}
      />

      <OverviewSection service={service} />
      <ScopeSection service={service} />

      {/* Service-specific: launch kit */}
      <ServiceSection id="kit">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <SectionHeading
              id="kit-heading"
              eyebrow="Launch kit"
              title="The basics of an audio-first launch"
              description="A small, consistent set of assets goes further than many one-off posts. These four pieces form the core of most launch kits we'd discuss."
            />
            <ItemList items={marketingKit} className="mt-10" />
          </div>
          <div className="mx-auto w-full max-w-md lg:col-span-6 lg:max-w-lg">
            <MarketingKitMockup />
          </div>
        </div>
      </ServiceSection>

      <ProcessSection service={service} />
      <BenefitsSection service={service} />
      <FaqSection faqs={service.faqs} serviceTitle={service.title} />
      <RelatedServices current={service.slug} all={services} />
      <ClosingCta heading={service.cta.heading} body={service.cta.body} />
    </>
  );
}
