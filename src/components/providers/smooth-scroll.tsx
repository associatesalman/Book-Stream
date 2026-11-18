"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

/**
 * Site-wide smooth scrolling with Lenis. Scrolling smoothness only: no animations, reveals or effects.
 *
 * - Wheel and trackpad scrolling are lightly smoothed (`lerp` 0.12: fluid, with little trailing inertia). Touch
 *   scrolling stays fully native (`syncTouch: false`), and so do keyboard scrolling and scrollbar dragging.
 * - `prefers-reduced-motion: reduce`: Lenis is not created at all, so scrolling is entirely native. The setting is
 *   watched live, so toggling it while the page is open starts or destroys Lenis.
 * - Lenis runs its own single `requestAnimationFrame` loop (`autoRaf`); `destroy()` removes it with every listener.
 *   There is no CSS `scroll-behavior: smooth` anywhere, so the two never compete.
 * - In-page links (`#id` on the current page, including Next `<Link href="#…">`) are handled here: one smooth Lenis
 *   scroll to the target, landing below the sticky header (Lenis honours the html `scroll-padding-top`), and the hash
 *   is pushed to history so Back/Forward still work. Links marked `data-lenis-ignore` (the skip link, which must move
 *   keyboard focus) keep the native jump.
 * - Route changes: clicking an internal link stops any glide in progress (`stopInertiaOnNavigate`), and Back/Forward
 *   resets Lenis to wherever the browser restores the page, so Next's scroll handling and scroll restoration win.
 * - Overlays and nested scroll areas: while a Radix dialog or sheet locks the page (body `data-scroll-locked`), Lenis
 *   is stopped. Dialog contents, popovers and any element that can scroll on its own (`allowNestedScroll`) keep native
 *   scrolling.
 */
export function SmoothScroll() {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | null = null;
    let lockObserver: MutationObserver | null = null;

    const syncScrollLock = () => {
      if (!lenis) return;
      if (document.body.hasAttribute("data-scroll-locked")) lenis.stop();
      else lenis.start();
    };

    const onInPageLinkClick = (event: MouseEvent) => {
      if (!lenis || event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element | null)?.closest?.("a[href]");
      if (!(link instanceof HTMLAnchorElement)) return;
      if ((link.target && link.target !== "_self") || link.hasAttribute("download") || link.hasAttribute("data-lenis-ignore")) return;

      const url = new URL(link.href);
      if (url.origin !== location.origin || url.pathname !== location.pathname || url.search !== location.search || !url.hash) return;
      const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!target) return;

      // Capture phase: handle it before Next's <Link> does its own instant jump.
      event.preventDefault();
      event.stopPropagation();
      lenis.scrollTo(target);
      if (location.hash !== url.hash) window.history.pushState(null, "", url.hash);
    };

    // Back/Forward: cancel any glide in progress so the browser's restored position wins. stop()+start() in the same
    // task is Lenis's public way to reset; no frame is painted in between, so nothing visibly changes.
    const onPopState = () => {
      if (!lenis || lenis.isStopped) return;
      lenis.stop();
      lenis.start();
    };

    const start = () => {
      if (lenis || reducedMotion.matches) return;
      lenis = new Lenis({
        autoRaf: true,
        lerp: 0.12,
        smoothWheel: true,
        syncTouch: false,
        allowNestedScroll: true,
        stopInertiaOnNavigate: true,
        prevent: (node) => node.matches('[role="dialog"], [data-radix-popper-content-wrapper]'),
      });
      lenisRef.current = lenis;
      lockObserver = new MutationObserver(syncScrollLock);
      lockObserver.observe(document.body, { attributes: true, attributeFilter: ["data-scroll-locked"] });
      syncScrollLock();
      window.addEventListener("click", onInPageLinkClick, true);
      window.addEventListener("popstate", onPopState);
    };

    const stop = () => {
      window.removeEventListener("click", onInPageLinkClick, true);
      window.removeEventListener("popstate", onPopState);
      lockObserver?.disconnect();
      lockObserver = null;
      lenis?.destroy();
      lenis = null;
      lenisRef.current = null;
    };

    const onMotionPreferenceChange = () => (reducedMotion.matches ? stop() : start());

    start();
    reducedMotion.addEventListener("change", onMotionPreferenceChange);
    return () => {
      reducedMotion.removeEventListener("change", onMotionPreferenceChange);
      stop();
    };
  }, []);

  // After a route change Next has already set the new scroll position; re-measure the new page and sync to it.
  useEffect(() => {
    lenisRef.current?.resize();
  }, [pathname]);

  return null;
}
