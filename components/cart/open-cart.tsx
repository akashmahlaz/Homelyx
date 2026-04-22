import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

export default function OpenCart({
  className,
  quantity,
}: {
  className?: string;
  quantity?: number;
}) {
  return (
    <div className="relative flex h-11 w-11 items-center justify-center rounded-full border border-orange-200 bg-white text-stone-700 shadow-sm transition-colors hover:border-orange-400">
      <ShoppingCartIcon
        className={clsx(
          "h-5 transition-all ease-in-out hover:scale-110",
          className,
        )}
      />

      {quantity ? (
        <div className="absolute right-0 top-0 -mr-1.5 -mt-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 text-[10px] font-bold text-white">
          {quantity}
        </div>
      ) : null}
    </div>
  );
}
