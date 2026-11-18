/**
 * About page content.
 *
 * Copy rules (client brief, 2026-11-16):
 * - Grounded only in what the site already establishes: the audiobook catalogue (titles link out
 *   to their listed platforms) and the six services in src/content/services.ts.
 * - No founding date, history, team, locations, awards, statistics, testimonials, partnerships,
 *   guarantees or technical/compliance claims.
 * - Libraries and retailers are described as an audience, never as partners.
 */

import type { LucideIcon } from "lucide-react";
import { Accessibility, Building2, Compass, Feather, Gem, Headphones, Library, ScanText, Users } from "lucide-react";

export const aboutSeo = {
  title: "About Book Stream",
  description:
    "Book Stream is an audiobook-focused brand: a catalogue for listeners to explore, and production, distribution, catalog and discovery support for authors, publishers and content partners.",
};

export const aboutHero = {
  eyebrow: "About Book Stream",
  headline: "Stories Connect Us. Audio Brings Them Closer.",
  summary:
    "Book Stream is an audiobook-focused brand. We help listeners discover stories worth their time, and we work with authors, publishers and content partners on the practical steps that take a book into audio and in front of the people who will listen to it.",
  focus: ["Audiobook discovery", "Support for authors and publishers", "Projects for content partners"],
};

export const whoWeAre = {
  eyebrow: "Who we are",
  heading: "An audiobook brand connecting stories, voices and listening opportunities.",
  /** Founding year: none confirmed in project content — do not add one until the client supplies it. */
  paragraphs: [
    "Book Stream is a brand built entirely around audiobooks. We exist for the moment a story moves from the page into a voice — and for everything that has to go right for that audiobook to find the people who will enjoy it.",
    "That work has two sides, and we bring them together under one name. Listeners come to Book Stream to discover their next audiobook. Authors, publishers and content partners come to us to explore how their work can be produced, prepared and presented in audio.",
  ],
  details: [
    {
      title: "What we deliver",
      body: "For listeners, a catalogue of audiobooks across fiction, mystery and thriller, historical fiction, romance and science fiction, each linked to the platform where it is listed. For creators and rights holders, six services: production, distribution, publishing partnerships, digital catalog management, marketing and promotion, and content discovery.",
    },
    {
      title: "Our focus in the audiobook industry",
      body: "We concentrate on the stages that decide whether an audiobook succeeds: a recording that is pleasant to listen to, a release package that meets each channel’s requirements, title records that stay accurate over time, and the curation and promotion that help listeners notice it.",
    },
    {
      title: "Why both sides matter",
      body: "Seeing what listeners search for and browse informs how we help prepare and describe a title. Understanding how audiobooks are made and released helps us present the catalogue clearly. Each side makes the other more useful.",
    },
  ],
  image: {
    src: "/images/about/about-book-stream.png",
    width: 941,
    height: 1672,
    alt: "The Book Stream logo mounted as illuminated lettering on a grey textured wall beside a wooden doorway",
  },
};

export const purpose = {
  eyebrow: "Our purpose",
  heading: "Meaningful listening for audiences. A clear route into audio for creators.",
  statement:
    "A good audiobook can turn a commute, a walk or a quiet evening into time spent inside a story. Our aim is to make more of those moments possible — from both directions.",
  sides: [
    {
      icon: Headphones,
      title: "For listeners",
      body: "We want finding the next listen to feel considered rather than overwhelming: titles grouped by genre, described clearly and easy to follow through to the platform where they are available.",
    },
    {
      icon: Feather,
      title: "For creators",
      body: "We want authors, publishers and rights holders to understand how their work could reach audiences through audio — what is involved, which options fit, and what a sensible first step looks like.",
    },
  ] satisfies { icon: LucideIcon; title: string; body: string }[],
};

export type AudienceRow = {
  icon: LucideIcon;
  title: string;
  need: string;
  response: string;
  link: { label: string; href: string };
};

