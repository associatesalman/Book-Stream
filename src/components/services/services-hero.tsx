import Image from "next/image";
import Link from "next/link";
import { ArrowDown } from "lucide-react";

import { servicesOverview } from "@/content/services";
import { cn } from "@/lib/utils";
import heroImage from "@/assets/services/services-hero-light-path.webp";

/** Corner placement in the four-corner ("scene") layout, in content order: TL, TR, BL, BR. */
const cornerPlacement = [
  "scene:col-start-1 scene:row-start-1 scene:self-start",
  "scene:col-start-3 scene:row-start-1 scene:self-start scene:justify-self-end",
  "scene:col-start-1 scene:row-start-2 scene:self-end",
  "scene:col-start-3 scene:row-start-2 scene:self-end scene:justify-self-end",
];

/**
 * Services overview hero: one full-width, full-viewport-height scene with the light-path artwork at its centre and
 * four short content blocks in the corners (Who we are, What we provide, Our vision, Our difference).
 *
 * - The background is sampled from the artwork (see `.services-scene` in globals.css), so the artwork needs only a
 *   narrow edge softening where the light beam meets its edge (`.services-hero-edge`). This navy band is a deliberate
 *   exception to the otherwise white Services page.
 * - Clarity: the artwork is served as its full-resolution original (873x1604 after removing the supplied white frame),
 *   unoptimized so it is not recompressed or downsized. On common desktop screens it is drawn at most ~1080px tall,
 *   below its native height, so it is not enlarged past the point of staying sharp.
 * - Scene layout (`scene:` = at least 64rem wide and landscape): the artwork spans the full section height in the
 *   centre column, whose width is derived from that height and the artwork's aspect ratio, so the corners never
 *   overlap it. The page heading sits in the empty navy beneath the book, clear of the figure and the light.
 * - Stacked layout (phones, portrait tablets): heading, artwork, then the four blocks in reading order. The section
 *   simply grows with its content, so nothing overlaps or clips.
 *
 * Static by design: no animation or parallax.
 */
export function ServicesHero() {
  const { heading, intro, imageAlt, corners } = servicesOverview.hero;
  const ratio = heroImage.width / heroImage.height;

  return (
    <section aria-labelledby="page-heading" className="services-scene relative isolate overflow-hidden text-white">
      <div
        className={cn(
          "relative z-10 mx-auto flex w-full max-w-[112rem] flex-col px-5 pt-12 pb-16 sm:px-8 sm:pt-16 sm:pb-20",
          "scene:grid scene:min-h-[max(100svh,50rem)] scene:grid-rows-2 scene:gap-x-12 scene:px-12 scene:py-12 xl:scene:px-16",
        )}
        style={{ gridTemplateColumns: `minmax(0,1fr) calc(max(100svh, 50rem) * ${ratio.toFixed(4)}) minmax(0,1fr)` }}
      >
        <div className="mx-auto max-w-[30rem] text-center scene:absolute scene:bottom-8 scene:left-1/2 scene:z-10 scene:w-[30rem] scene:-translate-x-1/2">
          <h1
            id="page-heading"
            className="font-serif text-[2.5rem] leading-[1.05] font-semibold tracking-[-0.02em] text-white sm:text-5xl scene:text-[2.5rem]"
          >
            {heading}
          </h1>
          <p className="mt-3 text-base leading-relaxed text-white/75 scene:mt-2.5 scene:text-[0.9375rem] scene:leading-[1.6]">
            {intro}
          </p>
        </div>

        {/* Stacked layouts: a full-width colour band behind the image (see `.services-hero-band`). Scene: no box. */}
        <div className="services-hero-band -mx-5 mt-6 sm:-mx-8 scene:contents">
          <div
            className="services-hero-edge relative mx-auto w-full max-w-[20rem] shrink-0 sm:max-w-[24rem] scene:absolute scene:inset-y-0 scene:left-1/2 scene:h-full scene:w-auto scene:max-w-none scene:-translate-x-1/2"
            style={{ aspectRatio: `${heroImage.width} / ${heroImage.height}` }}
          >
            <Image src={heroImage} alt={imageAlt} fill preload unoptimized placeholder="blur" className="object-contain" />
          </div>
        </div>

        <div className="mt-10 grid gap-10 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-12 scene:contents">
          {corners.map((corner, i) => (
            <div key={corner.label} className={cn("max-w-[26rem] scene:max-w-[22rem]", cornerPlacement[i])}>
              <h2 className="eyebrow flex items-center gap-3 text-brand-soft">
                <span aria-hidden className="h-px w-6 bg-brand-soft" />
                {corner.label}
              </h2>
              <p className="mt-4 font-serif text-lg leading-[1.55] text-white/85 xl:text-xl">{corner.body}</p>
              {corner.link ? (
                <Link
                  href={corner.link.href}
                  className="mt-4 inline-flex items-center gap-2 rounded-sm text-sm font-semibold text-brand-soft underline-offset-[6px] hover:text-white hover:underline focus-visible:ring-3 focus-visible:ring-white/50 focus-visible:outline-none"
                >
                  {corner.link.label}
                  <ArrowDown className="size-4" aria-hidden />
                </Link>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
