"use client";

import { Dialog, Transition } from "@headlessui/react";
import { ShoppingCartIcon, XMarkIcon } from "@heroicons/react/24/outline";
import LoadingDots from "components/loading-dots";
import Price from "components/price";
import { DEFAULT_OPTION } from "lib/constants";
import { createUrl } from "lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { createCartAndSetCookie, redirectToCheckout } from "./actions";
import { useCart } from "./cart-context";
import { useCartUI } from "./cart-ui-context";
import { DeleteItemButton } from "./delete-item-button";
import { EditItemQuantityButton } from "./edit-item-quantity-button";
import OpenCart from "./open-cart";

type MerchandiseSearchParams = {
  [key: string]: string;
};

const SLOTS = [
  { id: "morning", label: "Morning", time: "5–10 AM", emoji: "🌅", bg: "bg-amber-50", border: "border-amber-200", selectedBg: "bg-amber-500", labelColor: "text-amber-700" },
  { id: "afternoon", label: "Afternoon", time: "11 AM–3 PM", emoji: "☀️", bg: "bg-sky-50", border: "border-sky-200", selectedBg: "bg-sky-500", labelColor: "text-sky-700" },
  { id: "evening", label: "Evening", time: "4–8 PM", emoji: "🌆", bg: "bg-orange-50", border: "border-orange-200", selectedBg: "bg-orange-500", labelColor: "text-orange-700" },
  { id: "night", label: "Night", time: "8–11 PM", emoji: "🌙", bg: "bg-indigo-50", border: "border-indigo-200", selectedBg: "bg-indigo-600", labelColor: "text-indigo-700" },
];

