import type { Metadata } from "next";

import { siteConfig } from "@/config/site";

/** Unique title, description and canonical URL for a page. */
export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { siteName: siteConfig.name, title, description, url: path },
    twitter: { title, description },
  };
}
