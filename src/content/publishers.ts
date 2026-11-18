/**
 * Publishers page content.
 *
 * Copy rules (client brief, 2026-11-16):
 * - Business claims must match the confirmed services in src/content/services.ts.
 *   Wider industry topics are framed as considerations or options to discuss, never as promises.
 * - No named retail, subscription or library platforms (none are confirmed), no partnerships,
 *   guaranteed acceptance, placement, sales, rankings or reach.
 * - No fixed contract terms, prices, turnaround times or legal advice.
 * - AI narration is NOT a confirmed offering and must not be described as one.
 * - No reporting dashboard, account portal or upload feature exists.
 */

import type { LucideIcon } from "lucide-react";
import {
  BookCopy,
  BookMarked,
  Building2,
  FileAudio,
  Feather,
  Landmark,
  Library,
  Store,
} from "lucide-react";

import type { ServiceFaq } from "@/content/services";

export const publishersSeo = {
  title: "Audiobook Support for Publishers",
  description:
    "Audiobook support for publishers, independent presses and rights holders: catalogue review, rights checks, manuscript preparation, narration and production, metadata, release preparation and catalogue upkeep.",
};

export const publishersHero = {
  eyebrow: "For publishers",
  headline: "Bring Your Catalogue to Life Through Audio",
  intro:
    "Book Stream works with publishers and rights holders to prepare, produce, present and distribute audiobook editions — from a single frontlist title to a backlist that has never been heard. Each project is scoped around your list, your materials and the rights you hold.",
  primaryCta: { label: "Discuss Your Catalogue", href: "#enquiry" },
  secondaryCta: { label: "Explore Our Services", href: "/services" },
  /** Covers from the Book Stream catalogue (src/content/catalog.ts), used purely illustratively. */
  covers: ["treasure-island", "the-return", "the-crime-at-black-dudley", "pride-and-prejudice", "the-fare", "wuthering-heights"],
};

/* ---------------------------------------------------------- 2. Partner */

export type PublisherType = { icon: LucideIcon; title: string; description: string };

export const partner = {
  eyebrow: "Who we work with",
  heading: "A Publishing Partner for Your Next Chapter",
  intro:
    "Audio is no longer an afterthought to print and ebook editions, but the right approach depends on who holds the rights and how many titles are involved. We work with publishers and rights holders of different sizes and shape each project around how they already publish.",
  types: [
    {
      icon: Store,
      title: "Independent publishers",
      description: "Growing lists that want audio editions without building an in-house audio team or managing every supplier separately.",
    },
    {
      icon: Building2,
      title: "Established publishing houses",
      description: "Frontlist schedules and deep backlists that need a consistent, repeatable process across many titles and imprints.",
    },
    {
      icon: BookMarked,
      title: "Small presses and specialist imprints",
      description: "Focused lists — literary, genre or subject-specific — where narration style and presentation need to suit a particular readership.",
    },
    {
      icon: Feather,
      title: "Authors managing their own catalogue",
      description: "Independent and hybrid authors who hold their audio rights and publish several titles under their own name or imprint.",
    },
    {
      icon: Landmark,
      title: "Literary estates and authorised rights holders",
      description: "Estates, agencies and rights owners bringing existing works into audio, where permissions and credits need particular care.",
    },
  ] satisfies PublisherType[],
  scales: [
    {
      icon: FileAudio,
      title: "A single title",
      description:
        "The focus is on getting one audiobook right: the manuscript, the voice, the production and a clean release package. Decisions are made for that book alone, and the individual services are usually the best fit.",
    },
    {
      icon: BookCopy,
      title: "A series",
      description:
        "Continuity matters as much as quality. Narrator, pronunciation, character voices, credits and series numbering should stay consistent from one instalment to the next, so it pays to plan the series as a whole.",
    },
    {
      icon: Library,
      title: "A larger backlist",
      description:
        "The work becomes a programme: reviewing which titles suit audio, confirming rights title by title and moving through the list in sensible batches with shared templates and approvals.",
    },
  ],
};

/* --------------------------------------------------------- 3. Planning */

export type Consideration = { title: string; description: string };

