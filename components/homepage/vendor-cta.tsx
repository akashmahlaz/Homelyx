import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

const STATS = [
  { value: "2,400+", label: "Active home chefs" },
  { value: "₹18K", label: "Avg monthly earnings" },
  { value: "0%", label: "Commission month 1" },
  { value: "Weekly", label: "Bank payouts" },
] as const;

export function VendorCta() {
  return (
    <section className="px-4 py-14 lg:px-6 lg:py-20">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-to-br from-stone-900 via-stone-900 to-stone-800 shadow-2xl">
        {/* Background photo (right side) */}
        <div className="absolute inset-y-0 right-0 hidden w-1/2 md:block">
          <Image
            src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1200&q=80"
            alt="Home chef cooking in her kitchen"
            fill
            sizes="50vw"
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-900 via-stone-900/40 to-transparent" />
        </div>

        {/* Decorative blobs */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-orange-500/30 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 -left-12 h-72 w-72 rounded-full bg-amber-500/20 blur-3xl"
        />

        <div className="relative grid gap-10 p-8 md:grid-cols-2 md:items-center md:p-12 lg:p-16">
          {/* Copy */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-400/40 bg-orange-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-orange-300 backdrop-blur-sm">
              For home chefs
            </span>
            <h2 className="mt-5 text-3xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-5xl">
              Cook from home.
              <br />
              <span className="bg-gradient-to-r from-orange-300 to-amber-300 bg-clip-text text-transparent">
                Earn ₹18,000+ a month.
              </span>
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-stone-300">
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
                className="rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10"
              >
                How it works
              </Link>
            </div>
          </div>

          {/* Stats grid */}
          <dl className="relative grid grid-cols-2 gap-3">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md"
              >
                <dd className="text-3xl font-extrabold text-white">
                  {s.value}
                </dd>
                <dt className="mt-1 text-xs text-stone-300">{s.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
