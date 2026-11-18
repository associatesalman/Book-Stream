import { discoveryThemes, getService, services } from "@/content/services";
import { serviceMetadata } from "@/lib/service-metadata";
import { SectionHeading } from "@/components/shared/section-heading";
import { CollectionCard } from "@/components/services/mockups";
import {
  BenefitsSection,
  CONTACT_HREF,
  ClosingCta,
  FaqSection,
  OverviewSection,
  PageHero,
  ProcessSection,
  RelatedServices,
  ScopeSection,
  ServiceSection,
} from "@/components/services/service-sections";

const service = getService("discovery");

export const metadata = serviceMetadata(service);

export default function DiscoveryPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ title: "Home", href: "/" }, { title: "Services", href: "/services" }, { title: service.title }]}
        eyebrow={service.title}
        icon={service.icon}
        headline={service.hero.headline}
        intro={service.hero.intro}
        image={service.hero.image}
        primaryCta={{ label: "Discuss discovery", href: CONTACT_HREF }}
        secondaryCta={{ label: "All services", href: "/services" }}
      />

      <OverviewSection service={service} />

      {/* Service-specific: example collections */}
      <ServiceSection id="collections">
        <SectionHeading
          id="collections-heading"
          eyebrow="Curation in practice"
          title="What a curated collection looks like"
          description="Example groupings built from titles in the Book Stream collection. Each one pairs a clear theme with a short note on who it's for."
        />
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {discoveryThemes.map((theme) => (
            <li key={theme.title}>
              <CollectionCard {...theme} />
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-muted-foreground">Illustrative examples for this page; not a live listing.</p>
      </ServiceSection>

      <ScopeSection service={service} variant="list" />
      <ProcessSection service={service} layout="vertical" />
      <BenefitsSection service={service} />
      <FaqSection faqs={service.faqs} serviceTitle={service.title} />
      <RelatedServices current={service.slug} all={services} />
      <ClosingCta heading={service.cta.heading} body={service.cta.body} secondary={{ label: "See catalog management", href: "/services/catalog-management" }} />
    </>
  );
}
