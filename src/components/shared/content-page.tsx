import { cn } from "@/lib/utils";
import { Breadcrumbs } from "@/components/services/service-sections";

/**
 * Building blocks for simple, text-first pages (Libraries & Retailers, FAQs, Privacy Policy, Terms & Conditions).
 * Pure white, black text, brand-blue links, a comfortable reading width, and no images or animation.
 */

export function ContentPageHeader({
  breadcrumb,
  eyebrow,
  title,
  intro,
  meta,
}: {
  /** The current page's name, shown after "Home" in the breadcrumb trail. */
  breadcrumb: string;
  eyebrow: string;
  title: string;
  intro: React.ReactNode;
  /** Optional small line under the intro, such as "Last updated …". */
  meta?: React.ReactNode;
}) {
  return (
    <section aria-labelledby="page-heading" className="bg-white">
      <div className="container-page pt-8 pb-12 sm:pt-10 sm:pb-14 lg:pb-16">
        <Breadcrumbs items={[{ title: "Home", href: "/" }, { title: breadcrumb }]} />
        <div className="mt-10 max-w-3xl lg:mt-12">
          <p className="eyebrow flex items-center gap-3 text-brand">
            <span aria-hidden className="h-px w-8 bg-brand" />
            {eyebrow}
          </p>
          <h1
            id="page-heading"
            className="mt-5 font-serif text-[2.375rem] leading-[1.08] font-semibold tracking-[-0.02em] text-ink sm:text-5xl lg:text-[3.25rem]"
          >
            {title}
          </h1>
          <div className="mt-6 text-lg leading-relaxed text-ink/75">{intro}</div>
          {meta ? <p className="mt-6 text-sm text-ink/55">{meta}</p> : null}
        </div>
      </div>
    </section>
  );
}

/** Body copy styling: paragraphs, lists and links inside a content page. */
export const proseClass = cn(
  "max-w-3xl text-[1.0625rem] leading-[1.75] text-ink/80",
  "[&_p]:mt-4 [&_p:first-child]:mt-0",
  "[&_ul]:mt-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6 [&_ul]:marker:text-brand",
  "[&_strong]:font-semibold [&_strong]:text-ink",
  /* Text links only (inside paragraphs and list items), so buttons keep their own styling. */
  "[&_:is(p,li)_a]:font-medium [&_:is(p,li)_a]:text-brand [&_:is(p,li)_a]:underline [&_:is(p,li)_a]:underline-offset-4 [&_:is(p,li)_a:hover]:text-brand-strong",
);

/** One titled section of a content page. Sections are separated by a thin rule. */
export function ContentSection({
  id,
  title,
  children,
  className,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className={cn("border-t border-border py-10 sm:py-12", className)}>
      <h2 id={`${id}-heading`} className="max-w-3xl font-serif text-2xl leading-tight font-semibold tracking-[-0.01em] text-ink sm:text-[1.75rem]">
        {title}
      </h2>
      <div className={cn("mt-5", proseClass)}>{children}</div>
    </section>
  );
}

/** Page body wrapper: white, page container, bottom spacing. */
export function ContentBody({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white">
      <div className="container-page pb-16 sm:pb-20 lg:pb-24">{children}</div>
    </div>
  );
}
