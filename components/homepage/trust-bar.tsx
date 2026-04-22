import {
    ShieldCheckIcon,
    TruckIcon,
} from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

const CUSTOMER_AVATARS = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
];

export function TrustBar() {
  return (
    <section className="border-y border-stone-100 bg-white">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="grid grid-cols-2 items-center gap-x-4 gap-y-5 py-6 md:grid-cols-4 md:divide-x md:divide-stone-100 md:gap-y-0 md:py-5">
          {/* Avatars + happy customers */}
          <div className="flex items-center gap-3 md:px-6">
            <div className="flex -space-x-3">
              {CUSTOMER_AVATARS.map((src, i) => (
                <div
                  key={src}
                  className="relative h-9 w-9 overflow-hidden rounded-full ring-2 ring-white"
                  style={{ zIndex: CUSTOMER_AVATARS.length - i }}
                >
                  <Image
                    src={src}
                    alt="Happy Homelyx customer"
                    fill
                    sizes="36px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="leading-tight">
              <p className="text-sm font-extrabold text-stone-900">12,000+</p>
              <p className="mt-0.5 text-[11px] text-stone-500">Happy customers</p>
            </div>
          </div>

          {/* Rating with stars */}
          <div className="flex items-center gap-3 md:px-6">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-500">
              <StarIcon className="h-5 w-5" />
            </span>
            <div className="leading-tight">
              <p className="flex items-center gap-1 text-sm font-extrabold text-stone-900">
                4.8 / 5
                <span className="flex items-center text-amber-500">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <StarIcon key={i} className="h-3 w-3" />
                  ))}
                </span>
              </p>
              <p className="mt-0.5 text-[11px] text-stone-500">
                Avg rating across India
              </p>
            </div>
          </div>

          {/* Same day delivery */}
          <div className="flex items-center gap-3 md:px-6">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <TruckIcon className="h-5 w-5" />
            </span>
            <div className="leading-tight">
              <p className="text-sm font-extrabold text-stone-900">Same day</p>
              <p className="mt-0.5 text-[11px] text-stone-500">
                Fresh delivery slots
              </p>
            </div>
          </div>

          {/* FSSAI badge */}
          <div className="flex items-center gap-3 md:px-6">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
              <ShieldCheckIcon className="h-5 w-5" />
            </span>
            <div className="leading-tight">
              <p className="text-sm font-extrabold text-stone-900">FSSAI</p>
              <p className="mt-0.5 text-[11px] text-stone-500">Verified kitchens</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

