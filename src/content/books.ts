/**
 * Audiobook collection shown on the homepage.
 *
 * Source: public/https.docx — an ordered list of cover image -> Amazon URL -> "book N" label.
 * Each record keeps one source entry together (title, author, cover, category, URL), so a cover
 * is never paired with another book's title or link. `sourceEntry` is the entry's position in
 * that document.
 *
 * - Titles and authors are transcribed from the cover artwork in the document.
 * - Descriptions use only what the document provides (cover text and the listing URL); no plot
 *   details are added beyond that.
 * - Cover files are the document's embedded images, copied to src/assets/covers/.
 * - Entry 8 ("Echoes From Within", Carol Dawn) is excluded: its URL is truncated in the source
 *   and has no product ID, so it cannot be linked.
 */

import type { StaticImageData } from "next/image";

import cover_unbind from "@/assets/covers/unbind.jpg";
import cover_an_indoctrinated_man from "@/assets/covers/an-indoctrinated-man.jpg";
import cover_the_orphaned_songbird from "@/assets/covers/the-orphaned-songbird.webp";
import cover_ignite from "@/assets/covers/ignite.webp";
import cover_not_alone from "@/assets/covers/not-alone.webp";
import cover_ours from "@/assets/covers/ours.webp";
import cover_an_outcasts_wish from "@/assets/covers/an-outcasts-wish.webp";
import cover_unwanted_approach from "@/assets/covers/unwanted-approach.webp";
import cover_the_practical_pretender from "@/assets/covers/the-practical-pretender.jpg";
import cover_my_inner_demons from "@/assets/covers/my-inner-demons.jpg";
import cover_a_secret_she_carried from "@/assets/covers/a-secret-she-carried.jpg";
import cover_the_bind from "@/assets/covers/the-bind.jpg";
import cover_m from "@/assets/covers/m.jpg";
import cover_yours from "@/assets/covers/yours.jpg";
import cover_pure from "@/assets/covers/pure.jpg";
import cover_furgotten from "@/assets/covers/furgotten.jpg";
import cover_into_nowhere from "@/assets/covers/into-nowhere.jpg";
import cover_1984 from "@/assets/covers/1984.webp";
import cover_chasing_shadows from "@/assets/covers/chasing-shadows.webp";
import cover_through_the_smoke from "@/assets/covers/through-the-smoke.jpg";
import cover_kade from "@/assets/covers/kade.jpg";
import cover_the_return from "@/assets/covers/the-return.webp";
import cover_snowflake_creek_box_set from "@/assets/covers/snowflake-creek-box-set.jpg";
import cover_treasure_island from "@/assets/covers/treasure-island.jpg";
import cover_fourth_and_long from "@/assets/covers/fourth-and-long.webp";

export const bookCategories = {
  fiction: "Fiction",
  romance: "Romance",
  "science-fiction": "Science Fiction",
  suspense: "Suspense & Horror",
  classics: "Classics",
  nonfiction: "Nonfiction",
  /* Used by the full catalogue (src/content/catalog.ts); the homepage set does not use these. */
  mystery: "Mystery & Crime",
  fantasy: "Fantasy",
  /** Source documents do not state a genre for these titles. */
  general: "General",
} as const;

export type BookCategory = keyof typeof bookCategories;

export type Book = {
  /** Position of the entry in public/https.docx. */
  sourceEntry: number;
  slug: string;
  title: string;
  author?: string;
  category: BookCategory;
  description: string;
  cover: StaticImageData;
  /** Destination URL exactly as supplied in the source document. */
  href: string;
};

