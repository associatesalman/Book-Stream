import Link from "next/link";
import { Mail } from "lucide-react";

import { NewsletterForm } from "@/components/forms/newsletter-form";

export function Newsletter() {
  return (
    <section aria-labelledby="newsletter-heading" className="bg-white py-20 sm:py-24">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-[4px] border border-ink/10 bg-white px-6 py-12 sm:px-12 lg:px-16 lg:py-16">
          <div className="relative grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-16">
            <div className="lg:col-span-6">
              <span className="flex size-12 items-center justify-center rounded-[4px] bg-brand text-white">
                <Mail className="size-6" strokeWidth={1.6} aria-hidden />
              </span>
              <h2 id="newsletter-heading" className="mt-6 font-serif text-3xl leading-tight font-semibold text-ink sm:text-[2.5rem]">
                Stay in the loop.
              </h2>
              <p className="mt-4 max-w-lg text-lg leading-relaxed text-muted-foreground">
                New releases, listening recommendations and audiobook industry insights — delivered to your inbox.
              </p>
            </div>

            <div className="lg:col-span-6">
              <NewsletterForm />
              <p className="text-sm text-muted-foreground">
                Subscription delivery will be connected soon. We respect your privacy — unsubscribe at any time. See our{" "}
                <Link href="/privacy-policy" className="font-medium text-brand underline underline-offset-4 hover:text-ink">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
