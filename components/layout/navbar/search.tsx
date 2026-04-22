"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Form from "next/form";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";

export default function Search() {
  const searchParams = useSearchParams();
  const t = useTranslations("nav");

  return (
    <Form action="/search" className="relative w-full">
      <input
        key={searchParams?.get("q")}
        type="text"
        name="q"
        placeholder={t("searchPlaceholder")}
        autoComplete="off"
        defaultValue={searchParams?.get("q") || ""}
        className="w-full rounded-full border border-orange-100 bg-white py-2.5 pl-5 pr-12 text-sm text-stone-800 placeholder:text-stone-400 transition focus:border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-100"
      />
      <button
        type="submit"
        aria-label="Search"
        className="absolute right-1.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-orange-500 text-white transition-colors hover:bg-orange-600"
      >
        <MagnifyingGlassIcon className="h-4 w-4" />
      </button>
    </Form>
  );
}

export function SearchSkeleton() {
  return (
    <div className="relative w-full">
      <input
        placeholder="Search..."
        disabled
        className="w-full rounded-full border border-orange-100 bg-white py-2.5 pl-5 pr-12 text-sm text-stone-400"
      />
      <div className="absolute right-1.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-orange-200">
        <MagnifyingGlassIcon className="h-4 w-4 text-white" />
      </div>
    </div>
  );
}
