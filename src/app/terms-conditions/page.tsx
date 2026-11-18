import Link from "next/link";

import { pageMetadata } from "@/lib/page-metadata";
import { ContentBody, ContentPageHeader, ContentSection } from "@/components/shared/content-page";

/*
 * Plain-language website terms. Deliberately not included until the business confirms them: the operating entity and
 * address, governing law and jurisdiction, liability limits, refund or payment terms, and any ownership or licensing
 * arrangements beyond what is stated here. Project work is covered by separately agreed terms.
 */

const LAST_UPDATED = "17 November 2026";

export const metadata = pageMetadata({
  title: "Terms & Conditions",
  description:
    "The terms for using the Book Stream website: catalogue information, links to external platforms, intellectual property, service enquiries and separately agreed project terms.",
  path: "/terms-conditions",
});

export default function TermsConditionsPage() {
  return (
    <>
      <ContentPageHeader
        breadcrumb="Terms & Conditions"
        eyebrow="Legal"
        title="Terms & Conditions"
        intro={
          <p>
            These terms explain how the Book Stream website may be used and how the information on it should be understood.
            By using the website, you agree to them.
          </p>
        }
        meta={<>Last updated {LAST_UPDATED}</>}
      />

      <ContentBody>
        <ContentSection id="about" title="About these terms">
          <p>
            These terms cover the Book Stream website only. Audiobook projects and other services are covered by separate terms
            agreed for each project (see <a href="#projects">Service enquiries and project terms</a> below).
          </p>
          <p>
            Some details, including Book Stream&rsquo;s registered business details, are still being finalised and will be added
            to this page once confirmed.
          </p>
        </ContentSection>

        <ContentSection id="website-use" title="Using the website">
          <p>You are welcome to browse the website, explore the catalogue and contact the team. When using it, please don&rsquo;t:</p>
          <ul>
            <li>use it in a way that breaks the law or infringes anyone else&rsquo;s rights;</li>
            <li>try to gain unauthorised access to it, interfere with how it works, or disrupt it for other visitors;</li>
            <li>send false, misleading or abusive information through its forms;</li>
            <li>copy the website&rsquo;s content in bulk, including by automated means.</li>
          </ul>
          <p>
            We may update, change or temporarily withdraw parts of the website, for example to add features or correct
            information.
          </p>
        </ContentSection>

        <ContentSection id="catalogue" title="Catalogue information">
          <p>
            The <Link href="/audiobooks">Audiobooks</Link> catalogue presents titles, covers, author and narrator names, genres
            and short descriptions to help you discover audiobooks. We work to keep this information accurate, but it can change
            or become out of date.
          </p>
          <p>
            Book Stream does not sell, lend or stream audiobooks on this website. Formats, prices and availability are set by the
            external platforms that offer each title and may differ by region.
          </p>
        </ContentSection>

        <ContentSection id="external-links" title="Links to external platforms">
          <p>
            Audiobook links open the title&rsquo;s listing on an external retailer&rsquo;s website in a new tab; at present this
            is Amazon. Those websites are operated by third parties and have their own terms and privacy policies. Book Stream
            does not control their content, prices or availability, and any purchase or listening takes place on their platform
            under their terms.
          </p>
        </ContentSection>

        <ContentSection id="intellectual-property" title="Intellectual property">
          <p>
            The Book Stream name and logo, and the website&rsquo;s own text and design, may not be copied, reproduced or reused
            for commercial purposes without written permission.
          </p>
          <p>
            Audiobook covers, titles, author and narrator names, and descriptions belong to their respective rights holders.
            They are shown on this website to help visitors find the audiobooks.
          </p>
          <p>
            If you believe something on the website uses your work without permission, please let us know through the{" "}
            <Link href="/contact">contact form</Link>.
          </p>
        </ContentSection>

        <ContentSection id="projects" title="Service enquiries and project terms">
          <p>
            The <Link href="/services">Services</Link> pages describe the kinds of audiobook work Book Stream can help with. They
            are general information, not an offer, a quote or a commitment to provide a particular service.
          </p>
          <p>
            Sending an enquiry through the <Link href="/contact">contact form</Link> does not create an agreement or any
            obligation for you or for Book Stream. If we work together, the scope, deliverables, responsibilities, fees,
            timelines and rights for that project are agreed separately, in writing, before work begins. Those agreed terms
            govern the project. Where they differ from anything on this website, the agreed project terms apply.
          </p>
        </ContentSection>

        <ContentSection id="privacy" title="Privacy">
          <p>
            How the website handles the information you send us is explained in the{" "}
            <Link href="/privacy-policy">Privacy Policy</Link>.
          </p>
        </ContentSection>

        <ContentSection id="changes" title="Changes to these terms">
          <p>
            We may update these terms as the website changes. The date at the top shows when they were last revised. Questions
            about these terms are welcome through the <Link href="/contact">contact form</Link>.
          </p>
        </ContentSection>
      </ContentBody>
    </>
  );
}
