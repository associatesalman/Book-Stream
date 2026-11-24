import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  /** Hide the on-screen Next.js development indicator (compile and runtime errors still surface). */
  devIndicators: false,
  partialPrefetching: true,
  /** Category pages moved from /audiobooks/category/[slug] to /audiobooks/[slug]. */
  redirects() {
    return [
      { source: "/audiobooks/category/:slug", destination: "/audiobooks/:slug", permanent: true },
      /* The category index is now the catalogue sidebar on /audiobooks. */
      { source: "/audiobooks/categories", destination: "/audiobooks", permanent: true },
      /* Legal pages live at /privacy-policy and /terms-conditions; the short paths were linked before they existed. */
      { source: "/privacy", destination: "/privacy-policy", permanent: true },
      { source: "/terms", destination: "/terms-conditions", permanent: true },
      /* The Atlanta studio page is now the Texas studio page; the Mexico City page was removed. */
      { source: "/studios/atlanta", destination: "/studios/texas", permanent: true },
      { source: "/studios/mexico-city", destination: "/studios", permanent: true },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
