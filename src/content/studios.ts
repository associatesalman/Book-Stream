/**
 * Studios section content: the /studios overview and one record per location (New York and Texas).
 *
 * EDITING RULES (read before changing anything):
 * - Nothing here may describe an address, piece of equipment, client, award or project that the business has not
 *   confirmed. Unconfirmed facts stay `null`; the pages show only the facts that are filled in.
 * - Production facts used in the copy come from the existing site content (src/content/publishers.ts and
 *   src/content/services.ts): narrator auditions and an approved sample, single/dual/multi-voice narration,
 *   chapter-by-chapter recording, editing, proofing against the text, pickups and mastering to channel specifications.
 * - Department descriptions say what happens in each space. They describe only what the supplied image shows and name
 *   no equipment models or specifications.
 *
 * IMAGES
 * - Location pages: images supplied by Book Stream, in public/"Newyork studio images" and public/"Texas studio images"
 *   (owner's filenames; do not rename). Each image is used once
 *   and never shared between locations. `width`/`height` are the files' real pixel sizes, so layouts keep the exact
 *   proportions and never crop. The supplied files are digitally generated (Gemini); while `imageNote` is set, the
 *   hero says so. Set it to `null` to remove the note, or replace the files with photographs of the studios.
 * - /studios overview hero and intro: licensed stock (Pexels License, see public/images/studios/CREDITS.md) with a note.
 *
 * BOOK COLLAGES (eight covers per location):
 * - Catalogue slugs from src/content/catalog.ts. A `null` entry renders a placeholder slot.
 * - Chosen from covers whose artwork fills the whole square file; most other catalogue covers are portrait art on a
 *   white square, which looks uneven in a tight collage.
 */

import { siteConfig } from "@/config/site";

export type StudioImage = {
  src: string;
  alt: string;
  /** Real pixel size; when set, layouts show the image at its own proportions (no crop). */
  width?: number;
  height?: number;
  /** CSS object-position, used when a layout crops the image. Defaults to the centre. */
  position?: string;
};

export type SizedImage = StudioImage & { width: number; height: number };

export type Department = {
  title: string;
  description: string;
  image: SizedImage;
};

export type DepartmentSection = {
  id: string;
  eyebrow: string;
  heading: string;
  intro: string;
  items: Department[];
};

export type StudioLocation = {
  slug: "new-york" | "texas";
  name: string;
  /** Shown under the name on cards and in the hero eyebrow. */
  region: string;
  /** One sentence for the location card. */
  summary: string;
  /** Hero, combined with the studio overview. */
  hero: { headline: string; description: string; points: string[]; image: SizedImage };
  /** Exactly two sections of alternating image-and-text department rows. */
  departmentSections: [DepartmentSection, DepartmentSection];
  books: { heading: string; description: string; slugs: (string | null)[] };
  /** Confirmed location details only. `null` = not confirmed, and not shown. */
  contact: { address: string | null; phone: string | null; hours: string | null };
  /** Shown under the hero image. `null` = no note. */
  imageNote: string | null;
  seo: { title: string; description: string };
};

/* ------------------------------------------------------------------ Contact */

export const STUDIO_EMAIL = siteConfig.email;
export const STUDIO_EMAIL_HREF = siteConfig.emailHref;

/* ------------------------------------------------------------------ Images */

const img = (file: string, alt: string, position?: string): StudioImage => ({ src: `/images/studios/${file}`, alt, position });

/** Licensed illustrative stock (3:2 landscape), used on the /studios overview only. */
export const studioImages = {
  controlRoomWood: img("control-room-wood.jpg", "A wood-panelled recording control room with a large mixing console, studio monitors and chairs"),
  narratorAtMicrophone: img("narrator-at-microphone.jpg", "A voice artist in headphones speaks into a studio microphone in a wood-lined booth"),
} satisfies Record<string, StudioImage>;

const i = studioImages;

/** Supplied New York image (all files are 1376 × 768). */
const ny = (file: string, alt: string): SizedImage => ({ src: encodeURI(`/Newyork studio images/${file}`), alt, width: 1376, height: 768 });