export const planning = {
  eyebrow: "Catalogue review",
  heading: "Catalogue Review and Audio Planning",
  intro:
    "Before anything is recorded, it helps to look at the list as a whole. A catalogue review identifies which titles are ready for audio, which need preparation first and what order makes sense for your schedule.",
  items: [
    { title: "Title selection", description: "Which books suit audio now, considering content, readership and how the text will sound when read aloud." },
    { title: "Backlist opportunities", description: "Earlier titles that have never had an audio edition, or that would sit naturally alongside a new release or series." },
    { title: "Audience fit", description: "Who listens to this kind of book, and what they expect in narration style, pacing and length." },
    { title: "Genre", description: "Genre conventions shape casting and direction — a cosy mystery, a thriller and a historical saga each call for something different." },
    { title: "Manuscript readiness", description: "Whether a final, proofread text exists and how much preparation tables, notes or visual material will need." },
    { title: "Estimated listening length", description: "An approximate running time based on word count, which informs production planning and scheduling." },
    { title: "Production priorities", description: "Which titles to produce first — for example, to align with a print release, a new series instalment or a seasonal moment." },
    { title: "Scheduling", description: "Realistic timelines that allow for casting, recording, proofing and your own review rounds, rather than a standard turnaround." },
  ] satisfies Consideration[],
  note: "A review tells you what is practical and well prepared. It cannot predict or guarantee how any audiobook will perform commercially — that depends on many factors outside anyone’s control.",
  /** The file is src/assets/home/publishers-reading-room.jpg, statically imported on the page. */
  image: {
    alt: "An engraving-style illustration in blue ink of a reader at a desk stacked with books, beneath tall arched library windows",
  },
};

/* ----------------------------------------------------------- 4. Rights */

export const rights = {
  eyebrow: "Rights and permissions",
  heading: "Rights, Permissions, and Publishing Agreements",
  intro:
    "An audiobook can only be released if the right permissions are in place. These are the matters to establish before production starts — clarifying them early avoids rework, delayed releases and disputes later.",
  items: [
    {
      title: "Audiobook and adaptation rights",
      description: "Confirm who holds the audio rights for the title and whether any abridgement or adaptation for audio is permitted by the underlying agreement.",
    },
    {
      title: "Territory and language permissions",
      description: "Establish where the audiobook may be sold or lent, and in which languages. Rights are often split by territory, and a translation may be held separately.",
    },
    {
      title: "Exclusive and non-exclusive arrangements",
      description: "Check whether any existing agreement grants exclusivity to a particular channel or partner, as this affects where and when the audiobook can be released.",
    },
    {
      title: "Narrator and production permissions",
      description: "Agree how the narrator’s performance may be used, credited and reused — including in samples and promotion — and whether any approvals are required.",
    },
    {
      title: "Third-party material",
      description: "Identify quoted lyrics, poetry, epigraphs, extracts or music that may need separate permission to be reproduced in audio.",
    },
    {
      title: "Ownership and use of final audio",
      description: "Record who owns the finished master files and how they may be used, so later re-releases, corrections or changes of distributor are straightforward.",
    },
  ] satisfies Consideration[],
  commitment: "We won’t begin work on a title until its audio rights position is clear, and rights arrangements are confirmed title by title.",
  disclaimer:
    "This is a general overview, not legal advice. The specific terms of any agreement should be reviewed by the rights holder and, where appropriate, their own legal adviser.",
};

/* ------------------------------------------------------- 5. Manuscript */

export const manuscript = {
  eyebrow: "Manuscript preparation",
  heading: "Manuscript Preparation and Editorial Support",
  intro:
    "A book written for the page needs some preparation before it can be read aloud well. Good preparation makes recording sessions smoother, reduces errors and keeps the listening experience clear from the first chapter to the last.",
  items: [
    { title: "Editorial readiness", description: "Recording works best from a final, approved text. Late edits after recording mean re-recording, so the manuscript should be locked first." },
    { title: "Proofreading", description: "Typos and inconsistencies that a reader skims past become audible. A proofread text helps the narrator perform without hesitation." },
    { title: "Pronunciation guides", description: "A list of character names, places, invented words and specialist terms with how each should sound. We can help you build one." },
    { title: "Character notes", description: "Ages, accents, temperament and relationships that help the narrator give each character a consistent, recognisable voice." },
    { title: "Footnotes and visual references", description: "Notes on how to handle footnotes, tables, maps, images and charts — whether they are read, summarised or provided separately." },
    { title: "Clarity for listening", description: "Flagging passages that rely on layout, such as lists or text messages, and agreeing how they will be voiced so listeners can follow." },
  ] satisfies Consideration[],
  distinction: {
    heading: "Preparing the text is not rewriting it",
    prepare: {
      title: "Preparing for narration",
      points: [
        "Marking pronunciations, character voices and tone",
        "Agreeing how visual elements and notes are voiced",
        "Noting errors for your approval before recording",
      ],
    },
    unchanged: {
      title: "What stays yours",
      points: [
        "The wording, structure and meaning of the work",
        "Editorial decisions, which remain with the author and publisher",
        "Any change to the text, which is made only with your approval",
      ],
    },
  },
};