export const whoWeServe = {
  eyebrow: "Who we serve",
  heading: "Different starting points, one focus on audio.",
  intro:
    "The people who come to Book Stream are looking for different things. Some want something good to listen to; others have a book, a list or a body of content and want to know what audio could do for it.",
  rows: [
    {
      icon: Headphones,
      title: "Listeners",
      need: "A straightforward way to find audiobooks that suit their interests and routine.",
      response: "A catalogue organised by genre, with search and a link from every title to the platform where it is listed.",
      link: { label: "Browse audiobooks", href: "/audiobooks" },
    },
    {
      icon: Feather,
      title: "Authors",
      need: "A clear, honest picture of what turning a book into an audiobook involves — and help with the parts they don’t want to manage alone.",
      response: "Production, distribution and marketing support scoped around a single title, starting with the materials and rights already in place.",
      link: { label: "Audiobook production", href: "/services/production" },
    },
    {
      icon: Building2,
      title: "Publishers",
      need: "A consistent process across many titles, whether that is a frontlist schedule, a backlist to convert or catalog records that have drifted.",
      response: "Publishing partnerships, catalog management and release preparation planned around the list rather than one book at a time.",
      link: { label: "Publishing partnerships", href: "/services/partnerships" },
    },
    {
      icon: Users,
      title: "Content partners",
      need: "Rights holders, agencies and organisations with spoken-word or long-form content that needs a route into audio.",
      response: "Support with production, cataloging and distribution, with scope and responsibilities agreed before any work begins.",
      link: { label: "All services", href: "/services" },
    },
    {
      icon: Library,
      title: "Libraries and retailers",
      need: "Audiobook selections that suit the people they serve, presented with accurate title information.",
      response: "A browsable catalogue to review titles by genre, and discovery and catalog services that keep collections clear and easy to explore.",
      link: { label: "Content discovery", href: "/services/discovery" },
    },
  ] satisfies AudienceRow[],
};

export type ApproachStep = { title: string; description: string; listeners: string; projects: string };

export const approach = {
  eyebrow: "Our approach",
  heading: "A practical approach to discovery and project support.",
  intro:
    "Whether someone is looking for a listen or planning an audiobook, the same four steps keep the work focused on what actually helps.",
  steps: [
    {
      title: "Understand the need",
      description: "Start with what someone is trying to do, not with a fixed package.",
      listeners: "The genres, moods and moments they listen in.",
      projects: "The title or list, its current format, the rights in place and the goal.",
    },
    {
      title: "Identify suitable options",
      description: "Narrow the possibilities down to the ones that genuinely fit.",
      listeners: "Titles grouped by genre, so comparable stories sit side by side.",
      projects: "Which of our services apply — and which are not needed yet.",
    },
    {
      title: "Prepare the next steps",
      description: "Make the way forward clear before anything is committed.",
      listeners: "Clear title details and a direct link to where each audiobook is listed.",
      projects: "Agreed scope, responsibilities, materials and review points.",
    },
    {
      title: "Support discovery or delivery",
      description: "Follow through in the way each service calls for.",
      listeners: "Genre pages and search that make it easy to come back and keep exploring.",
      projects: "Work shared at agreed checkpoints, so it can be reviewed and signed off.",
    },
  ] satisfies ApproachStep[],
};

export type Principle = { icon: LucideIcon; title: string; description: string; inPractice: string };

export const principles = {
  eyebrow: "What guides our work",
  heading: "Four principles we return to.",
  items: [
    {
      icon: Gem,
      title: "Quality",
      description: "Care for the details that shape a listening experience.",
      inPractice:
        "Recordings, cover artwork and title records are reviewed against what the project needs, and changes are agreed before anything is signed off.",
    },
    {
      icon: ScanText,
      title: "Clarity",
      description: "Plain explanations of what is involved and what happens next.",
      inPractice:
        "Scope, responsibilities and rights are agreed at the start, and each service page sets out what to prepare.",
    },
    {
      icon: Accessibility,
      title: "Accessibility",
      description: "Audio opens stories to people who prefer, or need, to listen.",
      inPractice:
        "We keep our pages readable and easy to navigate, and treat audio as a way to bring books to more people — not as an afterthought to print.",
    },
    {
      icon: Compass,
      title: "Thoughtful discovery",
      description: "Helping the right stories meet the right listeners.",
      inPractice:
        "Titles are organised by genre and described accurately, so listeners can judge quickly whether a story is for them.",
    },
  ] satisfies Principle[],
};

export const closing = {
  heading: "Let’s Start With Your Story",
  body: "Looking for your next listen, or thinking about an audiobook of your own? Explore the catalogue, or tell us where your project stands and we’ll suggest a sensible first step.",
  primary: { label: "Explore Audiobooks", href: "/audiobooks" },
  secondary: { label: "Talk to Our Team" },
};
