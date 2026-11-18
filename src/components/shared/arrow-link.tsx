import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

type ArrowLinkProps = React.ComponentProps<typeof Link> & {
  tone?: "brand" | "ink" | "white";
};

/** Text link with a trailing arrow; underlines on hover (no motion). */
export function ArrowLink({ className, children, tone = "brand", ...props }: ArrowLinkProps) {
  return (
    <Link
      className={cn(
        "group/arrow inline-flex items-center gap-2 rounded-sm text-sm font-semibold underline-offset-[6px] hover:underline focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
        tone === "brand" && "text-brand hover:text-ink",
        tone === "ink" && "text-ink hover:text-brand",
        tone === "white" && "text-white decoration-white/50",
        className,
      )}
      {...props}
    >
      {children}
      <ArrowRight aria-hidden className="size-4" />
    </Link>
  );
}
