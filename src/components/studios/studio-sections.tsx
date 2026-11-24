/**
 * Building blocks for the Studios section (/studios and /studios/[slug]).
 *
 * Fully static by brief: no animation, transitions, reveals, parallax, sliders or autoplay. Images use fixed aspect
 * ratios with `object-cover` only for photographs; book covers are square files shown in square frames, uncropped.
 */

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Info, Mail } from "lucide-react";

import {
  STUDIO_EMAIL,
  STUDIO_EMAIL_HREF,
  studioHref,
  studioLocations,
  type DepartmentSection,
  type StudioImage,
  type StudioLocation,
} from "@/content/studios";
import { getBooks } from "@/content/catalog";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/shared/section-heading";
import { Breadcrumbs } from "@/components/services/service-sections";

export const ENQUIRY_HREF = "/contact";

const focusRing = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

/* ---------------------------------------------------------------- Layout */

export function StudioSection({ id, className, children }: { id: string; className?: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className={cn("bg-white", className)}>
      <div className="container-page border-t border-border py-16 sm:py-20 lg:py-24">{children}</div>
    </section>
  );
}

/* ----------------------------------------------------------------- Photo */

export function StudioPhoto({
  image,
  sizes,
  className,
  aspect,
  preload = false,
}: {
  image: StudioImage;
  sizes: string;
  className?: string;
  /** Tailwind aspect class. Omit to use the image's own proportions (when its size is known) or 3:2. */
  aspect?: string;
  preload?: boolean;
}) {
  const natural = !aspect && image.width && image.height;
  return (
    <div
      className={cn("relative overflow-hidden rounded-[4px] bg-ink/5", natural ? null : (aspect ?? "aspect-[3/2]"), className)}
      style={natural ? { aspectRatio: `${image.width} / ${image.height}` } : undefined}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        preload={preload}
        className="object-cover"
        style={image.position ? { objectPosition: image.position } : undefined}
      />
    </div>
  );
}

/** Shown while a page uses illustrative stock photography rather than photographs of the facility. */
export function PhotographyNote({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("flex items-start gap-2 text-[0.8125rem] leading-snug text-ink/55", className)}>
      <Info className="mt-px size-3.5 shrink-0" aria-hidden />
      <span>{children}</span>
    </p>
  );
}

/* ------------------------------------------------------------------ Hero */

export function StudioHero({
  breadcrumbs,
  eyebrow,
  title,
  description,
  image,
  actions,
  note,
  points,
}: {
  breadcrumbs: { title: string; href?: string }[];
  eyebrow: string;
  title: string;
  description: string;
  image: StudioImage;
  actions: React.ReactNode;
  note?: string | null;
  /** Short overview points shown under the description. */
  points?: string[];
}) {
  return (
    <section aria-labelledby="page-heading" className="bg-white">
      <div className="container-page pt-8 pb-16 sm:pt-10 lg:pb-20">
        <Breadcrumbs items={breadcrumbs} />
        <div className="mt-10 grid gap-8 lg:mt-12 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-7">
            <p className="eyebrow flex items-center gap-3 text-brand">
              <span aria-hidden className="h-px w-8 bg-brand" />
              {eyebrow}
            </p>
            <h1
              id="page-heading"
              className="mt-5 font-serif text-[2.5rem] leading-[1.05] font-semibold tracking-[-0.025em] text-ink sm:text-6xl lg:text-[4rem]"
            >
              {title}
            </h1>
          </div>
          <div className="lg:col-span-5">
            <p className="max-w-xl text-lg leading-relaxed text-ink/70">{description}</p>
            {points?.length ? (
              <ul className="mt-6 grid max-w-xl gap-3 sm:grid-cols-2">
                {points.map((point) => (
                  <li key={point} className="border-l-2 border-brand pl-4 text-[0.9375rem] leading-snug font-medium text-ink">
                    {point}
                  </li>
                ))}
              </ul>
            ) : null}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">{actions}</div>
          </div>
        </div>

        {/* Supplied location images keep their own proportions; the overview's stock photo uses a wide crop. */}
        <StudioPhoto
          image={image}
          preload
          aspect={image.width && image.height ? undefined : "aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9]"}
          sizes="(min-width: 82rem) 77rem, calc(100vw - 2.5rem)"
          className="mt-12 lg:mt-14"
        />
        {note ? <PhotographyNote className="mt-3">{note}</PhotographyNote> : null}
      </div>
    </section>
  );
}