/* ------------------------------------------------------- 6. Production */

export const production = {
  eyebrow: "Narration and production",
  heading: "Narration and Audiobook Production",
  intro:
    "Production turns a prepared manuscript into a finished, mastered audiobook. Review points are built in, so the performance is agreed before full recording begins and issues are caught early rather than at the end.",
  stages: [
    {
      title: "Voice and narration style",
      description: "Choosing a voice to suit the genre, point of view and characters. Single, dual or multi-voice narration can be discussed.",
    },
    {
      title: "Auditions and samples",
      description: "Auditions from a shortlist of narrators for you to compare, followed by a short sample to approve before the full recording starts.",
    },
    {
      title: "Author or professional narration",
      description: "Professional narration is the usual route. If an author wishes to narrate — often a good fit for memoir and non-fiction — or you have a narrator in mind, we can discuss what’s involved.",
    },
    {
      title: "Recording preparation",
      description: "Sharing the final manuscript, pronunciation guide and character notes, and agreeing tone, pacing and direction in advance.",
    },
    {
      title: "Direction and consistency",
      description: "Recording chapter by chapter with consistent setup and levels across sessions, so the audiobook sounds alike from start to finish.",
    },
    {
      title: "Editing, proofing and mastering",
      description: "Removing mistakes and noise, listening against the text to catch misreads, re-recording pickups and mastering to channel specifications.",
    },
    {
      title: "Publisher review and agreed revisions",
      description: "You review the complete audiobook and note corrections by chapter and timestamp. The number of review rounds is agreed during scoping.",
    },
  ] satisfies Consideration[],
  image: {
    src: "/images/services/production-engineer.jpg",
    alt: "An audio engineer adjusts faders on a mixing console in a dimly lit studio",
  },
};

/* ----------------------------------------------------- 7. Presentation */

export const presentation = {
  eyebrow: "Title presentation",
  heading: "Cover Artwork, Metadata, and Title Presentation",
  intro:
    "Metadata is how listeners, retailers and libraries understand an audiobook before they press play. Accurate, consistent records make titles easier to find and series easier to follow.",
  groups: [
    {
      title: "Cover adaptation",
      description: "Audiobook channels use a square cover. Print artwork usually needs adapting to that format, with the title and author still legible at small sizes.",
    },
    {
      title: "Title and author consistency",
      description: "Title, subtitle, series name and number, and author name written identically wherever the audiobook appears.",
    },
    {
      title: "Narrator and contributor credits",
      description: "Narrators, translators and editors credited with consistent spelling and roles across every record.",
    },
    {
      title: "Descriptions",
      description: "Copy written for the audio edition rather than reused print-only text, including notes on narration where helpful.",
    },
    {
      title: "Categories and keywords",
      description: "Subject categories and keywords that reflect the content accurately, so the title appears in relevant browsing and search.",
    },
    {
      title: "Language, identifiers and rights",
      description: "Language, publication details, any identifiers a channel requires, and accurate territory and rights information.",
    },
  ] satisfies Consideration[],
  whyHeading: "Why consistency matters across a catalogue",
  why: "When a series number is missing on one channel, a narrator is spelled two ways or an old cover lingers, listeners lose their way and records need repeated correction. A single, agreed version of each field — applied everywhere — keeps the whole catalogue coherent as it grows.",
  recordFields: ["Title & subtitle", "Series & number", "Author", "Narrator", "Description", "Categories", "Keywords", "Language", "Identifiers", "Territories", "Square cover"],
};

/* ----------------------------------------------------- 8. Distribution */

