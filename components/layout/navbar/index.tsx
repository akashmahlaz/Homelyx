import CartModal from "components/cart/modal";
import { LanguageSwitcher } from "components/language-switcher";
import LogoSquare from "components/logo-square";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { Suspense } from "react";
import Search, { SearchSkeleton } from "./search";

const NAV_LINKS = [
  { href: "/search/tiffins", labelKey: "tiffins" as const },
  { href: "/search/baked-goods", labelKey: "bakedGoods" as const },
  { href: "/search", labelKey: "shop" as const },
] as const;

export async function Navbar() {
  const t = await getTranslations("nav");

  return (
    <header className="sticky top-0 z-40 border-b border-orange-100 bg-orange-50/95 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        {/* Top row: brand · search · actions */}
        <div className="flex items-center gap-4 py-3">
          {/* Brand */}
          <Link
            href="/"
            prefetch={true}
            className="flex shrink-0 items-center gap-2.5"
          >
            <LogoSquare />
            <span className="hidden text-lg font-extrabold tracking-tight text-stone-900 sm:block">
              Homelyx
            </span>
          </Link>

          {/* Search — always visible (mobile + desktop) */}
          <div className="flex-1 max-w-2xl">
            <Suspense fallback={<SearchSkeleton />}>
              <Search />
            </Suspense>
          </div>

          {/* Actions */}
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <Link
              href="/sell"
              className="hidden rounded-full border border-orange-200 bg-white px-4 py-2 text-xs font-semibold text-orange-600 transition-colors hover:bg-orange-100 lg:inline-block"
            >
              {t("sell")}
            </Link>
            <LanguageSwitcher />
            <Link
              href="/auth/login"
              className="hidden rounded-full border border-stone-200 bg-white px-4 py-2 text-xs font-semibold text-stone-700 transition-colors hover:bg-stone-50 sm:inline-block"
            >
              Sign in
            </Link>
            <CartModal />
          </div>
        </div>

        {/* Bottom row: category links (desktop only) */}
        <nav className="hidden items-center gap-6 border-t border-orange-100/70 py-2.5 text-sm md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              prefetch={true}
              className="font-medium text-stone-500 transition-colors hover:text-orange-600"
            >
              {t(link.labelKey)}
            </Link>
          ))}
          <span className="ml-auto flex items-center gap-2 text-xs text-stone-400">
            <span className="inline-flex h-2 w-2 rounded-full bg-green-500" />
            Delivering across India
          </span>
        </nav>
      </div>
    </header>
  );
}
