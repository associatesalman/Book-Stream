/**
 * Services section content: the overview page and one record per service.
 *
 * Copy rules for this file (see project brief):
 * - Every deliverable is framed as something to scope and discuss, not a fixed package.
 * - No prices, turnaround times, guarantees, platform affiliations, partners, statistics
 *   or testimonials. Retail and library channels are described generically.
 * - Titles and slugs must stay identical to the Services dropdown in src/config/site.ts.
 */

import type { LucideIcon } from "lucide-react";
import { Compass, Handshake, Layers, Megaphone, Mic, Send } from "lucide-react";

export type ServiceSlug =
  | "distribution"
  | "production"
  | "partnerships"
  | "catalog-management"
  | "marketing"
  | "discovery";

export type ServiceImage = { src: string; alt: string };

export type ServiceItem = { title: string; description: string };

export type ServiceFaq = { question: string; answer: string };

export type Service = {
  slug: ServiceSlug;
  /** Exact name used in the navigation dropdown. */
  title: string;
  href: `/services/${ServiceSlug}`;
  icon: LucideIcon;
  /** Grid card copy on the overview page. */
  summary: string;
  /** Fuller card copy on the overview page: what the service involves, who it helps, and its main scope points. */
  card: { description: string; points: string[] };
  seo: { title: string; description: string };
  hero: { headline: string; intro: string; image?: ServiceImage };
  overview: { heading: string; body: string[]; audience: ServiceItem[] };
  scope: { heading: string; intro: string; items: ServiceItem[] };
  process: { heading: string; intro: string; steps: ServiceItem[] };
  benefits: { heading: string; items: ServiceItem[] };
  faqs: ServiceFaq[];
  cta: { heading: string; body: string };
};

/* ------------------------------------------------------------ Overview */

export const servicesOverview = {
  seo: {
    title: "Audiobook Services",
    description:
      "Audiobook distribution, production, publishing partnerships, catalog management, marketing and content discovery from Book Stream — scoped around each title and list.",
  },
  hero: {
    heading: "Audiobook Services",
    intro:
      "Production, release, catalog care, promotion and discovery for authors, publishers and content partners, scoped around each title.",
    imageAlt:
      "Seen from above, a small figure walks along a wide beam of light that rises from the pages of an open book on a deep blue ground",
    /** The four corner blocks, in reading order: top left, top right, bottom left, bottom right. */
    corners: [
      {
        label: "Who we are",
        body: "Book Stream brings audiobook discovery and professional project support together, helping stories find their place in the world of audio.",
      },
      {
        label: "What we provide",
        body: "From production and release preparation to catalog care, promotion and discoverability, explore services shaped around your title, list and publishing goals.",
        link: { label: "Browse the six services", href: "#all-services" },
      },
      {
        label: "Our vision",
        body: "To make compelling stories easier to discover and help creators explore meaningful opportunities through audio.",
      },
      {
        label: "Our difference",
        body: "A coordinated approach that considers the story, its presentation and its audience, with a clearly defined scope for each project.",
      },
    ] as { label: string; body: string; link?: { label: string; href: string } }[],
  },
  howWeHelp: {
    eyebrow: "How we help",
    heading: "From a first question to a clear plan for your audiobook.",
    intro:
      "Some titles arrive as a finished manuscript with no audio yet. Others have a master recording that needs clean metadata, or a backlist whose records have drifted out of date. Every project starts by understanding where yours stands.",
    points: [
      {
        title: "Identify what the project needs",
        description:
          "Tell us what you have today, whether a manuscript, a finished recording or a live catalog, and what you want to achieve. Together we find the stage that needs attention first.",
      },
      {
        title: "Understand the relevant services",
        description:
          "We explain which of the six services apply, what each involves and what you would need to prepare, so you can use one on its own or combine several.",
      },
      {
        title: "Plan the next steps",
        description:
          "Scope, responsibilities and audio rights are agreed before any work begins, with a clear sequence and review points for each stage.",
      },
    ] satisfies ServiceItem[],
    audiences: ["Authors", "Publishers", "Content partners"],
    imageAlt:
      "A tree made of open books: pages fan out to form the leafy crown above a sculpted trunk and roots, with more open books at its base",
  },
  steps: [
    {
      title: "Tell us about the project",
      description: "Share the title or list, the format you have today (manuscript, existing audio, live catalog) and what you want to achieve.",
    },
    {
      title: "Agree scope and rights",
      description: "We confirm which services apply, who supplies what, and that the audio rights needed for the work are in place.",
    },
    {
      title: "Plan the work",
      description: "Together we set the sequence, review points and the materials needed for each stage before anything starts.",
    },
    {
      title: "Deliver and review",
      description: "Work is shared at the agreed checkpoints so you can review, request changes and sign off with confidence.",
    },
  ] satisfies ServiceItem[],
  cta: {
    heading: "Have a title or a list in mind?",
    body: "Tell us where the project stands today. We'll suggest which services fit and what a sensible first step looks like.",
  },
};

/* ------------------------------------------------------------ Services */

