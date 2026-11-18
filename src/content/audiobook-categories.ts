/**
 * Pages behind the Audiobooks mega dropdown (/audiobooks/[slug]).
 *
 * Every section lists books by slug from the catalogue (src/content/catalog.ts). Membership is
 * decided from each book's source information (cover text, listing URL, series line), never to
 * fill space. A book appears at most once per page. Only categories the catalogue can populate
 * have a page.
 */

export type CategorySection = {
  id: string;
  title: string;
  description: string;
  slugs: string[];
};

export type AudiobookCategory = {
  slug: string;
  name: string;
  /** Short line used in navigation lists and cards. */
  summary: string;
  heading: string;
  intro: string;
  seo: { title: string; description: string };
  /** Shown above the sections when the page needs context about what it contains. */
  note?: string;
  sections: CategorySection[];
};

export const audiobookCategories: AudiobookCategory[] = [
  {
    slug: "fiction",
    name: "Fiction",
    summary: "Classics, retellings, westerns and contemporary novels.",
    heading: "Fiction Audiobooks",
    intro:
      "Novels and stories to settle into, from enduring classics and Pride and Prejudice retellings to frontier westerns and modern dramas about marriage and second chances.",
    seo: {
      title: "Fiction Audiobooks",
      description:
        "Browse fiction audiobooks on Book Stream: timeless classics, Pride and Prejudice variations, marriage dramas, westerns and standalone novels.",
    },
    sections: [
      {
        id: "classics",
        title: "Timeless Classics",
        description: "Landmark novels, poetry and satire, from Austen and Brontë to Dostoevsky, Dante and Orwell.",
        slugs: [
          "pride-and-prejudice",
          "wuthering-heights",
          "crime-and-punishment",
          "the-brothers-karamazov",
          "the-divine-comedy",
          "1984",
          "treasure-island",
          "leave-it-to-psmith",
          "elogio-da-loucura",
        ],
      },
      {
        id: "pride-and-prejudice",
        title: "Pride and Prejudice, Reimagined",
        description: "Variations and new stories built around Jane Austen’s best-known characters.",
        slugs: [
          "caroline-bingleys-grand-plan",
          "elizabeth-proposes",
          "elizabeths-acquaintance",
          "fortuitous-encounters",
          "roses-from-pemberley",
          "mine-mine-mine",
          "the-detour",
          "the-grandfather",
          "a-saint-of-longbourn",
        ],
      },
      {
        id: "marriage-drama",
        title: "Marriage, Betrayal & Second Acts",
        description: "Domestic dramas about broken trust, revenge and deciding what comes next.",
        slugs: [
          "he-sent-me-the-wrong-text",
          "my-husband-cheated-with-the-nanny",
          "my-husband-cheats-with-my-best-friend",
          "the-birthday-trip-for-two",
          "not-my-undergarment",
          "newlywed-marriage-in-crisis",
          "unwanted-approach",
        ],
      },
      {
        id: "westerns-and-novels",
        title: "Westerns, Series & Standalone Novels",
        description: "Frontier adventures, ongoing series and single novels across a range of styles.",
        slugs: [
          "the-blacksmith",
          "scott-jackson",
          "frontier-mail-order-brides",
          "mail-order-blessing",
          "the-practical-pretender",
          "chasing-shadows",
          "the-return",
          "snowflake-creek-box-set",
          "an-unexpected-family",
          "unexpected-ascension",
        ],
      },
    ],
  },
  {
    slug: "mystery-thriller",
    name: "Mystery & Thriller",
    summary: "Cozy mysteries, detective fiction, suspense and true crime.",
    heading: "Mystery & Thriller Audiobooks",
    intro:
      "Puzzles, suspense and crime, from small-town cozy mysteries and period detective fiction to wilderness suspense and true crime.",
    seo: {
      title: "Mystery & Thriller Audiobooks",
      description:
        "Browse mystery and thriller audiobooks on Book Stream: cozy mysteries, classic detective fiction, suspense and true crime.",
    },
    sections: [
      {
        id: "cozy",
        title: "Cozy Mysteries",
        description: "Bakeries, beach towns and book clubs, with a murder to solve in each.",
        slugs: ["fall-for-murder", "blueberries-and-betrayal", "death-and-sweets", "murder-in-the-summer-house", "secrets-and-scallywags"],
      },
      {
        id: "detective",
        title: "Classic & Period Detective Fiction",
        description: "Traditional crime stories, including a mystery set in 1951.",
        slugs: ["the-crime-at-black-dudley", "the-devon-murders"],
      },
      {
        id: "suspense",
        title: "Suspense & Wilderness Mysteries",
        description: "Tense stories set far from help, from a wilderness series opener to a short suspense novella.",
        slugs: ["the-valley-of-lost-children", "the-bind"],
      },
      {
        id: "true-crime",
        title: "True Crime & Real-Life Mysteries",
        description: "Nonfiction about real cases and unexplained disappearances.",
        slugs: ["murder-most-vile-volume-50", "into-nowhere"],
      },
    ],
  },

  {
    slug: "history",
    name: "History",
    summary: "Historical fiction set in Regency England, the American frontier and beyond.",
    heading: "History & Historical Fiction",
    intro:
      "Stories set in earlier eras: Regency drawing rooms, Victorian England, the post-Civil War frontier and Britain in 1951.",
    note: "The collection doesn’t include history nonfiction yet. These titles are historical fiction, chosen because their source descriptions name a historical setting.",
    seo: {
      title: "History & Historical Fiction Audiobooks",
      description:
        "Historical fiction audiobooks on Book Stream: Regency and Victorian romance, Pride and Prejudice variations, frontier westerns and a 1951 mystery.",
    },
    sections: [
      {
        id: "regency-victorian",
        title: "Regency & Victorian Romance",
        description: "Love stories set among dukes, drawing rooms and Victorian society.",
        slugs: ["the-duke-of-frost", "a-saint-of-longbourn", "the-orphaned-songbird"],
      },
      {
        id: "austen-era",
        title: "Pride and Prejudice Variations",
        description: "Retellings that return to Austen’s Regency England.",
        slugs: [
          "caroline-bingleys-grand-plan",
          "elizabeth-proposes",
          "elizabeths-acquaintance",
          "fortuitous-encounters",
          "roses-from-pemberley",
          "mine-mine-mine",
          "the-detour",
          "the-grandfather",
        ],
      },
      {
        id: "frontier",
        title: "The American Frontier",
        description: "Westerns and frontier stories, including a post-Civil War saga.",
        slugs: ["scott-jackson", "the-blacksmith", "frontier-mail-order-brides"],
      },
      {
        id: "mid-century",
        title: "Mid-Century Mystery",
        description: "Detective fiction set in postwar Britain.",
        slugs: ["the-devon-murders"],
      },
    ],
  },
  {
    slug: "romance",
    name: "Romance",
    summary: "Billionaires, second chances, shifters, sports and Regency love stories.",
    heading: "Romance Audiobooks",
    intro:
      "The largest part of the collection: billionaire and mafia romance, second chances, shifters and sci-fi mates, holiday and sports romance, and love stories from earlier eras.",
    seo: {
      title: "Romance Audiobooks",
      description:
        "Browse romance audiobooks on Book Stream: billionaire, mafia and MC romance, second chances, paranormal and sci-fi romance, sports, holiday and historical love stories.",
    },
    sections: [
      {
        id: "billionaire",
        title: "Billionaire, Mafia & MC Romance",
        description: "Powerful heroes, contracts and forbidden attraction.",
        slugs: [
          "her-sizzling-billionaire",
          "obeying-mr-kingsley",
          "the-billionaires-cupcake",
          "accidental-baby-for-the-billionaire",
          "fake-dating-my-baby-daddy",
          "pregnant-by-the-contract",
          "stolen-and-bred-by-the-bratva",
          "noise-upstairs",
          "vipers-desire",
        ],
      },
      {
        id: "second-chances",
        title: "Second Chances & Sweet Revenge",
        description: "Marriages in crisis, betrayals answered and love that gets another try.",
        slugs: [
          "my-billionaire-husband-signed-our-divorce",
          "ruined-by-her-billionaire-husband",
          "he-rejected-me-for-my-twin-sister",
          "maid-of-dishonor",
          "the-house-key-he-gave-my-best-friend",
        ],
      },
      {
        id: "paranormal",
        title: "Shifter, Paranormal & Sci-Fi Romance",
        description: "Bears, packs, angels and alien mates.",
        slugs: ["torin", "pack-position", "heavens-fall", "guarding-the-rock-star", "aliens-chosen-mate", "kade"],
      },
      {
        id: "contemporary-historical",
        title: "Contemporary, Sports, Holiday & Historical Romance",
        description: "Hockey and football, Christmas and Valentine’s, ranch towns, faith-filled love stories and Regency and Victorian settings.",
        slugs: [
          "shot-through-the-heart",
          "unthinkable",
          "breakaway",
          "fourth-and-long",
          "through-the-smoke",
          "christmas-in-tennessee",
          "his-curvy-christmas-treat",
          "a-season-of-love",
          "vintage-vine",
          "pure",
          "ours",
          "yours",
          "my-secret-crush",
          "moms-boyfriend",
          "the-duke-of-frost",
          "a-saint-of-longbourn",
          "the-orphaned-songbird",
          "an-outcasts-wish",
          "an-indoctrinated-man",
          "a-secret-she-carried",
          "my-inner-demons",
          "m",
          "furgotten",
        ],
      },
    ],
  },
  {
    slug: "science-fiction",
    name: "Science Fiction",
    summary: "Sci-fi series, dystopia, post-apocalyptic survival and sci-fi romance.",
    heading: "Science Fiction Audiobooks",
    intro: "Ongoing science fiction series, a dystopian classic, post-apocalyptic survival and romance among the stars.",
    seo: {
      title: "Science Fiction Audiobooks",
      description:
        "Browse science fiction audiobooks on Book Stream: sci-fi series, Orwell’s 1984, post-apocalyptic survival and sci-fi romance.",
    },
    sections: [
      {
        id: "series",
        title: "Science Fiction Series",
        description: "Start a series at book one or continue a long-running saga.",
        slugs: ["ignite", "not-alone", "unbind"],
      },
      {
        id: "dystopia",
        title: "Dystopian Classic",
        description: "George Orwell’s vision of surveillance and control.",
        slugs: ["1984"],
      },
      {
        id: "apocalypse",
        title: "Apocalypse & Survival",
        description: "Life after a viral outbreak.",
        slugs: ["zombie-virus-lyrv-27-hope"],
      },
      {
        id: "sci-fi-romance",
        title: "Sci-Fi Romance",
        description: "Love stories with alien mates and unexpected bonds.",
        slugs: ["kade", "aliens-chosen-mate"],
      },
    ],
  },

];

export function getAudiobookCategory(slug: string) {
  return audiobookCategories.find((c) => c.slug === slug);
}

export function categoryBookCount(category: AudiobookCategory) {
  return new Set(category.sections.flatMap((s) => s.slugs)).size;
}