/** Supplied Texas image (files are 1856 × 576, except two at 1778 × 592). */
const tx = (file: string, alt: string, size: "1856x576" | "1778x592" = "1856x576"): SizedImage => {
  const [width, height] = size.split("x").map(Number);
  return { src: encodeURI(`/Texas studio images/${file}`), alt, width, height };
};

const IMAGE_NOTE = "Studio images on this page are digitally created illustrations.";

/* ---------------------------------------------------------- Overview page */

export const studiosPage = {
  seo: {
    title: "Recording Studios",
    description: "Book Stream’s audiobook recording studios in New York and Texas: narration, recording sessions, editing, proofing and mastering.",
  },
  hero: {
    eyebrow: "Studios",
    headline: "Recording Studios for Audiobooks",
    intro: "Quiet, treated rooms where narrators read, engineers listen closely and every chapter is recorded to the same standard. Explore our studios in New York and Texas.",
    image: i.controlRoomWood,
    anchorLabel: "Explore Our Studios",
  },
  intro: {
    eyebrow: "The recording environment",
    heading: "A calm room, a clear process",
    paragraphs: [
      "Hours at the microphone go more smoothly in a space that is quiet, comfortable and set up the same way each day, so chapter twelve sounds like chapter one.",
      "Around each session sits the rest of the project: casting and auditions, an approved sample, careful editing and proofing against the text, and mastering to each channel’s requirements.",
    ],
    image: i.narratorAtMicrophone,
  },
  locations: {
    eyebrow: "Locations",
    heading: "Our studios",
    intro: "Choose a location to see its departments and selected audiobooks.",
  },
  capabilities: {
    eyebrow: "Recording capabilities",
    heading: "What happens in the studio",
    intro: "Every stage of an audiobook recording, from the first audition to the finished master.",
    items: [
      { title: "Audiobook narration", description: "Single, dual or multi-voice narration matched to the book.", href: "/services/production" },
      { title: "Casting and auditions", description: "A shortlist of narrators to compare, then a short sample to approve.", href: "/publishers#production" },
      { title: "Recording sessions", description: "Chapter-by-chapter recording from a final, approved text.", href: "/services/production" },
      { title: "Editing and proofing", description: "Audio checked against the text, with misreads re-recorded as pickups.", href: "/services/production" },
      { title: "Mastering", description: "Files mastered to the specifications of your release channels.", href: "/services/production" },
      { title: "Release preparation", description: "Files, artwork and metadata prepared for delivery.", href: "/services/distribution" },
    ],
  },
  cta: {
    heading: "Planning an audiobook recording?",
    body: "Tell us about the book, the narration you have in mind and which studio suits you. We’ll come back to you with the next steps.",
  },
  photographyNote: "Photographs on this page are illustrative and do not show a specific Book Stream studio.",
};

/* -------------------------------------------------------------- Locations */

