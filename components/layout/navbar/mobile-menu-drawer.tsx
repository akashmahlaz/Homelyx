"use client";

import {
    Bars3Icon,
    ClockIcon,
    HomeIcon,
    MapPinIcon,
    ShoppingBagIcon,
    Squares2X2Icon,
    UserCircleIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { LanguageSwitcher } from "components/language-switcher";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Search, { SearchSkeleton } from "./search";

const PRIMARY_LINKS = [
  { href: "/search/tiffins", labelKey: "tiffins", icon: ClockIcon },
  { href: "/search/curries", labelKey: "curries", icon: Squares2X2Icon },
  { href: "/search/baked-goods", labelKey: "bakedGoods", icon: ShoppingBagIcon },
  { href: "/search/snacks", labelKey: "snacks", icon: Squares2X2Icon },
  { href: "/search", labelKey: "shop", icon: HomeIcon },
] as const;

const SECONDARY_LINKS = [
  { href: "/orders", labelKey: "orders", icon: ShoppingBagIcon },
  { href: "/auth/login", labelKey: "account", icon: UserCircleIcon },
  { href: "/sell", labelKey: "sell", icon: HomeIcon },
] as const;

export function MobileMenu() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname, searchParams]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => e.key === "Escape" && setIsOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handler);
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label={t("menu")}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-700 transition-colors hover:bg-stone-50 md:hidden"
      >
        <Bars3Icon className="h-5 w-5" />
      </button>

      {/* Backdrop + Drawer */}
      <div
        className={clsx(
          "fixed inset-0 z-50 transition-opacity duration-200 md:hidden",
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
        aria-hidden={!isOpen}
      >
        {/* Backdrop */}
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="absolute inset-0 bg-stone-900/50 backdrop-blur-sm"
          aria-label={t("close")}
        />

        {/* Drawer panel */}
        <aside
          className={clsx(
            "absolute inset-y-0 left-0 flex w-[85%] max-w-sm flex-col bg-white shadow-2xl transition-transform duration-300 ease-out",
            isOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-stone-100 px-5 py-4">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 text-sm font-extrabold text-white shadow-sm">
                H
              </span>
              <span className="text-base font-extrabold tracking-tight text-stone-900">
                Homelyx
              </span>
            </Link>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label={t("close")}
              className="flex h-9 w-9 items-center justify-center rounded-full text-stone-400 hover:bg-stone-100 hover:text-stone-700"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>

          {/* Location pill */}
          <div className="border-b border-stone-100 px-5 py-3">
            <button
              type="button"
              className="group flex w-full items-center gap-3 rounded-xl border border-stone-200 bg-stone-50 px-3 py-2.5 text-left transition-colors hover:border-orange-200 hover:bg-orange-50"
            >
              <MapPinIcon className="h-5 w-5 shrink-0 text-orange-500" />
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-stone-400">
                  {t("deliverTo")}
                </p>
                <p className="truncate text-sm font-medium text-stone-700">
                  {t("selectLocation")}
                </p>
              </div>
            </button>
          </div>

          {/* Search */}
          <div className="border-b border-stone-100 px-5 py-3">
            <Suspense fallback={<SearchSkeleton />}>
              <Search />
            </Suspense>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto px-2 py-3">
            <p className="px-3 pt-1 pb-2 text-[10px] font-bold uppercase tracking-wider text-stone-400">
              {t("browse")}
            </p>
            <ul className="flex flex-col">
              {PRIMARY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-stone-700 transition-colors hover:bg-orange-50 hover:text-orange-700"
                  >
                    <link.icon className="h-5 w-5 text-stone-400" />
                    {t(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="my-3 border-t border-stone-100" />

            <p className="px-3 pt-1 pb-2 text-[10px] font-bold uppercase tracking-wider text-stone-400">
              {t("account")}
            </p>
            <ul className="flex flex-col">
              {SECONDARY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-stone-700 transition-colors hover:bg-orange-50 hover:text-orange-700"
                  >
                    <link.icon className="h-5 w-5 text-stone-400" />
                    {t(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Footer */}
          <div className="border-t border-stone-100 px-5 py-4">
            <div className="flex items-center justify-between gap-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                {t("language")}
              </span>
              <LanguageSwitcher />
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
