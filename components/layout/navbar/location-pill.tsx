import { ChevronDownIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { getTranslations } from "next-intl/server";

export async function LocationPill() {
  const t = await getTranslations("nav");
  return (
    <button
      type="button"
      className="group hidden items-center gap-2.5 rounded-full border border-stone-200 bg-white px-3.5 py-2 text-left transition-all hover:border-orange-300 hover:bg-orange-50 lg:flex"
    >
      <MapPinIcon className="h-5 w-5 shrink-0 text-orange-500" />
      <span className="flex flex-col leading-none">
        <span className="text-[9px] font-bold uppercase tracking-wider text-stone-400">
          {t("deliverTo")}
        </span>
        <span className="mt-0.5 text-xs font-semibold text-stone-700">
          {t("selectLocation")}
        </span>
      </span>
      <ChevronDownIcon className="h-3.5 w-3.5 text-stone-400 transition-transform group-hover:translate-y-0.5" />
    </button>
  );
}
