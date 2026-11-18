"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, ArrowRight, Info } from "lucide-react";

import { serviceInterestOptions, titleCountOptions } from "@/content/publishers";
import { publisherEnquirySchema, type PublisherEnquiryValues } from "@/lib/validations/publisher-enquiry";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

/**
 * Publisher enquiry form — validation only.
 * TODO(integration): send submissions to the chosen destination (email service, CRM or API route)
 * once it is confirmed. Until then a valid submission is NOT sent or stored, and the form says so
 * plainly instead of showing a success message. Entered values are kept so nothing is lost.
 */

const fieldClass =
  "w-full rounded-md border border-ink/20 bg-white px-3.5 text-base text-ink outline-none placeholder:text-ink/40 focus:border-brand focus:ring-3 focus:ring-brand/20 aria-[invalid=true]:border-ink aria-[invalid=true]:ring-3 aria-[invalid=true]:ring-ink/10";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 flex items-start gap-1.5 text-sm font-medium text-ink">
      <AlertCircle className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
      {message}
    </p>
  );
}

function Label({ htmlFor, children, optional }: { htmlFor: string; children: React.ReactNode; optional?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="mb-2 block text-sm font-semibold text-ink">
      {children}
      {optional ? <span className="ml-1.5 font-normal text-ink/55">(optional)</span> : null}
    </label>
  );
}

export function PublisherEnquiryForm() {
  const [pending, setPending] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PublisherEnquiryValues>({
    resolver: zodResolver(publisherEnquirySchema),
    defaultValues: { name: "", company: "", email: "", website: "", services: [], message: "" },
  });

  const onSubmit = async () => {
    // Submission integration is pending: nothing is sent. Tell the visitor honestly.
    setPending(true);
  };

  const describe = (field: keyof PublisherEnquiryValues) => (errors[field] ? `enquiry-${field}-error` : undefined);

  return (
    <form onSubmit={handleSubmit(onSubmit, () => setPending(false))} noValidate aria-describedby="enquiry-status-note">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <Label htmlFor="enquiry-name">Name</Label>
          <input
            id="enquiry-name"
            type="text"
            autoComplete="name"
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={describe("name")}
            className={cn(fieldClass, "h-12")}
            {...register("name")}
          />
          <FieldError id="enquiry-name-error" message={errors.name?.message} />
        </div>

        <div>
          <Label htmlFor="enquiry-company">Publishing company or imprint</Label>
          <input
            id="enquiry-company"
            type="text"
            autoComplete="organization"
            aria-invalid={errors.company ? true : undefined}
            aria-describedby={describe("company")}
            className={cn(fieldClass, "h-12")}
            {...register("company")}
          />
          <FieldError id="enquiry-company-error" message={errors.company?.message} />
        </div>

        <div>
          <Label htmlFor="enquiry-email">Work email</Label>
          <input
            id="enquiry-email"
            type="email"
            autoComplete="email"
            inputMode="email"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={describe("email")}
            className={cn(fieldClass, "h-12")}
            {...register("email")}
          />
          <FieldError id="enquiry-email-error" message={errors.email?.message} />
        </div>

        <div>
          <Label htmlFor="enquiry-website" optional>
            Website
          </Label>
          <input
            id="enquiry-website"
            type="text"
            inputMode="url"
            autoComplete="url"
            placeholder="www.example.com"
            aria-invalid={errors.website ? true : undefined}
            aria-describedby={describe("website")}
            className={cn(fieldClass, "h-12")}
            {...register("website")}
          />
          <FieldError id="enquiry-website-error" message={errors.website?.message} />
        </div>

        <div className="sm:col-span-2">
          <Label htmlFor="enquiry-titles">Approximate number of titles</Label>
          <select
            id="enquiry-titles"
            defaultValue=""
            aria-invalid={errors.titleCount ? true : undefined}
            aria-describedby={describe("titleCount")}
            className={cn(fieldClass, "h-12 sm:max-w-xs")}
            {...register("titleCount")}
          >
            <option value="" disabled>
              Select an option
            </option>
            {titleCountOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <FieldError id="enquiry-titleCount-error" message={errors.titleCount?.message} />
        </div>

        <fieldset className="sm:col-span-2" aria-describedby={describe("services")}>
          <legend className="mb-3 text-sm font-semibold text-ink">Services of interest</legend>
          <div className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
            {serviceInterestOptions.map((option, i) => (
              <label key={option} htmlFor={`enquiry-service-${i}`} className="flex cursor-pointer items-center gap-3 text-[0.9375rem] text-ink">
                <input
                  id={`enquiry-service-${i}`}
                  type="checkbox"
                  value={option}
                  className="size-[1.125rem] shrink-0 cursor-pointer rounded-[3px] border-ink/30 accent-[#1559A8]"
                  {...register("services")}
                />
                {option}
              </label>
            ))}
          </div>
          <FieldError id="enquiry-services-error" message={errors.services?.message} />
        </fieldset>

        <div className="sm:col-span-2">
          <Label htmlFor="enquiry-message">Project message</Label>
          <textarea
            id="enquiry-message"
            rows={6}
            placeholder="Tell us about the titles, their current format, the rights you hold and your timing."
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={describe("message")}
            className={cn(fieldClass, "min-h-36 resize-y py-3 leading-relaxed")}
            {...register("message")}
          />
          <FieldError id="enquiry-message-error" message={errors.message?.message} />
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p id="enquiry-status-note" className="text-sm text-ink/60">
          Online submission is not connected yet.
        </p>
        <Button type="submit" size="xl" disabled={isSubmitting}>
          Send enquiry
          <ArrowRight data-icon="inline-end" className="size-4" />
        </Button>
      </div>

      <div aria-live="polite" className="mt-6">
        {pending ? (
          <div className="flex gap-3 rounded-[4px] border border-brand/40 p-4 text-[0.9375rem] leading-relaxed text-ink">
            <Info className="mt-0.5 size-5 shrink-0 text-brand" aria-hidden />
            <p>
              <span className="font-semibold">Your enquiry has not been sent.</span> The details are valid, but online submission is
              still being set up, so nothing has been delivered or stored. Your entries are still in the form — please keep a copy
              and check back once enquiries are enabled.
            </p>
          </div>
        ) : null}
      </div>
    </form>
  );
}
