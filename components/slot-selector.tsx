"use client";

import clsx from "clsx";
import { useState } from "react";

const SLOTS = [
  {
    id: "morning",
    label: "Morning",
    time: "5 AM – 10 AM",
    cutoff: "Order by 10 PM prev. night",
    emoji: "🌅",
    bg: "bg-amber-50",
    border: "border-amber-200",
    selectedBg: "bg-amber-500",
    labelColor: "text-amber-700",
    timeColor: "text-amber-600",
  },
  {
    id: "afternoon",
    label: "Afternoon",
    time: "11 AM – 3 PM",
    cutoff: "Order by 8 AM same day",
    emoji: "☀️",
    bg: "bg-sky-50",
    border: "border-sky-200",
    selectedBg: "bg-sky-500",
    labelColor: "text-sky-700",
    timeColor: "text-sky-600",
  },
  {
    id: "evening",
    label: "Evening",
    time: "4 PM – 8 PM",
    cutoff: "Order by 12 PM same day",
    emoji: "🌆",
    bg: "bg-orange-50",
    border: "border-orange-200",
    selectedBg: "bg-orange-500",
    labelColor: "text-orange-700",
    timeColor: "text-orange-600",
  },
  {
    id: "night",
    label: "Night",
    time: "8 PM – 11 PM",
    cutoff: "Order by 4 PM same day",
    emoji: "🌙",
    bg: "bg-indigo-50",
    border: "border-indigo-200",
    selectedBg: "bg-indigo-600",
    labelColor: "text-indigo-700",
    timeColor: "text-indigo-600",
  },
] as const;

export default function SlotSelector() {
  const [selected, setSelected] = useState<string | null>(null);

  const activeSlot = SLOTS.find((s) => s.id === selected);

  return (
    <div className="w-full">
      <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-stone-400">
        When do you want delivery?
      </p>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {SLOTS.map((slot) => {
          const isSelected = selected === slot.id;
          return (
            <button
              key={slot.id}
              onClick={() => setSelected(isSelected ? null : slot.id)}
              className={clsx(
                "flex cursor-pointer flex-col items-start rounded-2xl border-2 p-4 text-left transition-all duration-200",
                isSelected
                  ? `${slot.selectedBg} border-transparent text-white shadow-lg scale-[1.03]`
                  : `${slot.bg} ${slot.border} hover:shadow-md hover:scale-[1.01]`,
              )}
            >
              <span className="mb-2 text-2xl">{slot.emoji}</span>
              <span
                className={clsx(
                  "text-sm font-bold",
                  isSelected ? "text-white" : slot.labelColor,
                )}
              >
                {slot.label}
              </span>
              <span
                className={clsx(
                  "mt-0.5 text-xs",
                  isSelected ? "text-white/85" : slot.timeColor,
                )}
              >
                {slot.time}
              </span>
              <span
                className={clsx(
                  "mt-2 text-[10px] leading-snug",
                  isSelected ? "text-white/65" : "text-stone-400",
                )}
              >
                {slot.cutoff}
              </span>
            </button>
          );
        })}
      </div>

      <div
        className={clsx(
          "mt-4 flex items-center gap-3 transition-all duration-300",
          activeSlot ? "opacity-100 translate-y-0" : "opacity-0 pointer-events-none translate-y-2",
        )}
      >
        <a
          href="/search"
          className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-orange-600"
        >
          Browse {activeSlot?.label} delivery
          <span aria-hidden>→</span>
        </a>
        <span className="text-xs text-stone-400">{activeSlot?.cutoff}</span>
      </div>
    </div>
  );
}
