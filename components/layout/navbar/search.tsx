"use client";

import { useState } from "react";
import Link from "next/link";
import { MagnifyingGlassIcon, GlobeAltIcon } from "@heroicons/react/24/outline";
import Form from "next/form";

export default function Search() {
  const [query, setQuery] = useState("");

  return (
    <Form
      action="/search"
      className="relative w-full max-w-md"
    >
      <input
        type="text"
        name="q"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search homemade food..."
        autoComplete="off"
        className="w-full rounded-full border border-stone-200 bg-white py-2 pl-5 pr-10 text-sm text-stone-800 placeholder:text-stone-400 transition focus:border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-100"
      />
      <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2">
        <MagnifyingGlassIcon className="h-4 w-4 text-stone-400 hover:text-orange-500" />
      </button>
    </Form>
  );
}

export function SearchSkeleton() {
  return (
    <div className="relative w-full max-w-md">
      <input
        placeholder="Search homemade food..."
        className="w-full rounded-full border border-stone-200 bg-white py-2 pl-5 pr-10 text-sm text-stone-800 placeholder:text-stone-400"
      />
      <div className="absolute right-3 top-1/2 -translate-y-1/2">
        <MagnifyingGlassIcon className="h-4 w-4 text-stone-400" />
      </div>
    </div>
  );
}

export function LanguageSwitcher({ locale }: { locale: string }) {
  const [isOpen, setIsOpen] = useState(false);

  const switchLocale = (newLocale: string) => {
    const currentPath = window.location.pathname;
    const pathWithoutLocale = currentPath.replace(/^\/(en|hi)/, "");
    const newPath = `/${newLocale}${pathWithoutLocale || "/"}`;
    window.location.href = newPath;
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 rounded-full border border-stone-200 bg-white px-3 py-1.5 text-xs font-medium text-stone-600 transition hover:bg-stone-50"
        aria-label="Change language"
      >
        <GlobeAltIcon className="h-4 w-4" />
        <span className="uppercase">{locale}</span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full z-20 mt-2 w-24 rounded-xl border border-stone-100 bg-white py-1 shadow-lg">
            <button
              onClick={() => switchLocale("en")}
              className={`flex w-full px-4 py-2 text-sm ${locale === "en" ? "font-semibold text-orange-500" : "text-stone-600 hover:bg-stone-50"}`}
            >
              English
            </button>
            <button
              onClick={() => switchLocale("hi")}
              className={`flex w-full px-4 py-2 text-sm ${locale === "hi" ? "font-semibold text-orange-500" : "text-stone-600 hover:bg-stone-50"}`}
            >
              हिंदी
            </button>
          </div>
        </>
      )}
    </div>
  );
}