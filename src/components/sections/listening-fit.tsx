import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { listeningFit, type ListeningStep } from "@/content/home";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/shared/section-heading";

/**
 * "Find the Right Fit" — four listening steps around the supplied illustration.
 * Desktop: 01–02 | illustration | 03–04. Mobile: heading, illustration, then 01→04.
 * Static by design: no reveal, hover motion or floating effects.
 */
export function ListeningFit() {
  const { heading, description, image, steps, cta } = listeningFit;
  const left = steps.slice(0, 2);
  const right = steps.slice(2);

  return (
    <section aria-labelledby="listening-fit-heading" className="bg-white py-20 sm:py-24 lg:py-28">
      <div className="container-page">
        <SectionHeading id="listening-fit-heading" eyebrow="Listening Guide" title={heading} description={description} align="center" />

        <div className="mt-12 grid items-center gap-x-10 gap-y-12 md:grid-cols-2 lg:mt-16 lg:grid-cols-[1fr_minmax(0,25rem)_1fr] lg:gap-x-12 xl:grid-cols-[1fr_minmax(0,27rem)_1fr]">
          {/* Illustration: first on mobile/tablet, centre column on desktop */}
          <div className="mx-auto w-full max-w-[22rem] sm:max-w-[25rem] md:col-span-2 lg:order-2 lg:col-span-1 lg:max-w-none">
            <div className="relative aspect-[2/3] w-full">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 1280px) 432px, (min-width: 1024px) 400px, (min-width: 640px) 400px, 352px"
                className="object-contain"
              />
            </div>
          </div>

          <StepColumn steps={left} start={1} align="end" className="lg:order-1" />
          <StepColumn steps={right} start={3} align="start" className="lg:order-3" />
        </div>

        <div className="mt-12 flex justify-center lg:mt-14">
          <Button asChild size="xl">
            <Link href={cta.href}>
              {cta.label}
              <ArrowRight data-icon="inline-end" className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function StepColumn({
  steps,
  start,
  align,
  className,
}: {
  steps: ListeningStep[];
  start: number;
  /** Desktop alignment: the left column's text faces the illustration. */
  align: "start" | "end";
  className?: string;
}) {
  return (
    <ol start={start} className={cn("space-y-10 lg:space-y-14", className)}>
      {steps.map((step, i) => (
        <li key={step.title} className={cn("max-w-md", align === "end" && "lg:ml-auto lg:text-right")}>
          <p aria-hidden className="font-serif text-4xl leading-none font-semibold text-brand tabular-nums">
            {String(start + i).padStart(2, "0")}
          </p>
          <span aria-hidden className={cn("mt-4 block h-0.5 w-10 bg-brand", align === "end" && "lg:ml-auto")} />
          <h3 className="mt-4 text-xl font-semibold tracking-tight text-ink">
            <span className="sr-only">Step {start + i}: </span>
            {step.title}
          </h3>
          <p className="mt-2 leading-relaxed text-ink/65">{step.description}</p>
        </li>
      ))}
    </ol>
  );
}
