import Image from "next/image";

import { catalogIssues, getService, services } from "@/content/services";
import { serviceMetadata } from "@/lib/service-metadata";
import { SectionHeading } from "@/components/shared/section-heading";
import { CatalogMockup } from "@/components/services/mockups";
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

const service = getService("catalog-management");

export const metadata = serviceMetadata(service);

export default function CatalogManagementPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ title: "Home", href: "/" }, { title: "Services", href: "/services" }, { title: service.title }]}
        eyebrow={service.title}
        icon={service.icon}
        headline={service.hero.headline}
        intro={service.hero.intro}
        media={<CatalogMockup />}
        primaryCta={{ label: "Discuss a catalog review", href: CONTACT_HREF }}
        secondaryCta={{ label: "All services", href: "/services" }}
      />

      <OverviewSection service={service} />

      {/* Service-specific: common record issues */}
      <ServiceSection id="issues">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHeading
              id="issues-heading"
              eyebrow="What an audit finds"
              title="Small record errors, real listener impact"
              description="These are the kinds of issues a catalog audit typically looks for, and why each one matters."
            />
            <div className="relative mt-10 hidden aspect-[3/4] overflow-hidden rounded-[4px] bg-cloud lg:block">
              <Image
                src="/images/services/catalog-data.jpg"
                alt="A person reviews a detailed spreadsheet on a laptop"
                fill
                sizes="30vw"
                className="object-cover"
              />
            </div>
          </div>
          <div className="lg:col-span-8">
            <table className="w-full border-y border-border text-left">
              <caption className="sr-only">Common catalog issues and their effect on listeners</caption>
              <thead className="hidden sm:table-header-group">
                <tr className="border-b border-border text-sm text-ink/60">
                  <th scope="col" className="py-3 pr-6 font-semibold">
                    Issue
                  </th>
                  <th scope="col" className="py-3 font-semibold">
                    Why it matters
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {catalogIssues.map((row) => (
                  <tr key={row.issue} className="block py-5 sm:table-row sm:py-0">
                    <th scope="row" className="block pb-1.5 font-semibold text-ink sm:table-cell sm:w-1/2 sm:py-5 sm:pr-6 sm:align-top">
                      {row.issue}
                    </th>
                    <td className="block leading-relaxed text-ink/65 sm:table-cell sm:py-5 sm:align-top">{row.effect}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </ServiceSection>

      <ScopeSection service={service} variant="list" />
      <ProcessSection service={service} />
      <BenefitsSection service={service} />
      <FaqSection faqs={service.faqs} serviceTitle={service.title} />
      <RelatedServices current={service.slug} all={services} />
      <ClosingCta heading={service.cta.heading} body={service.cta.body} />
    </>
  );
}
