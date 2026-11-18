import { Check } from "lucide-react";

import { distributionChecklist, getService, services } from "@/content/services";
import { serviceMetadata } from "@/lib/service-metadata";
import { SectionHeading } from "@/components/shared/section-heading";
import { DistributionMockup } from "@/components/services/mockups";
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

const service = getService("distribution");

export const metadata = serviceMetadata(service);

export default function DistributionPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ title: "Home", href: "/" }, { title: "Services", href: "/services" }, { title: service.title }]}
        eyebrow={service.title}
        icon={service.icon}
        headline={service.hero.headline}
        intro={service.hero.intro}
        media={<DistributionMockup />}
        primaryCta={{ label: "Discuss a release", href: CONTACT_HREF }}
        secondaryCta={{ label: "All services", href: "/services" }}
      />

      <OverviewSection service={service} />

      {/* Service-specific: release-ready checklist */}
      <ServiceSection id="checklist">
        <SectionHeading
          id="checklist-heading"
          eyebrow="Release readiness"
          title="What a release-ready package contains"
          description="Before anything is submitted, these four groups should be complete and consistent with each other. It's a useful checklist even if you plan to submit yourself."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {distributionChecklist.map((group) => (
            <div key={group.group} className="rounded-[4px] border border-border p-6">
              <h3 className="eyebrow text-brand">{group.group}</h3>
              <ul className="mt-4 space-y-3">
                {group.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-ink/80">
                    <Check className="mt-0.5 size-4 shrink-0 text-brand" strokeWidth={2.5} aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </ServiceSection>

      <ScopeSection service={service} />
      <ProcessSection service={service} />
      <BenefitsSection service={service} />
      <FaqSection faqs={service.faqs} serviceTitle={service.title} />
      <RelatedServices current={service.slug} all={services} />
      <ClosingCta heading={service.cta.heading} body={service.cta.body} secondary={{ label: "Need production first?", href: "/services/production" }} />
    </>
  );
}
