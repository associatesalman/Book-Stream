"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/brand/logo";
import { DesktopNav } from "./desktop-nav";
import { MobileNav } from "./mobile-nav";
import { SearchPanel } from "./search-panel";

export function SiteHeader() {
  const [searchOpen, setSearchOpen] = useState(false);
  const closeSearch = useCallback(() => setSearchOpen(false), []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b border-ink/10 bg-white",
      )}
    >
      <div className={cn("container-page flex h-[4.5rem] items-center justify-between gap-6 lg:h-20")}>
        <Logo className="shrink-0" preload />

        <DesktopNav />

        <div className="flex items-center gap-1 sm:gap-2">
          <Button
            variant="ghost"
            size="icon-lg"
            aria-label={searchOpen ? "Close search" : "Search"}
            aria-expanded={searchOpen}
            aria-controls="site-search"
            onClick={() => setSearchOpen((v) => !v)}
            className="text-ink/80 hover:bg-white hover:text-brand"
          >
            {searchOpen ? <X className="size-5" /> : <Search className="size-5" />}
          </Button>
          <Button asChild size="lg" className="ml-1 hidden sm:inline-flex">
            <Link href="/contact">Contact Us</Link>
          </Button>
          <MobileNav />
        </div>
      </div>

      <SearchPanel open={searchOpen} onClose={closeSearch} />
    </header>
  );
}
