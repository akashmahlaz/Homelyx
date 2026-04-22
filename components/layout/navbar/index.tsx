import CartModal from "components/cart/modal";
import { LanguageSwitcher } from "components/language-switcher";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { Suspense } from "react";
import { BrandMark } from "./brand-mark";
import { LocationPill } from "./location-pill";
import { MobileMenu } from "./mobile-menu-drawer";
import Search, { SearchSkeleton } from "./search";

const NAV_LINKS = [
  { href: "/search/tiffins", labelKey: "tiffins" as const },
  { href: "/search/curries", labelKey: "curries" as const },
  { href: "/search/baked-goods", labelKey: "bakedGoods" as const },
  { href: "/search/snacks", labelKey: "snacks" as const },
  { href: "/search", labelKey: "shop" as const },
] as const;

export async function Navbar() {
  const t = await getTranslations("nav");

  return (
    <header className="sticky top-0 z-40 border-b border-stone-100 bg-white/95 backdrop-blur-md">
      {/* Slim announcement bar */}
      <div className="bg-stone-900 text-white">
        <div className="mx-auto max-w-7xl px-4 py-2 lg:px-6">
          <p className="text-center text-[11px] font-medium leading-tight tracking-wide text-stone-200 sm:text-xs">
            {t("announcement")}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        {/* Top row: hamburger · brand · location · search · actions */}
        <div className="flex items-center gap-3 py-3 sm:gap-4">
          <MobileMenu />
          <BrandMark />
          <LocationPill />

          {/* Search — always visible (mobile + desktop) */}
          <div className="ml-auto flex-1 max-w-2xl md:ml-4">
            <Suspense fallback={<SearchSkeleton />}>
              <Search />
            </Suspense>
          </div>

          {/* Right actions */}
          <div className="flex shrink-0 items-center gap-2 sm:gap-2.5">
            <Link
              href="/sell"
              className="hidden items-center gap-1.5 rounded-full bg-orange-500 px-4 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:bg-orange-600 hover:shadow-md lg:inline-flex"
            >
              {t("sell")}
            </Link>
            <div className="hidden md:block">
              <LanguageSwitcher />
            </div>
            <Link
              href="/auth/login"
              className="hidden rounded-full border border-stone-200 bg-white px-4 py-2 text-xs font-semibold text-stone-700 transition-colors hover:border-stone-300 hover:bg-stone-50 md:inline-block"
            >
              {t("signIn")}
            </Link>
            <CartModal />
          </div>
        </div>

        {/* Bottom row: category links (desktop only) */}
        <nav className="hidden items-center gap-1 border-t border-stone-100 py-1 text-sm md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              prefetch
              className="relative rounded-full px-3.5 py-2 text-[13px] font-medium text-stone-600 transition-colors hover:text-orange-600"
            >
              {t(link.labelKey)}
            </Link>
          ))}

          <span className="ml-auto flex items-center gap-2 text-[11px] font-medium text-stone-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="uppercase tracking-wider">Live in 24+ cities</span>
          </span>
        </nav>
      </div>
    </header>
  );
}
