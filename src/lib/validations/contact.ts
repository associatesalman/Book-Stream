import { z } from "zod";

import {
  OTHER_SERVICE,
  budgetOptions,
  contactMethodOptions,
  contactTimeOptions,
  currencyOptions,
  dialCodes,
  projectStageOptions,
  roleOptions,
  serviceOptions,
  titleCountOptions,
} from "@/content/contact";

/** An optional select: either one of the options or left blank. */
const optional = <T extends readonly [string, ...string[]]>(options: T) => z.enum(options).or(z.literal(""));
const text = (max: number) => z.string().trim().max(max, `Please keep this under ${max.toLocaleString()} characters.`);

const isWebsite = (value: string) => {
  if (value === "") return true;
  try {
    const url = new URL(/^https?:\/\//i.test(value) ? value : `https://${value}`);
    return url.hostname.includes(".");
  } catch {
    return false;
  }
};

export const contactSchema = z
  .object({
    /* Your details */
    fullName: z.string().trim().min(2, "Please enter your full name.").max(120, "Please keep your name under 120 characters."),
    email: z.string().trim().min(1, "Please enter your email address.").pipe(z.email("Please enter a valid email address, like name@example.com.")),
    phoneCountry: optional(dialCodes.map((d) => d.iso) as unknown as readonly [string, ...string[]]),
    phone: text(30).refine((v) => v === "" || /^[+()\-.\s\d]{6,30}$/.test(v), "Please enter a valid phone number using digits, spaces or dashes."),
    company: text(150),
    website: text(200).refine(isWebsite, "Please enter a valid website address, or leave this blank."),
    role: optional(roleOptions),

    /* Project information */
    services: z.array(z.enum(serviceOptions)).min(1, "Please choose at least one option, or “Not sure yet”."),
    otherService: text(200),
    projectTitle: text(200),
    genre: text(100),
    titleCount: optional(titleCountOptions),
    projectStage: optional(projectStageOptions),
    targetDate: z.string().refine((v) => v === "" || /^\d{4}-\d{2}-\d{2}$/.test(v), "Please choose a valid date."),
    budget: optional(budgetOptions.map((b) => b.value) as unknown as readonly [string, ...string[]]),
    budgetAmount: text(80),
    budgetCurrency: optional(currencyOptions),
    message: z
      .string()
      .trim()
      .min(20, "Please tell us a little more about your project (at least 20 characters).")
      .max(5000, "Please keep your message under 5,000 characters."),

    /* Preferences */
    contactMethod: optional(contactMethodOptions),
    timeZone: text(80),
    contactTime: optional(contactTimeOptions),
    marketingConsent: z.boolean(),
  })
  .superRefine((v, ctx) => {
    if (v.services.includes(OTHER_SERVICE) && v.otherService === "") {
      ctx.addIssue({ code: "custom", path: ["otherService"], message: "Please tell us what you’re looking for." });
    }
    if (v.budget === "custom") {
      if (v.budgetAmount === "") ctx.addIssue({ code: "custom", path: ["budgetAmount"], message: "Please enter an amount or range." });
      if (v.budgetCurrency === "") ctx.addIssue({ code: "custom", path: ["budgetCurrency"], message: "Please choose a currency." });
    }
    if (v.contactMethod === "Phone" && v.phone === "") {
      ctx.addIssue({ code: "custom", path: ["phone"], message: "Please add a phone number, or choose email as your contact method." });
    }
  });

export type ContactFormInput = z.input<typeof contactSchema>;
export type ContactFormValues = z.output<typeof contactSchema>;

export const contactDefaults: ContactFormInput = {
  fullName: "",
  email: "",
  phoneCountry: "",
  phone: "",
  company: "",
  website: "",
  role: "",
  services: [],
  otherService: "",
  projectTitle: "",
  genre: "",
  titleCount: "",
  projectStage: "",
  targetDate: "",
  budget: "",
  budgetAmount: "",
  budgetCurrency: "",
  message: "",
  contactMethod: "",
  timeZone: "",
  contactTime: "",
  marketingConsent: false,
};
