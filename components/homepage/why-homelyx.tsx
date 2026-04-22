const REASONS = [
  {
    icon: "🏠",
    title: "Real home kitchens",
    desc: "Every dish is cooked at someone's home — not a factory. You taste the difference.",
    accent: "from-orange-500 to-amber-500",
  },
  {
    icon: "🌿",
    title: "Zero preservatives",
    desc: "All food is made fresh, the same day. No frozen, no reheated, no chemicals.",
    accent: "from-green-500 to-emerald-500",
  },
  {
    icon: "👩‍🍳",
    title: "Verified home chefs",
    desc: "Every vendor is FSSAI-supported and personally onboarded by our team.",
    accent: "from-rose-500 to-pink-500",
  },
  {
    icon: "🇮🇳",
    title: "Built for India",
    desc: "Pricing in ₹, UPI checkout, slot-based delivery — designed for Indian kitchens and customers.",
    accent: "from-sky-500 to-indigo-500",
  },
] as const;

export function WhyHomelyx() {
  return (
    <section className="bg-stone-50">
      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-6">
        <div className="mb-10 text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-orange-500">
            Why Homelyx
          </p>
          <h2 className="text-2xl font-bold text-stone-900 sm:text-3xl">
            A marketplace built around real food
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-stone-500">
            We connect you with people who genuinely love cooking — and let them
            run a business from their kitchen, on their schedule.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {REASONS.map((r) => (
            <div
              key={r.title}
              className="group relative overflow-hidden rounded-2xl border border-stone-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              {/* gradient accent bar */}
              <div
                className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${r.accent}`}
              />
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-2xl">
                {r.icon}
              </div>
              <h3 className="text-base font-bold text-stone-900">{r.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-500">
                {r.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
