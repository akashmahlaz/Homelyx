"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";
import { removeItem } from "components/cart/actions";
import type { CartItem } from "lib/shopify/types";
import { useActionState } from "react";

export function DeleteItemButton({
  item,
  optimisticUpdate,
}: {
  item: CartItem;
  optimisticUpdate: any;
}) {
  const [message, formAction] = useActionState(removeItem, null);
  const merchandiseId = item.merchandise.id;
  const removeItemAction = formAction.bind(null, merchandiseId);

  return (
    <form
      action={async () => {
        optimisticUpdate(merchandiseId, "delete");
        removeItemAction();
      }}
    >
      <button
        type="submit"
        aria-label="Remove cart item"
        className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-stone-200 transition-colors hover:bg-red-100 hover:text-red-600"
      >
        <XMarkIcon className="mx-[1px] h-4 w-4 text-stone-600" />
      </button>
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}
