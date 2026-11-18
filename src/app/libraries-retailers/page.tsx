import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { pageMetadata } from "@/lib/page-metadata";
import { Button } from "@/components/ui/button";
import { ContentBody, ContentPageHeader, ContentSection } from "@/components/shared/content-page";

/*
 * Copy rules: describe only what the website and the confirmed services offer today. No lending systems, wholesale or
 * trade terms, licensing arrangements, ordering, named platforms or institutional partnerships.
 */

export const metadata = pageMetadata({
  title: "Libraries & Retailers",
  description:
    "How libraries, booksellers and retailers can explore the Book Stream audiobook catalogue, what each listing shows, and how to contact the team about titles or collaboration.",
  path: "/libraries-retailers",
});

export default function LibrariesRetailersPage() {
  return (
    <>
      <ContentPageHeader
        breadcrumb="Libraries & Retailers"
        eyebrow="Libraries & Retailers"
        title="Audiobook discovery for libraries, booksellers and retailers"
        intro={
          <>
            <p>
              Book Stream brings audiobooks together in one browsable catalogue and supports the people who help listeners find
              them. If you select, recommend or sell audiobooks, this page explains what you can explore here and how to get in
              touch with the team.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="xl">
                <Link href="/audiobooks">
                  Explore Audiobooks
                  <ArrowRight data-icon="inline-end" className="size-4" />
                </Link>
              </Button>
              <Button asChild size="xl" variant="outline">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </>
        }
      />

      <ContentBody>
        <ContentSection id="discovery" title="Explore the catalogue">
          <p>
            The <Link href="/audiobooks">Audiobooks</Link> section lists every title in the Book Stream catalogue. You can
            browse the full collection or narrow it by genre, including Fiction, Mystery &amp; Thriller, History, Romance and
            Science Fiction.
          </p>
          <p>
            Looking for something specific? The site search (the magnifying glass in the header, or the{" "}
            <Link href="/search">search page</Link>) matches titles, authors and, where known, narrators.
          </p>
        </ContentSection>

        <ContentSection id="catalogue-information" title="What each listing shows">
          <p>Each audiobook in the catalogue is presented with:</p>
          <ul>
            <li>its cover, title and author;</li>
            <li>the narrator, where this is known;</li>
            <li>its genre and a short description;</li>
            <li>a link to the title&rsquo;s listing on an external retailer&rsquo;s website, which opens in a new tab.</li>
          </ul>
          <p>
            Formats, prices and availability are shown on that external listing, not on Book Stream, and can differ by region.
            Book Stream does not sell, lend or stream audiobooks on this website.
          </p>
        </ContentSection>

        <ContentSection id="services" title="Support for collections">
          <p>
            Two Book Stream services are most relevant to libraries and retailers. Both are scoped and discussed with each
            partner rather than offered as a fixed package.
          </p>
          <ul>
            <li>
              <Link href="/services/discovery">Content Discovery</Link>: curated collections, themed lists and editorial
              recommendations that group audiobooks in ways listeners can browse.
            </li>
            <li>
              <Link href="/services/catalog-management">Digital Catalog Management</Link>: reviewing and correcting audiobook
              records, such as titles, series, credits, descriptions and artwork, so they are presented accurately.
            </li>
          </ul>
        </ContentSection>

        <ContentSection id="contact" title="Talk to the team">
          <p>
            Questions about a title&rsquo;s availability, the catalogue, or how we might work together are welcome. Use the{" "}
            <Link href="/contact">contact form</Link>: choose <strong>General enquiry</strong> (or the service you&rsquo;re
            interested in) and select <strong>Library or Retailer</strong> as your role.
          </p>
          <p>It helps to include:</p>
          <ul>
            <li>your organisation and the listeners or customers you serve;</li>
            <li>the titles, genres or kinds of collection you have in mind;</li>
            <li>what you&rsquo;d like to know or explore together.</li>
          </ul>
          <p>
            The team reviews each enquiry and replies using the contact method you choose. Common questions are answered on the{" "}
            <Link href="/faqs">FAQs</Link> page.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="xl">
              <Link href="/contact">
                Contact Us
                <ArrowRight data-icon="inline-end" className="size-4" />
              </Link>
            </Button>
            <Button asChild size="xl" variant="outline">
              <Link href="/audiobooks">Explore Audiobooks</Link>
            </Button>
          </div>
        </ContentSection>
      </ContentBody>
    </>
  );
}
