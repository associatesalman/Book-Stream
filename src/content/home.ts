/**
 * Homepage content.
 *
 * Everything here is editable placeholder copy for the design phase.
 * - Audiobook titles, authors and narrators are ILLUSTRATIVE SAMPLES, not real inventory.
 * - Services and audience descriptions stay intentionally general until the
 *   business model is confirmed — no partnerships, statistics or clients are claimed.
 */

import type { LucideIcon } from "lucide-react";
import {
  Award,
  BookOpen,
  Compass,
  Handshake,
  Heart,
  Landmark,
  Layers,
  Lightbulb,
  Megaphone,
  Mic,
  Rocket,
  Search,
  Send,
  Sparkles,
  Accessibility,
} from "lucide-react";

/* ------------------------------------------------------------------ Hero */

export const hero = {
  eyebrow: "Book Stream · Audiobooks & Beyond",
  title: { lead: "Step Into a Story.", emphasis: "Let the Voice Take You Further." },
  description:
    "Discover captivating audiobooks and explore the possibilities of bringing stories to life through sound. Book Stream connects curious listeners with their next great listen and creators with their next step in audio.",
  primaryCta: { label: "Explore Audiobooks", href: "/audiobooks" },
  secondaryCta: { label: "Discover Book Stream", href: "/about" },
  /**
   * Supplied artwork (public/home page/hero-image.jpg, a framed "Magic of Reading" poster on a wooden table). Only the
   * dark artwork is used: the wood, the white mat and the printed caption are cropped off, saved as
   * src/assets/home/hero-magic-of-reading.jpg and statically imported (content-hashed URL, so no stale cache).
   */
  imageAlt:
    "An open book with a ribbon bookmark, a soft beam of blue light rising from its pages into the dark",
};

/* ------------------------------------------------------------- Audiences */

export type Audience = {
  id: string;
  label: string;
  title: string;
  description: string;
  cta: { label: string; href: string };
};

export const audiences: Audience[] = [
  {
    id: "publishers",
    label: "For Publishers",
    title: "Give every title a voice.",
    description:
      "Explore how Book Stream can help bring your catalog to audio and in front of new audiences.",
    cta: { label: "Publisher Partnerships", href: "/publishers" },
  },
  {
    id: "libraries",
    label: "For Libraries & Retailers",
    title: "Collections your community will love.",
    description:
      "Discover audiobook selections and catalog support designed around the way your patrons and customers listen.",
    cta: { label: "Libraries & Retailers", href: "/libraries-retailers" },
  },
  {
    id: "listeners",
    label: "For Listeners",
    title: "Your next great listen, wherever you are.",
    description:
      "Find audiobooks across every genre — for the commute, the workout or a quiet evening at home.",
    cta: { label: "Start Exploring", href: "/audiobooks" },
  },
];

/* ---------------------------------------------------------------- Genres */

export type Genre = {
  slug: string;
  name: string;
  description: string;
  icon: LucideIcon;
};

export const genres: Genre[] = [
  { slug: "fiction", name: "Fiction", description: "Literary and contemporary stories with unforgettable characters.", icon: BookOpen },
  { slug: "mystery-thriller", name: "Mystery & Thriller", description: "Suspense, crime and twists best heard with the lights low.", icon: Search },
  { slug: "history", name: "History", description: "The people, places and events that shaped the world.", icon: Landmark },
  { slug: "romance", name: "Romance", description: "Love stories from sweeping historicals to modern rom-coms.", icon: Heart },
  { slug: "science-fiction", name: "Science Fiction", description: "Bold futures, distant worlds and big what-ifs.", icon: Rocket },
];

/* -------------------------------------------------------------- Services */

