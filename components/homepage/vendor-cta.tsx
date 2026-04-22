import Link from "next/link";

export function VendorCta() {
  return (
    <section className="px-4 py-14 lg:px-6">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500 via-orange-600 to-amber-600 p-8 shadow-xl sm:p-12 lg:p-16">
        {/* decorative pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, white 1px, transparent 1px), radial-gradient(circle at 80% 70%, white 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div
          className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-amber-300/30 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-orange-300/30 blur-3xl"
          aria-hidden
        />

        <div className="relative grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/20 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-sm">
              For home chefs
            </span>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight text-white sm:text-4xl">
              Cook from home.
              <br />
              Earn ₹18,000+ a month.
            </h2>
            <p className="mt-4 max-w-md text-base text-orange-50">
              Turn your kitchen into a business with zero setup cost. We handle
              delivery, payments, and customer support — you just cook.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/sell"
                className="rounded-full bg-white px-7 py-3.5 text-sm font-bold text-orange-600 shadow-md transition-transform hover:scale-105"
              >
                Start selling →
              </Link>
              <Link
                href="/sell#how-it-works"
                className="rounded-full border border-white/40 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              >
                How it works
              </Link>
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { value: "2,400+", label: "Active home chefs" },
              { value: "₹18K", label: "Avg monthly earnings" },
              { value: "0%", label: "Commission month 1" },
              { value: "Weekly", label: "Bank payouts" },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-white/20 bg-white/15 p-5 backdrop-blur-md"
              >
                <p className="text-3xl font-extrabold text-white">{s.value}</p>
                <p className="mt-1 text-xs text-orange-100">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