export const services: Service[] = [
  /* ---------------------------------------------------- Distribution */
  {
    slug: "distribution",
    title: "Audiobook Distribution",
    href: "/services/distribution",
    icon: Send,
    summary:
      "Release preparation, metadata and file delivery so finished audiobooks can be submitted to retail, subscription and library channels in the formats each one expects.",
    card: {
      description:
        "Preparation and delivery work between a final master and a live listing. Files, artwork and metadata are checked against each channel's requirements, for authors with a finished recording and publishers releasing on a schedule.",
      points: [
        "Audio file and cover artwork checks against channel specifications",
        "Complete, consistent metadata, with rights and territories confirmed",
        "Submission to retail, subscription and library channels, then post-release checks",
      ],
    },
    seo: {
      title: "Audiobook Distribution",
      description:
        "Prepare finished audiobooks for release: technical file checks, complete metadata, square cover artwork and delivery planning for retail, subscription and library channels.",
    },
    hero: {
      headline: "Get finished audiobooks release-ready and delivered properly.",
      intro:
        "A strong recording can still be held back by a rejected file, a missing field or a cover in the wrong shape. Distribution support covers the preparation and delivery work between a final master and a live listing.",
    },
    overview: {
      heading: "What distribution support involves",
      body: [
        "Every channel that sells or lends audiobooks has its own submission rules — for audio files, artwork, metadata and rights information. Distribution support means preparing one clean release package and then adapting it to the requirements of each channel you choose.",
        "The goal is fewer rejections, fewer corrections after launch and a listing that describes the audiobook accurately wherever it appears.",
      ],
      audience: [
        { title: "Authors with a finished master", description: "You have final audio files and need them prepared and submitted correctly." },
        { title: "Publishers releasing on a schedule", description: "You need a repeatable release process across several titles and channels." },
        { title: "Rights holders adding audio to a list", description: "You are bringing existing audio into new channels and want the records to match." },
      ],
    },
    scope: {
      heading: "Areas of release work we can cover",
      intro: "The exact scope depends on the channels you choose and the materials you already have. These are the areas we typically review and prepare.",
      items: [
        {
          title: "Audio file preparation",
          description: "Checking that chapter files, opening and closing credits and retail sample clips meet the technical specifications of the selected channels.",
        },
        {
          title: "Metadata",
          description: "Title, subtitle, series and number, author and narrator credits, descriptions, categories, keywords, language and publication details — written once and kept consistent.",
        },
        {
          title: "Cover artwork",
          description: "Reviewing that the cover is supplied in the square format audiobook channels use and that its text matches the metadata exactly.",
        },
        {
          title: "Rights and territories",
          description: "Confirming audio rights, territories and any existing exclusivity terms before a release is submitted anywhere.",
        },
        {
          title: "Channel requirements",
          description: "Mapping each chosen retail, subscription or library channel's file, artwork and metadata rules, and flagging conflicts early.",
        },
        {
          title: "Release monitoring",
          description: "Checking listings after they go live and coordinating corrections if a field, file or price is displayed incorrectly.",
        },
      ],
    },
    process: {
      heading: "How a release comes together",
      intro: "A typical distribution workflow, adjusted for the number of titles and channels involved.",
      steps: [
        { title: "Release review", description: "We look at the final audio, cover and existing metadata to see what is ready and what needs work." },
        { title: "Channel plan", description: "Agree which channels to target and note each one's specific requirements and timelines." },
        { title: "Package preparation", description: "Prepare audio files, artwork and metadata into a single, consistent release package." },
        { title: "Submission", description: "Deliver the package in the format each channel requests and respond to any validation feedback." },
        { title: "Post-release checks", description: "Review live listings and coordinate fixes so the audiobook is presented as intended." },
      ],
    },
    benefits: {
      heading: "Why careful release preparation matters",
      items: [
        { title: "Fewer rejected submissions", description: "Files and artwork are checked against requirements before they are sent, not after a channel declines them." },
        { title: "Consistent listings", description: "The same title, credits and series information appear everywhere, which makes the audiobook easier to find." },
        { title: "Clear rights position", description: "Territory and exclusivity questions are answered before release rather than discovered later." },
        { title: "A repeatable process", description: "Publishers releasing several titles get one approach they can rely on for each new release." },
      ],
    },
    faqs: [
      {
        question: "Do I need a finished recording before distribution can start?",
        answer:
          "Preparation work such as metadata, artwork review and channel planning can begin before the audio is final. Submission itself needs the final, approved master files. If the audio is not recorded yet, see Audiobook Production.",
      },
      {
        question: "Which channels can you deliver to?",
        answer:
          "That depends on the title, its rights and your goals, so we agree a channel plan for each project. We will not list specific retailers or platforms as partners here; we'll discuss the options that fit your audiobook directly.",
      },
      {
        question: "What metadata will I need to provide?",
        answer:
          "At minimum: the title and any subtitle, author and narrator names, a description, language, publisher or rights holder details, and series information if applicable. We help fill gaps and keep the wording consistent across channels.",
      },
      {
        question: "Can you check audio I produced elsewhere?",
        answer:
          "Yes. We can review externally produced files against the technical requirements of your chosen channels and tell you what, if anything, needs correcting before submission.",
      },
      {
        question: "What happens if a listing shows the wrong information?",
        answer:
          "Post-release checks are part of the scope we can agree. If a field or file is displayed incorrectly, we identify the source of the error and coordinate the correction with the relevant channel.",
      },
    ],
    cta: {
      heading: "Have a finished audiobook ready to release?",
      body: "Share what you have — audio, artwork and current metadata — and we'll outline what's needed to prepare it for delivery.",
    },
  },

  /* ------------------------------------------------------ Production */
  {
    slug: "production",
    title: "Audiobook Production",
    href: "/services/production",
    icon: Mic,
    summary:
      "Narration, recording, editing, mastering and quality review — turning a final manuscript into an audiobook that is pleasant to listen to and ready for release.",
    card: {
      description:
        "Everything between the final text and a mastered audio file: choosing the right voice, recording cleanly, proofing against the book and mastering to a consistent standard. For authors holding audio rights, publishers converting titles and content partners with long-form material.",
      points: [
        "Manuscript preparation and narrator casting, with an approved sample",
        "Chapter-by-chapter recording, editing, proofing and pickups",
        "Mastering and a final review of the complete audiobook",
      ],
    },
    seo: {
      title: "Audiobook Production",
      description:
        "Audiobook production from manuscript to master: narrator casting, recording, editing, proofing, mastering and quality review, scoped around each title.",
    },
    hero: {
      headline: "From final manuscript to a finished, listenable master.",
      intro:
        "Production covers everything between the text and the audio file: choosing the right voice, recording cleanly, editing out mistakes, checking the performance against the book and mastering to a consistent standard.",
      image: {
        src: "/images/services/production-editing.jpg",
        alt: "An audio engineer wearing headphones works at a mixing desk in front of two editing screens",
      },
    },
    overview: {
      heading: "What audiobook production involves",
      body: [
        "An audiobook is a long, continuous performance. Listeners notice uneven volume, mispronounced names, page turns and breaths far more than they would in a short recording. Good production is mostly about care and consistency over many hours of audio.",
        "We work from your final manuscript and agree the creative direction — tone, pacing, voice — before recording begins, so the finished audiobook reflects the book you wrote or published.",
      ],
      audience: [
        { title: "Authors holding audio rights", description: "You have a final manuscript and want a professionally produced audiobook of it." },
        { title: "Publishers converting titles", description: "You need consistent production across frontlist releases or a backlist series." },
        { title: "Content partners", description: "You have non-fiction, educational or long-form material that would work well as narrated audio." },
      ],
    },
    scope: {
      heading: "Production stages we can cover",
      intro: "Each stage can be scoped to the title. Some projects need all of them; others arrive partly complete.",
      items: [
        {
          title: "Manuscript preparation",
          description: "Reviewing the final text for audio — notes on visual elements like tables or footnotes, and a pronunciation list for names, places and terms.",
        },
        {
          title: "Narrator casting",
          description: "Shortlisting voices to suit the genre, point of view and characters, with audition samples for you to compare. Single, dual or multi-voice options can be discussed.",
        },
        {
          title: "Recording",
          description: "Recording in a treated space with consistent microphone placement and levels across sessions, so chapters sound alike from start to finish.",
        },
        {
          title: "Editing and proofing",
          description: "Removing mistakes, retakes and noises, and listening against the text to catch skipped lines, misreads and pronunciation errors.",
        },
        {
          title: "Mastering",
          description: "Balancing loudness and tone across all chapters and preparing files to the technical specifications of the channels you plan to use.",
        },
        {
          title: "Final review",
          description: "A complete listen-through before delivery, with a clear process for you to request corrections and approve the master.",
        },
      ],
    },
    process: {
      heading: "How a production runs",
      intro: "A practical sequence with review points built in, so issues are caught early rather than at the end.",
      steps: [
        { title: "Manuscript and direction", description: "Share the final text and talk through tone, pacing, character voices and any pronunciation notes." },
        { title: "Casting and sample", description: "Review narrator auditions, choose a voice and approve a short sample before the full recording starts." },
        { title: "Recording sessions", description: "The book is recorded chapter by chapter, with consistent setup across every session." },
        { title: "Edit, proof and pickups", description: "Audio is edited and checked against the text; any errors are re-recorded as pickups." },
        { title: "Mastering and approval", description: "Chapters are mastered, you review the complete audiobook, and final corrections are made before sign-off." },
      ],
    },
    benefits: {
      heading: "What careful production gives you",
      items: [
        { title: "A performance that fits the book", description: "Agreed direction and an approved sample keep the narration aligned with the tone of the writing." },
        { title: "Fewer errors reaching listeners", description: "Proofing against the manuscript catches misreads and skipped text before release." },
        { title: "Consistent sound", description: "Matched levels and tone across chapters make long listening comfortable." },
        { title: "Files ready for the next step", description: "Mastered audio prepared to channel specifications moves straight into distribution." },
      ],
    },
    faqs: [
      {
        question: "What do I need to provide before production starts?",
        answer:
          "A final, proofread manuscript, confirmation that you hold the audio rights, and any notes on tone or character voices. A pronunciation list for names and unusual terms is very helpful and we can help you build one.",
      },
      {
        question: "Can I choose the narrator?",
        answer:
          "Yes. We share auditions for a shortlist of voices and you make the final choice. If you already have a narrator in mind, we can discuss working with them.",
      },
      {
        question: "Can authors narrate their own books?",
        answer:
          "It can work well, especially for memoir and non-fiction. We can talk through what's involved — recording environment, direction and editing — and whether it suits your title.",
      },
      {
        question: "How are corrections handled?",
        answer:
          "Before final sign-off you review the full audiobook and note any issues by chapter and timestamp. Errors are re-recorded as pickups and edited in. The number of review rounds is agreed during scoping.",
      },
      {
        question: "How long does production take?",
        answer:
          "It depends on the length of the book, the number of narrators, and how quickly reviews come back. We'll agree a realistic schedule for your specific title rather than quote a standard turnaround.",
      },
      {
        question: "What happens after the master is approved?",
        answer:
          "You receive the final mastered files. If you'd like help preparing them for release, our Audiobook Distribution service picks up from there.",
      },
    ],
    cta: {
      heading: "Ready to give your book a voice?",
      body: "Tell us about the manuscript — genre, length and any voice ideas — and we'll talk through how production could work for it.",
    },
  },

  /* ---------------------------------------------------- Partnerships */
  {
    slug: "partnerships",
    title: "Publishing Partnerships",
    href: "/services/partnerships",
    icon: Handshake,
    summary:
      "Ongoing working relationships for publishers and rights holders who want a consistent audio approach across a list, a series or a release calendar — not one title at a time.",
    card: {
      description:
        "An ongoing working relationship for publishers and rights holders planning audio across a list, a series or a release calendar, rather than one title at a time. Suited to independent publishers, backlist owners and series owners.",
      points: [
        "List and release planning, including backlist conversion",
        "Series continuity in narration, style and naming",
        "Shared workflows, a single point of contact and regular reviews",
      ],
    },
    seo: {
      title: "Publishing Partnerships",
      description:
        "Long-term audiobook partnerships for publishers and rights holders: list planning, backlist conversion, series continuity and shared production and release workflows.",
    },
    hero: {
      headline: "A steady audio partner for your whole list, not just one title.",
      intro:
        "Publishing partnerships are for houses and rights holders who expect to bring several titles to audio over time. Instead of starting from scratch on each book, we agree a shared way of working that fits your list and calendar.",
      image: {
        src: "/images/services/partnerships-meeting.jpg",
        alt: "Two people shake hands across a desk with a laptop and coffee cups",
      },
    },
    overview: {
      heading: "What a publishing partnership involves",
      body: [
        "A partnership combines the services on this site — production, distribution, catalog management, marketing — into one ongoing relationship. The value comes from continuity: the same standards, contacts and processes applied to every title you bring to audio.",
        "Every partnership is shaped individually. Structure, responsibilities and commercial terms are discussed and agreed with each partner; nothing on this page represents a fixed offer.",
      ],
      audience: [
        { title: "Independent publishers", description: "Growing lists that want audio editions without building an in-house audio team." },
        { title: "Publishers with a backlist", description: "Established catalogs with titles that have never been released in audio." },
        { title: "Series and franchise owners", description: "Multi-book series where narrator, style and naming must stay consistent across releases." },
      ],
    },
    scope: {
      heading: "What a partnership can include",
      intro: "These are areas to discuss when shaping a partnership. Not every partnership includes every element.",
      items: [
        {
          title: "List and release planning",
          description: "Reviewing your list together to decide which titles suit audio first and aligning audio releases with your print and ebook calendar.",
        },
        {
          title: "Backlist conversion",
          description: "A structured approach to bringing earlier titles into audio in sensible batches, with rights checked title by title.",
        },
        {
          title: "Series continuity",
          description: "Keeping narrators, pronunciation guides, credits and series metadata consistent from one installment to the next.",
        },
        {
          title: "Shared workflows",
          description: "Agreed templates for manuscripts, metadata and approvals so each new title moves through the same steps.",
        },
        {
          title: "Single point of contact",
          description: "A named contact who knows your list, your house style and your priorities.",
        },
        {
          title: "Regular reviews",
          description: "Periodic check-ins on titles in progress, listings that need attention and what to plan next.",
        },
      ],
    },
    process: {
      heading: "How a partnership is set up",
      intro: "Partnerships begin with a conversation and a small, well-defined starting point.",
      steps: [
        { title: "Introductory conversation", description: "Discuss your list, audio ambitions, rights position and how you prefer to work." },
        { title: "List review", description: "Look at candidate titles together and identify which are suitable and available for audio." },
        { title: "Partnership outline", description: "Agree responsibilities, services involved, review points and terms in writing." },
        { title: "First titles", description: "Start with a small set of titles to test the workflow and refine it." },
        { title: "Ongoing cadence", description: "Settle into a regular rhythm of planning, production, release and review." },
      ],
    },
    benefits: {
      heading: "Why work in partnership",
      items: [
        { title: "Less setup per title", description: "Agreed templates and approvals mean each new book starts from a known process." },
        { title: "Consistency across a series", description: "Listeners hear the same quality and, where possible, the same voice from book to book." },
        { title: "A plan for the backlist", description: "Older titles are reviewed deliberately rather than left out of audio by default." },
        { title: "One relationship to manage", description: "Production, release and catalog questions go through one familiar contact." },
      ],
    },
    faqs: [
      {
        question: "Who are publishing partnerships designed for?",
        answer:
          "Publishers and rights holders who expect to bring more than one title to audio — whether that's a frontlist schedule, a backlist, or a series. Authors with a single title are usually better served by the individual services.",
      },
      {
        question: "How many titles do we need to start?",
        answer:
          "There is no fixed minimum stated here. Most partnerships start with a small group of titles to establish the workflow, and the scope grows from there by agreement.",
      },
      {
        question: "Who holds the audio rights?",
        answer:
          "Rights arrangements are agreed individually for each partnership and confirmed title by title. Nothing is assumed, and we will not begin work on a title until its audio rights position is clear.",
      },
      {
        question: "Can a partnership cover only some services?",
        answer:
          "Yes. Some partners want production and release support; others only need catalog management for audio they already own. The partnership outline records exactly which services apply.",
      },
      {
        question: "How are terms structured?",
        answer:
          "Terms depend on the services involved, the number of titles and the rights arrangement, so they are discussed directly with each partner. We don't publish standard terms or pricing.",
      },
    ],
    cta: {
      heading: "Planning audio for more than one title?",
      body: "Tell us about your list and where audio fits in your plans. We'll start with a conversation, not a contract.",
    },
  },

  /* ---------------------------------------------- Catalog management */
  {
    slug: "catalog-management",
    title: "Digital Catalog Management",
    href: "/services/catalog-management",
    icon: Layers,
    summary:
      "Keeping audiobook records accurate over time: metadata, cover artwork, series links, credits and availability reviewed and corrected so every title is presented properly.",
    card: {
      description:
        "Keeping audiobook records accurate as a list grows and changes. Metadata, credits, series links, artwork and availability are audited, corrected against one agreed source of truth and maintained, for publishers, series authors and rights holders after a transfer.",
      points: [
        "A metadata audit with issues grouped by severity",
        "Titles, series numbering, contributor credits and cover artwork",
        "Ongoing maintenance as new titles and editions are added",
      ],
    },
    seo: {
      title: "Digital Catalog Management",
      description:
        "Audiobook catalog management: metadata audits, cover artwork checks, series and contributor consistency, availability updates and ongoing record maintenance.",
    },
    hero: {
      headline: "Accurate audiobook records, kept accurate over time.",
      intro:
        "Catalogs drift. Series numbers go missing, narrator credits differ between channels, an old cover lingers, a description is still the placeholder. Catalog management finds those problems and keeps them from coming back.",
    },
    overview: {
      heading: "What catalog management involves",
      body: [
        "Metadata is how listeners, retailers and libraries understand an audiobook before they press play. When records are incomplete or inconsistent, titles are harder to find and series are harder to follow.",
        "Catalog management is ongoing maintenance: auditing existing records, agreeing a single source of truth for each title, correcting errors and updating records when something changes.",
      ],
      audience: [
        { title: "Publishers with growing audio lists", description: "Dozens or hundreds of audio records spread across several channels." },
        { title: "Series authors", description: "Multi-book series that need correct ordering and linked records." },
        { title: "Rights holders after a transfer", description: "Titles moving between publishers or distributors that need records cleaned and reconciled." },
      ],
    },
    scope: {
      heading: "Catalog areas we review and maintain",
      intro: "A catalog engagement usually starts with an audit, then moves to agreed corrections and ongoing upkeep.",
      items: [
        {
          title: "Metadata audit",
          description: "Comparing each title's records across channels to find missing, outdated or conflicting fields.",
        },
        {
          title: "Titles, series and numbering",
          description: "Making sure series names and reading order are identical everywhere, so listeners can follow a series correctly.",
        },
        {
          title: "Contributor credits",
          description: "Consistent spelling and roles for authors, narrators, translators and editors across every record.",
        },
        {
          title: "Descriptions and categories",
          description: "Replacing placeholder or print-only copy with descriptions written for audio, and reviewing subject categories and keywords.",
        },
        {
          title: "Cover artwork",
          description: "Checking that current square artwork is in place everywhere and that superseded covers are removed.",
        },
        {
          title: "Availability and changes",
          description: "Updating records when prices, territories, editions or rights change, and keeping a log of what was changed and why.",
        },
      ],
    },
    process: {
      heading: "How catalog work is organized",
      intro: "A clear sequence that turns a messy catalog into one that is easy to maintain.",
      steps: [
        { title: "Collect current records", description: "Gather existing metadata exports, cover files and any internal title spreadsheets." },
        { title: "Audit and report", description: "Identify gaps and conflicts, grouped by severity so the most visible issues are addressed first." },
        { title: "Agree the source of truth", description: "Decide on the correct version of each field and record it in one master reference." },
        { title: "Correct and update", description: "Apply agreed corrections and confirm they appear as intended in each channel." },
        { title: "Maintain", description: "Review the catalog at agreed intervals and handle changes as new titles and editions are added." },
      ],
    },
    benefits: {
      heading: "What a well-kept catalog gives you",
      items: [
        { title: "Titles that are easier to find", description: "Complete, consistent metadata gives search and browse features accurate information to work with." },
        { title: "Series that make sense", description: "Correct ordering and linked records help listeners move from one book to the next." },
        { title: "Fewer correction requests", description: "A single source of truth reduces repeated fixes for the same problem." },
        { title: "A clear record of changes", description: "A change log shows what was updated, when and why — useful for teams and future handovers." },
      ],
    },
    faqs: [
      {
        question: "What does a catalog audit look at?",
        answer:
          "Titles and subtitles, series names and numbers, contributor credits, descriptions, categories and keywords, cover artwork, language and availability details — compared across the channels where the titles are listed.",
      },
      {
        question: "Do you need access to our retail accounts?",
        answer:
          "Not necessarily. An audit can start from metadata exports and public listings. Whether we make corrections directly or prepare them for your team is agreed during scoping.",
      },
      {
        question: "Can you work with a very large catalog?",
        answer:
          "Yes, by working in phases. We usually prioritize the most visible or most-affected titles first and agree how the rest of the catalog will be handled over time.",
      },
      {
        question: "Is this a one-off project or ongoing?",
        answer:
          "Either. Some clients want a single clean-up; others prefer regular maintenance as their list grows. We'll suggest what fits based on the audit findings.",
      },
      {
        question: "Do you change descriptions and categories?",
        answer:
          "Only with your approval. We can suggest audio-specific descriptions and more accurate categories, but final wording and choices are always yours.",
      },
    ],
    cta: {
      heading: "Not sure how accurate your catalog is?",
      body: "Send us a sample of your titles and we'll discuss what a catalog review would involve for your list.",
    },
  },

  /* ------------------------------------------------------- Marketing */
  {
    slug: "marketing",
    title: "Marketing & Promotion",
    href: "/services/marketing",
    icon: Megaphone,
    summary:
      "Practical promotion for audiobook releases: positioning, listening samples, launch assets and campaign planning built around what makes each title worth hearing.",
    card: {
      description:
        "Practical promotion built around what makes each audiobook worth hearing. Positioning, listening samples and launch assets come together in a realistic, dated campaign, for authors launching a title, publishers with release calendars and backlist titles with new audio editions.",
      points: [
        "Positioning, messaging and one consistent short description",
        "Listening samples and cover-based launch assets",
        "Campaign planning, with a review once the campaign has run",
      ],
    },
    seo: {
      title: "Audiobook Marketing & Promotion",
      description:
        "Audiobook marketing and promotion: release positioning, listening samples, launch assets, newsletter and social content and campaign planning for new and backlist titles.",
    },
    hero: {
      headline: "Help listeners hear about your audiobook — and hear a bit of it.",
      intro:
        "Audiobooks have one advantage most products don't: people can sample them instantly. Marketing support focuses on positioning each title clearly and putting the right listening moments and assets in front of likely listeners.",
      image: {
        src: "/images/services/marketing-planning.jpg",
        alt: "A team gathers around a flip chart covered in sticky notes during a marketing planning session",
      },
    },
    overview: {
      heading: "What marketing and promotion involves",
      body: [
        "Promotion for an audiobook overlaps with the print and ebook campaign but isn't the same. The narrator, the performance and the listening experience are part of the story, and short audio clips often do more than a cover image alone.",
        "We help plan campaigns that fit your title and resources, and prepare the assets you need to run them. Results vary by title and audience, so we focus on doing the groundwork well rather than promising outcomes.",
      ],
      audience: [
        { title: "Authors launching an audiobook", description: "You want a simple, realistic launch plan you can run alongside your existing audience." },
        { title: "Publishers with release calendars", description: "You need audio-specific assets and messaging for several titles at once." },
        { title: "Backlist titles", description: "Earlier titles that have new audio editions and deserve a second introduction." },
      ],
    },
    scope: {
      heading: "Promotion work we can help with",
      intro: "Pick the elements that fit your title and channels. Each one is scoped and approved with you.",
      items: [
        {
          title: "Positioning and messaging",
          description: "Clarifying who the audiobook is for, which comparable listening experiences it resembles, and the short description that leads every campaign.",
        },
        {
          title: "Listening samples",
          description: "Selecting and preparing short excerpts that represent the book well without giving away key moments.",
        },
        {
          title: "Launch assets",
          description: "Square and vertical graphics built from your cover, short audio clip visuals and copy for listings, newsletters and social posts.",
        },
        {
          title: "Campaign planning",
          description: "A dated plan for announcements, release day and follow-up activity that fits the time and budget you have.",
        },
        {
          title: "Author and narrator content",
          description: "Ideas and outlines for behind-the-microphone stories, Q&As and short videos that introduce the people behind the audiobook.",
        },
        {
          title: "Backlist moments",
          description: "Planning promotion around series releases, anniversaries or seasonal themes to bring attention back to earlier titles.",
        },
      ],
    },
    process: {
      heading: "How a campaign is built",
      intro: "Every campaign is different, but the planning steps are consistent.",
      steps: [
        { title: "Understand the title", description: "Listen to the audiobook, read existing materials and agree what makes it distinctive." },
        { title: "Define audience and goals", description: "Decide who the campaign should reach and what a realistic aim looks like for this release." },
        { title: "Plan the campaign", description: "Map activities and channels to dates, with clear responsibilities for each." },
        { title: "Prepare assets", description: "Create samples, graphics and copy, and share them for your review and approval." },
        { title: "Launch and review", description: "Run the agreed activities, then review what was done and note lessons for next time." },
      ],
    },
    benefits: {
      heading: "What focused promotion gives you",
      items: [
        { title: "A clear message", description: "Everyone describing the audiobook uses the same positioning and short description." },
        { title: "Assets made for audio", description: "Samples and visuals that highlight the listening experience, not just the cover." },
        { title: "A plan you can follow", description: "A dated, realistic schedule instead of scattered last-minute posts." },
        { title: "Room to learn", description: "A short review after each campaign helps shape the next release." },
      ],
    },
    faqs: [
      {
        question: "Can you guarantee sales or rankings?",
        answer:
          "No. Audiobook performance depends on many factors outside anyone's control. We focus on solid positioning, good samples and a well-planned campaign — the parts that can be done well.",
      },
      {
        question: "Does marketing require my audiobook to be produced by Book Stream?",
        answer:
          "Not necessarily. We can discuss promoting audiobooks produced elsewhere, as long as the rights and assets are available for promotional use.",
      },
      {
        question: "What will you need from me?",
        answer:
          "The final audio or a review copy, cover artwork, any existing descriptions or reviews you're permitted to quote, and information about your audience and current channels such as a newsletter or website.",
      },
      {
        question: "Do you run paid advertising?",
        answer:
          "Paid activity can be discussed as part of a campaign plan, but it isn't assumed. Many campaigns rely on owned channels, samples and well-timed announcements.",
      },
      {
        question: "Can you promote backlist titles?",
        answer:
          "Yes. Backlist campaigns often work around a natural moment — a new book in the series, a new audio edition or a seasonal theme.",
      },
    ],
    cta: {
      heading: "Have an audiobook coming up — or one that deserves more attention?",
      body: "Tell us about the title and your audience. We'll suggest a realistic place to start.",
    },
  },

  /* ------------------------------------------------------- Discovery */
  {
    slug: "discovery",
    title: "Content Discovery",
    href: "/services/discovery",
    icon: Compass,
    summary:
      "Curated collections, themed lists and editorial recommendations that connect audiobooks with listeners who are likely to enjoy them.",
    card: {
      description:
        "Curated collections, themed lists and editorial recommendations that place audiobooks where likely listeners will find them. For authors and publishers seeking relevant placement, and libraries and retailers who want ready-made, well-described groupings.",
      points: [
        "Curated collections and themed or seasonal lists",
        "Editorial recommendations and listening-focused descriptions",
        "Series and read-alike paths, reviewed and refreshed over time",
      ],
    },
    seo: {
      title: "Audiobook Content Discovery",
      description:
        "Audiobook content discovery: curated collections, themed and seasonal lists, editorial recommendations and listener-friendly descriptions that help the right titles find their audience.",
    },
    hero: {
      headline: "Help the right listeners find the right audiobook.",
      intro:
        "Listeners rarely search for a title they've never heard of. Content discovery uses curation — collections, themes and editorial recommendations — to put audiobooks in the places listeners are already browsing.",
      image: {
        src: "/images/services/discovery-reading.jpg",
        alt: "A woman wearing headphones browses on a tablet in front of a colorful bookshelf",
      },
    },
    overview: {
      heading: "What content discovery involves",
      body: [
        "Discovery is the editorial side of audiobooks. It means understanding what a title offers — genre, mood, length, narration style — and grouping it with others so listeners can find something new from something they already like.",
        "This work supports listeners, libraries and retailers browsing for their next listen, and gives authors and publishers additional ways for their titles to be seen alongside the right company.",
      ],
      audience: [
        { title: "Authors and publishers", description: "Titles that would benefit from appearing in relevant collections and themed lists." },
        { title: "Libraries and retailers", description: "Partners who want ready-made, well-described groupings for their own listeners." },
        { title: "Listeners", description: "People looking for their next audiobook by mood, genre or listening occasion." },
      ],
    },
    scope: {
      heading: "Discovery work we can provide",
      intro: "Curation is planned around themes and audiences, and every placement is based on a title's actual content.",
      items: [
        {
          title: "Curated collections",
          description: "Groupings of audiobooks by genre, subgenre or style, with a short introduction explaining what links them.",
        },
        {
          title: "Themed and seasonal lists",
          description: "Lists built around occasions, seasons, topics and listening moments, refreshed when they stop being relevant.",
        },
        {
          title: "Editorial recommendations",
          description: "Short, honest write-ups on why a particular audiobook is worth a listen and who is most likely to enjoy it.",
        },
        {
          title: "Listening-focused descriptions",
          description: "Notes on narration style, length and tone that help listeners decide quickly whether a title suits them.",
        },
        {
          title: "Series and read-alike paths",
          description: "Clear series order and 'if you liked this' connections that lead listeners from one title to the next.",
        },
        {
          title: "Collection feedback",
          description: "Reviewing which groupings are useful to listeners and partners, and adjusting future curation accordingly.",
        },
      ],
    },
    process: {
      heading: "How curation works",
      intro: "Discovery depends on good information and honest editorial judgment.",
      steps: [
        { title: "Understand each title", description: "Review the audiobook, its metadata and sample to note genre, mood, pacing and narration style." },
        { title: "Choose themes", description: "Identify collections and lists where the title genuinely belongs." },
        { title: "Write and assemble", description: "Prepare collection introductions and short recommendations in a consistent voice." },
        { title: "Publish and place", description: "Make collections available where they'll be seen, in formats partners can use." },
        { title: "Review and refresh", description: "Retire outdated lists, add new titles and improve groupings over time." },
      ],
    },
    benefits: {
      heading: "Why curation helps",
      items: [
        { title: "Context for every title", description: "Placing an audiobook beside related titles explains it faster than a description alone." },
        { title: "Easier browsing", description: "Listeners can choose by mood, theme or occasion instead of searching blind." },
        { title: "A second life for backlist", description: "Well-chosen themes give earlier titles relevant moments to be seen again." },
        { title: "Honest recommendations", description: "Editorial choices are based on content, which builds trust with listeners over time." },
      ],
    },
    faqs: [
      {
        question: "How are titles chosen for collections?",
        answer:
          "By editorial judgment based on each audiobook's content — genre, themes, tone and narration — and whether it genuinely fits the collection. Accurate metadata and a good sample make this much easier.",
      },
      {
        question: "Can I request that my audiobook be included?",
        answer:
          "You can suggest titles and themes. Inclusion is still an editorial decision, so that collections stay useful and trustworthy for listeners.",
      },
      {
        question: "Is discovery the same as marketing?",
        answer:
          "They support each other but differ. Marketing promotes a specific release; discovery is ongoing curation that groups many titles around themes and listener interests.",
      },
      {
        question: "Can libraries or retailers use your collections?",
        answer:
          "We're happy to discuss how curated lists and descriptions could be shared with library and retail partners in formats that suit their catalogs.",
      },
      {
        question: "Why does metadata matter for discovery?",
        answer:
          "Curation starts from accurate information. Missing categories, wrong series numbers or placeholder descriptions make it harder to place a title correctly — which is where Digital Catalog Management can help.",
      },
    ],
    cta: {
      heading: "Want your audiobooks in front of the right listeners?",
      body: "Tell us about your titles or your collection needs, and we'll talk through how curation could support them.",
    },
  },
];

