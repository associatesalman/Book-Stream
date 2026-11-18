import Link from "next/link";

import { pageMetadata } from "@/lib/page-metadata";
import { cn } from "@/lib/utils";
import { ContentBody, ContentPageHeader, proseClass } from "@/components/shared/content-page";

/*
 * Every answer describes the website and services as they exist today (see src/content/*, the catalogue and the
 * contact form). No response times, prices, guarantees or named partner platforms.
 */

export const metadata = pageMetadata({
  title: "FAQs",
  description:
    "Answers to common questions about Book Stream: browsing and searching audiobooks, where book links go, audiobook services for authors and publishers, and how to send an enquiry.",
  path: "/faqs",
});

type Faq = { question: string; answer: React.ReactNode };
type FaqGroup = { id: string; title: string; items: Faq[] };

const groups: FaqGroup[] = [
  {
    id: "about",
    title: "About Book Stream",
    items: [
      {
        question: "What does Book Stream do?",
        answer: (
          <>
            <p>
              Book Stream does two things. It brings audiobooks together in a browsable catalogue so listeners can find their next
              title, and it offers audiobook services to authors, publishers and content partners, from production and release
              preparation to catalog management, marketing and content discovery.
            </p>
            <p>
              Read more <Link href="/about">about Book Stream</Link> or see all <Link href="/services">services</Link>.
            </p>
          </>
        ),
      },
    ],
  },
  {
    id: "browsing",
    title: "Browsing audiobooks",
    items: [
      {
        question: "How do I browse and search the audiobooks?",
        answer: (
          <>
            <p>
              Open <Link href="/audiobooks">Audiobooks</Link> to see the full catalogue, or choose a genre such as Fiction,
              Mystery &amp; Thriller, History, Romance or Science Fiction from the menu.
            </p>
            <p>
              To find a particular book, use the search icon in the header or the <Link href="/search">search page</Link>. Search
              matches titles, authors and, where known, narrators.
            </p>
          </>
        ),
      },
      {
        question: "Where do the book links take me?",
        answer: (
          <p>
            Selecting a title, its cover or <strong>Explore Audiobook</strong> opens that audiobook&rsquo;s listing on an external
            retailer&rsquo;s website in a new tab. At present, catalogue links go to Amazon. Book Stream stays open in your
            original tab.
          </p>
        ),
      },
      {
        question: "Can I listen to or buy audiobooks on Book Stream?",
        answer: (
          <p>
            No. Book Stream is for discovering audiobooks; it does not play, sell or lend them. Listening and purchasing happen on
            the external platform the book link opens, under that platform&rsquo;s own prices, terms and availability.
          </p>
        ),
      },
    ],
  },
  {
    id: "services",
    title: "Services for authors and publishers",
    items: [
      {
        question: "What audiobook services do you offer?",
        answer: (
          <>
            <p>Book Stream offers six services, which can be used on their own or combined:</p>
            <ul>
              <li>
                <Link href="/services/production">Audiobook Production</Link>: narration, recording, editing, mastering and quality
                review.
              </li>
              <li>
                <Link href="/services/distribution">Audiobook Distribution</Link>: release preparation, metadata and file delivery.
              </li>
              <li>
                <Link href="/services/partnerships">Publishing Partnerships</Link>: an ongoing approach across a list, series or
                release calendar.
              </li>
              <li>
                <Link href="/services/catalog-management">Digital Catalog Management</Link>: keeping audiobook records accurate
                over time.
              </li>
              <li>
                <Link href="/services/marketing">Marketing &amp; Promotion</Link>: positioning, listening samples and launch
                planning.
              </li>
              <li>
                <Link href="/services/discovery">Content Discovery</Link>: curated collections, themed lists and recommendations.
              </li>
            </ul>
            <p>
              Publishers with a larger list can also read the <Link href="/publishers">Publishers</Link> page.
            </p>
          </>
        ),
      },
      {
        question: "How do I start a project?",
        answer: (
          <>
            <p>
              Start by telling us about the title or list, what you have today (for example a manuscript, finished audio or a live
              catalogue) and what you want to achieve. From there, the team confirms which services apply, agrees scope,
              responsibilities and the audio rights involved, and plans the work before anything begins.
            </p>
            <p>
              There is no obligation until scope is agreed. The steps are set out under &ldquo;How to get started&rdquo; on the{" "}
              <Link href="/services">Services</Link> page.
            </p>
          </>
        ),
      },
    ],
  },
  {
    id: "enquiries",
    title: "Enquiries",
    items: [
      {
        question: "How do I submit an enquiry?",
        answer: (
          <>
            <p>
              Use the form on the <Link href="/contact">Contact</Link> page. Only four fields are required: your name, email
              address, the service you&rsquo;re interested in (or &ldquo;Not sure yet&rdquo;) and a short message. Further
              questions appear only when they are relevant to the services you choose.
            </p>
            <p>
              The team reviews each enquiry and follows up using the contact method you prefer. See the{" "}
              <Link href="/privacy-policy">Privacy Policy</Link> for how enquiry details are handled.
            </p>
          </>
        ),
      },
      {
        question: "I work for a library or retailer. How do I get in touch?",
        answer: (
          <p>
            You can explore the full catalogue on the website, and send questions about titles, availability or working together
            through the <Link href="/contact">contact form</Link>: choose <strong>General enquiry</strong> and select{" "}
            <strong>Library or Retailer</strong> as your role. The <Link href="/libraries-retailers">Libraries &amp; Retailers</Link>{" "}
            page has more detail.
          </p>
        ),
      },
    ],
  },
];

export default function FaqsPage() {
  return (
    <>
      <ContentPageHeader
        breadcrumb="FAQs"
        eyebrow="Help"
        title="Frequently asked questions"
        intro={
          <p>
            Quick answers about browsing the catalogue, Book Stream&rsquo;s services and sending an enquiry. Can&rsquo;t find what
            you need? <Link href="/contact" className="font-medium text-brand underline underline-offset-4 hover:text-brand-strong">Contact us</Link>.
          </p>
        }
      />

      <ContentBody>
        {groups.map((group) => (
          <section key={group.id} id={group.id} aria-labelledby={`${group.id}-heading`} className="border-t border-border py-10 sm:py-12">
            <h2 id={`${group.id}-heading`} className="eyebrow flex items-center gap-3 text-brand">
              <span aria-hidden className="h-px w-8 bg-brand" />
              {group.title}
            </h2>
            <div className="mt-6 space-y-10">
              {group.items.map((faq) => (
                <div key={faq.question} className="max-w-3xl">
                  <h3 className="font-serif text-xl leading-snug font-semibold text-ink sm:text-[1.375rem]">{faq.question}</h3>
                  <div className={cn("mt-3", proseClass)}>{faq.answer}</div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </ContentBody>
    </>
  );
}
