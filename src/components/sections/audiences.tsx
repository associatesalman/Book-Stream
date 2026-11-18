import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { audiences } from "@/content/home";
import { SectionHeading } from "@/components/shared/section-heading";

/**
 * "Who We Serve": three content-only cards (no images, no icons). White cards with a hairline border, a brand-blue
 * audience label, a serif heading, the description and the CTA aligned to the bottom so all three line up.
 * Desktop: three across. Mobile: stacked.
 */
export function Audiences() {
  return (
    <section aria-labelledby="audiences-heading" className="bg-white py-20 sm:py-24 lg:py-28">
      <div className="container-page">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <SectionHeading
            id="audiences-heading"
            eyebrow="Who We Serve"
            title="One audiobook company. Three ways to connect."
            className="lg:col-span-7"
          />
          <p className="text-lg leading-relaxed text-muted-foreground lg:col-span-5 lg:pb-1">
            Whether you create stories, share them with your community or simply love to listen, Book Stream is built to
            make audiobooks easier to reach.
          </p>
        </div>

        <ul className="mt-14 grid gap-6 lg:mt-16 lg:grid-cols-3 lg:gap-8">
          {audiences.map((audience) => (
            <li key={audience.id} className="h-full">
              <Link
                href={audience.cta.href}
                className="group flex h-full flex-col rounded-[4px] border border-ink/12 bg-white p-8 hover:border-brand focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none sm:p-10 lg:min-h-[22rem]"
              >
                <p className="eyebrow text-brand">{audience.label}</p>
                <h3 className="mt-8 font-serif text-[1.75rem] leading-[1.2] font-semibold tracking-[-0.01em] text-ink">
                  {audience.title}
                </h3>
                <p className="mt-4 flex-1 text-base leading-[1.75] text-ink/70 sm:text-[1.0625rem]">
                  {audience.description}
                </p>
                <span className="mt-10 inline-flex items-center gap-2 border-t border-ink/10 pt-6 text-sm font-semibold text-brand group-hover:underline">
                  {audience.cta.label}
                  <ArrowRight className="size-4" aria-hidden />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
