import Image from "next/image";

import { pillars } from "@/content/home";
import { SectionHeading } from "@/components/shared/section-heading";
import { ServiceSection } from "@/components/services/service-sections";

/**
 * "Why Book Stream": principles plus a captioned studio photograph. Moved from the homepage to the About page
 * (where it replaces "What we deliver"), so it uses the About page's ServiceSection wrapper for matching spacing and
 * the hairline divider.
 */
export function WhyBookStream() {
  return (
    <ServiceSection id="why">
      <div className="grid gap-14 text-ink lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <SectionHeading
            id="why-heading"
            eyebrow="Why Book Stream"
            title="Built on a respect for great storytelling."
            description="We believe the right voice can carry a story further. These principles guide how we work with every title, partner and listener."
          />

          <figure className="mt-12">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[4px] lg:aspect-[5/6]">
              <Image
                src="/images/home/studio-microphone.jpg"
                alt="A studio condenser microphone inside a sound-treated recording booth"
                fill
                sizes="(min-width: 1024px) 38vw, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-6 border-l-2 border-brand pl-5 font-serif text-xl leading-snug text-ink sm:text-2xl">
              &ldquo;Every story has a voice. Our job is to help it be
              heard.&rdquo;
            </figcaption>
          </figure>
        </div>

        <ol className="lg:col-span-6 lg:col-start-7 lg:self-center">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <li
                key={pillar.title}
                className="border-t border-ink/10 last:border-b"
              >
                  <div className="group grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 py-8 sm:grid-cols-[3.5rem_1fr_auto] sm:items-start sm:gap-x-8">
                    <span
                      className="font-serif text-lg text-brand tabular-nums sm:pt-0.5"
                      aria-hidden
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold tracking-tight text-ink">
                        {pillar.title}
                      </h3>
                      <p className="mt-2 max-w-md leading-relaxed text-ink/70">
                        {pillar.description}
                      </p>
                    </div>
                    <span className="hidden size-11 items-center justify-center rounded-[4px] border border-brand/25 text-brand sm:flex">
                      <Icon className="size-5" strokeWidth={1.6} aria-hidden />
                    </span>
                  </div>
              </li>
            );
          })}
        </ol>
      </div>
    </ServiceSection>
  );
}
