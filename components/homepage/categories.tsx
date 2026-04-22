import Link from "next/link";

const CATEGORIES = [
  { label: "Tiffins", emoji: "🍱", href: "/search/tiffins" },
  { label: "Baked Goods", emoji: "🍞", href: "/search/baked-goods" },
  { label: "Curries", emoji: "🍛", href: "/search/curries" },
  { label: "Salads & Bowls", emoji: "🥗", href: "/search/salads" },
  { label: "Desserts", emoji: "🧁", href: "/search/desserts" },
  { label: "Beverages", emoji: "🥤", href: "/search/beverages" },
  { label: "Pickles", emoji: "🫙", href: "/search/pickles" },
  { label: "Dairy", emoji: "🧀", href: "/search/dairy" },
  { label: "Snacks", emoji: "🥨", href: "/search/snacks" },
  { label: "Breakfast", emoji: "🥞", href: "/search/breakfast" },
] as const;

export function CategoriesNav() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-stone-700">
          Browse by Category
        </h2>
        <Link
          href="/search"
          className="text-sm font-medium text-orange-500 hover:text-orange-600"
        >
          All categories →
        </Link>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.label}
            href={cat.href}
            className="flex flex-none flex-col items-center gap-2 rounded-2xl border border-stone-100 bg-white px-5 py-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-md"
          >
            <span className="text-3xl">{cat.emoji}</span>
            <span className="whitespace-nowrap text-xs font-medium text-stone-600">
              {cat.label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
