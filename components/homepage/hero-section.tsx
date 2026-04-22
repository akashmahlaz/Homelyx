import {
    ArrowRightIcon,
    BoltIcon,
    ShieldCheckIcon,
    StarIcon,
    TruckIcon,
} from "@heroicons/react/24/solid";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

const STATS = [
  { value: "2,400+", label: "Home chefs" },
  { value: "180k+", label: "Orders served" },
  { value: "4.8", label: "Avg rating", suffix: "★" },
  { value: "24+", label: "Cities live" },
] as const;

const TRUST_PILLS = [
  { icon: StarIcon, label: "FSSAI verified kitchens" },
  { icon: TruckIcon, label: "Free delivery over ₹499" },
  { icon: ShieldCheckIcon, label: "100% homemade. Zero preservatives." },
];

export function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-orange-50 via-white to-white">
      {/* Decorative blurred blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -left-24 h-[28rem] w-[28rem] rounded-full bg-orange-200/40 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-40 right-0 h-[20rem] w-[20rem] rounded-full bg-amber-200/40 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 pt-10 pb-16 lg:grid-cols-12 lg:gap-12 lg:px-6 lg:pt-16 lg:pb-24">
        {/* LEFT — copy */}
        <div className="lg:col-span-6 xl:col-span-7">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/80 px-3 py-1.5 text-[11px] font-semibold tracking-wide text-orange-600 shadow-sm backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500" />
            </span>
            India's neighbourhood food network
          </div>

          {/* Heading */}
          <h1 className="mt-5 text-[2.5rem] font-extrabold leading-[1.05] tracking-tight text-stone-900 sm:text-5xl lg:text-[4rem] xl:text-[4.5rem]">
            <span className="block">{t("title").split(",")[0]?.trim()}</span>
            <span className="mt-1 block bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 bg-clip-text pb-1 text-transparent">
              {t("title").split(",").slice(1).join(",").trim() ||
                "On Your Schedule"}
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-stone-600 sm:text-lg">
            {t("subtitle")}
          </p>

          {/* CTAs */}
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link
              href="/search"
              className="group inline-flex items-center gap-2 rounded-full bg-stone-900 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-stone-900/15 transition-all hover:bg-orange-500 hover:shadow-orange-500/30"
            >
              {t("ctaPrimary")}
              <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/sell"
              className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-6 py-3.5 text-sm font-semibold text-stone-800 transition-colors hover:border-orange-300 hover:text-orange-600"
            >
              <BoltIcon className="h-4 w-4 text-orange-500" />
              {t("ctaSecondary")}
            </Link>
          </div>

          {/* Trust pills */}
          <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-[12px] text-stone-500">
            {TRUST_PILLS.map((pill) => (
              <li key={pill.label} className="flex items-center gap-1.5">
                <pill.icon className="h-4 w-4 text-orange-500" />
                <span className="font-medium text-stone-700">{pill.label}</span>
              </li>
            ))}
          </ul>

          {/* Stats strip */}
          <dl className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-stone-100 bg-white/70 p-4 backdrop-blur-sm"
              >
                <dt className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                  {s.label}
                </dt>
                <dd className="mt-1 text-xl font-extrabold text-stone-900 sm:text-2xl">
                  {s.value}
                  {"suffix" in s && (
                    <span className="ml-0.5 text-orange-500">{s.suffix}</span>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* RIGHT — image collage */}
        <div className="relative lg:col-span-6 xl:col-span-5">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md lg:max-w-none">
            {/* Main hero image */}
            <div className="absolute inset-0 overflow-hidden rounded-[2rem] shadow-2xl shadow-orange-900/20 ring-1 ring-black/5">
              <Image
                src="https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?auto=format&fit=crop&w=1400&q=80"
                alt="Fresh homemade Indian thali"
                fill
                priority
                sizes="(min-width: 1024px) 40vw, (min-width: 640px) 70vw, 100vw"
                className="object-cover"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-stone-900/80 via-stone-900/30 to-transparent" />

              {/* Floating chef badge — top */}
              <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-white/95 px-3 py-2 shadow-lg backdrop-blur-md">
                <div className="relative h-8 w-8 overflow-hidden rounded-full ring-2 ring-orange-100">
                  <Image
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80"
                    alt="Chef Meera"
                    fill
                    sizes="32px"
                    className="object-cover"
                  />
                </div>
                <div className="pr-1 leading-tight">
                  <p className="text-[10px] font-medium text-stone-400">
                    Cooked by
                  </p>
                  <p className="text-xs font-bold text-stone-900">
                    Meera, Bengaluru
                  </p>
                </div>
              </div>

              {/* Bottom: live order ticker */}
              <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-white/95 p-3 shadow-lg backdrop-blur-md">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-orange-500">
                      Just delivered
                    </p>
                    <p className="mt-0.5 text-sm font-semibold text-stone-900">
                      Ghar ka Khana Thali
                    </p>
                    <p className="text-[11px] text-stone-500">
                      Indiranagar, Bengaluru · 2 min ago
                    </p>
                  </div>
                  <div className="flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700">
                    <StarIcon className="h-3 w-3 text-amber-500" />
                    4.9
                  </div>
                </div>
              </div>
            </div>

            {/* Floating side card — top right */}
            <div className="absolute -right-4 top-12 hidden w-44 rotate-[6deg] overflow-hidden rounded-2xl border border-white shadow-xl ring-1 ring-black/5 sm:block">
              <div className="relative h-28 w-full">
                <Image
                  src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=400&q=80"
                  alt="Fresh baked cookies"
                  fill
                  sizes="176px"
                  className="object-cover"
                />
              </div>
              <div className="bg-white px-3 py-2">
                <p className="text-[11px] font-bold text-stone-900">
                  Choco Chip Cookies
                </p>
                <p className="text-[10px] text-stone-500">₹240 · The Bake Shack</p>
              </div>
            </div>

            {/* Floating side card — bottom left */}
            <div className="absolute -left-4 bottom-16 hidden w-40 -rotate-[5deg] overflow-hidden rounded-2xl border border-white shadow-xl ring-1 ring-black/5 sm:block">
              <div className="relative h-24 w-full">
                <Image
                  src="https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=400&q=80"
                  alt="Homemade pickles"
                  fill
                  sizes="160px"
                  className="object-cover"
                />
              </div>
              <div className="bg-white px-3 py-2">
                <p className="text-[11px] font-bold text-stone-900">
                  Mango Pickle
                </p>
                <p className="text-[10px] text-stone-500">₹180 · Priya's Kitchen</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