export const studioLocations: StudioLocation[] = [
  {
    slug: "new-york",
    name: "New York",
    region: "New York, United States",
    summary: "Narration booth, control room, editing and production teams in New York.",
    hero: {
      headline: "New York Studio",
      description:
        "A focused space for audiobook narration. Narrators record in a treated booth while an engineer follows the text from the control room, and editing, proofing and production planning happen down the hall.",
      points: ["Narrator casting and an approved sample", "Chapter-by-chapter recording", "Editing, proofing and pickups", "Mastering to channel specifications"],
      image: ny("newyork_image_3.jpg", "The Book Stream New York reception: an illuminated Book Stream sign on a Manhattan skyline mural behind a marble and steel front desk"),
    },
    departmentSections: [
      {
        id: "recording",
        eyebrow: "Recording",
        heading: "Where the narration is recorded",
        intro: "The rooms where a manuscript becomes a performance.",
        items: [
          {
            title: "Narration booth",
            description:
              "A quiet, acoustically treated booth where the narrator reads from the approved script at a fixed microphone position. Keeping the set-up the same every session means chapter twenty sounds just like chapter one.",
            image: ny("newyork_image_1.jpg", "The New York narration booth: a studio microphone with a pop filter, a script stand, headphones and a chair, with a window through to the control room"),
          },
          {
            title: "Control room and narration direction",
            description:
              "The engineer records each take here and follows along in the manuscript, flagging misreads, noise or a change in tone while the narrator is still at the microphone. Direction on pacing and pronunciation happens in the moment.",
            image: ny("newyork_image_8.jpg", "The New York control room: a mixing console with two screens of recording software and studio monitors, facing a window into the narration booth"),
          },
          {
            title: "Sound design and foley",
            description:
              "When a production calls for sound effects or atmosphere, they are created and recorded here using different floor surfaces, props and boom microphones, then edited into place alongside the narration.",
            image: ny("newyork_image_6.jpg", "The New York sound design room: a foley floor with wood, stone and gravel surfaces, shoes and props, boom microphones and an editing desk with two screens"),
          },
        ],
      },
      {
        id: "post-production",
        eyebrow: "Post-production and coordination",
        heading: "Where the audiobook comes together",
        intro: "Editing, checking and planning, from the first script note to the finished files.",
        items: [
          {
            title: "Audio editing and quality control",
            description:
              "Editors remove mistakes, breaths and background noise, then check every chapter against the text. Anything misread is listed and re-recorded as a pickup before the audio moves on to mastering.",
            image: ny("newyork_image_5.jpg", "A New York editing desk with two screens of audio editing software, studio monitors, headphones and notes, below a script review whiteboard"),
          },
          {
            title: "Script preparation and collaboration",
            description:
              "Before recording starts, the team reviews the manuscript, agrees how names and terms are pronounced and plans the casting. Scripts, notes and schedules are worked through together around this table.",
            image: ny("newyork_image_7.jpg", "A New York collaboration room with a sofa, a table covered in scripts and binders, and a whiteboard of production notes"),
          },
          {
            title: "Production coordination",
            description:
              "Each project is scheduled and tracked from here: booking sessions, sharing samples for approval, collecting feedback and keeping you updated at each agreed checkpoint.",
            image: ny("newyork_image_4.jpg", "A New York production office with a desk, two screens, a laptop, stacks of manuscripts and bookshelves, by a window overlooking the city"),
          },
          {
            title: "Manuscript library",
            description:
              "Reference copies of the books we work on are kept here, so editors and proofers can always check the audio against the final, approved text.",
            image: ny("newyork_image_2.jpg", "The New York manuscript library: floor-to-ceiling bookshelves, archive boxes and a small reading desk by the window"),
          },
        ],
      },
    ],
    books: {
      heading: "Selected audiobook projects",
      description: "A selection of titles from the Book Stream catalogue, from enduring classics to golden-age mystery. Select a cover to see the listing.",
      slugs: ["pride-and-prejudice", "1984", "wuthering-heights", "treasure-island", "crime-and-punishment", "the-brothers-karamazov", "the-divine-comedy", "the-crime-at-black-dudley"],
    },
    contact: { address: null, phone: null, hours: null },
    imageNote: IMAGE_NOTE,
    seo: {
      title: "New York Studio",
      description: "Book Stream’s New York audiobook studio: narration booth, control room, sound design, editing, script preparation and production coordination.",
    },
  },
  {
    slug: "texas",
    name: "Texas",
    region: "Texas, United States",
    summary: "Recording suites, a scripting lounge, mixing and production teams in Texas.",
    hero: {
      headline: "Texas Studio",
      description:
        "A comfortable space for audiobook narration, with a dedicated control room and booth, a lounge for script work, and editing, mixing and mastering rooms for longer titles and series.",
      points: ["Narrator casting and an approved sample", "Paced sessions for longer titles and series", "Editing, proofing and pickups", "Mixing and mastering to channel specifications"],
      image: {
        ...tx(
          "texas_image_8.jpg",
          "The Book Stream Texas reception: a Book Stream sign on a reclaimed-wood wall behind a wooden front desk, a sign to the production and recording suites, and a lounge with bookshelves",
          "1778x592",
        ),
        /* Keeps the sign in view where the location card crops this wide image. */
        position: "12% 50%",
      },
    },
    departmentSections: [
      {
        id: "recording",
        eyebrow: "Recording",
        heading: "Where the narration is recorded",
        intro: "From script work to the final take.",
        items: [
          {
            title: "Control room",
            description:
              "The engineer runs each session from here, recording the narrator and following the manuscript line by line. Questions about pacing and pronunciation are settled during the take, not weeks later.",
            image: tx("texas_image_6.jpg", "The Texas Studio A control room seen through a large window: a wooden mixing console, a screen of recording software and studio monitors", "1778x592"),
          },
          {
            title: "Narration booth",
            description:
              "A treated booth with a microphone and a reading desk, where the narrator can settle in for long sessions. The set-up stays the same from the first chapter to the last, so the audiobook sounds consistent.",
            image: tx("texas_image_4.jpg", "The Texas narration booth seen through an open door: a microphone on a boom arm, a reading desk, a screen and a chair, surrounded by acoustic panels"),
          },
          {
            title: "Writers’ collaboration and scripting lounge",
            description:
              "A relaxed space for preparing the script before recording: agreeing pronunciations, marking character voices and planning sessions with the narrator and the production team.",
            image: tx("texas_image_2.jpg", "The Texas writers’ collaboration and scripting lounge: leather armchairs, a coffee table and a reading lamp, with a window into a recording room"),
          },
        ],
      },
      {
        id: "post-production",
        eyebrow: "Post-production and coordination",
        heading: "Where the audiobook comes together",
        intro: "Editing, mixing and planning, through to delivery-ready files.",
        items: [
          {
            title: "Audio editing and quality control",
            description:
              "Editors clean up each recording and check it against the text, listing any misreads to be re-recorded as pickups so the finished chapters are accurate and even.",
            image: tx("texas_image_1.jpg", "A Texas editing workstation: a wooden desk with screens, studio monitors and an office chair, in front of acoustic panels"),
          },
          {
            title: "Mixing and mastering",
            description:
              "Approved chapters are balanced for consistent levels and mastered to the technical specifications of the channels you plan to release on.",
            image: tx("texas_image_3.jpg", "A Texas mixing room: a wooden desk with a mixing console, two screens of audio software and studio monitors, surrounded by acoustic panels"),
          },
          {
            title: "Production coordination",
            description:
              "Schedules for every title are planned and tracked here, from booking narrators and sessions to sharing samples, collecting feedback and confirming delivery dates.",
            image: tx("texas_image_5.jpg", "A Texas production office: a wooden desk with a computer showing a project schedule, beside a reclaimed-wood wall with framed pictures"),
          },
          {
            title: "Team kitchen and break area",
            description:
              "Long recording days need proper breaks. Narrators and the team can step away from the microphone here to rest their voices and recharge between sessions.",
            image: tx("texas_image_7.jpg", "The Texas team kitchen: wooden cabinets, a coffee station and a long wooden table with chairs"),
          },
        ],
      },
    ],
    books: {
      heading: "Selected audiobook projects",
      description: "A selection of titles from the Book Stream catalogue, spanning romance, science fiction and comic classics. Select a cover to see the listing.",
      slugs: ["the-orphaned-songbird", "kade", "vintage-vine", "the-return", "shot-through-the-heart", "the-fare", "caroline-bingleys-grand-plan", "leave-it-to-psmith"],
    },
    contact: { address: null, phone: null, hours: null },
    imageNote: IMAGE_NOTE,
    seo: {
      title: "Texas Studio",
      description: "Book Stream’s Texas audiobook studio: control room, narration booth, scripting lounge, editing, mixing and mastering, and production coordination.",
    },
  },
];

export function getStudioLocation(slug: string) {
  return studioLocations.find((l) => l.slug === slug);
}

export const STUDIOS_HREF = "/studios";
export const studioHref = (slug: StudioLocation["slug"]) => `${STUDIOS_HREF}/${slug}`;
