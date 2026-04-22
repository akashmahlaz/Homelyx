const STATS = [
  { value: "2,400+", label: "Active vendors", emoji: "👩‍🍳" },
  { value: "50,000+", label: "Happy orders", emoji: "📦" },
  { value: "4.8★", label: "Average rating", emoji: "⭐" },
  { value: "Same-day", label: "Fresh delivery", emoji: "🚚" },
] as const;

export function TrustBar() {
  return (
    <div className="border-y border-orange-100 bg-white">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="grid grid-cols-2 divide-x divide-orange-100 md:grid-cols-4">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-0.5 px-4 py-5 text-center sm:flex-row sm:justify-center sm:gap-3"
            >
              <span className="text-2xl">{stat.emoji}</span>
              <div>
                <p className="text-lg font-extrabold text-stone-900 leading-none">
                  {stat.value}
                </p>
                <p className="text-xs text-stone-400 mt-0.5">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
