/**
 * Static mockup compositions for the Services pages, built in code from the
 * supplied cover artwork (src/assets/covers via src/content/books.ts).
 *
 * They illustrate a workflow, not real data: no runtimes, prices, ratings,
 * retailer names or statuses are attributed to the real titles shown.
 */

import Image from "next/image";
import { BookOpen, Check, FileAudio, Image as ImageIcon, Library, Play, ScrollText, ShieldCheck, ShoppingBag, Repeat } from "lucide-react";

import { books, type Book } from "@/content/books";
import { cn } from "@/lib/utils";

export function getBook(slug: string): Book {
  const book = books.find((b) => b.slug === slug);
  if (!book) throw new Error(`Cover "${slug}" is missing from the book collection.`);
  return book;
}

const shadow = "shadow-[0_18px_40px_-20px_rgb(17_24_32/0.4)]";

function Cover({ slug, className, sizes, priority }: { slug: string; className?: string; sizes: string; priority?: boolean }) {
  const book = getBook(slug);
  return (
    <div className={cn("relative aspect-square overflow-hidden rounded-[3px] bg-cloud ring-1 ring-ink/10", className)}>
      <Image
        src={book.cover}
        alt={`Cover of ${book.title}${book.author ? ` by ${book.author}` : ""}`}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
    </div>
  );
}

/** Deterministic, static waveform bars. */
const wave = [30, 52, 40, 68, 46, 80, 58, 36, 62, 90, 54, 72, 44, 64, 34, 58, 76, 48, 66, 40, 56, 84, 50, 38, 60, 70, 42, 54, 32, 46];

function Waveform({ played = 12, className }: { played?: number; className?: string }) {
  return (
    <div aria-hidden className={cn("flex h-10 items-center gap-[3px]", className)}>
      {wave.map((h, i) => (
        <span key={i} className={cn("w-[3px] flex-1 rounded-full", i < played ? "bg-brand" : "bg-ink/15")} style={{ height: `${h}%` }} />
      ))}
    </div>
  );
}

function MockupCaption({ children }: { children: React.ReactNode }) {
  return <p className="mt-4 text-center text-xs text-muted-foreground">{children}</p>;
}

/* ----------------------------------------------------- Distribution hero */

