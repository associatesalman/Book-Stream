import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { genres } from "@/content/home";
import { SectionHeading } from "@/components/shared/section-heading";
import { ArrowLink } from "@/components/shared/arrow-link";
import genresImage from "@/assets/home/genres-reading-room.jpg";

export function Genres() {
  return (
    <section aria-labelledby="genres-heading" className="bg-white py-20 sm:py-24 lg:py-28">
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-10">
        {/* Intro column with editorial photography */}
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              id="genres-heading"
              eyebrow="Browse by Genre"
              title="Find the story that fits the moment."
              description="From page-turning thrillers to bedtime adventures, explore audiobooks organized the way you like to listen."
            />
            {/* Supplied artwork (public/home page/mockup2.jpg), shown whole at its native ratio: never cropped or stretched. */}
            <div className="mt-10 max-w-xs overflow-hidden rounded-[4px] sm:max-w-[22rem] lg:max-w-none">
              <Image
                src={genresImage}
                alt="A small figure sitting on a chair beside a reading lamp, inside the curving pages of a giant open book"
                placeholder="blur"
                sizes="(min-width: 1280px) 400px, (min-width: 1024px) 30vw, (min-width: 640px) 352px, 320px"
                className="h-auto w-full"
              />
            </div>
            <ArrowLink href="/audiobooks" className="mt-8">
              View all categories
            </ArrowLink>
          </div>
        </div>

        {/* Category tiles */}
        <ul className="grid gap-px self-start overflow-hidden rounded-[4px] border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:col-span-8">
          {genres.map((genre, i) => {
            const Icon = genre.icon;
            const featured = i === 0;
            return (
              <li key={genre.slug} className={featured ? "sm:col-span-2" : undefined}>
                <div className="h-full">
                  <Link
                    href={`/audiobooks/${genre.slug}`}
                    className="group relative flex h-full flex-col bg-white p-7 focus-visible:z-10 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none sm:p-8"
                  >
                    <div className="flex items-start justify-between">
                      <span className="flex size-12 items-center justify-center rounded-[4px] border border-brand/25 text-brand group-hover:border-brand">
                        <Icon className="size-6" strokeWidth={1.6} aria-hidden />
                      </span>
                      <span className="font-serif text-sm text-ink/40 tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div className={featured ? "mt-10 sm:flex sm:items-end sm:justify-between sm:gap-10" : "mt-10"}>
                      <div>
                        <h3 className="font-serif text-2xl font-semibold text-ink group-hover:text-brand">
                          {genre.name}
                        </h3>
                        <p className="mt-2 max-w-md leading-relaxed text-ink/70">
                          {genre.description}
                        </p>
                      </div>
                      <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand group-hover:underline sm:shrink-0">
                        Explore
                        <ArrowUpRight className="size-4" aria-hidden />
                      </span>
                    </div>
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
