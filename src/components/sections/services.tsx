import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { services } from "@/content/home";
import { SectionHeading } from "@/components/shared/section-heading";

export function Services() {
  return (
    <section aria-labelledby="services-heading" className="bg-white py-20 sm:py-24 lg:py-28">
      <div className="container-page">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <SectionHeading
            id="services-heading"
            eyebrow="Our Services"
            title="Everything Audiobooks. All in One Place."
            className="lg:col-span-7"
          />
          <p className="text-lg leading-relaxed text-muted-foreground lg:col-span-5 lg:pb-1">
            Support across the audiobook lifecycle — from the recording booth to the moment a listener presses play.
          </p>
        </div>

        <ul className="mt-14 grid border-t border-l border-border sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <li key={service.slug} className="border-r border-b border-border">
                <div className="h-full">
                  <Link
                    href={`/services/${service.slug}`}
                    className="group relative flex h-full flex-col p-8 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand lg:p-10"
                  >
                    {/* Top accent shown on hover and focus */}
                    <span
                      aria-hidden
                      className="absolute inset-x-0 top-0 h-0.5 bg-brand opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
                    />
                    <span className="flex size-12 items-center justify-center rounded-[4px] border border-brand/20 text-brand group-hover:border-brand group-hover:bg-brand group-hover:text-white">
                      <Icon className="size-[1.375rem]" strokeWidth={1.6} aria-hidden />
                    </span>
                    <h3 className="mt-8 text-xl font-semibold tracking-tight text-ink">{service.title}</h3>
                    <p className="mt-3 flex-1 leading-relaxed text-ink/70">{service.description}</p>
                    <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand group-hover:underline">
                      Learn more
                      <span className="sr-only"> about {service.title}</span>
                      <ArrowRight className="size-4" aria-hidden />
                    </span>
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
