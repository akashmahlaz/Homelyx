import {
    HomeIcon,
    MapPinIcon,
    ShieldCheckIcon,
    SparklesIcon,
} from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
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
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Imagery column */}
          <div className="relative lg:col-span-5">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl shadow-xl ring-1 ring-stone-200">
              <Image
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80"
                alt="Indian home chef preparing fresh food in her kitchen"
                fill
                sizes="(min-width: 1024px) 40vw, 92vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/30 via-transparent to-transparent" />
            </div>

            {/* Floating rating card */}
            <div className="absolute -bottom-5 -right-3 hidden w-56 rounded-2xl bg-white p-4 shadow-xl ring-1 ring-stone-100 sm:block lg:-bottom-6 lg:-right-6">
              <div className="flex items-center gap-1 text-amber-500">
                {[0, 1, 2, 3, 4].map((i) => (
                  <StarIcon key={i} className="h-4 w-4" />
                ))}
              </div>
              <p className="mt-2 text-sm font-bold text-stone-900">
                "Tastes exactly like Mom's"
              </p>
              <p className="mt-1 text-xs text-stone-400">
                — Aarav, Bengaluru · Verified order
              </p>
            </div>

            {/* Floating photo (small) */}
            <div className="absolute -left-4 -top-4 hidden h-28 w-28 overflow-hidden rounded-2xl shadow-lg ring-4 ring-white sm:block lg:-left-6 lg:-top-6 lg:h-32 lg:w-32">
              <Image
                src="https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=400&q=80"
                alt="Fresh thali"
                fill
                sizes="128px"
                className="object-cover"
              />
            </div>
          </div>

          {/* Copy + reasons */}
          <div className="lg:col-span-7">
            <p className="text-[11px] font-bold uppercase tracking-widest text-orange-500">
              Why Homelyx
            </p>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl lg:text-4xl">
              A marketplace built around real food
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-stone-500 sm:text-base">
              We connect you with people who genuinely love cooking — and let
              them run a business from their kitchen, on their schedule.
            </p>

            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {REASONS.map((r, idx) => (
                <li
                  key={r.title}
                  className="group relative overflow-hidden rounded-3xl bg-white p-6 ring-1 ring-stone-200 transition-all hover:-translate-y-1 hover:shadow-lg hover:ring-orange-200"
                >
                  <span className="absolute -right-3 -top-3 text-6xl font-extrabold text-stone-100 transition-colors group-hover:text-orange-100">
                    0{idx + 1}
                  </span>
                  <span className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-50 text-orange-600 ring-1 ring-orange-100">
                    <r.Icon className="h-5 w-5" />
                  </span>
                  <h3 className="relative mt-4 text-base font-bold text-stone-900">
                    {r.title}
                  </h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-stone-500">
                    {r.desc}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

