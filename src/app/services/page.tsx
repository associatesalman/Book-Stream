import type { Metadata } from "next";

import { siteConfig } from "@/config/site";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import { services, servicesOverview } from "@/content/services";
import { SectionHeading } from "@/components/shared/section-heading";
import { CONTACT_HREF, ClosingCta, ServiceSection } from "@/components/services/service-sections";
import { ServicesHero } from "@/components/services/services-hero";
import howWeHelpImage from "@/assets/services/how-we-help-book-tree.jpg";

export const metadata: Metadata = {
  title: servicesOverview.seo.title,
  description: servicesOverview.seo.description,
  alternates: { canonical: "/services" },
  openGraph: { siteName: siteConfig.name, title: servicesOverview.seo.title, description: servicesOverview.seo.description, url: "/services" },
};

const textLink =
  "inline-flex items-center gap-2 rounded-sm text-sm font-semibold text-brand underline-offset-[6px] hover:text-brand-strong hover:underline focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none";

export default function ServicesPage() {
  const { howWeHelp, steps, cta } = servicesOverview;

  return (
    <>
      <ServicesHero />

      {/*
        How we help. From xl the image column stretches to the height of the text column, so their top and bottom
        edges always align; at that width the text is slightly shorter than the image's natural height, so only the
        artwork's plain top and bottom margins are trimmed (object-cover). Below xl the columns stack and the image is
        shown whole.
      */}
      <ServiceSection id="help" divided={false}>
        <div className="grid gap-12 xl:grid-cols-12 xl:gap-16">
          <div className="order-2 xl:order-1 xl:col-span-5">
            <div
              className="relative mx-auto w-full max-w-xs overflow-hidden rounded-[4px] sm:max-w-sm xl:aspect-auto! xl:h-full xl:max-w-none"
              style={{ aspectRatio: `${howWeHelpImage.width} / ${howWeHelpImage.height}` }}
            >
              <Image
                src={howWeHelpImage}
                alt={howWeHelp.imageAlt}
                fill
                placeholder="blur"
                sizes="(min-width: 1280px) 490px, (min-width: 640px) 384px, 320px"
                className="object-cover object-[50%_45%]"
              />
            </div>
          </div>

          <div className="order-1 flex max-w-3xl flex-col xl:order-2 xl:col-span-7 xl:max-w-none">
            <SectionHeading id="help-heading" eyebrow={howWeHelp.eyebrow} title={howWeHelp.heading} />
            <p className="mt-6 text-lg leading-relaxed text-ink/70">{howWeHelp.intro}</p>

            <ol className="mt-10 grid gap-8">
              {howWeHelp.points.map((point, i) => (
                <li key={point.title} className="grid grid-cols-[2.5rem_1fr] gap-x-4 border-t border-ink/12 pt-6">
                  <span className="pt-0.5 font-serif text-lg font-semibold text-brand">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="text-lg font-semibold text-ink">{point.title}</h3>
                    <p className="mt-1.5 leading-relaxed text-ink/65">{point.description}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-10 flex flex-col gap-4 border-t border-ink/12 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[0.9375rem] text-ink/65">
                <span className="font-semibold text-ink">We work with </span>
                {howWeHelp.audiences.join(" · ")}
              </p>
              <Link href={CONTACT_HREF} className={textLink}>
                Talk to our team
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </ServiceSection>

      {/* Service grid */}
      <ServiceSection id="all-services">
        <SectionHeading
          id="all-services-heading"
          eyebrow="Our services"
          title="Six services across the audiobook lifecycle"
          description="Use one, or combine several. Each page explains what's involved, how the work runs and what to prepare."
        />
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <li key={service.slug} className="flex flex-col rounded-[4px] border border-ink/12 bg-white p-7 sm:p-8">
              <p className="eyebrow text-brand">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-4 font-serif text-2xl leading-tight font-semibold tracking-[-0.01em] text-ink">{service.title}</h3>
              <p className="mt-4 leading-relaxed text-ink/70">{service.card.description}</p>
              <ul className="mt-6 space-y-3 border-t border-ink/10 pt-6" aria-label={`${service.title} scope`}>
                {service.card.points.map((point) => (
                  <li key={point} className="flex gap-3 text-[0.9375rem] leading-snug text-ink/80">
                    <Check className="mt-0.5 size-4 shrink-0 text-brand" strokeWidth={2} aria-hidden />
                    {point}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-8">
                <Link href={service.href} className={textLink}>
                  View service details
                  <span className="sr-only"> for {service.title}</span>
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </ServiceSection>

      {/* Getting started */}
      <ServiceSection id="start">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <SectionHeading
            id="start-heading"
            eyebrow="Getting started"
            title="How to get started"
            description="Every project begins the same way, whichever services you need. There's no obligation until scope is agreed."
            className="lg:col-span-4"
          />
          <ol className="grid gap-8 sm:grid-cols-2 lg:col-span-8">
            {steps.map((step, i) => (
              <li key={step.title} className="flex gap-5">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-brand text-sm font-semibold text-brand">
                  {i + 1}
                </span>
                <div className="pt-1.5">
                  <h3 className="text-lg font-semibold text-ink">{step.title}</h3>
                  <p className="mt-1.5 leading-relaxed text-ink/65">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </ServiceSection>

      <ClosingCta heading={cta.heading} body={cta.body} />
    </>
  );
}
