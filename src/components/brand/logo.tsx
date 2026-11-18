import Image from "next/image";
import Link from "next/link";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * OFFICIAL BRAND LOGO — two supplied sources (client, 2026-11-16). Never recolour or stretch.
 *
 * - "default": public/logo/bookstream-01-ocean-blue-original.svg, trimmed to its artwork as
 *   public/brand/bookstream-logo.svg (1869 × 380). Vector; used in the header and mobile menu.
 * - "transparent": public/logo/bookstream-01-ocean-blue-original-01.png (9000 × 3000, transparent),
 *   cropped to its artwork as public/brand/bookstream-logo-transparent.png (2400 × 433). Used in the
 *   footer with no background, border or plate behind it.
 *
 * Both have a navy "book" + blue "stream" wordmark, so they must sit on a white background.
 */
const SOURCES = {
  default: { src: "/brand/bookstream-logo.svg", width: 1869, height: 380, unoptimized: true },
  transparent: { src: "/brand/bookstream-logo-transparent.png", width: 2400, height: 433, unoptimized: false },
} as const;

type LogoProps = {
  variant?: keyof typeof SOURCES;
  className?: string;
  /** Render as a link to the homepage (default true). */
  asLink?: boolean;
  size?: "sm" | "md";
  /** Load eagerly (use for the header logo, which is above the fold). */
  preload?: boolean;
};

export function Logo({ variant = "default", className, asLink = true, size = "md", preload = false }: LogoProps) {
  const source = SOURCES[variant];
  const image = (
    <Image
      src={source.src}
      width={source.width}
      height={source.height}
      alt={asLink ? "" : siteConfig.name}
      preload={preload}
      unoptimized={source.unoptimized}
      sizes={size === "md" ? "(min-width: 1024px) 245px, 200px" : "180px"}
      className={cn("block w-auto max-w-none", size === "md" ? "h-9 lg:h-11" : "h-8")}
    />
  );

  if (!asLink) {
    return <span className={cn("inline-flex", className)}>{image}</span>;
  }

  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name} — Home`}
      className={cn(
        "inline-flex rounded-sm focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
        className,
      )}
    >
      {image}
    </Link>
  );
}