export function DistributionMockup() {
  const book = getBook("ignite");
  const rows = [
    { icon: FileAudio, label: "Mastered chapter files" },
    { icon: ImageIcon, label: "Square cover artwork" },
    { icon: ScrollText, label: "Metadata & credits" },
    { icon: ShieldCheck, label: "Rights & territories" },
  ];
  const channels = [
    { icon: ShoppingBag, label: "Retail" },
    { icon: Repeat, label: "Subscription" },
    { icon: Library, label: "Library" },
  ];
  return (
    <figure>
      <div className={cn("mx-auto max-w-xl rounded-md border border-border bg-white", shadow)}>
        <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
          <p className="eyebrow text-ink/60">Release package</p>
          <span className="rounded-full bg-mist px-2.5 py-1 text-xs font-semibold text-brand">Sample</span>
        </div>
        <div className="grid gap-6 p-5 sm:grid-cols-[10rem_1fr] sm:p-6">
          <div>
            <Cover slug={book.slug} sizes="160px" priority className="w-32 sm:w-full" />
            <p className="mt-3 font-serif font-semibold text-ink">{book.title}</p>
            <p className="text-sm text-muted-foreground">{book.author}</p>
          </div>
          <ul className="space-y-2.5">
            {rows.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-3 rounded-[4px] border border-border px-3 py-2.5">
                <Icon className="size-4 shrink-0 text-brand" strokeWidth={1.75} aria-hidden />
                <span className="flex-1 text-sm font-medium text-ink">{label}</span>
                <span className="flex size-5 items-center justify-center rounded-full bg-brand text-white">
                  <Check className="size-3" strokeWidth={3} aria-hidden />
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="border-t border-border bg-cloud px-5 py-4 sm:px-6">
          <p className="text-xs font-semibold tracking-wide text-ink/60 uppercase">Delivered to selected channels</p>
          <ul className="mt-3 grid grid-cols-3 gap-2">
            {channels.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center justify-center gap-2 rounded-[4px] border border-border bg-white px-2 py-2.5 text-sm font-medium text-ink">
                <Icon className="size-4 text-brand" strokeWidth={1.75} aria-hidden />
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <MockupCaption>Illustrative release package. Channel types shown generically; no specific platforms implied.</MockupCaption>
    </figure>
  );
}

/* ---------------------------------------------------------- Catalog hero */

export function CatalogMockup() {
  const slugs = ["chasing-shadows", "the-orphaned-songbird", "not-alone", "treasure-island"];
  const cols = ["Title", "Contributors", "Series", "Artwork"];
  return (
    <figure>
      <div className={cn("mx-auto max-w-xl overflow-hidden rounded-md border border-border bg-white", shadow)}>
        <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
          <p className="eyebrow text-ink/60">Catalog review</p>
          <span className="rounded-full bg-mist px-2.5 py-1 text-xs font-semibold text-brand">Sample view</span>
        </div>
        <table className="w-full text-left text-sm">
          <caption className="sr-only">Sample catalog review table</caption>
          <thead className="bg-cloud text-xs text-ink/60">
            <tr>
              <th scope="col" className="px-5 py-2.5 font-semibold">
                Record
              </th>
              {cols.slice(1).map((c) => (
                <th key={c} scope="col" className="hidden px-2 py-2.5 text-center font-semibold sm:table-cell">
                  {c}
                </th>
              ))}
              <th scope="col" className="px-5 py-2.5 text-right font-semibold sm:hidden">
                Fields
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {slugs.map((slug) => {
              const book = getBook(slug);
              return (
                <tr key={slug}>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <Cover slug={slug} sizes="48px" className="w-11 shrink-0" />
                      <div className="min-w-0">
                        <p className="truncate font-semibold text-ink">{book.title}</p>
                        <p className="truncate text-xs text-muted-foreground">{book.author}</p>
                      </div>
                    </div>
                  </td>
                  {cols.slice(1).map((c) => (
                    <td key={c} className="hidden px-2 py-3 text-center sm:table-cell">
                      <span className="inline-flex size-5 items-center justify-center rounded-full bg-mist text-brand">
                        <Check className="size-3" strokeWidth={3} aria-label="Reviewed" />
                      </span>
                    </td>
                  ))}
                  <td className="px-5 py-3 text-right sm:hidden">
                    <span className="inline-flex size-5 items-center justify-center rounded-full bg-mist text-brand">
                      <Check className="size-3" strokeWidth={3} aria-label="Reviewed" />
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <MockupCaption>Illustrative catalog view using covers from the Book Stream collection.</MockupCaption>
    </figure>
  );
}

/* ------------------------------------------------------- Marketing kit */

export function MarketingKitMockup() {
  const book = getBook("through-the-smoke");
  return (
    <figure>
      <div className="grid grid-cols-[1.15fr_0.85fr] gap-4">
        {/* Square post */}
        <div className={cn("rounded-md border border-border bg-white p-4", shadow)}>
          <p className="eyebrow text-[0.625rem] text-brand">New in audio</p>
          <Cover slug={book.slug} sizes="260px" className="mt-3 w-full" />
          <p className="mt-3 font-serif font-semibold text-ink">{book.title}</p>
          <p className="text-xs text-muted-foreground">{book.author}</p>
        </div>
        <div className="flex flex-col gap-4">
          {/* Vertical story */}
          <div className={cn("flex flex-1 flex-col justify-between rounded-md bg-brand p-4 text-white", shadow)}>
            <p className="eyebrow text-[0.625rem] text-white/80">Listen to a sample</p>
            <Cover slug={book.slug} sizes="160px" className="mx-auto my-3 w-3/4 ring-white/20" />
            <span className="mx-auto flex size-9 items-center justify-center rounded-full bg-white text-brand">
              <Play className="ml-0.5 size-4 fill-current" aria-hidden />
            </span>
          </div>
          {/* Clip card */}
          <div className={cn("rounded-md border border-border bg-white p-3", shadow)}>
            <p className="text-xs font-semibold text-ink">Listening clip</p>
            <Waveform played={9} className="mt-2 h-7" />
          </div>
        </div>
      </div>
      <MockupCaption>Illustrative launch assets built from a cover in the Book Stream collection.</MockupCaption>
    </figure>
  );
}

/* --------------------------------------------------- Discovery collection */

export function CollectionCard({ title, description, covers }: { title: string; description: string; covers: string[] }) {
  return (
    <article className="flex h-full flex-col rounded-md border border-border bg-white p-5">
      <div className="flex gap-2">
        {covers.map((slug) => (
          <Cover key={slug} slug={slug} sizes="(min-width: 1024px) 120px, 30vw" className="w-1/3" />
        ))}
      </div>
      <h3 className="mt-5 flex items-center gap-2 text-lg font-semibold text-ink">
        <BookOpen className="size-4.5 text-brand" strokeWidth={1.75} aria-hidden />
        {title}
      </h3>
      <p className="mt-2 leading-relaxed text-ink/65">{description}</p>
    </article>
  );
}
