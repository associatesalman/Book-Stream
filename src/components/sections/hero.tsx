import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { hero } from "@/content/home";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/home/hero-book-stack.png";

/**
 * Editorial homepage hero: the book-stack artwork as a full-section background, softened by a white overlay (the
 * overlay lightens the image only; the copy and buttons sit above it at full opacity), with the copy centred
 * horizontally and vertically on top.
 *
 * Height: fills the viewport below the sticky header (mobile: 4.5rem + 1px border; lg+: utility bar 2.25rem + header
 * 5rem + 1px). It is a min-height, so on short or narrow screens the section grows with its content instead of
 * clipping it.
 *
 * The overlay is a touch stronger below lg (85%), where the centred copy sits directly over the dark book spines.
 *
 * The background uses object-cover, anchored towards the book stack (x 80%) so the books stay in frame when narrow
 * screens crop the image's sides. Static by design: no animation.
 */
export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-[calc(100svh-4.5rem-1px)] items-center overflow-hidden bg-white text-ink lg:min-h-[calc(100svh-7.25rem-1px)]"
    >
      {/* Background artwork + white overlay (decorative layering; the image keeps its alt text). */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={heroImage}
          alt={hero.imageAlt}
          fill
          preload
          placeholder="blur"
          sizes="100vw"
          className="object-cover object-[80%_50%]"
        />
        <div aria-hidden className="absolute inset-0 bg-white/85 lg:bg-white/80" />
      </div>

      <div className="container-page py-16 sm:py-20 lg:py-16">
        <div className="mx-auto max-w-4xl text-center">
          <p className="eyebrow flex items-center justify-center gap-3 text-brand">
            <span aria-hidden className="hidden h-px w-8 shrink-0 bg-brand sm:block" />
            {hero.eyebrow}
            <span aria-hidden className="hidden h-px w-8 shrink-0 bg-brand sm:block" />
          </p>

          <h1
            id="hero-heading"
            className="mt-7 font-serif text-[2.75rem] leading-[1.05] font-semibold tracking-[-0.025em] text-ink sm:text-[3.75rem] lg:text-[4.5rem] xl:text-[5.25rem]"
          >
            <span className="block">{hero.title.lead}</span>
            <span className="block font-normal text-ink/75 italic">
              {hero.title.emphasis}
            </span>
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-[1.7] text-ink/80 sm:text-xl lg:text-[1.375rem]">
            {hero.description}
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row lg:mt-12">
            <Button asChild size="xl" className="w-full max-w-xs bg-brand hover:bg-brand-strong sm:w-auto">
              <Link href={hero.primaryCta.href}>
                {hero.primaryCta.label}
                <ArrowRight data-icon="inline-end" className="size-4" />
              </Link>
            </Button>
            <Button asChild size="xl" variant="outline" className="w-full max-w-xs sm:w-auto">
              <Link href={hero.secondaryCta.href}>
                {hero.secondaryCta.label}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
