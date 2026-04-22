import {
    ArrowRightIcon,
    MapPinIcon,
    StarIcon,
} from "@heroicons/react/24/solid";
import { VENDORS } from "lib/vendors";
import Image from "next/image";
import Link from "next/link";

export function VendorStories() {
  return (
    <section className="bg-stone-50">
      <div className="mx-auto max-w-7xl px-4 py-14 lg:px-6 lg:py-20">
        <div className="mb-8 flex flex-col items-start justify-between gap-3 md:flex-row md:items-end">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-orange-500">
              Real chefs, real kitchens
            </p>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl lg:text-4xl">
              Meet your neighbourhood chefs
            </h2>
            <p className="mt-2 max-w-lg text-sm text-stone-500">
              Each Homelyx vendor is a verified home cook running their own
              kitchen with passion. Tap a story to shop their menu.
            </p>
          </div>
          <Link
            href="/search"
            className="group inline-flex items-center gap-1 rounded-full border border-stone-200 bg-white px-4 py-2 text-xs font-semibold text-stone-700 hover:border-orange-300 hover:text-orange-600"
          >
            All vendors
            <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {VENDORS.map((vendor) => (
            <li key={vendor.slug}>
              <Link
                href={`/vendor/${vendor.slug}`}
                className="group block overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-stone-200 transition-all hover:-translate-y-1 hover:shadow-xl hover:ring-orange-200"
              >
                {/* Cover image */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
                  <Image
                    src={vendor.image}
                    alt={vendor.name}
                    fill
                    sizes="(min-width: 1024px) 24vw, (min-width: 640px) 45vw, 90vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/55 via-transparent to-transparent" />

                  {/* Tag */}
                  <span
                    className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider shadow-sm ${vendor.tagColor}`}
                  >
                    {vendor.tag}
                  </span>

                  {/* Rating */}
                  <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-2 py-1 text-[11px] font-bold text-stone-900 shadow-sm backdrop-blur">
                    <StarIcon className="h-3 w-3 text-amber-500" />
                    {vendor.rating}
                  </span>

                  {/* Avatar + name overlay */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2.5">
                    <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full ring-2 ring-white">
                      <Image
                        src={vendor.avatar}
                        alt={`${vendor.name} chef`}
                        fill
                        sizes="36px"
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1 text-white">
                      <p className="truncate text-sm font-bold drop-shadow">
                        {vendor.name}
                      </p>
                      <p className="flex items-center gap-1 text-[10px] text-white/85">
                        <MapPinIcon className="h-3 w-3" />
                        {vendor.city}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-orange-500">
                    {vendor.specialty}
                  </p>
                  <p className="mt-1.5 line-clamp-2 text-sm text-stone-600">
                    {vendor.headline}
                  </p>
                  <div className="mt-3 flex items-center justify-between border-t border-stone-100 pt-3 text-[11px] text-stone-400">
                    <span>{vendor.orders} orders</span>
                    <span className="inline-flex items-center gap-1 font-semibold text-orange-500 group-hover:text-orange-600">
                      View menu
                      <ArrowRightIcon className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
