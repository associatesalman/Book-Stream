import Link from "next/link";

const utilityLinks = [
  { title: "Publishers", href: "/publishers" },
  { title: "Libraries & Retailers", href: "/libraries-retailers" },
  { title: "FAQs", href: "/faqs" },
];

/** Slim corporate bar above the main header (desktop only). */
export function UtilityBar() {
  return (
    <div className="hidden bg-ink text-white/70 lg:block">
      <div className="container-page flex h-9 items-center justify-between text-[0.8125rem]">
        <p>The audiobook company for publishers, libraries, retailers and listeners.</p>
        <nav aria-label="Utility">
          <ul className="flex items-center gap-6">
            {utilityLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-white focus-visible:text-white focus-visible:outline-none">
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
