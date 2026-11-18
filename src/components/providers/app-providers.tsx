"use client";

import { Toaster } from "@/components/ui/sonner";
import { SmoothScroll } from "@/components/providers/smooth-scroll";

/** Client-side providers. The site is static: no animation library; Lenis provides smooth scrolling only. */
export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SmoothScroll />
      {children}
      <Toaster theme="light" position="bottom-right" richColors={false} closeButton />
    </>
  );
}
