import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

const CATEGORIES = [
  {
    label: "Tiffins",
    href: "/search/tiffins",
    image:
      "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=400&q=80",
  },
  {
    label: "Curries",
    href: "/search/curries",
    image:
      "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?auto=format&fit=crop&w=400&q=80",
  },
  {
    label: "Baked Goods",
    href: "/search/baked-goods",
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80",
  },
  {
    label: "Snacks",
    href: "/search/snacks",
    image:
      "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=400&q=80",
  },
  {
    label: "Desserts",
    href: "/search/desserts",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=400&q=80",
  },
  {
    label: "Beverages",
    href: "/search/beverages",
    image:
      "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=400&q=80",
  },
  {
    label: "Pickles",
    href: "/search/pickles",
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=400&q=80",
  },
  {
    label: "Breakfast",
    href: "/search/breakfast",
    image:
      "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=400&q=80",
  },
] as const;

export function CategoriesNav() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-6 lg:py-14">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-orange-500">
              Explore
            </p>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl">
              Shop by category
            </h2>
          </div>
          <Link
            href="/search"
            className="group inline-flex items-center gap-1 text-sm font-semibold text-stone-600 hover:text-orange-600"
          >
            View all
            <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <ul className="grid grid-cols-4 gap-3 sm:grid-cols-4 sm:gap-4 lg:grid-cols-8">
          {CATEGORIES.map((cat) => (
            <li key={cat.label}>
              <Link
                href={cat.href}
                className="group block text-center"
              >
                <div className="relative mx-auto aspect-square w-full overflow-hidden rounded-2xl bg-stone-100 ring-1 ring-stone-200 transition-all group-hover:-translate-y-1 group-hover:shadow-lg group-hover:ring-orange-300">
                  <Image
                    src={cat.image}
                    alt={cat.label}
                    fill
                    sizes="(min-width: 1024px) 12vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
                <p className="mt-2.5 text-xs font-semibold text-stone-700 group-hover:text-orange-600 sm:text-sm">
                  {cat.label}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