export function getService(slug: ServiceSlug): Service {
  const service = services.find((s) => s.slug === slug);
  if (!service) throw new Error(`Unknown service "${slug}".`);
  return service;
}

/* ------------------------------------------- Service-specific sections */

/** Distribution — what a release-ready package contains. */
export const distributionChecklist: { group: string; items: string[] }[] = [
  {
    group: "Audio",
    items: ["Final mastered chapter files", "Opening and closing credits", "A retail sample excerpt"],
  },
  {
    group: "Artwork",
    items: ["Square cover artwork", "Cover text that matches the metadata", "Rights to use the artwork in audio"],
  },
  {
    group: "Metadata",
    items: ["Title, subtitle and series details", "Author and narrator credits", "Description, categories and language"],
  },
  {
    group: "Rights",
    items: ["Confirmed audio rights", "Territories for release", "Any existing exclusivity terms"],
  },
];

/** Production — what helps before the first recording session. */
export const productionPrep: ServiceItem[] = [
  { title: "Final, proofread manuscript", description: "Changes after recording mean re-recording, so the text should be locked first." },
  { title: "Pronunciation guide", description: "Character names, places, invented words and specialist terms with how they should sound." },
  { title: "Character and tone notes", description: "Ages, accents and personalities for key characters, and the overall feel of the book." },
  { title: "Rights confirmation", description: "Confirmation that you hold, or have licensed, the audio rights for the title." },
];

