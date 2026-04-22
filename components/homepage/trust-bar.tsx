import {
    ShieldCheckIcon,
    StarIcon,
    TruckIcon,
    UsersIcon,
} from "@heroicons/react/24/outline";

const STATS = [
  { icon: UsersIcon, value: "2,400+", label: "Active home chefs" },
  { icon: StarIcon, value: "4.8 / 5", label: "Avg rating across India" },
  { icon: TruckIcon, value: "Same day", label: "Fresh delivery slots" },
  { icon: ShieldCheckIcon, value: "FSSAI", label: "Verified kitchens" },
] as const;

export function TrustBar() {
  return (
    <section className="border-y border-stone-100 bg-white">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="grid grid-cols-2 divide-x divide-stone-100 md:grid-cols-4">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-3 px-4 py-5 sm:gap-4 sm:px-6"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-500 sm:h-11 sm:w-11">
                <stat.icon className="h-5 w-5" />
              </span>
              <div className="leading-tight">
                <p className="text-sm font-extrabold text-stone-900 sm:text-base">
                  {stat.value}
                </p>
                <p className="mt-0.5 text-[11px] text-stone-500 sm:text-xs">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
