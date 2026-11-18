import type { Metadata } from "next";

import { siteConfig } from "@/config/site";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import { aboutHero, aboutSeo, approach, closing, principles, purpose, whoWeAre, whoWeServe } from "@/content/about";
import { pageMetadata } from "@/lib/page-metadata";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowLink } from "@/components/shared/arrow-link";
import { SectionHeading } from "@/components/shared/section-heading";
import { WhyBookStream } from "@/components/sections/why-book-stream";
import { Breadcrumbs, CONTACT_HREF, ServiceSection } from "@/components/services/service-sections";

/** Tab title "About Us | Book Stream"; social cards use the fuller "About Book Stream". */
export const metadata: Metadata = {
  ...pageMetadata({ title: "About Us", description: aboutSeo.description, path: "/about" }),
  openGraph: { siteName: siteConfig.name, title: aboutSeo.title, description: aboutSeo.description, url: "/about" },
  twitter: { title: aboutSeo.title, description: aboutSeo.description },
};

export default function AboutPage() {
  return (
    <>
      {/* 1 — Hero */}
      <section aria-labelledby="page-heading" className="bg-white">
        <div className="container-page pt-8 pb-16 sm:pt-10 lg:pb-20">
          <Breadcrumbs items={[{ title: "Home", href: "/" }, { title: "About Us" }]} />
          <p className="eyebrow mt-10 flex items-center gap-3 text-brand lg:mt-14">
            <span aria-hidden className="h-px w-8 bg-brand" />
            {aboutHero.eyebrow}
          </p>
          <h1
            id="page-heading"
            className="mt-5 max-w-4xl font-serif text-[2.5rem] leading-[1.05] font-semibold tracking-[-0.025em] text-ink sm:text-6xl lg:text-[4.25rem]"
          >
            {aboutHero.headline}
          </h1>

          <div className="mt-12 grid gap-8 border-t border-border pt-8 lg:mt-14 lg:grid-cols-12 lg:gap-12">
            <p className="text-lg leading-relaxed text-ink/75 sm:text-xl lg:col-span-7">{aboutHero.summary}</p>
            <ul className="space-y-3 lg:col-span-4 lg:col-start-9" aria-label="What Book Stream focuses on">
              {aboutHero.focus.map((item) => (
                <li key={item} className="flex items-center gap-3 font-medium text-ink">
                  <Check className="size-4 shrink-0 text-brand" strokeWidth={2.5} aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 2 — Who we are */}
      <ServiceSection id="who-we-are">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Supplied portrait (941 × 1672): shown uncropped at its natural ratio. */}
          <div className="order-2 lg:order-1 lg:col-span-5">
            <Image
              src={whoWeAre.image.src}
              alt={whoWeAre.image.alt}
              width={whoWeAre.image.width}
              height={whoWeAre.image.height}
              sizes="(min-width: 1280px) 470px, (min-width: 1024px) 38vw, (min-width: 640px) 384px, 100vw"
              className="mx-auto h-auto w-full max-w-sm rounded-[4px] lg:max-w-none"
            />
          </div>
          <div className="order-1 lg:order-2 lg:col-span-7">
            <SectionHeading id="who-we-are-heading" eyebrow={whoWeAre.eyebrow} title={whoWeAre.heading} />
            <div className="mt-6 max-w-2xl space-y-4 text-lg leading-relaxed text-ink/70">
              {whoWeAre.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <dl className="mt-10 max-w-2xl divide-y divide-border border-y border-border">
              {whoWeAre.details.map((d) => (
                <div key={d.title} className="py-6 sm:grid sm:grid-cols-[11rem_1fr] sm:gap-8">
                  <dt className="font-semibold text-ink">{d.title}</dt>
                  <dd className="mt-2 leading-relaxed text-ink/70 sm:mt-0">{d.body}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </ServiceSection>

      {/* 3 — Our purpose */}
      <ServiceSection id="purpose">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <SectionHeading id="purpose-heading" eyebrow={purpose.eyebrow} title={purpose.heading} className="lg:col-span-6" />
          <p className="font-serif text-2xl leading-snug text-ink sm:text-[1.75rem] lg:col-span-6 lg:self-end">
            {purpose.statement}
          </p>
        </div>
        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:mt-16 lg:gap-16">
          {purpose.sides.map((side) => {
            const Icon = side.icon;
            return (
              <div key={side.title} className="border-t-2 border-brand pt-6">
                <h3 className="flex items-center gap-3 text-xl font-semibold tracking-tight text-ink">
                  <Icon className="size-5 text-brand" strokeWidth={1.75} aria-hidden />
                  {side.title}
                </h3>
                <p className="mt-3 max-w-xl leading-relaxed text-ink/70">{side.body}</p>
              </div>
            );
          })}
        </div>
      </ServiceSection>

      {/* 4 — Why Book Stream (moved from the homepage) */}
      <WhyBookStream />

      {/* 5 — Who we serve */}
      <ServiceSection id="serve">
        <SectionHeading id="serve-heading" eyebrow={whoWeServe.eyebrow} title={whoWeServe.heading} description={whoWeServe.intro} />

        <div className="mt-12 lg:mt-14">
          <div aria-hidden className="eyebrow hidden grid-cols-12 gap-8 pb-4 text-ink/50 lg:grid">
            <span className="col-span-3">Audience</span>
            <span className="col-span-4">What they need</span>
            <span className="col-span-5">How Book Stream helps</span>
          </div>
          <ul className="border-b border-border">
            {whoWeServe.rows.map((row) => {
              const Icon = row.icon;
              return (
                <li key={row.title} className="grid gap-4 border-t border-border py-7 lg:grid-cols-12 lg:gap-8">
                  <h3 className="flex items-center gap-3 text-lg font-semibold text-ink lg:col-span-3 lg:items-start">
                    <Icon className="size-5 shrink-0 text-brand lg:mt-1" strokeWidth={1.75} aria-hidden />
                    {row.title}
                  </h3>
                  <div className="lg:col-span-4">
                    <p className="eyebrow mb-1.5 text-ink/50 lg:sr-only">What they need</p>
                    <p className="leading-relaxed text-ink/70">{row.need}</p>
                  </div>
                  <div className="lg:col-span-5">
                    <p className="eyebrow mb-1.5 text-ink/50 lg:sr-only">How Book Stream helps</p>
                    <p className="leading-relaxed text-ink/70">{row.response}</p>
                    <ArrowLink href={row.link.href} className="mt-3">
                      {row.link.label}
                    </ArrowLink>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </ServiceSection>

      {/* 6 — Our approach */}
      <ServiceSection id="approach">
        <SectionHeading id="approach-heading" eyebrow={approach.eyebrow} title={approach.heading} description={approach.intro} />
        <ol className="mt-12 grid gap-10 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-8">
          {approach.steps.map((step, i) => (
            <li key={step.title} className="border-t-2 border-brand pt-6">
              <span className="font-serif text-3xl leading-none font-semibold text-brand tabular-nums" aria-hidden>
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-ink">{step.title}</h3>
              <p className="mt-2 leading-relaxed text-ink/70">{step.description}</p>
              <dl className="mt-5 space-y-3 border-t border-border pt-5 text-[0.9375rem] leading-relaxed">
                <div>
                  <dt className="font-semibold text-ink">For listeners</dt>
                  <dd className="mt-0.5 text-ink/65">{step.listeners}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-ink">For projects</dt>
                  <dd className="mt-0.5 text-ink/65">{step.projects}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ol>
      </ServiceSection>

      {/* 7 — What guides our work */}
      <ServiceSection id="principles">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <SectionHeading id="principles-heading" eyebrow={principles.eyebrow} title={principles.heading} className="lg:col-span-4" />
          <ul className="grid sm:grid-cols-2 lg:col-span-8">
            {principles.items.map((item, i) => {
              const Icon = item.icon;
              return (
                <li
                  key={item.title}
                  className={cn(
                    "border-t border-border py-8",
                    i % 2 === 0 ? "sm:border-r sm:pr-10" : "sm:pl-10",
                    i >= 2 && "sm:border-b",
                    i === principles.items.length - 1 && "border-b",
                  )}
                >
                  <Icon className="size-6 text-brand" strokeWidth={1.6} aria-hidden />
                  <h3 className="mt-5 font-serif text-2xl font-semibold tracking-tight text-ink">{item.title}</h3>
                  <p className="mt-2 font-medium text-ink/80">{item.description}</p>
                  <p className="mt-3 leading-relaxed text-ink/65">{item.inPractice}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </ServiceSection>

      {/* 8 — Closing invitation */}
      <section aria-labelledby="closing-heading" className="bg-white">
        <div className="container-page pb-20 sm:pb-24">
          <div className="border-y-2 border-brand py-14 text-center sm:py-16 lg:py-20">
            <h2
              id="closing-heading"
              className="font-serif text-[2rem] leading-[1.1] font-semibold tracking-[-0.015em] text-ink sm:text-[2.5rem] lg:text-[2.875rem]"
            >
              {closing.heading}
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-ink/70">{closing.body}</p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild size="xl">
                <Link href={closing.primary.href}>
                  {closing.primary.label}
                  <ArrowRight data-icon="inline-end" className="size-4" />
                </Link>
              </Button>
              <Button asChild size="xl" variant="outline">
                <Link href={CONTACT_HREF}>{closing.secondary.label}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
