"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";

import { mainNav, type NavItem } from "@/config/site";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { isActivePath } from "./nav-utils";

/** Shared look for top-level links and dropdown triggers: quiet text with an animated underline. */
const topLevel = cn(
  "relative inline-flex h-10 items-center rounded-md bg-transparent px-3 text-[0.9375rem] font-medium text-ink/75",
  "hover:bg-transparent hover:text-ink focus:bg-transparent focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none",
  "data-open:bg-transparent data-open:text-ink data-open:hover:bg-transparent data-open:focus:bg-transparent",
  "after:absolute after:inset-x-3 after:bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-brand",
  "hover:after:scale-x-100 data-open:after:scale-x-100",
  "data-[active=true]:text-ink data-[active=true]:after:scale-x-100",
);

export function DesktopNav() {
  const pathname = usePathname();

  /*
   * Dropdown parents are split into a real link (opens the section's overview page) and a
   * separate chevron trigger (opens the menu by click/keyboard). The menu is controlled so that
   * hovering the link opens it too; a short close timer mirrors Radix's own hover behaviour.
   */
  const [openItem, setOpenItem] = useState("");
  const closeTimer = useRef<number | undefined>(undefined);
  const cancelClose = () => window.clearTimeout(closeTimer.current);
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = window.setTimeout(() => setOpenItem(""), 200);
  };
  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  // Close any open menu after navigation. Adjusting state during render is React's
  // recommended alternative to a pathname effect.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpenItem("");
  }

  return (
    <NavigationMenu
      viewport={false}
      aria-label="Main"
      className="hidden xl:flex"
      value={openItem}
      onValueChange={(value) => {
        cancelClose();
        setOpenItem(value);
      }}
    >
      <NavigationMenuList className="gap-2">
        {mainNav.map((item) => {
          const active = isActivePath(pathname, item.href);

          if (!item.children) {
            return (
              <NavigationMenuItem key={item.href}>
                <NavigationMenuLink asChild active={active} className={cn(topLevel, "p-0 px-3 hover:bg-transparent focus:bg-transparent data-active:bg-transparent")}>
                  <Link href={item.href} data-active={active} aria-current={active ? "page" : undefined}>
                    {item.title}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            );
          }

          return (
            <NavigationMenuItem key={item.href} value={item.href}>
              <div className="flex items-center">
                <Link
                  href={item.href}
                  data-active={active}
                  data-open={openItem === item.href ? "" : undefined}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className={cn(topLevel, "pr-1")}
                  onPointerEnter={(e) => {
                    if (e.pointerType !== "mouse") return;
                    cancelClose();
                    setOpenItem(item.href);
                  }}
                  onPointerLeave={(e) => {
                    if (e.pointerType === "mouse") scheduleClose();
                  }}
                >
                  {item.title}
                </Link>
                <NavigationMenuTrigger
                  aria-label={`Show ${item.title} menu`}
                  onPointerEnter={cancelClose}
                  className="size-8 rounded-md bg-transparent p-0 text-ink/60 hover:bg-transparent hover:text-brand focus:bg-transparent focus-visible:ring-3 focus-visible:ring-ring/40 data-open:bg-transparent data-open:text-brand data-open:hover:bg-transparent data-open:focus:bg-transparent [&>svg]:m-0 [&>svg]:size-3.5"
                />
              </div>
              <NavigationMenuContent
                onPointerEnter={cancelClose}
                className={cn(
                  "mt-3! rounded-md! border border-border bg-white p-0! shadow-none! ring-0!",
                  // Wide menus open leftward so they never run past the viewport edge.
                  item.title === "Services" && "md:right-0 md:left-auto",
                )}
              >
                {item.title === "Services" ? <ServicesMenu item={item} /> : <CatalogMenu item={item} />}
              </NavigationMenuContent>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function MenuIntro({ item }: { item: NavItem }) {
  return (
    <div className="flex w-56 shrink-0 flex-col justify-between border-r border-ink/10 bg-white p-6">
      <div>
        <p className="eyebrow text-brand">{item.title}</p>
        <p className="mt-3 font-serif text-lg leading-snug text-ink">{item.summary}</p>
      </div>
      <NavigationMenuLink asChild className="mt-6 p-0 hover:bg-transparent focus:bg-transparent">
        <Link href={item.href} className="group/intro inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
          View all
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      </NavigationMenuLink>
    </div>
  );
}

function CatalogMenu({ item }: { item: NavItem }) {
  const [featured, ...genres] = item.children ?? [];
  return (
    <div className="flex w-[34rem]">
      <MenuIntro item={item} />
      <div className="flex-1 p-4">
        {featured ? (
          <NavigationMenuLink asChild className="block rounded-md px-3 py-2.5 hover:bg-white hover:text-brand focus:bg-white focus:text-brand">
            <Link href={featured.href}>
              <span className="block text-sm font-semibold text-ink">{featured.title}</span>
              <span className="mt-0.5 block text-[0.8125rem] text-muted-foreground">{featured.description}</span>
            </Link>
          </NavigationMenuLink>
        ) : null}
        <p className="eyebrow mt-3 mb-1 px-3 text-[0.6875rem] text-muted-foreground">Categories</p>
        <ul className="grid grid-cols-2 gap-x-1">
          {genres.map((child) => (
            <li key={child.href}>
              <NavigationMenuLink asChild className="rounded-md px-3 py-2 text-sm text-ink/80 hover:bg-white hover:text-brand focus:bg-white focus:text-brand">
                <Link href={child.href}>{child.title}</Link>
              </NavigationMenuLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ServicesMenu({ item }: { item: NavItem }) {
  return (
    <div className="flex w-[42rem]">
      <MenuIntro item={item} />
      <ul className="grid flex-1 grid-cols-2 gap-1 p-4">
        {item.children?.map((child) => (
          <li key={child.href}>
            <NavigationMenuLink asChild className="block rounded-md px-3 py-2.5 hover:bg-white hover:text-brand focus:bg-white focus:text-brand">
              <Link href={child.href}>
                <span className="block text-sm font-semibold text-ink">{child.title}</span>
                <span className="mt-0.5 block text-[0.8125rem] leading-snug text-muted-foreground">{child.description}</span>
              </Link>
            </NavigationMenuLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
