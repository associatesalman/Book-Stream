import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, CircleAlert, Play, ShieldCheck } from "lucide-react";

import {
  catalogue,
  distribution,
  enquiry,
  manuscript,
  marketing,
  partner,
  planning,
  prepare,
  presentation,
  production,
  publisherFaqs,
  publishersHero,
  publishersSeo,
  rights,
  workflow,
  type Consideration,
} from "@/content/publishers";
import { getBooks } from "@/content/catalog";
import { pageMetadata } from "@/lib/page-metadata";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowLink } from "@/components/shared/arrow-link";
import { SectionHeading } from "@/components/shared/section-heading";
import { Breadcrumbs, FaqSection, ServiceSection } from "@/components/services/service-sections";
import { PublisherEnquiryForm } from "@/components/forms/publisher-enquiry-form";
import planningImage from "@/assets/home/publishers-reading-room.jpg";

export const metadata: Metadata = pageMetadata({ ...publishersSeo, path: "/publishers" });

/* ---------------------------------------------------------------- Helpers */

/** Two-column list of short considerations separated by hairlines — not cards. */
function ConsiderationList({ items, columns = 2, className }: { items: Consideration[]; columns?: 2 | 3; className?: string }) {
  return (
    <dl className={cn("grid gap-x-10 sm:grid-cols-2", columns === 3 && "lg:grid-cols-3", className)}>
      {items.map((item) => (
        <div key={item.title} className="border-t border-border py-6">
          <dt className="font-semibold text-ink">{item.title}</dt>
          <dd className="mt-1.5 leading-relaxed text-ink/70">{item.description}</dd>
        </div>
      ))}
    </dl>
  );
}

function Note({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("flex gap-3 border-l-2 border-brand pl-4 text-[0.9375rem] leading-relaxed text-ink/70", className)}>
      <CircleAlert className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
      <span>{children}</span>
    </p>
  );
}

function SectionImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    <div className={cn("relative overflow-hidden rounded-[4px]", className)}>
      <Image src={src} alt={alt} fill sizes="(min-width: 1280px) 520px, (min-width: 1024px) 42vw, 100vw" className="object-cover" />
    </div>
  );
}

