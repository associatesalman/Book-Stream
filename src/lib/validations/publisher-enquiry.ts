import { z } from "zod";

import { serviceInterestOptions, titleCountOptions } from "@/content/publishers";

/** Optional website: blank is fine; otherwise it must look like a web address (scheme optional). */
const website = z
  .string()
  .trim()
  .max(200, "Please keep the website under 200 characters.")
  .refine((value) => {
    if (value === "") return true;
    try {
      const url = new URL(/^https?:\/\//i.test(value) ? value : `https://${value}`);
      return url.hostname.includes(".");
    } catch {
      return false;
    }
  }, "Please enter a valid website address, or leave this blank.");

export const publisherEnquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(100, "Please keep your name under 100 characters."),
  company: z
    .string()
    .trim()
    .min(2, "Please enter your publishing company or imprint.")
    .max(150, "Please keep this under 150 characters."),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your work email.")
    .pipe(z.email("Please enter a valid email address.")),
  website,
  titleCount: z.enum(titleCountOptions, { error: "Please choose an approximate number of titles." }),
  services: z.array(z.enum(serviceInterestOptions)).min(1, "Please choose at least one service, or “Not sure yet”."),
  message: z
    .string()
    .trim()
    .min(20, "Please tell us a little more about your project (at least 20 characters).")
    .max(3000, "Please keep your message under 3,000 characters."),
});

export type PublisherEnquiryValues = z.infer<typeof publisherEnquirySchema>;
