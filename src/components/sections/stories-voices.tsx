import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { storiesVoices } from "@/content/home";
import { Button } from "@/components/ui/button";

/**
 * Two-column intro after "Browse by Genre": copy + CTA on the left, the supplied
 * portrait mockup on the right at its native ratio. Stacks text-then-image on mobile.
 * Static by design.
 */
export function StoriesVoices() {
  const { heading, paragraphs, cta, image } = storiesVoices;
  return (
    <section aria-labelledby="stories-voices-heading" className="border-t border-ink/10 bg-white py-20 sm:py-24 lg:py-28">
      <div className="container-page grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6 xl:col-span-6">
          <p className="eyebrow flex items-center gap-3 text-brand">
            <span aria-hidden className="h-px w-8 bg-brand" />
            Book Stream
          </p>
          <h2
            id="stories-voices-heading"
            className="mt-4 font-serif text-[2rem] leading-[1.1] font-semibold tracking-[-0.015em] text-ink sm:text-[2.5rem] lg:text-[2.875rem]"
          >
            {heading}
          </h2>
          <div className="mt-6 max-w-xl space-y-5 text-lg leading-relaxed text-ink/70">
            {paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
          <Button asChild size="xl" className="mt-10">
            <Link href={cta.href}>
              {cta.label}
              <ArrowRight data-icon="inline-end" className="size-4" />
            </Link>
          </Button>
        </div>

        <div className="lg:col-span-6 xl:col-span-5 xl:col-start-8">
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            sizes="(min-width: 1280px) 420px, (min-width: 1024px) 40vw, (min-width: 640px) 380px, 90vw"
            className="mx-auto h-auto w-full max-w-[22rem] rounded-[4px] sm:max-w-[24rem] lg:max-w-[26rem]"
          />
        </div>
      </div>
    </section>
  );
}