export function PrimaryAction({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Button asChild size="xl">
      <Link href={href}>
        {children}
        <ArrowRight data-icon="inline-end" className="size-4" />
      </Link>
    </Button>
  );
}

export function SecondaryAction({ href, children, ...props }: { href: string; children: React.ReactNode } & Omit<React.ComponentProps<"a">, "href">) {
  return (
    <Button asChild size="xl" variant="outline">
      <Link href={href} {...props}>
        {children}
      </Link>
    </Button>
  );
}

/* ------------------------------------------------------- Image + text */

/** Image on one side, heading and copy on the other. */
export function ImageTextSplit({
  id,
  eyebrow,
  heading,
  paragraphs,
  points,
  image,
}: {
  id: string;
  eyebrow: string;
  heading: string;
  paragraphs: string[];
  points?: string[];
  image: StudioImage;
}) {
  return (
    <StudioSection id={id}>
      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <StudioPhoto image={image} sizes="(min-width: 1024px) 38rem, 100vw" className="lg:col-span-6" />
        <div className="lg:col-span-6">
          <SectionHeading id={`${id}-heading`} eyebrow={eyebrow} title={heading} />
          <div className="mt-6 max-w-xl space-y-4 text-lg leading-relaxed text-ink/70">
            {paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          {points?.length ? (
            <ul className="mt-8 grid max-w-xl gap-3 sm:grid-cols-2">
              {points.map((point) => (
                <li key={point} className="border-l-2 border-brand pl-4 text-[0.9375rem] leading-snug font-medium text-ink">
                  {point}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </StudioSection>
  );
}

/* ------------------------------------------------------- Location cards */

export function LocationCards() {
  return (
    <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2">
      {studioLocations.map((location) => (
        <li key={location.slug}>
          <Link href={studioHref(location.slug)} className={cn("group block rounded-[4px]", focusRing, "focus-visible:outline-offset-4")}>
            <StudioPhoto image={location.hero.image} aspect="aspect-[2/1]" sizes="(min-width: 82rem) 37rem, (min-width: 640px) 45vw, 100vw" />
            <p className="eyebrow mt-6 text-ink/50">{location.region}</p>
            <h3 className="mt-2 font-serif text-2xl font-semibold text-ink group-hover:text-brand group-hover:underline group-hover:underline-offset-[6px]">
              {location.name}
            </h3>
            <p className="mt-3 leading-relaxed text-ink/70">{location.summary}</p>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand">
              View the {location.name} studio
              <ArrowRight className="size-4" aria-hidden />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

/* --------------------------------------------------- Capability list */

export function CapabilityList({ items }: { items: { title: string; description: string; href: string }[] }) {
  return (
    <ol className="grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => (
        <li key={item.title} className="border-t border-border py-8">
          <span className="font-serif text-sm text-ink/45 tabular-nums">{String(index + 1).padStart(2, "0")}</span>
          <h3 className="mt-3 text-lg font-semibold text-ink">{item.title}</h3>
          <p className="mt-2 leading-relaxed text-ink/70">{item.description}</p>
          <Link
            href={item.href}
            className="mt-4 inline-flex items-center gap-1.5 rounded-sm text-sm font-semibold text-brand underline-offset-[6px] hover:underline focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            Learn more<span className="sr-only"> about {item.title.toLowerCase()}</span>
            <ArrowRight className="size-3.5" aria-hidden />
          </Link>
        </li>
      ))}
    </ol>
  );
}

/* ------------------------------------------------- Department sections */

/**
 * Large alternating rows: image left / text right, then text left / image right. Images keep their own proportions
 * (no crop). On phones and tablets each image sits above its heading and description.
 */
export function DepartmentSectionBlock({ section }: { section: DepartmentSection }) {
  return (
    <StudioSection id={section.id}>
      <SectionHeading id={`${section.id}-heading`} eyebrow={section.eyebrow} title={section.heading} description={section.intro} />
      <ul className="mt-14 space-y-16 lg:mt-16 lg:space-y-24">
        {section.items.map((dept, index) => {
          const flip = index % 2 === 1;
          /* Very wide files (the Texas set is about 3.1:1) would sit too short at their own ratio; a 2.4:1 frame trims
             roughly an eighth from each side, mostly wall and plants, so the room reads larger. Others are uncropped. */
          const veryWide = dept.image.width / dept.image.height > 2.5;
          return (
            <li key={dept.image.src} className="grid items-center gap-7 lg:grid-cols-12 lg:gap-14">
              <StudioPhoto
                image={dept.image}
                aspect={veryWide ? "aspect-[12/5]" : undefined}
                sizes="(min-width: 82rem) 50rem, (min-width: 1024px) 64vw, calc(100vw - 2.5rem)"
                className={cn("lg:col-span-8", flip && "lg:order-2")}
              />
              <div className={cn("lg:col-span-4", flip && "lg:order-1")}>
                <h3 className="font-serif text-[1.625rem] leading-tight font-semibold text-ink sm:text-[1.875rem]">{dept.title}</h3>
                <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink/70">{dept.description}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </StudioSection>
  );
}

/* ------------------------------------------------------- Book collage */

/** Eight square covers in a tight 4 × 2 grid (2 × 4 on phones). Covers are square files in square frames: never cropped. */
export function BookCollage({ location }: { location: StudioLocation }) {
  const { books } = location;
  const resolved = books.slugs.map((slug) => (slug ? getBooks([slug])[0] : null));

  return (
    <StudioSection id="books">
      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading id="books-heading" eyebrow="Audiobooks" title={books.heading} description={books.description} />
          <Link
            href="/audiobooks"
            className="mt-8 inline-flex items-center gap-2 rounded-sm text-sm font-semibold text-brand underline-offset-[6px] hover:underline focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            Browse all audiobooks
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
        <ul className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:col-span-7">
          {resolved.map((book, index) => (
            <li key={book?.slug ?? `slot-${index}`}>
              {book ? (
                <a
                  href={book.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn("block overflow-hidden rounded-[2px] bg-ink/5", focusRing)}
                >
                  <Image
                    src={book.cover}
                    alt={`${book.title}${book.author ? ` by ${book.author}` : ""} (opens in a new tab)`}
                    sizes="(min-width: 82rem) 10.5rem, (min-width: 640px) 23vw, 48vw"
                    className="aspect-square h-auto w-full object-contain"
                  />
                </a>
              ) : (
                <div className="flex aspect-square items-center justify-center rounded-[2px] border border-dashed border-ink/25 bg-ink/[0.03] p-2 text-center text-xs font-semibold text-ink/50">
                  Book cover slot {index + 1}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </StudioSection>
  );
}

/* ----------------------------------------------------- Contact / enquiry */

export function EmailLink({ className }: { className?: string }) {
  return (
    <a href={STUDIO_EMAIL_HREF} className={cn("inline-flex items-center gap-2 font-semibold underline underline-offset-4", className)}>
      <Mail className="size-4 shrink-0" aria-hidden />
      {STUDIO_EMAIL}
    </a>
  );
}

/** Final section: enquiry CTA, the contact email and any confirmed location details. */
export function StudioEnquiry({
  heading,
  body,
  details = [],
  secondary,
}: {
  heading: string;
  body: string;
  /** Confirmed details only. */
  details?: { label: string; value: string }[];
  secondary?: { label: string; href: string };
}) {
  return (
    <section id="enquiry" aria-labelledby="enquiry-heading" className="bg-white pb-20 sm:pb-24">
      <div className="container-page">
        <div className="grid gap-10 rounded-[4px] bg-brand px-6 py-12 text-white sm:px-12 lg:grid-cols-12 lg:items-center lg:gap-12 lg:px-16 lg:py-16">
          <div className="lg:col-span-7">
            <h2 id="enquiry-heading" className="font-serif text-3xl leading-tight font-semibold tracking-[-0.015em] sm:text-4xl">
              {heading}
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/80">{body}</p>
            <dl className="mt-8 space-y-3 text-[0.9375rem]">
              <div className="flex flex-wrap gap-x-3 gap-y-1">
                <dt className="text-white/70">Email</dt>
                <dd>
                  <EmailLink className="text-white decoration-white/50 hover:decoration-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white" />
                </dd>
              </div>
              {details.map((d) => (
                <div key={d.label} className="flex flex-wrap gap-x-3 gap-y-1">
                  <dt className="text-white/70">{d.label}</dt>
                  <dd className="font-medium">{d.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:flex-col lg:items-stretch">
            <Button asChild size="xl" variant="outline" className="border-white bg-white text-brand hover:bg-white hover:text-ink">
              <Link href={ENQUIRY_HREF}>
                Start an enquiry
                <ArrowRight data-icon="inline-end" className="size-4" />
              </Link>
            </Button>
            {secondary ? (
              <Button asChild size="xl" variant="outline" className="border-white/60 bg-transparent text-white hover:bg-white/10 hover:text-white">
                <Link href={secondary.href}>{secondary.label}</Link>
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
