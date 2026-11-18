import Link from "next/link";

import { pageMetadata } from "@/lib/page-metadata";
import { ContentBody, ContentPageHeader, ContentSection } from "@/components/shared/content-page";

/*
 * Plain-language privacy policy that reflects the website's actual implementation (checked 17 November 2026):
 * - Contact form (src/app/contact/actions.ts): validated on the server, then posted to the enquiry endpoint configured
 *   in CONTACT_WEBHOOK_URL. The website has no database and keeps no copy; server logs record delivery failures only,
 *   never enquiry details. If the endpoint is not configured, nothing is sent and the visitor is told.
 * - Publisher enquiry form and newsletter signup: validation only; nothing is sent or stored, and the page says so.
 * - No cookies, localStorage/sessionStorage, analytics, advertising or social tracking scripts are set or loaded by the
 *   site's code. Fonts and images are self-hosted. Book links go to Amazon in a new tab.
 * Anything not established (business identity, retention, the enquiry service provider, hosting, legal basis or
 * jurisdiction-specific rights) is deliberately not stated; it is listed for the owner to confirm.
 */

const LAST_UPDATED = "17 November 2026";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How the Book Stream website handles information: contact-form enquiries, forms that are not yet connected, cookies and analytics, and links to external platforms.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <ContentPageHeader
        breadcrumb="Privacy Policy"
        eyebrow="Legal"
        title="Privacy Policy"
        intro={
          <p>
            This page explains, in plain language, what information the Book Stream website collects, how it is used and what
            happens when you follow a link to another website.
          </p>
        }
        meta={<>Last updated {LAST_UPDATED}</>}
      />

      <ContentBody>
        <ContentSection id="summary" title="In short">
          <ul>
            <li>The website only receives personal information that you choose to send through the contact form.</li>
            <li>That information is used to respond to your enquiry and discuss your project.</li>
            <li>The website does not use analytics, advertising or tracking tools, and does not set its own cookies.</li>
            <li>Book links take you to an external retailer, whose own privacy policy then applies.</li>
          </ul>
          <p>
            Some details are still being finalised, including Book Stream&rsquo;s registered business details and how long
            enquiry records are kept. They will be added to this page once confirmed.
          </p>
        </ContentSection>

        <ContentSection id="contact-form" title="Enquiries sent through the contact form">
          <p>
            When you submit the <Link href="/contact">contact form</Link>, we receive the details you enter. Four are required:
            your name, email address, the service you&rsquo;re interested in and your message. The rest are optional and may
            include:
          </p>
          <ul>
            <li>a phone number, organisation, website and your role;</li>
            <li>project details, such as a title, genre, number of titles, project stage, target date and budget range;</li>
            <li>how and when you would prefer to be contacted, and your time zone;</li>
            <li>whether you would like to receive occasional updates from Book Stream (unticked unless you choose it).</li>
          </ul>
          <p>
            <strong>How it is used.</strong> We use these details to understand your enquiry, reply to you using the contact
            method you prefer and discuss any project that follows. If you tick the updates box, that preference is recorded
            with your enquiry. You can change your mind at any time by letting us know.
          </p>
          <p>
            <strong>How it is handled.</strong> When you submit the form, your details are checked and then sent from the
            website&rsquo;s server to the service Book Stream uses to receive enquiries. The website itself does not keep a copy
            of your enquiry. If an enquiry cannot be delivered, the form tells you so and nothing is stored by the website.
          </p>
        </ContentSection>

        <ContentSection id="other-forms" title="Forms that are not connected yet">
          <p>
            The enquiry form on the <Link href="/publishers">Publishers</Link> page and the newsletter signup do not send or
            store anything yet. When you use them, the page tells you that your details have not been sent. This policy will be
            updated before either form starts collecting information.
          </p>
        </ContentSection>

        <ContentSection id="cookies" title="Cookies and analytics">
          <p>
            The Book Stream website does not set its own cookies, does not store information about you in your browser, and
            does not use analytics, advertising or social media tracking tools. Fonts and images are served from the website
            itself rather than loaded from third-party services.
          </p>
          <p>
            Like most websites, the servers that deliver the site may automatically record standard technical information, such
            as your IP address, browser type and the pages requested, as part of normal operation and security.
          </p>
          <p>If analytics or cookies are introduced in future, this policy will be updated first.</p>
        </ContentSection>

        <ContentSection id="external-links" title="Links to other websites">
          <p>
            Audiobook links in the catalogue open the title&rsquo;s listing on an external retailer&rsquo;s website in a new tab;
            at present this is Amazon. Once you are on another website, its own privacy policy and cookie practices apply, and
            Book Stream does not control what it collects.
          </p>
        </ContentSection>

        <ContentSection id="questions" title="Questions about your information">
          <p>
            If you have a question about information you have sent us, or would like it corrected or removed, please get in touch
            through the <Link href="/contact">contact form</Link>.
          </p>
        </ContentSection>

        <ContentSection id="changes" title="Changes to this policy">
          <p>
            We will update this page when the way the website handles information changes, and revise the date at the top. See
            also our <Link href="/terms-conditions">Terms &amp; Conditions</Link>.
          </p>
        </ContentSection>
      </ContentBody>
    </>
  );
}
