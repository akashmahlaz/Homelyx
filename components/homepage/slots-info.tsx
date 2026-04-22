import {
    ClockIcon,
    MoonIcon,
    SunIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { type ComponentType, type SVGProps } from "react";

type IconType = ComponentType<SVGProps<SVGSVGElement>>;

const SLOTS: Array<{
  label: string;
  time: string;
  cutoff: string;
  Icon: IconType;
  iconBg: string;
  iconText: string;
  image: string;
  alt: string;
}> = [
  {
    label: "Morning",
    time: "5 – 10 AM",
    cutoff: "Order by 10 PM previous day",
    Icon: SunIcon,
    iconBg: "bg-amber-50",
    iconText: "text-amber-600",
    image:
      "https://images.unsplash.com/photo-1626197031507-c17099753214?auto=format&fit=crop&w=900&q=80",
    alt: "Fresh poha and chai breakfast",
  },
  {
    label: "Afternoon",
    time: "11 AM – 3 PM",
    cutoff: "Order by 8 AM same day",
    Icon: SunIcon,
    iconBg: "bg-orange-50",
    iconText: "text-orange-600",
    image:
      "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=900&q=80",
    alt: "Lunch tiffin meal",
  },
  {
    label: "Evening",
    time: "4 – 8 PM",
    cutoff: "Order by 12 PM same day",
    Icon: ClockIcon,
    iconBg: "bg-rose-50",
    iconText: "text-rose-600",
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=80",
    alt: "Evening snacks and tea",
  },
  {
    label: "Night",
    time: "8 – 11 PM",
    cutoff: "Order by 4 PM same day",
    Icon: MoonIcon,
    iconBg: "bg-indigo-50",
    iconText: "text-indigo-600",
    image:
      "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=900&q=80",
    alt: "Dinner curry and naan",
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
              className="group relative overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-stone-100 transition-all hover:-translate-y-1 hover:shadow-xl hover:ring-orange-200"
            >
              {/* Top image */}
              <div className="relative aspect-[5/3] w-full overflow-hidden bg-stone-100">
                <Image
                  src={slot.image}
                  alt={slot.alt}
                  fill
                  sizes="(min-width: 1024px) 24vw, (min-width: 640px) 45vw, 92vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/55 via-transparent to-transparent" />
                <span className="absolute right-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold tracking-widest text-stone-500 backdrop-blur">
                  0{idx + 1}
                </span>
                <span
                  className={`absolute bottom-3 left-3 flex h-11 w-11 items-center justify-center rounded-2xl shadow-md ring-2 ring-white ${slot.iconBg}`}
                >
                  <slot.Icon className={`h-5 w-5 ${slot.iconText}`} />
                </span>
              </div>

              {/* Body */}
              <div className="p-5">
                <h3 className="text-base font-bold text-stone-900">
                  {slot.label}
                </h3>
                <p className="mt-1 text-sm font-semibold text-orange-600">
                  {slot.time}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-stone-500">
                  {slot.cutoff}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
