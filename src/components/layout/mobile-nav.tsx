"use client";

import { useState } from "react";
import Link from "next/link";
import Form from "next/form";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, Search } from "lucide-react";

import { mainNav } from "@/config/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Logo } from "@/components/brand/logo";
import { isActivePath } from "./nav-utils";

export function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const close = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon-lg"
          className="xl:hidden"
          aria-label="Open menu"
        >
          <Menu className="size-6" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-full gap-0 border-l-0 p-0 data-[side=right]:w-full data-[side=right]:sm:max-w-md"
      >
        <div className="flex h-16 items-center border-b border-border px-5">
          <Logo size="sm" />
        </div>
        <SheetTitle className="sr-only">Site navigation</SheetTitle>
        <SheetDescription className="sr-only">
          Browse Book Stream pages
        </SheetDescription>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          <Form
            action="/search"
            role="search"
            className="relative mb-4"
            onSubmit={close}
          >
            <label htmlFor="mobile-search" className="sr-only">
              Search audiobooks
            </label>
            <Search
              className="pointer-events-none absolute top-1/2 left-3.5 size-4.5 -translate-y-1/2 text-ink/45"
              aria-hidden
            />
            <input
              id="mobile-search"
              name="q"
              type="search"
              placeholder="Search audiobooks"
              className="h-11 w-full rounded-md border border-input bg-white pr-3 pl-10 text-base outline-none focus:border-brand"
            />
          </Form>

          <nav aria-label="Mobile">
            <ul className="divide-y divide-border">
              {mainNav.map((item) => {
                const active = isActivePath(pathname, item.href);
                const isOpen = expanded === item.href;

                return (
                  <li key={item.href}>
                    {item.children ? (
                      <>
                        {/* Label opens the section overview; the chevron button expands its sub-pages. */}
                        <div className="flex items-center justify-between gap-3">
                          <Link
                            href={item.href}
                            onNavigate={close}
                            aria-current={
                              pathname === item.href ? "page" : undefined
                            }
                            className={cn(
                              "flex flex-1 items-center gap-3 py-4 text-lg font-medium",
                              active
                                ? "text-brand"
                                : "text-ink hover:text-brand",
                            )}
                          >
                            {active ? (
                              <span
                                className="h-5 w-0.5 bg-brand"
                                aria-hidden
                              />
                            ) : null}
                            {item.title}
                          </Link>
                          <button
                            type="button"
                            onClick={() =>
                              setExpanded(isOpen ? null : item.href)
                            }
                            aria-expanded={isOpen}
                            aria-controls={`mobile-sub-${item.title.toLowerCase()}`}
                            aria-label={`${isOpen ? "Hide" : "Show"} ${item.title} pages`}
                            className="-mr-2 flex size-11 items-center justify-center rounded-md text-ink/60 hover:text-brand focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none"
                          >
                            <ChevronDown
                              className={cn("size-5", isOpen && "rotate-180")}
                              aria-hidden
                            />
                          </button>
                        </div>
                        {isOpen ? (
                          <ul id={`mobile-sub-${item.title.toLowerCase()}`}>
                            {item.children.map((child) => (
                              <li key={child.href}>
                                <Link
                                  href={child.href}
                                  onNavigate={close}
                                  className="block border-l-2 border-ink/10 py-2 pl-4 text-[0.9375rem] text-ink/75 hover:border-brand hover:text-brand"
                                >
                                  {child.title}
                                </Link>
                              </li>
                            ))}
                            <li className="h-3" aria-hidden />
                          </ul>
                        ) : null}
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        onNavigate={close}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "flex items-center gap-3 py-4 text-lg font-medium",
                          active ? "text-brand" : "text-ink hover:text-brand",
                        )}
                      >
                        {active ? (
                          <span className="h-5 w-0.5 bg-brand" aria-hidden />
                        ) : null}
                        {item.title}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        <div className="border-t border-border p-5">
          <Button asChild size="xl" className="w-full">
            <Link href="/contact" onNavigate={close}>
              Contact Us
            </Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
