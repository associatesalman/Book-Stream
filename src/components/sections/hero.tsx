import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { hero } from "@/content/home";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/home/hero-magic-of-reading.jpg";

/**
 * Editorial homepage hero: one dark, full-width, full-viewport-height scene built around the glowing open-book artwork.
 *
 * The section background (#070512) is sampled from the artwork's near-black navy, and the artwork's edges are
 * dissolved into it with masks (`hero-scene-mask`), so there is no visible image boundary. This dark band is a
 * deliberate exception to the otherwise white site.
 *
 * Desktop: copy on the left, vertically centred; the artwork fills the section height on the right.
 * Mobile: copy first, then the artwork full-bleed beneath it on the same background. The section uses a min-height
 * (100svh), so on small screens it grows with its content instead of clipping it.
 *
 * The artwork is never stretched (its aspect ratio comes from the image file itself), so the book, the light and the
 * bookmark always stay in view. Static by design: no animation or parallax.
 */
export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-svh flex-col overflow-hidden bg-[#070512] text-white"
    >
      <div className="container-page relative z-10 flex flex-1 flex-col justify-center pt-14 sm:pt-20 lg:py-24">
        <div className="max-w-xl lg:max-w-[30rem] xl:max-w-[34rem]">
          <p className="eyebrow flex items-center gap-3 text-brand-soft">
            <span aria-hidden className="h-px w-8 bg-brand-soft" />
            {hero.eyebrow}
          </p>

          <h1
            id="hero-heading"
            className="mt-7 font-serif text-[2.5rem] leading-[1.08] font-semibold tracking-[-0.025em] text-white sm:text-[3.25rem] lg:text-[3.5rem] xl:text-[4rem]"
          >
            <span className="block">{hero.title.lead}</span>
            <span className="block font-normal text-white/75 italic">
              {hero.title.emphasis}
            </span>
          </h1>

          <p className="mt-7 max-w-[32rem] text-base leading-[1.75] text-white/70 sm:text-lg">
            {hero.description}
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              asChild
              size="xl"
              className="hover:bg-brand-strong focus-visible:ring-white/50"
            >
              <Link href={hero.primaryCta.href}>
                {hero.primaryCta.label}
                <ArrowRight data-icon="inline-end" className="size-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="xl"
              variant="outline-inverse"
              className="focus-visible:ring-white/50"
            >
              <Link href={hero.secondaryCta.href}>
                {hero.secondaryCta.label}
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/*
        The artwork. Mobile: full-bleed below the copy. Desktop: full section height, anchored to the right edge of the
        page container (or the viewport on narrower screens), at its native aspect ratio.
      */}
      <div
        className="hero-scene-mask relative mx-auto -mt-2 w-full max-w-[30rem] shrink-0 sm:-mt-6 lg:absolute lg:inset-y-0 lg:right-[max(0px,calc((100vw-82rem)/2))] lg:mt-0 lg:h-full lg:w-auto lg:max-w-none"
        style={{ aspectRatio: `${heroImage.width} / ${heroImage.height}` }}
      >
        <Image
          src={heroImage}
          alt={hero.imageAlt}
          fill
          preload
          placeholder="blur"
          sizes="(min-width: 1024px) 60vw, (min-width: 480px) 480px, 100vw"
          className="object-contain"
        />
      </div>
    </section>
  );
}
