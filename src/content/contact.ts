/**
 * Contact page content and form options.
 *
 * Copy rules: no invented contact details, addresses, phone numbers, response times or prices.
 * Service options mirror the services offered on the site (src/content/services.ts).
 */

import { services } from "@/content/services";

export const contactSeo = {
  title: "Contact Us",
  description:
    "Tell Book Stream about your audiobook project — production, release planning, distribution, catalogue support, marketing or a general question — and how you’d like us to reply.",
};

export const contactHero = {
  eyebrow: "Contact",
  headline: "Let’s Talk About Your Next Chapter in Audio",
  intro:
    "Whether you’re exploring audiobook production, planning a release, or looking for support with your catalogue, tell us a little about your project so we can understand what you need.",
};

export const discussTopics = [
  { title: "Producing an audiobook", body: "Narration, casting, recording, editing and mastering for a finished manuscript.", href: "/services/production" },
  { title: "Planning a release", body: "Release preparation, metadata, artwork and delivery to the channels you choose.", href: "/services/distribution" },
  { title: "Your catalogue or backlist", body: "Reviewing a list for audio, keeping records accurate and planning titles in batches.", href: "/services/catalog-management" },
  { title: "Ongoing partnerships", body: "A consistent approach across a list, a series or a release calendar.", href: "/services/partnerships" },
  { title: "Marketing and discovery", body: "Positioning, listening samples, launch assets and curated discovery.", href: "/services/marketing" },
  { title: "General questions", body: "Anything else about Book Stream, our catalogue or how we work.", href: "/about" },
];

export const nextSteps = [
  "Share as much or as little detail as you have — only four fields are required.",
  "We review your enquiry to understand the project, the materials and any rights involved.",
  "We follow up using the contact method you prefer to discuss a sensible first step.",
];

/* ------------------------------------------------------------ Form options */

export const GENERAL_ENQUIRY = "General enquiry";
export const MULTIPLE_SERVICES = "Multiple services / Complete project support";
export const OTHER_SERVICE = "Other";
export const NOT_SURE = "Not sure yet";

export const serviceOptions: [string, ...string[]] = [
  services[0].title,
  ...services.slice(1).map((s) => s.title),
  MULTIPLE_SERVICES,
  GENERAL_ENQUIRY,
  OTHER_SERVICE,
  NOT_SURE,
];

export const roleOptions = ["Author", "Publisher", "Rights Holder", "Narrator", "Library or Retailer", "Listener", "Other"] as const;

export const titleCountOptions = ["1 title", "2–5 titles", "6–20 titles", "21–50 titles", "More than 50 titles", "Not sure yet"] as const;

export const projectStageOptions = [
  "Exploring ideas",
  "Manuscript in progress",
  "Final manuscript ready",
  "Recording in progress",
  "Finished audio ready",
  "Already published — needs updates",
  "Not sure yet",
] as const;

export const contactMethodOptions = ["Email", "Phone", "Either"] as const;

export const contactTimeOptions = ["Morning", "Afternoon", "Evening", "Any time"] as const;

export const budgetOptions = [
  { value: "not-decided", label: "Not decided yet" },
  { value: "discuss", label: "Prefer to discuss" },
  { value: "custom", label: "Custom budget" },
] as const;

export const currencyOptions = ["USD", "GBP", "EUR", "CAD", "AUD", "NZD", "INR", "PKR", "Other"] as const;

/** Country calling codes. Keyed by ISO code so countries sharing +1 stay distinct. */
export const dialCodes = [
  { iso: "US", label: "United States", code: "+1" },
  { iso: "CA", label: "Canada", code: "+1" },
  { iso: "GB", label: "United Kingdom", code: "+44" },
  { iso: "IE", label: "Ireland", code: "+353" },
  { iso: "AU", label: "Australia", code: "+61" },
  { iso: "NZ", label: "New Zealand", code: "+64" },
  { iso: "IN", label: "India", code: "+91" },
  { iso: "PK", label: "Pakistan", code: "+92" },
  { iso: "AE", label: "United Arab Emirates", code: "+971" },
  { iso: "SA", label: "Saudi Arabia", code: "+966" },
  { iso: "ZA", label: "South Africa", code: "+27" },
  { iso: "NG", label: "Nigeria", code: "+234" },
  { iso: "KE", label: "Kenya", code: "+254" },
  { iso: "DE", label: "Germany", code: "+49" },
  { iso: "FR", label: "France", code: "+33" },
  { iso: "ES", label: "Spain", code: "+34" },
  { iso: "IT", label: "Italy", code: "+39" },
  { iso: "NL", label: "Netherlands", code: "+31" },
  { iso: "SE", label: "Sweden", code: "+46" },
  { iso: "SG", label: "Singapore", code: "+65" },
  { iso: "PH", label: "Philippines", code: "+63" },
  { iso: "JP", label: "Japan", code: "+81" },
  { iso: "BR", label: "Brazil", code: "+55" },
  { iso: "MX", label: "Mexico", code: "+52" },
  { iso: "OTHER", label: "Other (include code in number)", code: "" },
] as const;

/* ---------------------------------------------- Which follow-up questions apply */

const has = (selected: readonly string[], ...values: string[]) => values.some((v) => selected.includes(v));

/** Project questions are shown for anything other than a general enquiry on its own. */
export function projectRelevance(selected: readonly string[]) {
  const project = selected.some((s) => s !== GENERAL_ENQUIRY);
  return {
    project,
    titleCount: has(selected, "Publishing Partnerships", "Digital Catalog Management", "Audiobook Distribution", MULTIPLE_SERVICES),
    stage: has(selected, "Audiobook Production", "Audiobook Distribution", "Publishing Partnerships", MULTIPLE_SERVICES, NOT_SURE),
    targetDate: has(selected, "Audiobook Production", "Audiobook Distribution", "Marketing & Promotion", MULTIPLE_SERVICES),
  };
}
