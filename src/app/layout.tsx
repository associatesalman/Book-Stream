import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Source_Serif_4 } from "next/font/google";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { AppProviders } from "@/components/providers/app-providers";
import { UtilityBar } from "@/components/layout/utility-bar";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  axes: ["opsz"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  /** Site title is "Book Stream"; inner pages render as "Page | Book Stream". */
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  appleWebApp: { title: siteConfig.name },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: ["audiobooks", "audiobook distribution", "audiobook production", "publishers", "libraries", "listening"],
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#1559A8",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={cn(geistSans.variable, geistMono.variable, sourceSerif.variable, "h-full")}>
      <body className="flex min-h-full flex-col">
        <AppProviders>
          {/* data-lenis-ignore: keeps the native jump so keyboard focus moves to the main content. */}
          <a
            href="#main-content"
            data-lenis-ignore
            className="sr-only z-50 rounded-md bg-brand px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
          >
            Skip to main content
          </a>
          <UtilityBar />
          <SiteHeader />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </AppProviders>
      </body>
    </html>
  );
}
