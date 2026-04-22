import {
    ClockIcon,
    MoonIcon,
    SunIcon,
} from "@heroicons/react/24/outline";
import { type ComponentType, type SVGProps } from "react";

type IconType = ComponentType<SVGProps<SVGSVGElement>>;

const SLOTS: Array<{
  label: string;
  time: string;
  cutoff: string;
  Icon: IconType;
  ring: string;
  iconBg: string;
  iconText: string;
}> = [
  {
    label: "Morning",
    time: "5 – 10 AM",
    cutoff: "Order by 10 PM previous day",
    Icon: SunIcon,
    ring: "ring-amber-100",
    iconBg: "bg-amber-50",
    iconText: "text-amber-600",
  },
  {
    label: "Afternoon",
    time: "11 AM – 3 PM",
    cutoff: "Order by 8 AM same day",
    Icon: SunIcon,
    ring: "ring-orange-100",
    iconBg: "bg-orange-50",
    iconText: "text-orange-600",
  },
  {
    label: "Evening",
    time: "4 – 8 PM",
    cutoff: "Order by 12 PM same day",
    Icon: ClockIcon,
    ring: "ring-rose-100",
    iconBg: "bg-rose-50",
    iconText: "text-rose-600",
  },
  {
    label: "Night",
    time: "8 – 11 PM",
    cutoff: "Order by 4 PM same day",
    Icon: MoonIcon,
    ring: "ring-indigo-100",
    iconBg: "bg-indigo-50",
    iconText: "text-indigo-600",
  },
];

export function SlotsInfo() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-14 lg:px-6 lg:py-20">
        <div className="mb-10 max-w-2xl">
          <p className="text-[11px] font-bold uppercase tracking-widest text-orange-500">
            How delivery works
          </p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl lg:text-4xl">
            Pick your slot at checkout
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-stone-500 sm:text-base">
            Browse the marketplace freely. When you place an order, choose a
            time window — your home chef will cook fresh and our delivery
            partners arrive inside that window.
          </p>
        </div>

        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SLOTS.map((slot, idx) => (
            <li
              key={slot.label}
              className={`group relative overflow-hidden rounded-3xl bg-white p-6 ring-1 ${slot.ring} transition-all hover:-translate-y-1 hover:shadow-lg`}
            >
              <span className="absolute right-5 top-5 text-[11px] font-bold tracking-widest text-stone-300">
                0{idx + 1}
              </span>
              <span
                className={`flex h-12 w-12 items-center justify-center rounded-2xl ${slot.iconBg}`}
              >
                <slot.Icon className={`h-6 w-6 ${slot.iconText}`} />
              </span>
              <h3 className="mt-5 text-lg font-bold text-stone-900">
                {slot.label}
              </h3>
              <p className="mt-1 text-sm font-semibold text-stone-700">
                {slot.time}
              </p>
              <p className="mt-3 text-xs leading-relaxed text-stone-500">
                {slot.cutoff}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