/** Partnerships — models to explore (options for discussion, not fixed offers). */
export const partnershipModels: ServiceItem[] = [
  {
    title: "Frontlist audio program",
    description: "Audio editions planned alongside new print and ebook releases, following your publication calendar.",
  },
  {
    title: "Backlist conversion",
    description: "A phased plan for bringing earlier titles to audio, prioritized by series, demand or rights availability.",
  },
  {
    title: "Series partnership",
    description: "One approach for every book in a series, with continuity in narration, pronunciation and series metadata.",
  },
  {
    title: "Catalog and release support",
    description: "For publishers who already produce audio and want help with metadata, release preparation and catalog upkeep.",
  },
];

/** Catalog management — common record issues an audit looks for. */
export const catalogIssues: { issue: string; effect: string }[] = [
  { issue: "Series number missing or different between channels", effect: "Listeners start a series in the wrong place or can't find the next book." },
  { issue: "Narrator credited differently, or not at all", effect: "Listeners who follow a narrator can't find their other work." },
  { issue: "Description copied from print edition", effect: "References to page counts or illustrations confuse audio listeners." },
  { issue: "Outdated or non-square cover artwork", effect: "The audiobook looks inconsistent or poorly cropped in listings." },
  { issue: "Broad or inaccurate categories", effect: "The title appears beside books its audience isn't looking for." },
];

/** Marketing — the building blocks of an audio-first launch kit. */
export const marketingKit: ServiceItem[] = [
  { title: "Short description", description: "One or two sentences used consistently in every listing and post." },
  { title: "Listening clip", description: "A short, representative excerpt prepared for sharing." },
  { title: "Cover-based graphics", description: "Square and vertical formats sized for listings, newsletters and social posts." },
  { title: "Release-day copy", description: "Announcement text you can adapt for each channel you use." },
];

/** Discovery — example collection themes (illustrative, built from the homepage sample collection). */
export const discoveryThemes: { title: string; description: string; covers: string[] }[] = [
  {
    title: "Series worth starting",
    description: "First books in a series, for listeners who want more to follow once they finish.",
    covers: ["ignite", "chasing-shadows", "through-the-smoke"],
  },
  {
    title: "Classics, newly heard",
    description: "Familiar stories that listeners may want to revisit as a performance.",
    covers: ["treasure-island", "1984"],
  },
  {
    title: "Romance to settle into",
    description: "Character-led romance for listeners who enjoy following a relationship across a book.",
    covers: ["the-orphaned-songbird", "an-indoctrinated-man", "ours"],
  },
];
