"use client";

import { setLocale } from "app/actions/locale";
import clsx from "clsx";
import { useLocale } from "next-intl";
import { useTransition } from "react";

const OPTIONS = [
  { code: "en" as const, label: "EN", full: "English" },
  { code: "hi" as const, label: "हि", full: "हिन्दी" },
];

export function LanguageSwitcher({
  variant = "light",
}: {
  variant?: "light" | "dark";
}) {
  const current = useLocale();
  const [isPending, startTransition] = useTransition();

  return (
    <div
      className={clsx(
        "inline-flex items-center rounded-full p-0.5 text-xs font-semibold",
        variant === "light"
          ? "border border-orange-200 bg-white"
          : "border border-white/20 bg-white/10 backdrop-blur-md",
      )}
    >
      {OPTIONS.map((opt) => {
        const isActive = current === opt.code;
        return (
          <button
            key={opt.code}
            type="button"
            disabled={isPending}
            onClick={() =>
              startTransition(() => {
                if (current !== opt.code) {
                  void setLocale(opt.code);
                }
              })
            }
            aria-pressed={isActive}
            title={opt.full}
            className={clsx(
              "rounded-full px-3 py-1 transition-colors",
              isActive
                ? variant === "light"
                  ? "bg-orange-500 text-white shadow"
                  : "bg-white text-stone-900"
                : variant === "light"
                  ? "text-stone-500 hover:text-stone-800"
                  : "text-white/70 hover:text-white",
              isPending && "opacity-60",
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
