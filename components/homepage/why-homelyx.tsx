import {
    HomeIcon,
    MapPinIcon,
    ShieldCheckIcon,
    SparklesIcon,
} from "@heroicons/react/24/outline";
import { type ComponentType, type SVGProps } from "react";

type IconType = ComponentType<SVGProps<SVGSVGElement>>;

const REASONS: Array<{
  Icon: IconType;
  title: string;
  desc: string;
}> = [
  {
    Icon: HomeIcon,
    title: "Real home kitchens",
    desc: "Every dish is cooked at someone's home — not a factory. You taste the difference in the very first bite.",
  },
  {
    Icon: SparklesIcon,
    title: "Zero preservatives",
    desc: "All food is made fresh, the same day. No frozen, no reheated, no chemicals.",
  },
  {
    Icon: ShieldCheckIcon,
    title: "Verified home chefs",
    desc: "Every vendor is FSSAI-supported, document-verified, and personally onboarded by our team.",
  },
  {
    Icon: MapPinIcon,
    title: "Built for India",
    desc: "Pricing in ₹, UPI checkout, slot-based delivery — designed for Indian kitchens and customers.",
  },
];

export function WhyHomelyx() {
  return (
    <section className="bg-stone-50">
      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-6 lg:py-24">
        <div className="mb-12 max-w-2xl">
          <p className="text-[11px] font-bold uppercase tracking-widest text-orange-500">
            Why Homelyx
          </p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl lg:text-4xl">
            A marketplace built around real food
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-stone-500 sm:text-base">
            We connect you with people who genuinely love cooking — and let
            them run a business from their kitchen, on their schedule.
          </p>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {REASONS.map((r, idx) => (
            <li
              key={r.title}
              className="group relative overflow-hidden rounded-3xl bg-white p-7 ring-1 ring-stone-200 transition-all hover:-translate-y-1 hover:shadow-lg hover:ring-orange-200"
            >
              <span className="absolute -right-3 -top-3 text-7xl font-extrabold text-stone-100 transition-colors group-hover:text-orange-100">
                0{idx + 1}
              </span>
              <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-600 ring-1 ring-orange-100">
                <r.Icon className="h-6 w-6" />
              </span>
              <h3 className="relative mt-5 text-base font-bold text-stone-900">
                {r.title}
              </h3>
              <p className="relative mt-2 text-sm leading-relaxed text-stone-500">
                {r.desc}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
