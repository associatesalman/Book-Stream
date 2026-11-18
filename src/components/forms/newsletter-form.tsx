"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { AlertCircle, ArrowRight } from "lucide-react";

import { newsletterSchema, type NewsletterValues } from "@/lib/validations/newsletter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/**
 * Newsletter signup — validation only.
 * TODO(integration): connect to the chosen email provider once confirmed.
 * Until then, a valid submission shows a confirmation toast and nothing is stored or sent.
 */
export function NewsletterForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (values: NewsletterValues) => {
    toast.success("Thanks for your interest!", {
      description: `Newsletter signups aren't live yet, so ${values.email} has not been stored. We'll enable subscriptions soon.`,
    });
    reset();
  };

  const errorId = "newsletter-email-error";

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="w-full">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="flex-1">
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <Input
            id="newsletter-email"
            type="email"
            autoComplete="email"
            placeholder="Enter your email address"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? errorId : undefined}
            className={cn(
              "h-12 rounded-md border-ink/15 bg-white px-4 text-base md:text-base",
              "focus-visible:border-brand focus-visible:ring-ring/20",
              errors.email && "border-ink ring-3 ring-ink/10",
            )}
            {...register("email")}
          />
        </div>
        <Button type="submit" size="xl" disabled={isSubmitting}>
          Subscribe
          <ArrowRight data-icon="inline-end" className="size-4" />
        </Button>
      </div>

      <div className="mt-3 min-h-5 text-sm" aria-live="polite">
        {errors.email ? (
          <p id={errorId} className="flex items-center gap-1.5 font-medium text-ink">
            <AlertCircle className="size-4 text-brand" aria-hidden />
            {errors.email.message}
          </p>
        ) : null}
      </div>
    </form>
  );
}
