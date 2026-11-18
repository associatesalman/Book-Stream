import { getService, partnershipModels, services } from "@/content/services";
import { serviceMetadata } from "@/lib/service-metadata";
import { SectionHeading } from "@/components/shared/section-heading";
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

const service = getService("partnerships");

export const metadata = serviceMetadata(service);

export default function PartnershipsPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ title: "Home", href: "/" }, { title: "Services", href: "/services" }, { title: service.title }]}
        eyebrow={service.title}
        icon={service.icon}
        headline={service.hero.headline}
        intro={service.hero.intro}
        image={service.hero.image}
        primaryCta={{ label: "Start a conversation", href: CONTACT_HREF }}
        secondaryCta={{ label: "All services", href: "/services" }}
      />

      <OverviewSection service={service} />

      {/* Service-specific: partnership models */}
      <ServiceSection id="models">
        <SectionHeading
          id="models-heading"
          eyebrow="Ways to work together"
          title="Partnership models to explore"
          description="Starting points for discussion, not fixed packages. Most partnerships combine or adapt these to fit a specific list."
        />
        <ul className="mt-12 grid gap-6 sm:grid-cols-2">
          {partnershipModels.map((model, i) => (
            <li key={model.title} className="flex gap-6 rounded-[4px] border border-border p-7">
              <span className="font-serif text-3xl leading-none font-semibold text-brand/80 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="text-lg font-semibold text-ink">{model.title}</h3>
                <p className="mt-2 leading-relaxed text-ink/65">{model.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </ServiceSection>

      <ScopeSection service={service} />
      <ProcessSection service={service} layout="vertical" />
      <BenefitsSection service={service} />
      <FaqSection faqs={service.faqs} serviceTitle={service.title} />
      <RelatedServices current={service.slug} all={services} />
      <ClosingCta heading={service.cta.heading} body={service.cta.body} />
    </>
  );
}
