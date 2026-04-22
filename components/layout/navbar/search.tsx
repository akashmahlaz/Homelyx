"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";
import Form from "next/form";
import { useSearchParams } from "next/navigation";

export default function Search() {
  const searchParams = useSearchParams();
  const t = useTranslations("nav");
  const placeholder = t("searchPlaceholder");

  return (
    <Form action="/search" className="relative w-full">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
        <MagnifyingGlassIcon className="h-4 w-4 text-stone-400" />
      </div>
      <input
        key={searchParams?.get("q")}
        type="text"
        name="q"
        placeholder={placeholder}
        autoComplete="off"
        defaultValue={searchParams?.get("q") || ""}
        className="w-full rounded-full border border-stone-200 bg-white py-2.5 pl-11 pr-24 text-sm text-stone-800 shadow-sm placeholder:text-stone-400 transition focus:border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-100"
      />
      <button
        type="submit"
        className="absolute right-1.5 top-1/2 flex h-8 -translate-y-1/2 items-center gap-1.5 rounded-full bg-stone-900 px-4 text-xs font-semibold text-white transition-colors hover:bg-orange-500"
      >
        Search
      </button>
    </Form>
  );
}

export function SearchSkeleton() {
  return (
    <div className="relative w-full">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
        <MagnifyingGlassIcon className="h-4 w-4 text-stone-300" />
      </div>
      <input
        placeholder="Search..."
        disabled
        className="w-full rounded-full border border-stone-200 bg-white py-2.5 pl-11 pr-24 text-sm text-stone-400 shadow-sm"
      />
      <div className="absolute right-1.5 top-1/2 flex h-8 -translate-y-1/2 items-center rounded-full bg-stone-300 px-4 text-xs font-semibold text-white">
        Search
      </div>
    </div>
  );
}
