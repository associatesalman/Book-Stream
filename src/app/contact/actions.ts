"use server";

import { OTHER_SERVICE, projectRelevance } from "@/content/contact";
import { contactSchema, type ContactFormValues } from "@/lib/validations/contact";

/**
 * Contact enquiry delivery.
 *
 * Integration: set CONTACT_WEBHOOK_URL (server-only) to an HTTPS endpoint that accepts a JSON POST —
 * e.g. an email-service, CRM, Zapier/Make or Slack webhook. Optionally set CONTACT_WEBHOOK_SECRET;
 * it is sent as "Authorization: Bearer <secret>". See .env.example.
 *
 * Until CONTACT_WEBHOOK_URL is configured, enquiries are NOT delivered: the action returns
 * "not_configured" and the form tells the visitor so. Nothing is simulated or silently dropped.
 */

export type ContactResult =
  | { status: "sent" }
  | { status: "not_configured" }
  | { status: "error" }
  | { status: "invalid"; fieldErrors: Partial<Record<keyof ContactFormValues, string>> };

/** Drop answers to follow-up questions that no longer apply (e.g. "Other" was unticked). */
function relevantFields(v: ContactFormValues) {
  const show = projectRelevance(v.services);
  return {
    details: {
      fullName: v.fullName,
      email: v.email,
      phone: v.phone ? `${v.phoneCountry ? `[${v.phoneCountry}] ` : ""}${v.phone}` : "",
      company: v.company,
      website: v.website,
      role: v.role,
    },
    project: {
      services: v.services,
      otherService: v.services.includes(OTHER_SERVICE) ? v.otherService : "",
      projectTitle: show.project ? v.projectTitle : "",
      genre: show.project ? v.genre : "",
      titleCount: show.titleCount ? v.titleCount : "",
      projectStage: show.stage ? v.projectStage : "",
      targetDate: show.targetDate ? v.targetDate : "",
      budget: show.project ? v.budget : "",
      budgetAmount: show.project && v.budget === "custom" ? `${v.budgetAmount} ${v.budgetCurrency}`.trim() : "",
      message: v.message,
    },
    preferences: {
      contactMethod: v.contactMethod,
      timeZone: v.timeZone,
      contactTime: v.contactTime,
      marketingConsent: v.marketingConsent,
    },
  };
}

export async function submitContactEnquiry(input: unknown): Promise<ContactResult> {
  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) {
    const fieldErrors: Partial<Record<keyof ContactFormValues, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof ContactFormValues | undefined;
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { status: "invalid", fieldErrors };
  }

  const url = process.env.CONTACT_WEBHOOK_URL;
  if (!url) {
    // Log the configuration gap only — never the enquiry's personal details.
    console.error("[contact] Enquiry not delivered: CONTACT_WEBHOOK_URL is not configured.");
    return { status: "not_configured" };
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.CONTACT_WEBHOOK_SECRET ? { Authorization: `Bearer ${process.env.CONTACT_WEBHOOK_SECRET}` } : {}),
      },
      body: JSON.stringify({ type: "contact_enquiry", submittedAt: new Date().toISOString(), ...relevantFields(parsed.data) }),
      signal: AbortSignal.timeout(10_000),
      cache: "no-store",
    });
    if (!response.ok) {
      console.error(`[contact] Webhook responded with HTTP ${response.status}.`);
      return { status: "error" };
    }
    return { status: "sent" };
  } catch (error) {
    console.error("[contact] Webhook request failed:", error instanceof Error ? error.message : "unknown error");
    return { status: "error" };
  }
}
