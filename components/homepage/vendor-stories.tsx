import Link from "next/link";
import { VENDORS } from "lib/vendors";

export function VendorStories() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold text-stone-900">Meet Your Neighbourhood Chefs</h2>
          <p className="mt-1 text-sm text-stone-400">
            Real people · Real kitchens · Real love
          </p>
        </div>
        <Link
          href="/search"
          className="text-sm font-medium text-orange-500 hover:text-orange-600"
        >
          View all →
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {VENDORS.map((vendor) => (
          <div
            key={vendor.slug}
            className="group overflow-hidden rounded-2xl border border-stone-100 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="mb-3 flex items-start justify-between">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-3xl">
                {vendor.emoji}
              </div>
              <span
                className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${vendor.tagColor}`}
              >
                {vendor.tag}
              </span>
            </div>

            <h3 className="font-semibold text-stone-800 group-hover:text-orange-600">
              {vendor.name}
            </h3>
            <p className="mt-0.5 text-sm text-stone-500">{vendor.specialty}</p>
            <p className="mt-0.5 flex items-center gap-1 text-xs text-stone-400">
              <span>📍</span>
              {vendor.city}
            </p>

            <div className="mt-3 flex items-center gap-2 text-xs text-stone-400">
              <span>⭐ {vendor.rating}</span>
              <span className="text-stone-200">|</span>
              <span>{vendor.orders} orders</span>
            </div>

            <Link
              href={`/search?vendor=${vendor.slug}`}
              className="mt-4 block w-full rounded-xl bg-orange-50 py-2 text-center text-sm font-medium text-orange-600 transition-colors hover:bg-orange-500 hover:text-white"
            >
              Shop Now →
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}