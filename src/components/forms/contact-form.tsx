"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useForm, useWatch, type FieldPath } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, ArrowRight, CheckCircle2, Info, Loader2 } from "lucide-react";

import {
  OTHER_SERVICE,
  budgetOptions,
  contactMethodOptions,
  contactTimeOptions,
  currencyOptions,
  dialCodes,
  projectRelevance,
  projectStageOptions,
  roleOptions,
  serviceOptions,
  titleCountOptions,
} from "@/content/contact";
import { contactDefaults, contactSchema, type ContactFormInput, type ContactFormValues } from "@/lib/validations/contact";
import { submitContactEnquiry } from "@/app/contact/actions";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

/* ------------------------------------------------------------- Primitives */

const control =
  "w-full rounded-md border border-ink/20 bg-white px-3.5 text-base text-ink outline-none placeholder:text-ink/40 focus:border-brand focus:ring-3 focus:ring-brand/20 aria-[invalid=true]:border-ink aria-[invalid=true]:ring-3 aria-[invalid=true]:ring-ink/10";

const errId = (name: string) => `contact-${name}-error`;
const hintId = (name: string) => `contact-${name}-hint`;

function FieldLabel({ htmlFor, required, children }: { htmlFor?: string; required?: boolean; children: React.ReactNode }) {
  const Tag = htmlFor ? "label" : "span";
  return (
    <Tag htmlFor={htmlFor} className="mb-2 flex items-baseline gap-1.5 text-sm font-semibold text-ink">
      {children}
      {required ? (
        <span className="text-brand">
          <span aria-hidden>*</span>
          <span className="sr-only">(required)</span>
        </span>
      ) : (
        <span className="font-normal text-ink/50">(optional)</span>
      )}
    </Tag>
  );
}

function FieldError({ name, message }: { name: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={errId(name)} className="mt-2 flex items-start gap-1.5 text-sm font-medium text-ink">
      <AlertCircle className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
      {message}
    </p>
  );
}

function Hint({ name, children }: { name: string; children: React.ReactNode }) {
  return (
    <p id={hintId(name)} className="mt-1.5 text-[0.8125rem] text-ink/55">
      {children}
    </p>
  );
}

function Section({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <fieldset className="border-t border-border pt-8 first:border-t-0 first:pt-0">
      <legend className="sr-only">{title}</legend>
      <h3 aria-hidden className="font-serif text-2xl font-semibold text-ink">
        {title}
      </h3>
      <p className="mt-1.5 text-[0.9375rem] text-ink/60">{description}</p>
      <div className="mt-6 grid gap-x-6 gap-y-6 md:grid-cols-2">{children}</div>
    </fieldset>
  );
}

/* ------------------------------------------------------------------- Form */

