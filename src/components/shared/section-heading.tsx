import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
  /** Heading id, so the parent <section> can reference it with aria-labelledby. */
  id?: string;
  /** Heading level; defaults to h2. Use "h1" when the heading is the page's main heading. */
  as?: "h1" | "h2";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
  className,
  id,
  as: Heading = "h2",
}: SectionHeadingProps) {
  const dark = tone === "dark";
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? (
        <p className={cn("eyebrow mb-4 flex items-center gap-3", align === "center" && "justify-center", dark ? "text-white" : "text-brand")}>
          <span aria-hidden className={cn("h-px w-8", dark ? "bg-white" : "bg-brand")} />
          {eyebrow}
        </p>
      ) : null}
      <Heading
        id={id}
        className={cn(
          "font-serif text-[2rem] leading-[1.1] font-semibold tracking-[-0.015em] sm:text-[2.5rem] lg:text-[2.875rem]",
          dark ? "text-white" : "text-ink",
        )}
      >
        {title}
      </Heading>
      {description ? (
        <p className={cn("mt-5 text-base leading-relaxed sm:text-lg", dark ? "text-white/75" : "text-ink/70")}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
