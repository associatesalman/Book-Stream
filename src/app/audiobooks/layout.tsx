import { CatalogSearchProvider } from "@/components/catalog/catalog-search";
import { CatalogSidebar } from "@/components/catalog/catalog-sidebar";

/**
 * Shared catalogue frame for /audiobooks and /audiobooks/[slug]:
 * one sidebar (search + category links) on the left, the current page on the right.
 * The layout persists across category navigation; only the right column changes.
 */
export default function AudiobooksLayout({ children }: LayoutProps<"/audiobooks">) {
  return (
    <CatalogSearchProvider>
      <div className="container-page grid gap-8 pt-8 pb-20 sm:pt-10 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-10 xl:grid-cols-[16rem_minmax(0,1fr)] xl:gap-12">
        <CatalogSidebar />
        <div className="min-w-0">{children}</div>
      </div>
    </CatalogSearchProvider>
  );
}
