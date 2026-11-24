import Link from "next/link";
import { Mail } from "lucide-react";

import { siteConfig } from "@/config/site";

const utilityLinks = [
  { title: "Publishers", href: "/publishers" },
  { title: "Libraries & Retailers", href: "/libraries-retailers" },
];

const linkClass = "hover:text-white focus-visible:text-white focus-visible:underline focus-visible:outline-none";

/**
 * Slim corporate bar above the main header. On desktop it is one line (headline left, links right);
 * on smaller screens the headline and links stack and centre, and the links wrap if space runs out.
 */
export function UtilityBar() {
  return (
    <div className="bg-ink text-white/70">
      <div className="container-page flex flex-col items-center gap-1.5 py-2 text-center text-xs sm:text-[0.8125rem] lg:h-9 lg:flex-row lg:justify-between lg:gap-6 lg:py-0 lg:text-left">
        <p className="leading-snug">The audiobook company for publishers, libraries, retailers and listeners.</p>
        <nav aria-label="Utility">
          <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 lg:gap-x-6">
            {utilityLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={linkClass}>
                  {link.title}
                </Link>
              </li>
            ))}
            <li>
              <a href={siteConfig.emailHref} className={`inline-flex items-center gap-1.5 font-medium text-white ${linkClass}`}>
                <Mail className="size-3.5 shrink-0" aria-hidden />
                {siteConfig.email}
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
