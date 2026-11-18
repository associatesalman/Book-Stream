import Link from "next/link";
import { cacheLife } from "next/cache";

import { footerNav, legalNav, siteConfig, socialLinks } from "@/config/site";
import { Logo } from "@/components/brand/logo";
import { SocialIcon } from "@/components/shared/social-icon";

/** Current year, cached so the footer stays part of the prerendered static shell. */
async function CopyrightYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}

/**
 * White footer (client decision, 2026-11-16): the supplied transparent logo has a navy "book"
 * wordmark, which is only legible on white — so the footer is pure white with black text.
 */
export function SiteFooter() {
  return (
    <footer className="border-t border-ink/10 bg-white text-ink" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>

      <div className="container-page pt-14 pb-10 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4 lg:pr-10">
            <Logo variant="transparent" />
            <p className="mt-6 max-w-sm text-[0.9375rem] leading-relaxed text-ink/65">{siteConfig.description}</p>

            <ul className="mt-8 flex items-center gap-2" aria-label="Social media">
              {socialLinks.map((social) => (
                <li key={social.platform}>
                  {social.href ? (
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Book Stream on ${social.label}`}
                      className="flex size-10 items-center justify-center rounded-md border border-ink/15 text-ink/75 hover:border-brand hover:bg-brand hover:text-white"
                    >
                      <SocialIcon platform={social.platform} className="size-[1.125rem]" />
                    </a>
                  ) : (
                    // Profile URL not confirmed yet — shown as a non-interactive placeholder.
                    <span
                      title={`${social.label} — coming soon`}
                      className="flex size-10 cursor-default items-center justify-center rounded-md border border-ink/10 text-ink/40"
                    >
                      <SocialIcon platform={social.platform} className="size-[1.125rem]" />
                      <span className="sr-only">{social.label} profile coming soon</span>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 lg:col-span-8">
            {[...footerNav, { title: "Legal", links: legalNav }].map((group) => (
              <div key={group.title}>
                <h3 className="eyebrow text-ink/50">{group.title}</h3>
                <ul className="mt-5 space-y-3.5">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-[0.9375rem] text-ink/80 hover:text-brand hover:underline hover:decoration-brand hover:decoration-2 hover:underline-offset-[6px]"
                      >
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-ink/10 pt-8 text-sm text-ink/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; <CopyrightYear /> {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-ink/50">Audiobook titles and articles shown are illustrative samples.</p>
        </div>
      </div>
    </footer>
  );
}