export const distribution = {
  eyebrow: "Distribution",
  heading: "Distribution and Release Preparation",
  intro:
    "Every channel that sells or lends audiobooks has its own submission rules. Release preparation means building one clean package and adapting it to each retail, subscription or library channel you choose.",
  items: [
    { title: "Delivery preparation", description: "Checking chapter files, opening and closing credits and retail sample clips against technical specifications." },
    { title: "Channel requirements", description: "Mapping each chosen channel’s file, artwork and metadata rules, and flagging conflicts before submission." },
    { title: "Territories", description: "Confirming where the audiobook may be released, in line with the rights and any exclusivity terms in place." },
    { title: "Pricing considerations", description: "Pricing is the rights holder’s decision. We can help ensure price information is supplied consistently and displays correctly." },
    { title: "Release scheduling", description: "Planning submission dates with enough time for channel validation and, where relevant, alignment with print or ebook editions." },
    { title: "Listing checks", description: "Reviewing listings once live and coordinating corrections if a field, file or price is displayed incorrectly." },
  ] satisfies Consideration[],
  note: "Each channel reviews submissions under its own policies and decides on acceptance, timing and placement. Careful preparation reduces rejections and corrections; it cannot guarantee that any channel will accept or feature a title.",
};

/* -------------------------------------------------------- 9. Marketing */

export const marketing = {
  eyebrow: "Marketing and discoverability",
  heading: "Marketing, Discoverability, and Publisher Assets",
  intro:
    "Audiobooks have one advantage most products don’t: people can sample them instantly. Marketing support focuses on positioning each title clearly and putting the right listening moments in front of likely listeners.",
  items: [
    { title: "Clear positioning", description: "A concise statement of who the audiobook is for and what makes the listening experience distinctive." },
    { title: "Catalogue listings", description: "Accurate, complete listings — the foundation every other promotional activity points back to." },
    { title: "Audio samples", description: "Short listening clips chosen to show the narration and the hook of the story at their best." },
    { title: "Promotional graphics", description: "Square and vertical visuals built from the audiobook cover for newsletters and social channels." },
    { title: "Author and narrator information", description: "Up-to-date biographies and credits that help listeners connect with the people behind the book." },
    { title: "Release messaging and launch activity", description: "Announcement copy and a coordinated plan across your own channels, timed around the release." },
  ] satisfies Consideration[],
  note: "No one can promise sales, chart positions, reviews or a particular reach. We focus on the parts that can be done well: positioning, good samples and a well-planned launch.",
  image: {
    src: "/images/services/marketing-planning.jpg",
    alt: "A team plans a marketing campaign with sticky notes on a flip chart in a modern office",
  },
};

/* ------------------------------------------------------- 10. Catalogue */

export const catalogue = {
  eyebrow: "Catalogue management",
  heading: "Catalogue Management and Ongoing Updates",
  intro:
    "Catalogues drift over time. Titles are added, editions change and records fall out of step between channels. Ongoing catalogue management keeps your audio list accurate after release.",
  items: [
    { title: "Accurate metadata", description: "Periodic audits that compare each title’s records across channels and correct missing, outdated or conflicting fields." },
    { title: "Organised cover and audio assets", description: "A clear reference of current covers, master files and samples, with superseded versions identified." },
    { title: "Series information", description: "Series names and reading order kept identical everywhere, with new instalments linked correctly." },
    { title: "Title versions", description: "A log of what changed, when and why — useful when a recording is corrected, a cover is updated or an edition is reissued." },
    { title: "Coordinated updates", description: "Changes to prices, territories, editions or rights applied consistently, either directly or prepared for your team, as agreed." },
  ] satisfies Consideration[],
  reporting:
    "Sales reporting, royalties, licensing and account access depend on the channels involved and the arrangements agreed for each project. Book Stream doesn’t operate a publisher portal or automated reporting dashboard; how information is shared is agreed during scoping.",
};

/* -------------------------------------------------------- 11. Workflow */

export const workflow = {
  eyebrow: "Our publishing workflow",
  heading: "Our Publishing Workflow",
  intro: "Every project follows the same clear sequence, whether it involves one title or a whole list. There’s no obligation until scope is agreed.",
  steps: [
    { title: "Share your catalogue or project brief", description: "Tell us about the title or list, the format it’s in today and what you want to achieve." },
    { title: "Review rights, materials and requirements", description: "We look at the rights position, the manuscript, artwork and any existing audio or metadata." },
    { title: "Agree scope, costs and responsibilities", description: "Confirm which services apply, who supplies what, the review points and the commercial terms." },
    { title: "Prepare and produce the audiobook", description: "Manuscript preparation, casting, recording, editing and mastering — or only the stages you need." },
    { title: "Review and approve the deliverables", description: "You review the work at agreed checkpoints, request corrections and sign off when it’s right." },
    { title: "Coordinate release and agreed distribution", description: "Prepare the release package and support distribution to the channels agreed in scope." },
  ] satisfies Consideration[],
};

