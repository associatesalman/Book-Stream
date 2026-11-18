/**
 * Site-wide configuration: brand details, navigation and footer links.
 * Every route linked here exists: "/", "/about", "/audiobooks" (and its genre pages), "/services" and the six /services/*
 * pages, "/publishers", "/libraries-retailers", "/contact", "/faqs", "/search", "/privacy-policy" and "/terms-conditions".
 */

export type NavChild = {
  title: string;
  href: string;
  description?: string;
};

export type NavItem = {
  title: string;
  href: string;
  /** Optional dropdown entries shown in the desktop mega-menu and mobile accordion. */
  children?: NavChild[];
  /** Short intro shown alongside the dropdown. */
  summary?: string;
};

export type FooterGroup = {
  title: string;
  links: { title: string; href: string }[];
};

export type SocialPlatform = "linkedin" | "instagram" | "facebook" | "youtube";

export type SocialLink = {
  platform: SocialPlatform;
  label: string;
  /** Leave empty until the official profile exists — the icon renders as "coming soon". */
  href: string;
};

export const siteConfig = {
  name: "Book Stream",
  wordmark: { primary: "BOOK", secondary: "STREAM" },
  tagline: "Stories Deserve to Be Heard.",
  description:
    "Book Stream connects publishers, libraries, retailers and listeners with a smarter, more connected audiobook experience.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "en_US",
} as const;

export const mainNav: NavItem[] = [
  { title: "Home", href: "/" },
  {
    title: "Audiobooks",
    href: "/audiobooks",
    summary: "Browse the full catalog or explore it by genre.",
    children: [
      { title: "Browse All Audiobooks", href: "/audiobooks", description: "The complete catalog in one place." },
      { title: "Fiction", href: "/audiobooks/fiction" },
      { title: "Mystery & Thriller", href: "/audiobooks/mystery-thriller" },
      { title: "History", href: "/audiobooks/history" },
      { title: "Romance", href: "/audiobooks/romance" },
      { title: "Science Fiction", href: "/audiobooks/science-fiction" },
    ],
  },
  {
    title: "Services",
    href: "/services",
    summary: "Support across the audiobook lifecycle, from production to discovery.",
    children: [
      { title: "Audiobook Distribution", href: "/services/distribution", description: "Bring titles to more storefronts and collections." },
      { title: "Audiobook Production", href: "/services/production", description: "Narration, engineering and quality control." },
      { title: "Publishing Partnerships", href: "/services/partnerships", description: "Long-term programs built around your list." },
      { title: "Digital Catalog Management", href: "/services/catalog-management", description: "Accurate metadata, artwork and availability." },
      { title: "Marketing & Promotion", href: "/services/marketing", description: "Campaigns that help listeners find new titles." },
      { title: "Content Discovery", href: "/services/discovery", description: "Curation that connects titles with audiences." },
    ],
  },
  { title: "Publishers", href: "/publishers" },
  { title: "About Us", href: "/about" },
];

export const footerNav: FooterGroup[] = [
  {
    title: "Company",
    links: [
      { title: "About Us", href: "/about" },
      { title: "Services", href: "/services" },
      { title: "Contact", href: "/contact" },
      { title: "FAQs", href: "/faqs" },
    ],
  },
  {
    title: "Explore",
    links: [
      { title: "All Audiobooks", href: "/audiobooks" },
      { title: "Fiction", href: "/audiobooks/fiction" },
      { title: "Romance", href: "/audiobooks/romance" },
      { title: "Mystery & Thriller", href: "/audiobooks/mystery-thriller" },
    ],
  },
  {
    title: "Partnerships",
    links: [
      { title: "Publishers", href: "/publishers" },
      { title: "Libraries & Retailers", href: "/libraries-retailers" },
    ],
  },
];

export const legalNav = [
  { title: "Privacy Policy", href: "/privacy-policy" },
  { title: "Terms & Conditions", href: "/terms-conditions" },
];

/** Official profile URLs have not been confirmed yet — fill in `href` when available. */
export const socialLinks: SocialLink[] = [
  { platform: "linkedin", label: "LinkedIn", href: "" },
  { platform: "instagram", label: "Instagram", href: "" },
  { platform: "facebook", label: "Facebook", href: "" },
  { platform: "youtube", label: "YouTube", href: "" },
];