type Status = "idle" | "submitting" | "sent" | "not_configured" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const statusRef = useRef<HTMLDivElement>(null);
  const {
    register,
    handleSubmit,
    reset,
    setError,
    setValue,
    control: formControl,
    formState: { errors },
  } = useForm<ContactFormInput, unknown, ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: contactDefaults,
  });

  const selected = useWatch({ control: formControl, name: "services" }) ?? [];
  const budget = useWatch({ control: formControl, name: "budget" });
  const show = projectRelevance(selected);

  // Move focus to the outcome message so screen-reader and keyboard users hear it.
  useEffect(() => {
    if (status !== "idle" && status !== "submitting") statusRef.current?.focus();
  }, [status]);

  const onSubmit = async (values: ContactFormValues) => {
    setStatus("submitting");
    try {
      const result = await submitContactEnquiry(values);
      if (result.status === "sent") {
        reset(contactDefaults); // Only cleared once delivery is confirmed.
        setStatus("sent");
      } else if (result.status === "invalid") {
        for (const [field, message] of Object.entries(result.fieldErrors)) {
          setError(field as FieldPath<ContactFormInput>, { message });
        }
        setStatus("idle");
      } else {
        setStatus(result.status); // Entered values are kept.
      }
    } catch {
      setStatus("error");
    }
  };

  const a11y = (name: FieldPath<ContactFormInput>, hint = false) => {
    const error = errors[name as keyof typeof errors];
    return {
      "aria-invalid": error ? true : undefined,
      "aria-describedby": [error ? errId(name) : null, hint ? hintId(name) : null].filter(Boolean).join(" ") || undefined,
    } as const;
  };

  const submitting = status === "submitting";

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate aria-busy={submitting}>
      <p className="mb-8 text-sm text-ink/60">
        Fields marked <span className="font-semibold text-brand">*</span> are required. Everything else is optional.
      </p>

      <div className="space-y-10">
        {/* ------------------------------------------------ Your details */}
        <Section title="Your details" description="Who we’ll be speaking with.">
          <div>
            <FieldLabel htmlFor="contact-fullName" required>
              Full name
            </FieldLabel>
            <input id="contact-fullName" type="text" autoComplete="name" placeholder="Your full name" className={cn(control, "h-12")} {...a11y("fullName")} {...register("fullName")} />
            <FieldError name="fullName" message={errors.fullName?.message} />
          </div>

          <div>
            <FieldLabel htmlFor="contact-email" required>
              Email address
            </FieldLabel>
            <input id="contact-email" type="email" inputMode="email" autoComplete="email" placeholder="name@example.com" className={cn(control, "h-12")} {...a11y("email")} {...register("email")} />
            <FieldError name="email" message={errors.email?.message} />
          </div>

          <div>
            <FieldLabel htmlFor="contact-phone">Phone number</FieldLabel>
            <div className="flex gap-2">
              <label htmlFor="contact-phoneCountry" className="sr-only">
                Country code
              </label>
              <select id="contact-phoneCountry" autoComplete="tel-country-code" className={cn(control, "h-12 w-[7.5rem] shrink-0 px-2.5")} {...register("phoneCountry")}>
                <option value="">Code</option>
                {dialCodes.map((d) => (
                  <option key={d.iso} value={d.iso}>
                    {d.code ? `${d.code} ${d.label}` : d.label}
                  </option>
                ))}
              </select>
              <input id="contact-phone" type="tel" inputMode="tel" autoComplete="tel-national" placeholder="Phone number" className={cn(control, "h-12 min-w-0")} {...a11y("phone")} {...register("phone")} />
            </div>
            <FieldError name="phone" message={errors.phone?.message} />
          </div>

          <div>
            <FieldLabel htmlFor="contact-company">Company or publishing imprint</FieldLabel>
            <input id="contact-company" type="text" autoComplete="organization" placeholder="e.g. your press or imprint" className={cn(control, "h-12")} {...a11y("company")} {...register("company")} />
            <FieldError name="company" message={errors.company?.message} />
          </div>

          <div>
            <FieldLabel htmlFor="contact-website">Website</FieldLabel>
            <input id="contact-website" type="text" inputMode="url" autoComplete="url" placeholder="www.example.com" className={cn(control, "h-12")} {...a11y("website")} {...register("website")} />
            <FieldError name="website" message={errors.website?.message} />
          </div>

          <div>
            <FieldLabel htmlFor="contact-role">Your role</FieldLabel>
            <select id="contact-role" className={cn(control, "h-12")} {...a11y("role")} {...register("role")}>
              <option value="">Select your role</option>
              {roleOptions.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </div>
        </Section>

        {/* ------------------------------------------ Project information */}
        <Section title="Project information" description="What you’d like to discuss. More questions appear only when they’re relevant.">
          <fieldset className="md:col-span-2" aria-describedby={errors.services ? errId("services") : hintId("services")}>
            <legend className="mb-1 flex items-baseline gap-1.5 text-sm font-semibold text-ink">
              Service or enquiry type
              <span className="text-brand">
                <span aria-hidden>*</span>
                <span className="sr-only">(required)</span>
              </span>
            </legend>
            <Hint name="services">Choose all that apply.</Hint>
            <div className="mt-3 grid gap-x-6 gap-y-3 sm:grid-cols-2">
              {serviceOptions.map((option, i) => (
                <label key={option} htmlFor={`contact-service-${i}`} className="flex cursor-pointer items-start gap-3 text-[0.9375rem] leading-snug text-ink">
                  <input
                    id={`contact-service-${i}`}
                    type="checkbox"
                    value={option}
                    className="mt-0.5 size-[1.125rem] shrink-0 cursor-pointer accent-[#1559A8]"
                    {...register("services")}
                  />
                  {option}
                </label>
              ))}
            </div>
            <FieldError name="services" message={errors.services?.message} />
          </fieldset>

          {selected.includes(OTHER_SERVICE) ? (
            <div className="md:col-span-2">
              <FieldLabel htmlFor="contact-otherService" required>
                Tell us what you’re looking for
              </FieldLabel>
              <input id="contact-otherService" type="text" placeholder="Briefly describe the service or support you need" className={cn(control, "h-12")} {...a11y("otherService")} {...register("otherService")} />
              <FieldError name="otherService" message={errors.otherService?.message} />
            </div>
          ) : null}

          {show.project ? (
            <>
              <div>
                <FieldLabel htmlFor="contact-projectTitle">Book or project title</FieldLabel>
                <input id="contact-projectTitle" type="text" placeholder="Working title is fine" className={cn(control, "h-12")} {...a11y("projectTitle")} {...register("projectTitle")} />
                <FieldError name="projectTitle" message={errors.projectTitle?.message} />
              </div>
              <div>
                <FieldLabel htmlFor="contact-genre">Genre</FieldLabel>
                <input id="contact-genre" type="text" placeholder="e.g. historical romance, memoir" className={cn(control, "h-12")} {...a11y("genre")} {...register("genre")} />
                <FieldError name="genre" message={errors.genre?.message} />
              </div>
            </>
          ) : null}

          {show.titleCount ? (
            <div>
              <FieldLabel htmlFor="contact-titleCount">Number of titles</FieldLabel>
              <select id="contact-titleCount" className={cn(control, "h-12")} {...register("titleCount")}>
                <option value="">Select an option</option>
                {titleCountOptions.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </div>
          ) : null}

          {show.stage ? (
            <div>
              <FieldLabel htmlFor="contact-projectStage">Current project stage</FieldLabel>
              <select id="contact-projectStage" className={cn(control, "h-12")} {...register("projectStage")}>
                <option value="">Select a stage</option>
                {projectStageOptions.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </div>
          ) : null}

          {show.targetDate ? (
            <div>
              <FieldLabel htmlFor="contact-targetDate">Target completion or release date</FieldLabel>
              <input id="contact-targetDate" type="date" className={cn(control, "h-12")} {...a11y("targetDate", true)} {...register("targetDate")} />
              <Hint name="targetDate">An estimate is fine.</Hint>
              <FieldError name="targetDate" message={errors.targetDate?.message} />
            </div>
          ) : null}

          {show.project ? (
            <fieldset className="md:col-span-2">
              <legend className="mb-3 flex items-baseline gap-1.5 text-sm font-semibold text-ink">
                Budget <span className="font-normal text-ink/50">(optional)</span>
              </legend>
              <div className="flex flex-wrap gap-x-6 gap-y-3">
                {budgetOptions.map((o) => (
                  <label key={o.value} htmlFor={`contact-budget-${o.value}`} className="flex cursor-pointer items-center gap-2.5 text-[0.9375rem] text-ink">
                    <input id={`contact-budget-${o.value}`} type="radio" value={o.value} className="size-[1.125rem] cursor-pointer accent-[#1559A8]" {...register("budget")} />
                    {o.label}
                  </label>
                ))}
              </div>
              {budget === "custom" ? (
                <div className="mt-4 grid gap-4 sm:grid-cols-[1fr_9rem]">
                  <div>
                    <label htmlFor="contact-budgetAmount" className="mb-2 block text-sm font-semibold text-ink">
                      Amount or range
                    </label>
                    <input id="contact-budgetAmount" type="text" placeholder="e.g. 2,000 or 2,000–4,000" className={cn(control, "h-12")} {...a11y("budgetAmount")} {...register("budgetAmount")} />
                    <FieldError name="budgetAmount" message={errors.budgetAmount?.message} />
                  </div>
                  <div>
                    <label htmlFor="contact-budgetCurrency" className="mb-2 block text-sm font-semibold text-ink">
                      Currency
                    </label>
                    <select id="contact-budgetCurrency" className={cn(control, "h-12")} {...a11y("budgetCurrency")} {...register("budgetCurrency")}>
                      <option value="">Select</option>
                      {currencyOptions.map((o) => (
                        <option key={o}>{o}</option>
                      ))}
                    </select>
                    <FieldError name="budgetCurrency" message={errors.budgetCurrency?.message} />
                  </div>
                </div>
              ) : null}
            </fieldset>
          ) : null}

          <div className="md:col-span-2">
            <FieldLabel htmlFor="contact-message" required>
              Project details or message
            </FieldLabel>
            <textarea
              id="contact-message"
              rows={6}
              placeholder="Tell us about the book or list, where it stands today, the rights you hold and what you’d like help with."
              className={cn(control, "min-h-40 resize-y py-3 leading-relaxed")}
              {...a11y("message")}
              {...register("message")}
            />
            <FieldError name="message" message={errors.message?.message} />
          </div>
        </Section>

        {/* -------------------------------------------------- Preferences */}
        <Section title="Preferences" description="How and when you’d like us to get back to you.">
          <fieldset className="md:col-span-2">
            <legend className="mb-3 flex items-baseline gap-1.5 text-sm font-semibold text-ink">
              Preferred contact method <span className="font-normal text-ink/50">(optional)</span>
            </legend>
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              {contactMethodOptions.map((o) => (
                <label key={o} htmlFor={`contact-method-${o}`} className="flex cursor-pointer items-center gap-2.5 text-[0.9375rem] text-ink">
                  <input id={`contact-method-${o}`} type="radio" value={o} className="size-[1.125rem] cursor-pointer accent-[#1559A8]" {...register("contactMethod")} />
                  {o}
                </label>
              ))}
            </div>
          </fieldset>

          <div>
            <FieldLabel htmlFor="contact-timeZone">Time zone</FieldLabel>
            <input id="contact-timeZone" type="text" placeholder="e.g. Europe/London or GMT+1" className={cn(control, "h-12")} {...a11y("timeZone")} {...register("timeZone")} />
            <button
              type="button"
              onClick={() => setValue("timeZone", Intl.DateTimeFormat().resolvedOptions().timeZone, { shouldDirty: true })}
              className="mt-2 rounded-sm text-[0.8125rem] font-semibold text-brand hover:underline focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none"
            >
              Use my current time zone
            </button>
          </div>

          <div>
            <FieldLabel htmlFor="contact-contactTime">Preferred contact time</FieldLabel>
            <select id="contact-contactTime" className={cn(control, "h-12")} {...register("contactTime")}>
              <option value="">No preference</option>
              {contactTimeOptions.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label htmlFor="contact-marketingConsent" className="flex cursor-pointer items-start gap-3 text-[0.9375rem] leading-relaxed text-ink">
              <input id="contact-marketingConsent" type="checkbox" className="mt-1 size-[1.125rem] shrink-0 cursor-pointer accent-[#1559A8]" {...register("marketingConsent")} />
              <span>
                I’d like to receive occasional updates from Book Stream. <span className="text-ink/55">(optional — you can say no and still send your enquiry)</span>
              </span>
            </label>
          </div>
        </Section>
      </div>

      {/* ------------------------------------------------------- Submit */}
      <div className="mt-10 border-t border-border pt-8">
        <p className="text-sm leading-relaxed text-ink/60">
          We use the details you share to respond to your enquiry. Read our{" "}
          <Link href="/privacy-policy" className="font-medium text-brand underline underline-offset-4 hover:text-ink">
            Privacy Policy
          </Link>{" "}
          to learn more.
        </p>
        <Button type="submit" size="xl" disabled={submitting} className="mt-6 w-full sm:w-auto">
          {submitting ? (
            <>
              <Loader2 className="size-4" aria-hidden />
              Sending…
            </>
          ) : (
            <>
              Send enquiry
              <ArrowRight data-icon="inline-end" className="size-4" />
            </>
          )}
        </Button>

        <div ref={statusRef} tabIndex={-1} role="status" aria-live="polite" className="mt-6 outline-none">
          {status === "sent" ? (
            <div className="flex gap-3 rounded-[4px] border border-brand p-4 text-[0.9375rem] leading-relaxed text-ink">
              <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brand" aria-hidden />
              <p>
                <span className="font-semibold">Thank you — your enquiry has been sent.</span> We’ll be in touch using the contact details you provided.
              </p>
            </div>
          ) : null}
          {status === "not_configured" ? (
            <div className="flex gap-3 rounded-[4px] border border-ink/30 p-4 text-[0.9375rem] leading-relaxed text-ink">
              <Info className="mt-0.5 size-5 shrink-0 text-brand" aria-hidden />
              <p>
                <span className="font-semibold">Your enquiry has not been sent.</span> Online enquiries aren’t connected yet, so nothing was delivered or
                stored. Your details are still in the form — please keep a copy and try again later.
              </p>
            </div>
          ) : null}
          {status === "error" ? (
            <div className="flex gap-3 rounded-[4px] border border-ink/30 p-4 text-[0.9375rem] leading-relaxed text-ink">
              <AlertCircle className="mt-0.5 size-5 shrink-0 text-brand" aria-hidden />
              <p>
                <span className="font-semibold">Something went wrong and your enquiry was not sent.</span> Your details are still in the form — please
                try again in a moment.
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </form>
  );
}