/* --------------------------------------------------------- 12. Prepare */

export const prepare = {
  eyebrow: "Getting ready",
  heading: "What Publishers Should Prepare",
  intro: "You don’t need everything in place to start a conversation, but the more of this you have, the faster a project can be scoped accurately.",
  checklist: [
    "A title list or catalogue",
    "Final manuscript files",
    "Existing cover artwork",
    "Author and narrator details, where available",
    "Book descriptions and existing metadata",
    "Rights and territory information",
    "Existing audio files, if applicable",
    "Target release dates",
    "The services you need and your project priorities",
  ],
  note: "Please don’t send manuscripts or files through the enquiry form. Once scope is discussed, we’ll agree the best way to share materials.",
};

/* ------------------------------------------------------------ 13. FAQs */

export const publisherFaqs: ServiceFaq[] = [
  {
    question: "Do you work on single titles as well as larger lists?",
    answer:
      "Yes. A single title is usually best served by the individual services — production, distribution or marketing — scoped for that book. Publishers bringing several titles to audio over time may prefer a publishing partnership, which applies one agreed workflow across the list.",
  },
  {
    question: "We already have an audiobook recording. Can you still help?",
    answer:
      "Yes. If you hold final master files, we can review them alongside the cover and metadata and prepare the release package for the channels you choose. If the audio needs work before release, that can be discussed as part of scoping.",
  },
  {
    question: "What narration options are available?",
    answer:
      "We shortlist professional narrators to suit the book and share auditions so you make the final choice, followed by a short sample to approve before full recording. Single, dual or multi-voice narration can be discussed, as can working with an author-narrator or a narrator you already have in mind.",
  },
  {
    question: "Who owns the finished audio, and how are rights handled?",
    answer:
      "Rights and ownership are agreed individually for each project and confirmed title by title — nothing is assumed. We won’t begin work on a title until its audio rights position is clear, and ownership and permitted use of the final files are recorded as part of the agreed scope.",
  },
  {
    question: "Which channels can you distribute to?",
    answer:
      "Distribution support covers preparing and delivering audiobooks to the retail, subscription and library channels agreed for your project. The specific channels depend on your rights, territories and goals, and each channel makes its own decisions on acceptance and placement.",
  },
  {
    question: "What do you need for the manuscript and cover?",
    answer:
      "A final, proofread manuscript and, ideally, a pronunciation list and character notes — we can help you build these. For the cover, existing print artwork is a good starting point; it usually needs adapting to the square format audiobook channels use.",
  },
  {
    question: "How much does a project cost, and how long does it take?",
    answer:
      "Both depend on the length of each book, the number of titles and narrators, the services involved and how quickly reviews come back. We agree costs and a realistic schedule for your specific project rather than publish standard prices or turnaround times.",
  },
  {
    question: "How do review and approval work?",
    answer:
      "Work is shared at agreed checkpoints — for production, that includes the narrator sample and the complete audiobook. You note corrections by chapter and timestamp, errors are re-recorded as pickups, and the number of review rounds is agreed during scoping.",
  },
  {
    question: "Can you help with a backlist or a series?",
    answer:
      "Yes. For a backlist, we review candidate titles together, confirm rights title by title and work through the list in sensible batches. For a series, we keep narrators, pronunciation guides, credits and series metadata consistent from one instalment to the next.",
  },
  {
    question: "Can catalogue records be updated after release?",
    answer:
      "Yes. Catalogue management covers audits and ongoing updates when prices, territories, editions or rights change. Whether we make corrections directly or prepare them for your team is agreed during scoping.",
  },
];

/* --------------------------------------------------------- 14. Enquiry */

export const enquiry = {
  heading: "Let’s Build Your Next Audio Release",
  body: "Tell us about your list and where audio fits in your plans. We’ll review what you share and suggest which services fit and what a sensible first step looks like.",
  points: ["No obligation until scope is agreed", "Rights confirmed before any work begins", "Costs and schedule agreed for your project"],
};

export const titleCountOptions = ["1 title", "2–5 titles", "6–20 titles", "21–50 titles", "More than 50 titles", "Not sure yet"] as const;

/** Mirrors the six confirmed services, plus an open option. */
export const serviceInterestOptions = [
  "Audiobook Production",
  "Audiobook Distribution",
  "Publishing Partnerships",
  "Digital Catalog Management",
  "Marketing & Promotion",
  "Content Discovery",
  "Not sure yet",
] as const;
