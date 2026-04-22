"use client";

import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { updateItemQuantity } from "components/cart/actions";
import type { CartItem } from "lib/shopify/types";
import { useActionState } from "react";

function SubmitButton({ type }: { type: "plus" | "minus" }) {
  return (
    <button
      type="submit"
      aria-label={
        type === "plus" ? "Increase item quantity" : "Reduce item quantity"
      }
      className={clsx(
        "flex h-full min-w-[36px] max-w-[36px] flex-none items-center justify-center rounded-full p-2 transition-all duration-200 hover:bg-orange-50 hover:text-orange-600",
        {
          "ml-auto": type === "minus",
        },
      )}
    >
      {type === "plus" ? (
        <PlusIcon className="h-4 w-4" />
      ) : (
        <MinusIcon className="h-4 w-4" />
      )}
    </button>
  );
}

export function EditItemQuantityButton({
  item,
  type,
  optimisticUpdate,
}: {
  item: CartItem;
  type: "plus" | "minus";
  optimisticUpdate: any;
}) {
  const [message, formAction] = useActionState(updateItemQuantity, null);
  const payload = {
    merchandiseId: item.merchandise.id,
    quantity: type === "plus" ? item.quantity + 1 : item.quantity - 1,
  };
  const updateItemQuantityAction = formAction.bind(null, payload);

  return (
    <form
      action={async () => {
        optimisticUpdate(payload.merchandiseId, type);
        updateItemQuantityAction();
      }}
    >
      <SubmitButton type={type} />
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}