/** Static, strict-palette composition of catalogue covers for the hero. */
function CatalogueMockup() {
  const covers = getBooks(publishersHero.covers);
  const featured = covers[0];
  return (
    <figure>
      <div className="rounded-[6px] border border-border bg-white p-4 shadow-[0_24px_60px_-32px_rgb(17_24_32/0.45)] sm:p-6">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <p className="eyebrow text-ink/60">Audio editions</p>
          <p className="text-xs font-medium text-ink/50">Sample catalogue</p>
        </div>
        <ul className="mt-5 grid grid-cols-3 gap-3 sm:gap-4">
          {covers.map((book, i) => (
            <li key={book.slug} className="relative aspect-square overflow-hidden rounded-[3px] ring-1 ring-ink/10">
              <Image
                src={book.cover}
                alt={`Cover of ${book.title}${book.author ? ` by ${book.author}` : ""}`}
                fill
                sizes="(min-width: 1024px) 170px, 30vw"
                preload={i < 3}
                className="object-cover"
              />
            </li>
          ))}
        </ul>
        <div className="mt-5 flex items-center gap-4 border-t border-border pt-5">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand text-white">
            <Play className="ml-0.5 size-4 fill-current" aria-hidden />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate font-serif font-semibold text-ink">{featured.title}</p>
            <div aria-hidden className="mt-2 flex h-7 items-center gap-1 overflow-hidden">
              {[30, 55, 42, 70, 48, 82, 60, 38, 64, 90, 52, 74, 44, 66, 36, 58, 78, 46, 68, 40, 56, 84, 50, 62, 44, 70, 36, 58, 48, 66, 40, 54].map((h, i) => (
                <span key={i} className={cn("w-[3px] shrink-0 rounded-full", i < 11 ? "bg-brand" : "bg-ink/20")} style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <figcaption className="mt-4 text-center text-xs text-ink/55">Illustrative mockup using covers from the Book Stream catalogue.</figcaption>
    </figure>
  );
}

/* ------------------------------------------------------------------- Page */

export default function PublishersPage() {
  return (
    <>
      {/* 1 — Hero */}
      <section aria-labelledby="page-heading" className="bg-white">
        <div className="container-page grid items-center gap-12 pt-8 pb-16 sm:pt-10 lg:grid-cols-12 lg:gap-14 lg:pb-20">
          <div className="lg:col-span-6">
            <Breadcrumbs items={[{ title: "Home", href: "/" }, { title: "Publishers" }]} />
            <p className="eyebrow mt-8 flex items-center gap-3 text-brand">
              <span aria-hidden className="h-px w-8 bg-brand" />
              {publishersHero.eyebrow}
            </p>
            <h1
              id="page-heading"
              className="mt-5 font-serif text-[2.5rem] leading-[1.06] font-semibold tracking-[-0.02em] text-ink sm:text-[3.25rem] lg:text-[3.5rem]"
            >
              {publishersHero.headline}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/70">{publishersHero.intro}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="xl">
                <Link href={publishersHero.primaryCta.href}>
                  {publishersHero.primaryCta.label}
                  <ArrowRight data-icon="inline-end" className="size-4" />
                </Link>
              </Button>
              <Button asChild size="xl" variant="outline">
                <Link href={publishersHero.secondaryCta.href}>{publishersHero.secondaryCta.label}</Link>
              </Button>
            </div>
          </div>
          <div className="mx-auto w-full max-w-lg lg:col-span-6 lg:max-w-none lg:pl-6">
            <CatalogueMockup />
          </div>
        </div>
      </section>

      {/* 2 — Who we work with */}
      <ServiceSection id="partner">
        <SectionHeading id="partner-heading" eyebrow={partner.eyebrow} title={partner.heading} description={partner.intro} />
        <ul className="mt-12 grid gap-x-12 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {partner.types.map((t) => {
            const Icon = t.icon;
            return (
              <li key={t.title} className="flex gap-4">
                <Icon className="mt-0.5 size-6 shrink-0 text-brand" strokeWidth={1.6} aria-hidden />
                <div>
                  <h3 className="font-semibold text-ink">{t.title}</h3>
                  <p className="mt-1.5 leading-relaxed text-ink/70">{t.description}</p>
                </div>
              </li>
            );
          })}
        </ul>

        <h3 className="mt-16 font-serif text-2xl font-semibold text-ink sm:text-[1.75rem]">How project needs change with scale</h3>
        <div className="mt-8 grid gap-10 md:grid-cols-3 md:gap-8">
          {partner.scales.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.title} className="border-t-2 border-brand pt-6">
                <h4 className="flex items-center gap-3 text-lg font-semibold text-ink">
                  <Icon className="size-5 text-brand" strokeWidth={1.75} aria-hidden />
                  {s.title}
                </h4>
                <p className="mt-3 leading-relaxed text-ink/70">{s.description}</p>
              </div>
            );
          })}
        </div>
        <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
          <ArrowLink href="/services/production">Individual title services</ArrowLink>
          <ArrowLink href="/services/partnerships">Publishing partnerships</ArrowLink>
        </div>
      </ServiceSection>

      {/* 3 — Catalogue review and audio planning */}
      <ServiceSection id="planning">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading id="planning-heading" eyebrow={planning.eyebrow} title={planning.heading} description={planning.intro} />
            {/* Reused from the former homepage "For Publishers" section; shown whole at its native portrait ratio. */}
            <Image
              src={planningImage}
              alt={planning.image.alt}
              placeholder="blur"
              sizes="(min-width: 1280px) 470px, (min-width: 1024px) 38vw, (min-width: 640px) 352px, 320px"
              className="mt-10 h-auto w-full max-w-xs rounded-[4px] sm:max-w-[22rem] lg:max-w-none"
            />
          </div>
          <div className="lg:col-span-7 lg:pt-2">
            <ConsiderationList items={planning.items} />
            <Note className="mt-8">{planning.note}</Note>
          </div>
        </div>
      </ServiceSection>

      {/* 4 — Rights */}
      <ServiceSection id="rights">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHeading id="rights-heading" eyebrow={rights.eyebrow} title={rights.heading} />
            <p className="mt-5 text-lg leading-relaxed text-ink/70">{rights.intro}</p>
            <p className="mt-8 flex gap-3 font-medium text-ink">
              <ShieldCheck className="mt-0.5 size-5 shrink-0 text-brand" strokeWidth={1.75} aria-hidden />
              {rights.commitment}
            </p>
          </div>
          <div className="lg:col-span-8">
            <ol className="border-b border-border">
              {rights.items.map((item, i) => (
                <li key={item.title} className="grid gap-2 border-t border-border py-6 sm:grid-cols-[3rem_1fr] sm:gap-6">
                  <span className="font-serif text-xl font-semibold text-brand tabular-nums" aria-hidden>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-ink">{item.title}</h3>
                    <p className="mt-1.5 leading-relaxed text-ink/70">{item.description}</p>
                  </div>
                </li>
              ))}
            </ol>
            <Note className="mt-8">{rights.disclaimer}</Note>
          </div>
        </div>
      </ServiceSection>

      {/* 5 — Manuscript preparation */}
      <ServiceSection id="manuscript">
        <SectionHeading id="manuscript-heading" eyebrow={manuscript.eyebrow} title={manuscript.heading} description={manuscript.intro} />
        <ConsiderationList items={manuscript.items} columns={3} className="mt-12" />
        <div className="mt-12 border-t-2 border-brand pt-8">
          <h3 className="font-serif text-2xl font-semibold text-ink sm:text-[1.75rem]">{manuscript.distinction.heading}</h3>
          <div className="mt-8 grid gap-10 md:grid-cols-2 md:gap-0 md:divide-x md:divide-border">
            {[manuscript.distinction.prepare, manuscript.distinction.unchanged].map((col, i) => (
              <div key={col.title} className={cn(i === 0 ? "md:pr-10" : "md:pl-10")}>
                <h4 className="font-semibold text-ink">{col.title}</h4>
                <ul className="mt-4 space-y-3">
                  {col.points.map((p) => (
                    <li key={p} className="flex gap-3 leading-relaxed text-ink/70">
                      <Check className="mt-1 size-4 shrink-0 text-brand" strokeWidth={2.5} aria-hidden />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </ServiceSection>

      {/* 6 — Narration and production */}
      <ServiceSection id="production">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading id="production-heading" eyebrow={production.eyebrow} title={production.heading} description={production.intro} />
            <SectionImage src={production.image.src} alt={production.image.alt} className="mt-10 aspect-[4/3]" />
            <ArrowLink href="/services/production" className="mt-8">
              About Audiobook Production
            </ArrowLink>
          </div>
          <ol className="lg:col-span-7">
            {production.stages.map((stage, i) => (
              <li key={stage.title} className="relative flex gap-5 pb-8 last:pb-0">
                {i < production.stages.length - 1 ? <span aria-hidden className="absolute top-10 bottom-0 left-[1.1875rem] w-px bg-border" /> : null}
                <span className="relative flex size-10 shrink-0 items-center justify-center rounded-full border border-brand bg-white text-sm font-semibold text-brand">
                  {i + 1}
                </span>
                <div className="pt-1.5">
                  <h3 className="text-lg font-semibold text-ink">{stage.title}</h3>
                  <p className="mt-1.5 leading-relaxed text-ink/70">{stage.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </ServiceSection>

      {/* 7 — Cover, metadata and presentation */}
      <ServiceSection id="presentation">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHeading id="presentation-heading" eyebrow={presentation.eyebrow} title={presentation.heading} description={presentation.intro} />
            <ConsiderationList items={presentation.groups} className="mt-10" />
          </div>
          <aside className="lg:col-span-5 lg:pt-4" aria-labelledby="record-heading">
            <div className="rounded-[4px] border border-border p-6 sm:p-8">
              <p id="record-heading" className="eyebrow text-brand">
                One title record
              </p>
              <p className="mt-2 text-sm text-ink/60">The fields kept identical across every channel.</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {presentation.recordFields.map((f) => (
                  <li key={f} className="rounded-full border border-ink/15 px-3 py-1.5 text-sm font-medium text-ink">
                    {f}
                  </li>
                ))}
              </ul>
              <h3 className="mt-8 border-t border-border pt-6 font-semibold text-ink">{presentation.whyHeading}</h3>
              <p className="mt-2 leading-relaxed text-ink/70">{presentation.why}</p>
              <ArrowLink href="/services/catalog-management" className="mt-6">
                About Digital Catalog Management
              </ArrowLink>
            </div>
          </aside>
        </div>
      </ServiceSection>

      {/* 8 — Distribution */}
      <ServiceSection id="distribution">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading id="distribution-heading" eyebrow={distribution.eyebrow} title={distribution.heading} description={distribution.intro} />
          <ArrowLink href="/services/distribution" className="shrink-0">
            About Audiobook Distribution
          </ArrowLink>
        </div>
        <ol className="mt-12 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
          {distribution.items.map((item, i) => (
            <li key={item.title} className="border-t border-border py-7">
              <span className="font-serif text-lg font-semibold text-brand tabular-nums" aria-hidden>
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 text-lg font-semibold text-ink">{item.title}</h3>
              <p className="mt-1.5 leading-relaxed text-ink/70">{item.description}</p>
            </li>
          ))}
        </ol>
        <Note className="mt-6 max-w-3xl">{distribution.note}</Note>
      </ServiceSection>

      {/* 9 — Marketing */}
      <ServiceSection id="marketing">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="order-2 lg:order-1 lg:col-span-7">
            <SectionHeading id="marketing-heading" eyebrow={marketing.eyebrow} title={marketing.heading} description={marketing.intro} />
            <ConsiderationList items={marketing.items} className="mt-10" />
            <Note className="mt-6">{marketing.note}</Note>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
              <ArrowLink href="/services/marketing">About Marketing &amp; Promotion</ArrowLink>
              <ArrowLink href="/services/discovery">About Content Discovery</ArrowLink>
            </div>
          </div>
          <div className="order-1 lg:order-2 lg:col-span-5 lg:pt-4">
            <SectionImage src={marketing.image.src} alt={marketing.image.alt} className="aspect-[4/3] lg:aspect-[4/5]" />
          </div>
        </div>
      </ServiceSection>

      {/* 10 — Catalogue management */}
      <ServiceSection id="catalogue">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading id="catalogue-heading" eyebrow={catalogue.eyebrow} title={catalogue.heading} description={catalogue.intro} />
            <div className="mt-10 border-t-2 border-brand pt-6">
              <h3 className="font-semibold text-ink">Reporting, royalties and access</h3>
              <p className="mt-2 leading-relaxed text-ink/70">{catalogue.reporting}</p>
            </div>
          </div>
          <ul className="border-b border-border lg:col-span-7">
            {catalogue.items.map((item) => (
              <li key={item.title} className="grid gap-1.5 border-t border-border py-6 sm:grid-cols-[13rem_1fr] sm:gap-8">
                <h3 className="font-semibold text-ink">{item.title}</h3>
                <p className="leading-relaxed text-ink/70">{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </ServiceSection>

      {/* 11 — Workflow */}
      <ServiceSection id="workflow">
        <SectionHeading id="workflow-heading" eyebrow={workflow.eyebrow} title={workflow.heading} description={workflow.intro} />
        <ol className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {workflow.steps.map((step, i) => (
            <li key={step.title} className="border-t-2 border-brand pt-6">
              <span className="font-serif text-4xl leading-none font-semibold text-brand tabular-nums" aria-hidden>
                {i + 1}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-ink">{step.title}</h3>
              <p className="mt-2 leading-relaxed text-ink/70">{step.description}</p>
            </li>
          ))}
        </ol>
      </ServiceSection>

      {/* 12 — What to prepare */}
      <ServiceSection id="prepare">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <SectionHeading id="prepare-heading" eyebrow={prepare.eyebrow} title={prepare.heading} description={prepare.intro} className="lg:col-span-5" />
          <div className="lg:col-span-7">
            <ul className="grid gap-x-8 sm:grid-cols-2">
              {prepare.checklist.map((item) => (
                <li key={item} className="flex gap-3 border-t border-border py-4 font-medium text-ink">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-[3px] border border-brand text-brand">
                    <Check className="size-3.5" strokeWidth={3} aria-hidden />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <Note className="mt-8">{prepare.note}</Note>
          </div>
        </div>
      </ServiceSection>

      {/* 13 — FAQs */}
      <FaqSection faqs={publisherFaqs} serviceTitle="Publisher projects" />

      {/* 14 — Enquiry */}
      <section id="enquiry" aria-labelledby="enquiry-heading" className="bg-white">
        <div className="container-page pb-20 sm:pb-24">
          <div className="grid gap-12 border-t-2 border-brand pt-14 lg:grid-cols-12 lg:gap-16 lg:pt-16">
            <div className="lg:col-span-4">
              <h2
                id="enquiry-heading"
                className="font-serif text-[2rem] leading-[1.1] font-semibold tracking-[-0.015em] text-ink sm:text-[2.5rem]"
              >
                {enquiry.heading}
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-ink/70">{enquiry.body}</p>
              <ul className="mt-8 space-y-3">
                {enquiry.points.map((p) => (
                  <li key={p} className="flex gap-3 font-medium text-ink">
                    <Check className="mt-1 size-4 shrink-0 text-brand" strokeWidth={2.5} aria-hidden />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-8">
              <PublisherEnquiryForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
