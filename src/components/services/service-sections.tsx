/**
 * Building blocks for the Services section.
 * All static: no scroll reveals, transitions or moving elements (per the Services brief).
 */

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, ChevronRight, Plus } from "lucide-react";

import type { Service, ServiceFaq, ServiceImage, ServiceItem } from "@/content/services";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/shared/section-heading";

export const CONTACT_HREF = "/contact";

/* ---------------------------------------------------------------- Layout */

export function ServiceSection({
  id,
  className,
  children,
  divided = true,
}: {
  id: string;
  className?: string;
  children: React.ReactNode;
  /** Thin rule above the section to separate white-on-white sections. */
  divided?: boolean;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className={cn("bg-white", className)}>
      <div className={cn("container-page py-16 sm:py-20 lg:py-24", divided && "border-t border-border")}>{children}</div>
    </section>
  );
}

/* ----------------------------------------------------------- Breadcrumbs */

export function Breadcrumbs({ items }: { items: { title: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
        {items.map((item, i) => (
          <li key={item.title} className="flex items-center gap-1.5">
            {i > 0 ? <ChevronRight className="size-3.5 text-ink/35" aria-hidden /> : null}
            {item.href ? (
              <Link href={item.href} className="rounded-sm hover:text-brand hover:underline focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none">
                {item.title}
              </Link>
            ) : (
              <span aria-current="page" className="text-ink">
                {item.title}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/* ------------------------------------------------------------------ Hero */

type HeroProps = {
  breadcrumbs: { title: string; href?: string }[];
  eyebrow: string;
  icon?: Service["icon"];
  headline: string;
  intro: string;
  /** Either a photograph or a custom mockup. */
  image?: ServiceImage;
  media?: React.ReactNode;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
};

export function PageHero({ breadcrumbs, eyebrow, icon: Icon, headline, intro, image, media, primaryCta, secondaryCta }: HeroProps) {
  return (
    <section aria-labelledby="page-heading" className="bg-white">
      <div className="container-page grid items-center gap-12 pt-8 pb-16 sm:pt-10 lg:grid-cols-12 lg:gap-12 lg:pb-20">
        <div className="lg:col-span-6">
          <Breadcrumbs items={breadcrumbs} />
          <p className="eyebrow mt-8 flex items-center gap-2.5 text-brand">
            {Icon ? (
              <span className="flex size-7 items-center justify-center rounded-[4px] border border-brand/25">
                <Icon className="size-4" strokeWidth={1.75} aria-hidden />
              </span>
            ) : (
              <span aria-hidden className="h-px w-8 bg-brand" />
            )}
            {eyebrow}
          </p>
          <h1
            id="page-heading"
            className="mt-5 font-serif text-[2.375rem] leading-[1.08] font-semibold tracking-[-0.02em] text-ink sm:text-5xl lg:text-[3.25rem]"
          >
            {headline}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/70">{intro}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            {primaryCta ? (
              <Button asChild size="xl">
                <Link href={primaryCta.href}>
                  {primaryCta.label}
                  <ArrowRight data-icon="inline-end" className="size-4" />
                </Link>
              </Button>
            ) : null}
            {secondaryCta ? (
              <Button asChild size="xl" variant="outline">
                <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
              </Button>
            ) : null}
          </div>
        </div>

        <div className="lg:col-span-6">
          {media ??
            (image ? (
              <div className="relative aspect-[4/3] overflow-hidden rounded-[4px] bg-cloud">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  priority
                  sizes="(min-width: 1280px) 600px, (min-width: 1024px) 48vw, 100vw"
                  className="object-cover"
                />
              </div>
            ) : null)}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- Overview */

export function OverviewSection({ service }: { service: Service }) {
  const { overview } = service;
  return (
    <ServiceSection id="overview">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <SectionHeading id="overview-heading" eyebrow="Overview" title={overview.heading} />
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink/70">
            {overview.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
        <div className="lg:col-span-5">
          <h3 className="eyebrow text-ink/60">Who it&apos;s for</h3>
          <ul className="mt-4 divide-y divide-border border-y border-border">
            {overview.audience.map((a) => (
              <li key={a.title} className="py-5">
                <p className="font-semibold text-ink">{a.title}</p>
                <p className="mt-1 leading-relaxed text-ink/65">{a.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </ServiceSection>
  );
}

/* ----------------------------------------------------------------- Scope */

export function ScopeSection({
  service,
  aside,
  variant = "grid",
}: {
  service: Service;
  /** Optional image or mockup shown beside the list (list variant). */
  aside?: React.ReactNode;
  variant?: "grid" | "list";
}) {
  const { scope } = service;
  const heading = (
    <SectionHeading id="scope-heading" eyebrow="Scope" title={scope.heading} description={scope.intro} />
  );

  if (variant === "list") {
    return (
      <ServiceSection id="scope">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            {heading}
            {aside ? <div className="mt-10">{aside}</div> : null}
          </div>
          <ol className="lg:col-span-7">
            {scope.items.map((item, i) => (
              <li key={item.title} className="flex gap-5 border-b border-border py-6 first:pt-0 sm:gap-6">
                <span className="font-serif text-2xl leading-none font-semibold text-brand tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-ink">{item.title}</h3>
                  <p className="mt-1.5 leading-relaxed text-ink/65">{item.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </ServiceSection>
    );
  }

  return (
    <ServiceSection id="scope">
      {heading}
      <ul className="mt-12 grid gap-px overflow-hidden rounded-[4px] border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {scope.items.map((item) => (
          <li key={item.title} className="bg-white p-7 lg:p-8">
            <span className="flex size-6 items-center justify-center rounded-full bg-mist text-brand">
              <Check className="size-3.5" strokeWidth={2.5} aria-hidden />
            </span>
            <h3 className="mt-5 text-lg font-semibold text-ink">{item.title}</h3>
            <p className="mt-2 leading-relaxed text-ink/65">{item.description}</p>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-sm text-muted-foreground">
        Every item is scoped per project — we&apos;ll confirm together which apply to yours.
      </p>
    </ServiceSection>
  );
}

/* --------------------------------------------------------------- Process */

export function ProcessSection({ service, layout = "horizontal" }: { service: Service; layout?: "horizontal" | "vertical" }) {
  const { process } = service;

  if (layout === "vertical") {
    return (
      <ServiceSection id="process">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <SectionHeading id="process-heading" eyebrow="Process" title={process.heading} description={process.intro} className="lg:col-span-5" />
          <ol className="relative lg:col-span-7">
            {process.steps.map((step, i) => (
              <li key={step.title} className="relative flex gap-5 pb-9 last:pb-0">
                {i < process.steps.length - 1 ? (
                  <span aria-hidden className="absolute top-10 bottom-0 left-[1.1875rem] w-px bg-border" />
                ) : null}
                <span className="relative flex size-10 shrink-0 items-center justify-center rounded-full border border-brand bg-white text-sm font-semibold text-brand">
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
    );
  }

  return (
    <ServiceSection id="process">
      <SectionHeading id="process-heading" eyebrow="Process" title={process.heading} description={process.intro} />
      <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
        {process.steps.map((step, i) => (
          <li key={step.title} className="border-t-2 border-brand pt-5">
            <p className="eyebrow text-brand">Step {i + 1}</p>
            <h3 className="mt-3 text-lg font-semibold text-ink">{step.title}</h3>
            <p className="mt-2 leading-relaxed text-ink/65">{step.description}</p>
          </li>
        ))}
      </ol>
    </ServiceSection>
  );
}

/* -------------------------------------------------------------- Benefits */

export function BenefitsSection({ service }: { service: Service }) {
  const { benefits } = service;
  return (
    <ServiceSection id="benefits">
      <SectionHeading id="benefits-heading" eyebrow="Benefits" title={benefits.heading} />
      <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {benefits.items.map((item) => (
          <li key={item.title} className="rounded-[4px] border border-border p-6">
            <span aria-hidden className="block h-0.5 w-8 bg-brand" />
            <h3 className="mt-5 text-lg font-semibold text-ink">{item.title}</h3>
            <p className="mt-2 leading-relaxed text-ink/65">{item.description}</p>
          </li>
        ))}
      </ul>
    </ServiceSection>
  );
}

/* ------------------------------------------------------------------ FAQs */

export function FaqSection({ faqs, serviceTitle }: { faqs: ServiceFaq[]; serviceTitle: string }) {
  return (
    <ServiceSection id="faqs">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <SectionHeading
          id="faqs-heading"
          eyebrow="FAQs"
          title="Common questions"
          description={`Answers to questions we often hear about ${serviceTitle.toLowerCase()}.`}
          className="lg:col-span-4"
        />
        <div className="divide-y divide-border border-y border-border lg:col-span-8">
          {faqs.map((faq) => (
            <details key={faq.question} className="group">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-left text-lg font-semibold text-ink hover:text-brand focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none [&::-webkit-details-marker]:hidden">
                <h3 className="text-[1.0625rem] sm:text-lg">{faq.question}</h3>
                <Plus className="mt-1 size-5 shrink-0 text-brand group-open:rotate-45" aria-hidden />
              </summary>
              <p className="max-w-3xl pb-6 leading-relaxed text-ink/70">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </ServiceSection>
  );
}

/* ------------------------------------------------------------------- CTA */

export function ClosingCta({ heading, body, secondary }: { heading: string; body: string; secondary?: { label: string; href: string } }) {
  return (
    <section aria-labelledby="cta-heading" className="bg-white pb-20 sm:pb-24">
      <div className="container-page">
        <div className="grid gap-8 rounded-[4px] border border-brand/15 bg-mist px-6 py-12 sm:px-12 lg:grid-cols-12 lg:items-center lg:gap-12 lg:px-16 lg:py-16">
          <div className="lg:col-span-8">
            <h2 id="cta-heading" className="font-serif text-3xl leading-tight font-semibold tracking-[-0.015em] text-ink sm:text-4xl">
              {heading}
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink/70">{body}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:flex-col lg:items-stretch">
            <Button asChild size="xl">
              <Link href={CONTACT_HREF}>
                Discuss your project
                <ArrowRight data-icon="inline-end" className="size-4" />
              </Link>
            </Button>
            {secondary ? (
              <Button asChild size="xl" variant="outline" className="bg-white">
                <Link href={secondary.href}>{secondary.label}</Link>
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------- Small helpers */

export function ItemList({ items, className }: { items: ServiceItem[]; className?: string }) {
  return (
    <ul className={cn("grid gap-6 sm:grid-cols-2", className)}>
      {items.map((item) => (
        <li key={item.title} className="flex gap-4">
          <span className="mt-1 flex size-6 shrink-0 items-center justify-center rounded-full bg-mist text-brand">
            <Check className="size-3.5" strokeWidth={2.5} aria-hidden />
          </span>
          <div>
            <h3 className="font-semibold text-ink">{item.title}</h3>
            <p className="mt-1 leading-relaxed text-ink/65">{item.description}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

/** "Related services" strip so each service page links onward. */
export function RelatedServices({ current, all }: { current: Service["slug"]; all: Service[] }) {
  const others = all.filter((s) => s.slug !== current);
  return (
    <ServiceSection id="related">
      <h2 id="related-heading" className="font-serif text-2xl font-semibold text-ink sm:text-3xl">
        Other Book Stream services
      </h2>
      <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {others.map((s) => {
          const Icon = s.icon;
          return (
            <li key={s.slug}>
              <Link
                href={s.href}
                className="flex h-full items-center gap-3 rounded-[4px] border border-border px-4 py-4 text-[0.9375rem] font-semibold text-ink hover:border-brand hover:text-brand focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none"
              >
                <Icon className="size-5 shrink-0 text-brand" strokeWidth={1.75} aria-hidden />
                {s.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </ServiceSection>
  );
}
