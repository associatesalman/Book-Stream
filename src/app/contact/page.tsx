import Link from "next/link";
import { Mail } from "lucide-react";

import { siteConfig } from "@/config/site";

import { contactSeo, nextSteps } from "@/content/contact";
import { pageMetadata } from "@/lib/page-metadata";
import { SectionHeading } from "@/components/shared/section-heading";
import { ContactForm } from "@/components/forms/contact-form";

export const metadata = pageMetadata({ ...contactSeo, path: "/contact" });

export default function ContactPage() {
  return (
    <>
      {/* The form sits directly beneath the shared header; the page's only heading is the form heading (h1). */}
      <section id="enquiry" aria-labelledby="enquiry-heading" className="bg-white">
        <div className="container-page grid gap-12 pt-10 pb-16 sm:pt-14 sm:pb-20 lg:grid-cols-12 lg:gap-16 lg:pt-16 lg:pb-24">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <SectionHeading
                as="h1"
                id="enquiry-heading"
                eyebrow="Enquiry form"
                title="Tell us about your project"
                description="Only four fields are required. Further questions appear when they’re relevant to the services you choose."
              />
              <div className="mt-8 rounded-[4px] border border-border p-5">
                <h2 className="text-sm font-semibold text-ink">Prefer email?</h2>
                <p className="mt-1 text-[0.9375rem] leading-relaxed text-ink/70">Write to us directly at</p>
                <a
                  href={siteConfig.emailHref}
                  className="mt-2 inline-flex items-center gap-2 text-base font-semibold break-all text-brand underline underline-offset-4 hover:text-ink"
                >
                  <Mail className="size-4 shrink-0" aria-hidden />
                  {siteConfig.email}
                </a>
              </div>
              <h2 className="mt-10 text-sm font-semibold text-ink">What happens next</h2>
              <ol className="mt-4 space-y-4">
                {nextSteps.map((step, i) => (
                  <li key={step} className="flex gap-4 text-[0.9375rem] leading-relaxed text-ink/70">
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-brand/30 text-xs font-semibold text-brand">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
              <p className="mt-8 border-t border-border pt-6 text-sm leading-relaxed text-ink/60">
                Publisher or rights holder with a larger list? The{" "}
                <Link href="/publishers" className="font-medium text-brand underline underline-offset-4 hover:text-ink">
                  Publishers page
                </Link>{" "}
                explains how we review catalogues for audio.
              </p>
            </div>
          </div>

          <div className="rounded-[4px] border border-border p-5 sm:p-8 lg:col-span-8 lg:p-10">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