export const books: Book[] = [
  {
    sourceEntry: 1,
    slug: "unbind",
    title: "Unbind",
    author: "Timothy Ellis",
    category: "science-fiction",
    description: "Book fifteen in the Unbound Mercs science fiction series.",
    cover: cover_unbind,
    href: "https://www.amazon.com/Audible-Studios-on-Brilliance-Unbind/dp/B0F1YZQ84Q/ref=tmm_aud_swatch_0?_encoding=UTF8&dib_tag=se&dib=eyJ2IjoiMSJ9.qcMEbQr6JEy5OzjX8TZw2SaEjR-X-ialgyU02-0qv-YaHRUo5JvkZlSPA0ROfB14A1RNsQgErHdxYLrLFzZXkR-u7FJdbnm6ytJbF5r4rjVQ8se8Fgw-7Sw_o9dHOWRwh5uVOm7yohlZrU2g964y0Q.aaj-J9ApBE9jzE43-__F81kQnJod5Z4c98Beb_smjYE&qid=1794441961&sr=1-1",
  },
  {
    sourceEntry: 2,
    slug: "an-indoctrinated-man",
    title: "An Indoctrinated Man",
    author: "Lavinia Lewis",
    category: "romance",
    description: "Book two in the Desert Sanctuary series by Lavinia Lewis.",
    cover: cover_an_indoctrinated_man,
    href: "https://www.amazon.com/Audible-An-Indoctrinated-Man/dp/B0F3W333B9/ref=tmm_aud_swatch_0?_encoding=UTF8&dib_tag=se&dib=eyJ2IjoiMSJ9.qcMEbQr6JEy5OzjX8TZw2SaEjR-X-ialgyU02-0qv-YaHRUo5JvkZlSPA0ROfB14A1RNsQgErHdxYLrLFzZXkR-u7FJdbnm6ytJbF5r4rjVQ8se8Fgw-7Sw_o9dHOWRwh5uVOm7yohlZrU2g964y0Q.aaj-J9ApBE9jzE43-__F81kQnJod5Z4c98Beb_smjYE&qid=1794442102&sr=1-3",
  },
  {
    sourceEntry: 3,
    slug: "the-orphaned-songbird",
    title: "The Orphaned Songbird",
    author: "Eliza Lawley",
    category: "romance",
    description: "A Victorian romance by Eliza Lawley.",
    cover: cover_the_orphaned_songbird,
    href: "https://www.amazon.com/The-Orphaned-Songbird/dp/B095KYTKRS/ref=sr_1_7?crid=3BEEXSC5GZI5F&dib=eyJ2IjoiMSJ9.qcMEbQr6JEy5OzjX8TZw2SaEjR-X-ialgyU02-0qv-YaHRUo5JvkZlSPA0ROfB14A1RNsQgErHdxYLrLFzZXkR-u7FJdbnm6ytJbF5r4rjVQ8se8Fgw-7Sw_o9dHOWRwh5uVOm7yohlZrU2g964y0Q.aaj-J9ApBE9jzE43-__F81kQnJod5Z4c98Beb_smjYE&dib_tag=se&keywords=Indepented+Published+Audio+book&qid=1794442102&s=books&sprefix=indepented+published+audio+book%2Cstripbooks-intl-ship%2C296&sr=1-7",
  },
  {
    sourceEntry: 4,
    slug: "ignite",
    title: "Ignite",
    author: "Daniel Young",
    category: "science-fiction",
    description: "Book one of the Blackout science fiction series.",
    cover: cover_ignite,
    href: "https://www.amazon.com/Audible-Ignite/dp/B0CY3H1PPY/ref=tmm_aud_swatch_0?_encoding=UTF8&dib_tag=se&dib=eyJ2IjoiMSJ9.RhMkvQx0lafqBWyfio_0ts2wrF2ronMrXezh2JGMZ3g6vjlQOqqlRZ-qhZnsJEt7ErlTnbJGvLboYaUs7VaQS0b-Chghrz1xSYH3oogVdxnG6iK0OLSkNej1zsAQ9a1dDM0G52eTaEahbzG46EJutMWc73f1xrnZMn_8dZF40FfuCqczQoD9A8vKNoSwG0gKGPgwdGFjOarTBLuHokaP9O0GVVAWvZAJJJXn_MCz6EU.FnWw45p9OatcrNVwl5WIfmQarRw510U8f794RgGxwM4&qid=1794442102&sr=1-10-catcorr",
  },
  {
    sourceEntry: 5,
    slug: "not-alone",
    title: "Not Alone",
    author: "SD King",
    category: "science-fiction",
    description: "Book two in the Ark science fiction series.",
    cover: cover_not_alone,
    href: "https://www.amazon.com/Audible-Not-Alone/dp/B0CLVFZWND/ref=tmm_aud_swatch_0?_encoding=UTF8&dib_tag=se&dib=eyJ2IjoiMSJ9.RhMkvQx0lafqBWyfio_0ts2wrF2ronMrXezh2JGMZ3g6vjlQOqqlRZ-qhZnsJEt7ErlTnbJGvLboYaUs7VaQS0b-Chghrz1xSYH3oogVdxnG6iK0OLSkNej1zsAQ9a1dDM0G52eTaEahbzG46EJutMWc73f1xrnZMn_8dZF40FfuCqczQoD9A8vKNoSwG0gKGPgwdGFjOarTBLuHokaP9O0GVVAWvZAJJJXn_MCz6EU.FnWw45p9OatcrNVwl5WIfmQarRw510U8f794RgGxwM4&qid=1794442102&sr=1-14-catcorr",
  },
  {
    sourceEntry: 6,
    slug: "ours",
    title: "Ours",
    author: "Portia Moore",
    category: "romance",
    description: "A contemporary romance with a simple promise: I choose you.",
    cover: cover_ours,
    href: "https://www.amazon.com/Audible-Ours/dp/B0CRHZJ2ZX/ref=tmm_aud_swatch_0?_encoding=UTF8&dib_tag=se&dib=eyJ2IjoiMSJ9.RhMkvQx0lafqBWyfio_0ts2wrF2ronMrXezh2JGMZ3g6vjlQOqqlRZ-qhZnsJEt7ErlTnbJGvLboYaUs7VaQS0b-Chghrz1xSYH3oogVdxnG6iK0OLSkNej1zsAQ9a1dDM0G52eTaEahbzG46EJutMWc73f1xrnZMn_8dZF40FfuCqczQoD9A8vKNoSwG0gKGPgwdGFjOarTBLuHokaP9O0GVVAWvZAJJJXn_MCz6EU.FnWw45p9OatcrNVwl5WIfmQarRw510U8f794RgGxwM4&qid=1794442102&sr=1-15-catcorr",
  },
  {
    sourceEntry: 7,
    slug: "an-outcasts-wish",
    title: "An Outcast’s Wish",
    author: "Aileen Adams",
    category: "romance",
    description: "A Highland Heartbeats romance, where some memories are best left forgotten.",
    cover: cover_an_outcasts_wish,
    href: "https://www.amazon.com/Audible-An-Outcasts-Wish/dp/B0CPLHSHBM/ref=tmm_aud_swatch_0?_encoding=UTF8&dib_tag=se&dib=eyJ2IjoiMSJ9.RhMkvQx0lafqBWyfio_0ts2wrF2ronMrXezh2JGMZ3g6vjlQOqqlRZ-qhZnsJEt7ErlTnbJGvLboYaUs7VaQS0b-Chghrz1xSYH3oogVdxnG6iK0OLSkNej1zsAQ9a1dDM0G52eTaEahbzG46EJutMWc73f1xrnZMn_8dZF40FfuCqczQoD9A8vKNoSwG0gKGPgwdGFjOarTBLuHokaP9O0GVVAWvZAJJJXn_MCz6EU.FnWw45p9OatcrNVwl5WIfmQarRw510U8f794RgGxwM4&qid=1794442102&sr=1-17-catcorr",
  },
  {
    sourceEntry: 9,
    slug: "unwanted-approach",
    title: "Unwanted Approach",
    author: "Annichelle Poe",
    category: "fiction",
    description: "A marriage in crisis and a dream left empty. Where do they go from here?",
    cover: cover_unwanted_approach,
    href: "https://www.amazon.com/Audible-Unwanted-Approach/dp/B0HK2QPN5M/ref=sr_1_4?crid=3BEEXSC5GZI5F&dib=eyJ2IjoiMSJ9.RhMkvQx0lafqBWyfio_0tvyZsLw5GWtphe895_RphqZCIpF0YD_6-Bn81qv2KFbEyaZJwK1b3Qi3jpxkbZAzvDZAGaVAczcpf7qQA-ANLTdGUw2LIcADV5UNLbX5lAwwafdO5qD9gNmvH695qr1ccVJjJJ_G-_CotzvXBkTA1_6Qbv1xYYdjtc2HYUTkhRWyBcIqjaNiokAIR-26nswTlkkdO7HbtLZhm85nx6vPsu4.vDLQtO-uekw_rkHToxAkTy29s5jDShCaH4kywGn_Nv4&dib_tag=se&keywords=Indepented+Published+Audio+book&qid=1794443092&rnid=2941120011&s=audible&sprefix=indepented+published+audio+book%2Cstripbooks-intl-ship%2C296&sr=1-4&xpid=I8_aAhG_m89YS",
  },
  {
    sourceEntry: 10,
    slug: "the-practical-pretender",
    title: "The Practical Pretender",
    author: "Danni Roan",
    category: "fiction",
    description: "A novel from The Book Club series by Danni Roan.",
    cover: cover_the_practical_pretender,
    href: "https://www.amazon.com/Audible-The-Practical-Pretender/dp/B0CSQMJYF8/ref=sr_1_18?crid=3BEEXSC5GZI5F&dib=eyJ2IjoiMSJ9.Xlm6B0siU2WaWjUmwg-Ibcx3MrzR4d4LudItsk8BrB4zc1RxH7-2KlfZ1EQdHmwpyb3ekOZTNCGUlT_p0MycBXOqdmDV_xkFgvwkHNAdBgIVcyUsiaQtorioD7PHue0unJ2eBPVJZ4wuE8N_B2H5FmVLhiKf6jHnlaRDS6Ooqiib6SVCTQJp1mfKS6IPVWgNwArBGyKSWEb7cI1R8tXt1D-A8eJlD3VWXuCznbpsKWE.31AT5eZayRbmZ91ecyQ_ulphiwosGfN7kI3kOML1oJk&dib_tag=se&keywords=Indepented+Published+Audio+book&qid=1794443134&rnid=2941120011&s=audible&sprefix=indepented+published+audio+book%2Cstripbooks-intl-ship%2C296&sr=1-18&xpid=I8_aAhG_m89YS",
  },
  {
    sourceEntry: 11,
    slug: "my-inner-demons",
    title: "My Inner Demons",
    author: "Mimi Wilde",
    category: "romance",
    description: "A romance audiobook by Mimi Wilde.",
    cover: cover_my_inner_demons,
    href: "https://www.amazon.com/Audible-MY-INNER-DEMONS/dp/B0D2MY8VJC/ref=sr_1_20?crid=3BEEXSC5GZI5F&dib=eyJ2IjoiMSJ9.Xlm6B0siU2WaWjUmwg-Ibcx3MrzR4d4LudItsk8BrB4zc1RxH7-2KlfZ1EQdHmwpyb3ekOZTNCGUlT_p0MycBXOqdmDV_xkFgvwkHNAdBgIVcyUsiaQtorioD7PHue0unJ2eBPVJZ4wuE8N_B2H5FmVLhiKf6jHnlaRDS6Ooqiib6SVCTQJp1mfKS6IPVWgNwArBGyKSWEb7cI1R8tXt1D-A8eJlD3VWXuCznbpsKWE.31AT5eZayRbmZ91ecyQ_ulphiwosGfN7kI3kOML1oJk&dib_tag=se&keywords=Indepented+Published+Audio+book&qid=1794443134&rnid=2941120011&s=audible&sprefix=indepented+published+audio+book%2Cstripbooks-intl-ship%2C296&sr=1-20&xpid=I8_aAhG_m89YS",
  },
  {
    sourceEntry: 12,
    slug: "a-secret-she-carried",
    title: "A Secret She Carried",
    author: "Sparsha Kadri",
    category: "romance",
    description: "A romance by Sparsha Kadri.",
    cover: cover_a_secret_she_carried,
    href: "https://www.amazon.com/Audible-Studios-on-Brilliance-Carried/dp/B0D9CMW6Z3/ref=sr_1_21?crid=3BEEXSC5GZI5F&dib=eyJ2IjoiMSJ9.Xlm6B0siU2WaWjUmwg-Ibcx3MrzR4d4LudItsk8BrB4zc1RxH7-2KlfZ1EQdHmwpyb3ekOZTNCGUlT_p0MycBXOqdmDV_xkFgvwkHNAdBgIVcyUsiaQtorioD7PHue0unJ2eBPVJZ4wuE8N_B2H5FmVLhiKf6jHnlaRDS6Ooqiib6SVCTQJp1mfKS6IPVWgNwArBGyKSWEb7cI1R8tXt1D-A8eJlD3VWXuCznbpsKWE.31AT5eZayRbmZ91ecyQ_ulphiwosGfN7kI3kOML1oJk&dib_tag=se&keywords=Indepented+Published+Audio+book&qid=1794443134&rnid=2941120011&s=audible&sprefix=indepented+published+audio+book%2Cstripbooks-intl-ship%2C296&sr=1-21&xpid=I8_aAhG_m89YS",
  },
  {
    sourceEntry: 13,
    slug: "the-bind",
    title: "The Bind",
    author: "S.K. Epperson",
    category: "suspense",
    description: "A novella by S.K. Epperson.",
    cover: cover_the_bind,
    href: "https://www.amazon.com/Audible-The-Bind/dp/B0CW55HT22/ref=sr_1_32?crid=3BEEXSC5GZI5F&dib=eyJ2IjoiMSJ9.Xlm6B0siU2WaWjUmwg-Ibcx3MrzR4d4LudItsk8BrB4zc1RxH7-2KlfZ1EQdHmwpyb3ekOZTNCGUlT_p0MycBXOqdmDV_xkFgvwkHNAdBgIVcyUsiaQtorioD7PHue0unJ2eBPVJZ4wuE8N_B2H5FmVLhiKf6jHnlaRDS6Ooqiib6SVCTQJp1mfKS6IPVWgNwArBGyKSWEb7cI1R8tXt1D-A8eJlD3VWXuCznbpsKWE.31AT5eZayRbmZ91ecyQ_ulphiwosGfN7kI3kOML1oJk&dib_tag=se&keywords=Indepented+Published+Audio+book&qid=1794443134&rnid=2941120011&s=audible&sprefix=indepente",
  },
  {
    sourceEntry: 14,
    slug: "m",
    title: "M",
    author: "Gwendolen Hope",
    category: "romance",
    description: "A romance audiobook by Gwendolen Hope.",
    cover: cover_m,
    href: "https://www.amazon.com/Audible-M/dp/B0FXF35WH2/ref=sr_1_37?crid=3BEEXSC5GZI5F&dib=eyJ2IjoiMSJ9.lXdNArkgVCHtqveTYYIf3CihbxrovtSvxYRVISQY_T-5OzFtjziIGRZYFdJwALV9n3fVXleKYwKUWcUVipN9AoO0cAdRxGJq9Fw0a0LvGux1idbEh2hY_wgcWNMnf326yzspv8LS2muC7v6QKG2h-r89YxNUQsINsDzIt85SnIziqS5XhXL3phWid7TXxkRN9pYdXJyKaJbN5_gd7-hbHIyXG-PxIOSD_Gmneq9QxmY.QVxiS2TskK8HsyeL0EJ2E6BBpFBQo7cfx-eaZ3FHd08&dib_tag=se&keywords=Indepented+Published+Audio+book&qid=1794443264&rnid=2941120011&s=audible&sprefix=indepented+published+audio+book%2Cstripbooks-intl-ship%2C296&sr=1-37&xpid=I8_aAhG_m89YS",
  },
  {
    sourceEntry: 15,
    slug: "yours",
    title: "Yours",
    author: "Portia Moore",
    category: "romance",
    description: "A contemporary romance: I’ll be his everything.",
    cover: cover_yours,
    href: "https://www.amazon.com/Audible-Yours/dp/B0CR9QB24T/ref=sr_1_39?crid=3BEEXSC5GZI5F&dib=eyJ2IjoiMSJ9.lXdNArkgVCHtqveTYYIf3CihbxrovtSvxYRVISQY_T-5OzFtjziIGRZYFdJwALV9n3fVXleKYwKUWcUVipN9AoO0cAdRxGJq9Fw0a0LvGux1idbEh2hY_wgcWNMnf326yzspv8LS2muC7v6QKG2h-r89YxNUQsINsDzIt85SnIziqS5XhXL3phWid7TXxkRN9pYdXJyKaJbN5_gd7-hbHIyXG-PxIOSD_Gmneq9QxmY.QVxiS2TskK8HsyeL0EJ2E6BBpFBQo7cfx-eaZ3FHd08&dib_tag=se&keywords=Indepented+Published+Audio+book&qid=1794443264&rnid=2941120011&s=audible&sprefix=indepented+published+audio+book%2Cstripbooks-intl-ship%2C296&sr=1-39&xpid=I8_aAhG_m89YS",
  },
  {
    sourceEntry: 16,
    slug: "pure",
    title: "Pure",
    author: "Everlee Whitman",
    category: "romance",
    description: "Book four of the Tanner Creek Ranch Romance series.",
    cover: cover_pure,
    href: "https://www.amazon.com/Audible-Pure/dp/B0CTDPYVY6/ref=sr_1_41?crid=3BEEXSC5GZI5F&dib=eyJ2IjoiMSJ9.lXdNArkgVCHtqveTYYIf3CihbxrovtSvxYRVISQY_T-5OzFtjziIGRZYFdJwALV9n3fVXleKYwKUWcUVipN9AoO0cAdRxGJq9Fw0a0LvGux1idbEh2hY_wgcWNMnf326yzspv8LS2muC7v6QKG2h-r89YxNUQsINsDzIt85SnIziqS5XhXL3phWid7TXxkRN9pYdXJyKaJbN5_gd7-hbHIyXG-PxIOSD_Gmneq9QxmY.QVxiS2TskK8HsyeL0EJ2E6BBpFBQo7cfx-eaZ3FHd08&dib_tag=se&keywords=Indepented+Published+Audio+book&qid=1794443264&rnid=2941120011&s=audible&sprefix=indepented+published+audio+book%2Cstripbooks-intl-ship%2C296&sr=1-41&xpid=I8_aAhG_m89YS",
  },
  {
    sourceEntry: 17,
    slug: "furgotten",
    title: "FURgotten",
    author: "Kate Kent",
    category: "romance",
    description: "A romance from the Sexy in Fur series.",
    cover: cover_furgotten,
    href: "https://www.amazon.com/Audible-FURgotten/dp/B0CQF3BCJC/ref=sr_1_48?crid=3BEEXSC5GZI5F&dib=eyJ2IjoiMSJ9.lXdNArkgVCHtqveTYYIf3CihbxrovtSvxYRVISQY_T-5OzFtjziIGRZYFdJwALV9n3fVXleKYwKUWcUVipN9AoO0cAdRxGJq9Fw0a0LvGux1idbEh2hY_wgcWNMnf326yzspv8LS2muC7v6QKG2h-r89YxNUQsINsDzIt85SnIziqS5XhXL3phWid7TXxkRN9pYdXJyKaJbN5_gd7-hbHIyXG-PxIOSD_Gmneq9QxmY.QVxiS2TskK8HsyeL0EJ2E6BBpFBQo7cfx-eaZ3FHd08&dib_tag=se&keywords=Indepented+Published+Audio+book&qid=1794443264&rnid=2941120011&s=audible&sprefix=indepented+published+audio+book%2Cstripbooks-intl-ship%2C296&sr=1-48&xpid=I8_aAhG_m89YS",
  },
  {
    sourceEntry: 18,
    slug: "into-nowhere",
    title: "Into Nowhere",
    author: "Thomas Spriggs",
    category: "nonfiction",
    description: "A look at the pattern of disappearances in rural America.",
    cover: cover_into_nowhere,
    href: "https://www.amazon.com/Audible-Studios-on-Brilliance-Nowhere/dp/B0F4PQDFDF/ref=sr_1_72?crid=3BEEXSC5GZI5F&dib=eyJ2IjoiMSJ9.Mb4GLwzdBmYaTe83dcbNb5Y0O4h09nZcIoCQ_y8NT8_WE5vHDJOG5Wsj6eRHtz40KR5jn1xrAWxLjrWnCLdiKK-q9FAXY0PafojvnYnLkLnqr6pF9FN6bZf-b0HwKeGOY5DUA0YfHhdL_zWXVGT8IMlm7rxnUGwxETLNO_WNiY4.J3mrf7X8qQwzti5FBMC1oIQ-gnFDeOgayW2pzfRYQ9I&dib_tag=se&keywords=Indepented+Published+Audio+book&qid=1794443453&refinements=p_n_feature_twelve_browse-bin%3A18685552011&rnid=18685551011&s=audible&sprefix=indepented+published+audio+book%2Cstripbooks-intl-ship%2C296&sr=1-72&xpid=I8_aAhG_m89YS",
  },
  {
    sourceEntry: 19,
    slug: "1984",
    title: "1984",
    author: "George Orwell",
    category: "classics",
    description: "George Orwell’s classic novel, in audio.",
    cover: cover_1984,
    href: "https://www.amazon.com/Audible-1984/dp/B0HQH2XK2S/ref=sr_1_1?crid=CY778FGSA4NQ&dib=eyJ2IjoiMSJ9.4LP3IKxkR_CEkH5apd1wiEVLPSEr8PN_BBz5EwcDH0N-yW8xR7yYaUtyJxziNSYlsR-aFRDsXBIp37kBzbW7-eCLWxSk8wVwUPMfUQ76hLsnYv_gw7cuuoipfddkigsA9E1aq0U6nyWrCkTP7M25Uk0PGxIW4KFZZrGi5l-1BDyixINehuDrz2aQuJ0c8Tmn6RV_IVH6jc08dI-u5rhPARLvPlE--xok4mLMdljdWPI.wSUj11uofOdmAZLYmPrPNFXlnaUYzglf_N2d9NVzKxU&dib_tag=se&keywords=independent+published+audio+book&qid=1794443628&sprefix=Indepented+Published+Audio+book%2Caps%2C361&sr=8-1",
  },
  {
    sourceEntry: 20,
    slug: "chasing-shadows",
    title: "Chasing Shadows",
    author: "Bertie Stein",
    category: "fiction",
    description: "Book one of The McBride Legacy series.",
    cover: cover_chasing_shadows,
    href: "https://www.amazon.com/Audible-Chasing-Shadows/dp/B0HPZ7KV69/ref=sr_1_2?crid=CY778FGSA4NQ&dib=eyJ2IjoiMSJ9.4LP3IKxkR_CEkH5apd1wiEVLPSEr8PN_BBz5EwcDH0N-yW8xR7yYaUtyJxziNSYlsR-aFRDsXBIp37kBzbW7-eCLWxSk8wVwUPMfUQ76hLsnYv_gw7cuuoipfddkigsA9E1aq0U6nyWrCkTP7M25Uk0PGxIW4KFZZrGi5l-1BDyixINehuDrz2aQuJ0c8Tmn6RV_IVH6jc08dI-u5rhPARLvPlE--xok4mLMdljdWPI.wSUj11uofOdmAZLYmPrPNFXlnaUYzglf_N2d9NVzKxU&dib_tag=se&keywords=independent+published+audio+book&qid=1794443649&sprefix=Indepented+Published+Audio+book%2Caps%2C361&sr=8-2",
  },
  {
    sourceEntry: 21,
    slug: "through-the-smoke",
    title: "Through the Smoke",
    author: "Blake Lawson",
    category: "romance",
    description: "A faith-filled firefighter romance. Book one of The Station Sisters: faith is forged in fire.",
    cover: cover_through_the_smoke,
    href: "https://www.amazon.com/Through-Smoke-Faith-Filled-Firefighter-Romance/dp/B0HL3ZMFN3/ref=sr_1_3?crid=CY778FGSA4NQ&dib=eyJ2IjoiMSJ9.4LP3IKxkR_CEkH5apd1wiEVLPSEr8PN_BBz5EwcDH0N-yW8xR7yYaUtyJxziNSYlsR-aFRDsXBIp37kBzbW7-eCLWxSk8wVwUPMfUQ76hLsnYv_gw7cuuoipfddkigsA9E1aq0U6nyWrCkTP7M25Uk0PGxIW4KFZZrGi5l-1BDyixINehuDrz2aQuJ0c8Tmn6RV_IVH6jc08dI-u5rhPARLvPlE--xok4mLMdljdWPI.wSUj11uofOdmAZLYmPrPNFXlnaUYzglf_N2d9NVzKxU&dib_tag=se&keywords=independent+published+audio+book&qid=1794443649&sprefix=Indepented+Published+Audio+book%2Caps%2C361&sr=8-3",
  },
  {
    sourceEntry: 22,
    slug: "kade",
    title: "Kade: Accidentally Bonded",
    author: "Laura Taylor",
    category: "romance",
    description: "A sci-fi romance, book one of Rogue Bonds. Narrated by Gabriel Danes.",
    cover: cover_kade,
    href: "https://www.amazon.com/Kade-Accidentally-Bonded-Sci-fi-Romance/dp/B0H6FGV59R/ref=sr_1_6?crid=CY778FGSA4NQ&dib=eyJ2IjoiMSJ9.4LP3IKxkR_CEkH5apd1wiEVLPSEr8PN_BBz5EwcDH0N-yW8xR7yYaUtyJxziNSYlsR-aFRDsXBIp37kBzbW7-eCLWxSk8wVwUPMfUQ76hLsnYv_gw7cuuoipfddkigsA9E1aq0U6nyWrCkTP7M25Uk0PGxIW4KFZZrGi5l-1BDyixINehuDrz2aQuJ0c8Tmn6RV_IVH6jc08dI-u5rhPARLvPlE--xok4mLMdljdWPI.wSUj11uofOdmAZLYmPrPNFXlnaUYzglf_N2d9NVzKxU&dib_tag=se&keywords=independent+published+audio+book&qid=1794443649&sprefix=Indepented+Published+Audio+book%2Caps%2C361&sr=8-6",
  },
  {
    sourceEntry: 23,
    slug: "the-return",
    title: "The Return",
    author: "August Mae",
    category: "fiction",
    description: "Book five in the Tides of Tomorrow series.",
    cover: cover_the_return,
    href: "https://www.amazon.com/Audible-The-Return/dp/B0HNNH92P9/ref=sr_1_9?crid=CY778FGSA4NQ&dib=eyJ2IjoiMSJ9.4LP3IKxkR_CEkH5apd1wiEVLPSEr8PN_BBz5EwcDH0N-yW8xR7yYaUtyJxziNSYlsR-aFRDsXBIp37kBzbW7-eCLWxSk8wVwUPMfUQ76hLsnYv_gw7cuuoipfddkigsA9E1aq0U6nyWrCkTP7M25Uk0PGxIW4KFZZrGi5l-1BDyixINehuDrz2aQuJ0c8Tmn6RV_IVH6jc08dI-u5rhPARLvPlE--xok4mLMdljdWPI.wSUj11uofOdmAZLYmPrPNFXlnaUYzglf_N2d9NVzKxU&dib_tag=se&keywords=independent+published+audio+book&qid=1794443649&sprefix=Indepented+Published+Audio+book%2Caps%2C361&sr=8-9",
  },
  {
    sourceEntry: 24,
    slug: "snowflake-creek-box-set",
    title: "Snowflake Creek Box Set",
    author: "Olivia Noble",
    category: "fiction",
    description: "Three Christmas stories from Snowflake Creek, collected in one set.",
    cover: cover_snowflake_creek_box_set,
    href: "https://www.amazon.com/Snowflake-Creek-Box-Set-Books/dp/B0FXFZ1N2P/ref=sr_1_11?crid=CY778FGSA4NQ&dib=eyJ2IjoiMSJ9.4LP3IKxkR_CEkH5apd1wiEVLPSEr8PN_BBz5EwcDH0N-yW8xR7yYaUtyJxziNSYlsR-aFRDsXBIp37kBzbW7-eCLWxSk8wVwUPMfUQ76hLsnYv_gw7cuuoipfddkigsA9E1aq0U6nyWrCkTP7M25Uk0PGxIW4KFZZrGi5l-1BDyixINehuDrz2aQuJ0c8Tmn6RV_IVH6jc08dI-u5rhPARLvPlE--xok4mLMdljdWPI.wSUj11uofOdmAZLYmPrPNFXlnaUYzglf_N2d9NVzKxU&dib_tag=se&keywords=independent+published+audio+book&qid=1794443649&sprefix=Indepented+Published+Audio+book%2Caps%2C361&sr=8-11",
  },
  {
    sourceEntry: 25,
    slug: "treasure-island",
    title: "Treasure Island",
    author: "Robert Louis Stevenson",
    category: "classics",
    description: "Robert Louis Stevenson’s classic tale of pirates and buried treasure.",
    cover: cover_treasure_island,
    href: "https://www.amazon.com/Audible-Treasure-Island/dp/B0FBHP767K/ref=sr_1_12?crid=CY778FGSA4NQ&dib=eyJ2IjoiMSJ9.4LP3IKxkR_CEkH5apd1wiEVLPSEr8PN_BBz5EwcDH0N-yW8xR7yYaUtyJxziNSYlsR-aFRDsXBIp37kBzbW7-eCLWxSk8wVwUPMfUQ76hLsnYv_gw7cuuoipfddkigsA9E1aq0U6nyWrCkTP7M25Uk0PGxIW4KFZZrGi5l-1BDyixINehuDrz2aQuJ0c8Tmn6RV_IVH6jc08dI-u5rhPARLvPlE--xok4mLMdljdWPI.wSUj11uofOdmAZLYmPrPNFXlnaUYzglf_N2d9NVzKxU&dib_tag=se&keywords=independent+published+audio+book&qid=1794443649&sprefix=Indepented+Published+Audio+book%2Caps%2C361&sr=8-12",
  },
  {
    sourceEntry: 26,
    slug: "fourth-and-long",
    title: "Fourth and Long",
    author: "Dawn Haynes",
    category: "romance",
    description: "A Christian football romance. He calls the plays; she’s about to call an audible on his heart.",
    cover: cover_fourth_and_long,
    href: "https://www.amazon.com/Fourth-Long-Christian-Football-Romance/dp/B0HL42RHHP/ref=sr_1_13?crid=CY778FGSA4NQ&dib=eyJ2IjoiMSJ9.4LP3IKxkR_CEkH5apd1wiEVLPSEr8PN_BBz5EwcDH0N-yW8xR7yYaUtyJxziNSYlsR-aFRDsXBIp37kBzbW7-eCLWxSk8wVwUPMfUQ76hLsnYv_gw7cuuoipfddkigsA9E1aq0U6nyWrCkTP7M25Uk0PGxIW4KFZZrGi5l-1BDyixINehuDrz2aQuJ0c8Tmn6RV_IVH6jc08dI-u5rhPARLvPlE--xok4mLMdljdWPI.wSUj11uofOdmAZLYmPrPNFXlnaUYzglf_N2d9NVzKxU&dib_tag=se&keywords=independent+published+audio+book&qid=1794443649&sprefix=Indepented+Published+Audio+book%2Caps%2C361&sr=8-13",
  },
];
