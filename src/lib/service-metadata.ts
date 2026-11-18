import type { Metadata } from "next";

import { siteConfig } from "@/config/site";

import type { Service } from "@/content/services";

/** Unique title, description and canonical URL for an individual service page. */
export function serviceMetadata(service: Service): Metadata {
  const { title, description } = service.seo;
  return {
    title,
    description,
    alternates: { canonical: service.href },
    openGraph: { siteName: siteConfig.name, title, description, url: service.href },
    twitter: { title, description },
  };
}