export default function CartModal() {
  const { cart, updateCartItem } = useCart();
  const { isOpen, openCart, closeCart } = useCartUI();
  const quantityRef = useRef(cart?.totalQuantity);
  const [selectedSlot, setSelectedSlot] = useState<string>("evening");

  useEffect(() => {
    if (!cart) {
      createCartAndSetCookie();
    }
  }, [cart]);

  useEffect(() => {
    if (
      cart?.totalQuantity &&
      cart?.totalQuantity !== quantityRef.current &&
      cart?.totalQuantity > 0
    ) {
      if (!isOpen) {
        openCart();
      }
      quantityRef.current = cart?.totalQuantity;
    }
  }, [isOpen, cart?.totalQuantity, quantityRef, openCart]);

  const total = parseFloat(cart?.cost?.totalAmount?.amount ?? "0");
  const deliveryFee = total >= 499 ? 0 : 49;
  const grandTotal = total + deliveryFee;

  const activeSlot = SLOTS.find((s) => s.id === selectedSlot);

  return (
    <>
      <button aria-label="Open cart" onClick={openCart}>
        <OpenCart quantity={cart?.totalQuantity} />
      </button>
      <Transition show={isOpen}>
        <Dialog onClose={closeCart} className="relative z-50">
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" aria-hidden="true" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="fixed bottom-0 right-0 top-0 flex h-full w-full flex-col border-l border-orange-100 bg-orange-50 shadow-2xl md:w-[420px]">
              {/* Header */}
              <div className="flex shrink-0 items-center justify-between border-b border-orange-100 bg-white px-5 py-4">
                <div className="flex items-center gap-2">
                  <ShoppingCartIcon className="h-5 w-5 text-orange-500" />
                  <span className="text-base font-bold text-stone-900">Your Order</span>
                  {cart && cart.lines.length > 0 && (
                    <span className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-semibold text-orange-600">
                      {cart.totalQuantity} {cart.totalQuantity === 1 ? "item" : "items"}
                    </span>
                  )}
                </div>
                <button
                  aria-label="Close cart"
                  onClick={closeCart}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-400 transition-colors hover:bg-stone-50 hover:text-stone-700"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>

              {/* Empty state */}
              {!cart || cart.lines.length === 0 ? (
                <div className="flex flex-1 flex-col items-center justify-center gap-5 px-6">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-orange-100">
                    <ShoppingCartIcon className="h-12 w-12 text-orange-400" />
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold text-stone-900">Your cart is empty</p>
                    <p className="mt-1 text-sm text-stone-400">Add some homemade goodness!</p>
                  </div>
                  <button
                    onClick={closeCart}
                    className="rounded-full bg-orange-500 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
                  >
                    Browse Products
                  </button>
                </div>
              ) : (
                <div className="flex min-h-0 flex-1 flex-col">
                  {/* Cart items */}
                  <ul className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
                    {cart.lines
                      .sort((a, b) =>
                        a.merchandise.product.title.localeCompare(b.merchandise.product.title),
                      )
                      .map((item, i) => {
                        const merchandiseSearchParams = {} as MerchandiseSearchParams;
                        item.merchandise.selectedOptions.forEach(({ name, value }) => {
                          if (value !== DEFAULT_OPTION) {
                            merchandiseSearchParams[name.toLowerCase()] = value;
                          }
                        });
                        const merchandiseUrl = createUrl(
                          `/product/${item.merchandise.product.handle}`,
                          new URLSearchParams(merchandiseSearchParams),
                        );
                        return (
                          <li key={i} className="rounded-xl border border-stone-100 bg-white p-3 shadow-sm">
                            <div className="relative flex items-start gap-3">
                              <div className="absolute -right-1 -top-1 z-10">
                                <DeleteItemButton item={item} optimisticUpdate={updateCartItem} />
                              </div>
                              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-stone-100">
                                <Image
                                  className="h-full w-full object-cover"
                                  width={64}
                                  height={64}
                                  alt={item.merchandise.product.featuredImage.altText || item.merchandise.product.title}
                                  src={item.merchandise.product.featuredImage.url}
                                />
                              </div>
                              <div className="flex flex-1 flex-col pr-6">
                                <Link href={merchandiseUrl} onClick={closeCart}>
                                  <span className="text-sm font-semibold leading-snug text-stone-900 hover:text-orange-600">
                                    {item.merchandise.product.title}
                                  </span>
                                </Link>
                                {item.merchandise.title !== DEFAULT_OPTION && (
                                  <p className="mt-0.5 text-xs text-stone-400">{item.merchandise.title}</p>
                                )}
                                <div className="mt-2 flex items-center justify-between">
                                  <div className="flex h-8 items-center rounded-full border border-stone-200 bg-stone-50">
                                    <EditItemQuantityButton item={item} type="minus" optimisticUpdate={updateCartItem} />
                                    <span className="w-7 text-center text-sm font-medium text-stone-800">
                                      {item.quantity}
                                    </span>
                                    <EditItemQuantityButton item={item} type="plus" optimisticUpdate={updateCartItem} />
                                  </div>
                                  <Price
                                    className="text-sm font-bold text-orange-500"
                                    amount={item.cost.totalAmount.amount}
                                    currencyCode={item.cost.totalAmount.currencyCode}
                                  />
                                </div>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                  </ul>

                  {/* Slot selector */}
                  <div className="shrink-0 border-t border-orange-100 bg-white px-4 py-4">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-stone-400">
                      Choose delivery slot
                    </p>
                    <div className="grid grid-cols-4 gap-2">
                      {SLOTS.map((slot) => {
                        const isSelected = selectedSlot === slot.id;
                        return (
                          <button
                            key={slot.id}
                            onClick={() => setSelectedSlot(slot.id)}
                            className={`flex flex-col items-center rounded-xl border-2 p-2 transition-all ${
                              isSelected
                                ? `${slot.selectedBg} border-transparent text-white`
                                : `${slot.bg} ${slot.border} hover:shadow-sm`
                            }`}
                          >
                            <span className="text-lg">{slot.emoji}</span>
                            <span className={`text-[10px] font-bold ${isSelected ? "text-white" : slot.labelColor}`}>
                              {slot.label}
                            </span>
                            <span className={`text-[9px] ${isSelected ? "text-white/80" : "text-stone-400"}`}>
                              {slot.time}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                    {activeSlot && (
                      <p className="mt-2 text-center text-xs text-stone-500">
                        Selected: <span className="font-semibold text-orange-600">{activeSlot.label} ({activeSlot.time})</span>
                      </p>
                    )}
                  </div>

                  {/* Free delivery nudge */}
                  <div className="shrink-0 px-4 pb-3">
                    {total < 499 ? (
                      <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-2 text-center text-xs text-amber-700">
                        Add{" "}
                        <span className="font-bold">₹{(499 - total).toFixed(0)}</span>{" "}
                        more for free delivery 🚚
                      </div>
                    ) : (
                      <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-2 text-center text-xs font-medium text-green-700">
                        🎉 You&apos;ve unlocked free delivery!
                      </div>
                    )}
                  </div>

                  {/* Order summary */}
                  <div className="shrink-0 border-t border-stone-100 bg-white px-5 pb-6 pt-4">
                    <div className="space-y-2 text-sm text-stone-500">
                      <div className="flex items-center justify-between">
                        <span>Subtotal</span>
                        <Price className="font-medium text-stone-700" amount={cart.cost.subtotalAmount.amount} currencyCode={cart.cost.subtotalAmount.currencyCode} />
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Delivery</span>
                        <span className={deliveryFee === 0 ? "font-medium text-green-600" : "font-medium text-stone-700"}>
                          {deliveryFee === 0 ? "Free" : `₹${deliveryFee}`}
                        </span>
                      </div>
                      <div className="flex items-center justify-between border-t border-stone-100 pt-2 text-base font-bold text-stone-900">
                        <span>Total</span>
                        <span className="text-orange-500">₹{grandTotal.toFixed(0)}</span>
                      </div>
                    </div>
                    <form action={redirectToCheckout} className="mt-4">
                      <input type="hidden" name="slot" value={selectedSlot} />
                      <CheckoutButton />
                    </form>
                    <button onClick={closeCart} className="mt-2 w-full py-1.5 text-center text-xs text-stone-400 transition-colors hover:text-stone-600">
                      Continue shopping →
                    </button>
                  </div>
                </div>
              )}
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}

function CheckoutButton() {
  const { pending } = useFormStatus();
  return (
    <button
      className="flex w-full items-center justify-center rounded-full bg-orange-500 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-600 disabled:opacity-70"
      type="submit"
      disabled={pending}
    >
      {pending ? <LoadingDots className="bg-white" /> : "Place Order →"}
    </button>
  );
}