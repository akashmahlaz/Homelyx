import CartModal from "components/cart/modal";
import LogoSquare from "components/logo-square";
import { getMenu } from "lib/shopify";
import { Menu } from "lib/shopify/types";
import Link from "next/link";
import { Suspense } from "react";
import MobileMenu from "./mobile-menu";
import Search, { SearchSkeleton } from "./search";

export async function Navbar() {
  const menu = await getMenu("next-js-frontend-header-menu");

  return (
    <nav className="sticky top-0 z-40 border-b border-orange-100 bg-orange-50/90 backdrop-blur-md">
      <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 lg:px-6">
        <div className="block flex-none md:hidden">
          <Suspense fallback={null}>
            <MobileMenu menu={menu} />
          </Suspense>
        </div>

        <div className="flex w-full items-center">
          {/* Brand */}
          <div className="flex shrink-0 items-center">
            <Link
              href="/"
              prefetch={true}
              className="mr-2 flex items-center gap-2.5"
            >
              <LogoSquare />
              <span className="hidden text-lg font-bold tracking-tight text-stone-900 md:block">
                Homelyx
              </span>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          {menu.length ? (
            <ul className="hidden gap-5 text-sm md:flex md:items-center lg:gap-6">
              {menu.map((item: Menu) => (
                <li key={item.title}>
                  <Link
                    href={item.path}
                    prefetch={true}
                    className="text-stone-500 underline-offset-4 transition-colors hover:text-orange-500 hover:underline"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        {/* Search - Center */}
        <div className="hidden flex-1 justify-center md:flex md:w-auto lg:flex-none">
          <Suspense fallback={<SearchSkeleton />}>
            <Search />
          </Suspense>
        </div>

        {/* Mobile Search - only on tablet/mobile */}
        <div className="flex flex-1 md:hidden">
          <Suspense fallback={null}>
            <Search />
          </Suspense>
        </div>

        {/* Right actions */}
        <div className="flex shrink-0 items-center justify-end gap-2 md:w-auto">
          {/* Auth/Login button */}
          <Link
            href="/auth/login"
            className="flex items-center gap-1.5 rounded-full border border-stone-200 bg-white px-3 py-1.5 text-xs font-medium text-stone-600 transition hover:bg-stone-50"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="hidden sm:inline">Login</span>
          </Link>

          <Link
            href="/sell"
            className="hidden rounded-full border border-orange-200 bg-white px-4 py-1.5 text-xs font-semibold text-orange-600 transition-colors hover:bg-orange-50 lg:block"
          >
            Sell with us
          </Link>
          <CartModal />
        </div>
      </div>
    </nav>
  );
}