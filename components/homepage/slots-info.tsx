const SLOTS = [
  {
    label: "Morning",
    time: "5 – 10 AM",
    cutoff: "Order by 10 PM previous day",
    emoji: "🌅",
    bg: "bg-amber-50",
    border: "border-amber-200",
    accent: "text-amber-700",
  },
  {
    label: "Afternoon",
    time: "11 AM – 3 PM",
    cutoff: "Order by 8 AM same day",
    emoji: "☀️",
    bg: "bg-sky-50",
    border: "border-sky-200",
    accent: "text-sky-700",
  },
  {
    label: "Evening",
    time: "4 – 8 PM",
    cutoff: "Order by 12 PM same day",
    emoji: "🌆",
    bg: "bg-orange-50",
    border: "border-orange-200",
    accent: "text-orange-700",
  },
  {
    label: "Night",
    time: "8 – 11 PM",
    cutoff: "Order by 4 PM same day",
    emoji: "🌙",
    bg: "bg-indigo-50",
    border: "border-indigo-200",
    accent: "text-indigo-700",
  },
] as const;

export function SlotsInfo() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-14 lg:px-6">
        <div className="mb-8 flex flex-col items-start justify-between gap-3 md:flex-row md:items-end">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-orange-500">
              How delivery works
            </p>
            <h2 className="text-2xl font-bold text-stone-900 sm:text-3xl">
              Pick your slot at checkout
            </h2>
            <p className="mt-2 max-w-lg text-sm text-stone-500">
              Browse freely. When you place an order, choose the time window
              that suits you — your home chef will cook fresh and our partners
              deliver inside that window.
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SLOTS.map((slot) => (
            <div
              key={slot.label}
              className={`group relative overflow-hidden rounded-2xl border ${slot.border} ${slot.bg} p-5 transition-all hover:-translate-y-1 hover:shadow-md`}
            >
              <div className="flex items-start justify-between">
                <span className="text-4xl">{slot.emoji}</span>
                <span className={`text-[10px] font-bold uppercase tracking-widest ${slot.accent}`}>
                  Slot
                </span>
              </div>
              <h3 className={`mt-4 text-lg font-bold ${slot.accent}`}>
                {slot.label}
              </h3>
              <p className="mt-1 text-sm font-medium text-stone-700">
                {slot.time}
              </p>
              <p className="mt-3 text-xs text-stone-500">{slot.cutoff}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
