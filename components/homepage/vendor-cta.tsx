import {
    ArrowRightIcon,
    BanknotesIcon,
    CheckBadgeIcon,
    ClockIcon,
    UsersIcon,
} from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";

const STATS = [
  { Icon: UsersIcon, value: "2,400+", label: "Active home chefs", tint: "text-orange-600 bg-orange-50" },
  { Icon: BanknotesIcon, value: "₹18K", label: "Avg monthly earnings", tint: "text-emerald-600 bg-emerald-50" },
  { Icon: CheckBadgeIcon, value: "0%", label: "Commission month 1", tint: "text-amber-600 bg-amber-50" },
  { Icon: ClockIcon, value: "Weekly", label: "Bank payouts", tint: "text-sky-600 bg-sky-50" },
] as const;

const AVATARS = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
];

export function VendorCta() {
  return (
    <section className="px-4 py-14 lg:px-6 lg:py-20">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-to-br from-orange-50 via-amber-50 to-rose-50 ring-1 ring-orange-100">
        {/* Decorative blobs */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-orange-200/50 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 -left-12 h-72 w-72 rounded-full bg-amber-200/40 blur-3xl"
        />

        <div className="relative grid gap-10 p-8 md:grid-cols-12 md:items-center md:gap-8 md:p-12 lg:p-16">
          {/* Copy */}
          <div className="md:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-orange-600 ring-1 ring-orange-200/80 backdrop-blur-sm">
              For home chefs
            </span>
            <h2 className="mt-5 text-3xl font-extrabold leading-[1.05] tracking-tight text-stone-900 sm:text-4xl lg:text-5xl">
              Cook from home.
              <br />
              <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                Earn ₹18,000+ a month.
              </span>
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-stone-600">
              Turn your kitchen into a business with zero setup cost. We handle
              delivery, payments, and customer support — you just cook.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/sell"
                className="group inline-flex items-center gap-2 rounded-full bg-orange-500 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-500/30 transition-all hover:scale-[1.03] hover:bg-orange-600"
              >
                Start selling
                <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/sell#how-it-works"
                className="rounded-full border border-stone-300 bg-white px-7 py-3.5 text-sm font-semibold text-stone-700 transition-colors hover:bg-stone-50"
              >
                How it works
              </Link>
            </div>

            {/* Social proof row */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <div className="flex -space-x-2">
                {AVATARS.map((src, i) => (
                  <div
                    key={i}
                    className="relative h-9 w-9 overflow-hidden rounded-full ring-2 ring-white"
                  >
                    <Image
                      src={src}
                      alt="Home chef"
                      fill
                      sizes="36px"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 text-amber-500">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <StarIcon key={i} className="h-3.5 w-3.5" />
                  ))}
                  <span className="ml-1 text-xs font-bold text-stone-700">
                    4.8/5
                  </span>
                </div>
                <p className="text-xs text-stone-500">
                  vendor rating · 2,400+ chefs across India
                </p>
              </div>
            </div>
          </div>

          {/* Right: photo + floating stats */}
          <div className="md:col-span-5">
            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-xl ring-1 ring-orange-100/80">
                <Image
                  src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=900&q=80"
                  alt="Home chef cooking in her kitchen"
                  fill
                  sizes="(min-width: 768px) 40vw, 92vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/30 via-transparent to-transparent" />
              </div>

              {/* Floating earnings card top-left */}
              <div className="absolute -left-3 top-6 hidden w-44 rounded-2xl bg-white p-3.5 shadow-xl ring-1 ring-stone-100 sm:block lg:-left-6">
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                    <BanknotesIcon className="h-4 w-4" />
                  </span>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-stone-400">
                    This month
                  </p>
                </div>
                <p className="mt-2 text-xl font-extrabold text-stone-900">
                  ₹42,400
                </p>
                <div className="mt-1 flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                  <span>↑ 12%</span>
                  <span className="font-normal text-stone-400">vs last</span>
                </div>
              </div>

              {/* Floating verified badge bottom-right */}
              <div className="absolute -bottom-4 -right-3 flex items-center gap-2 rounded-full bg-white px-3 py-2 shadow-xl ring-1 ring-stone-100 lg:-right-6">
                <CheckBadgeIcon className="h-5 w-5 text-orange-500" />
                <p className="text-xs font-bold text-stone-800">
                  FSSAI verified
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats strip bottom */}
        <div className="relative grid grid-cols-2 gap-px overflow-hidden rounded-b-3xl border-t border-orange-100 bg-orange-100/40 md:grid-cols-4">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="flex items-center gap-3 bg-white/70 px-5 py-4 backdrop-blur-sm"
            >
              <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${s.tint}`}>
                <s.Icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-lg font-extrabold text-stone-900">
                  {s.value}
                </p>
                <p className="text-[11px] text-stone-500">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