export type Service = {
  slug: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

export const services: Service[] = [
  {
    slug: "distribution",
    title: "Audiobook Distribution",
    description: "Helping titles reach the storefronts, platforms and collections where listeners look for them.",
    icon: Send,
  },
  {
    slug: "production",
    title: "Audiobook Production",
    description: "From casting and narration to editing and mastering, guided by a consistent quality standard.",
    icon: Mic,
  },
  {
    slug: "partnerships",
    title: "Publishing Partnerships",
    description: "Collaborative programs shaped around a publisher's list, goals and release calendar.",
    icon: Handshake,
  },
  {
    slug: "catalog-management",
    title: "Digital Catalog Management",
    description: "Organized metadata, artwork and availability so every title is presented accurately.",
    icon: Layers,
  },
  {
    slug: "marketing",
    title: "Marketing & Promotion",
    description: "Thoughtful campaigns and placements that introduce new releases to the right listeners.",
    icon: Megaphone,
  },
  {
    slug: "discovery",
    title: "Content Discovery",
    description: "Curated collections and recommendations that make finding the next listen effortless.",
    icon: Compass,
  },
];

/* ------------------------------------------------------- Why Book Stream */

export type Pillar = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const pillars: Pillar[] = [
  { title: "Quality", description: "A considered standard for every recording, cover and catalog record we touch.", icon: Award },
  { title: "Accessibility", description: "Audiobooks open stories to more people — we design every experience with that in mind.", icon: Accessibility },
  { title: "Discovery", description: "Thoughtful curation that helps great titles find the listeners they deserve.", icon: Sparkles },
  { title: "Innovation", description: "Modern tools and workflows that keep pace with how people listen today.", icon: Lightbulb },
  { title: "Industry Partnerships", description: "A collaborative approach to working with publishers, libraries and retailers.", icon: Handshake },
];

/* ------------------------------------------------------- Listening fit */

export type ListeningStep = { title: string; description: string };

/** Section shown directly after "Who We Serve". Copy supplied by the client. */
export const listeningFit = {
  heading: "Find the Right Fit for Your Listening Life",
  description:
    "Your next great listen starts with knowing what matters to you. Explore your interests, compare listening options, and choose an experience that fits your everyday routine.",
  /** Supplied illustration (public/home page/mokcup 2 section5.png), copied here with a URL-safe name. */
  image: {
    src: "/images/home/listening-fit-illustration.png",
    alt: "Illustration titled “What audiobook platform is right for you?” showing a woman in a green sweater listening on headphones, surrounded by leaves and flowers",
  },
  steps: [
    {
      title: "Start With Your Interests",
      description:
        "From fiction and memoirs to business and children’s stories, begin with the subjects and genres you enjoy.",
    },
    {
      title: "Choose How You Listen",
      description: "Think about when and where you listen, whether during a commute, at home, or while taking a break.",
    },
    {
      title: "Compare Your Options",
      description:
        "Consider subscription plans, individual purchases, library access, and device compatibility when exploring audiobook platforms.",
    },
    {
      title: "Discover Your Next Listen",
      description:
        "Explore Book Stream’s collection and follow each title’s link to learn more on its listed platform.",
    },
  ] satisfies ListeningStep[],
  /** Scrolls to the audiobook collection section on the homepage. */
  cta: { label: "Explore Audiobooks", href: "#audiobooks" },
};

/* ------------------------------------------------- Stories & voices intro */

/** Section after "Browse by Genre". Copy supplied by the client, verbatim. */
export const storiesVoices = {
  heading: "Connecting Stories, Voices, and Listeners",
  paragraphs: [
    "Audiobooks bring together the craft of storytelling and the power of voice. From preparing a title for audio to helping listeners discover their next great story, every stage shapes how a book reaches its audience.",
    "Book Stream brings audiobook discovery and industry support together, giving listeners a place to explore and authors and publishers a way to discuss their next steps in audio.",
  ],
  cta: { label: "Explore Our Services", href: "/services" },
  /** Supplied mockup (public/home page/mockup 3 section 7.png), copied with a URL-safe name. 941 × 1672. */
  image: {
    src: "/images/home/stories-voices-mockup.png",
    width: 941,
    height: 1672,
    alt: "Mockup of Fourth and Long by Dawn Haynes shown as a hardcover, an open book and on a phone screen",
  },
};
