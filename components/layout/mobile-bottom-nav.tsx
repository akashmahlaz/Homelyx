"use client";

import {
    HomeIcon,
    MagnifyingGlassIcon,
    ShoppingCartIcon,
    UserIcon,
} from "@heroicons/react/24/outline";
import {
    HomeIcon as HomeIconSolid,
    MagnifyingGlassIcon as MagnifyingGlassIconSolid,
    UserIcon as UserIconSolid,
} from "@heroicons/react/24/solid";
import clsx from "clsx";
import { useCart } from "components/cart/cart-context";
import { useCartUI } from "components/cart/cart-ui-context";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function MobileBottomNav() {
  const pathname = usePathname();
  const { cart } = useCart();
  const { openCart } = useCartUI();

  const quantity = cart?.totalQuantity ?? 0;

  const navItems = [
    {
      label: "Home",
      href: "/",
      icon: HomeIcon,
      activeIcon: HomeIconSolid,
      match: (p: string) => p === "/",
    },
    {
      label: "Browse",
      href: "/search",
      icon: MagnifyingGlassIcon,
      activeIcon: MagnifyingGlassIconSolid,
      match: (p: string) => p.startsWith("/search"),
    },
    {
      label: "Account",
      href: "/auth/login",
      icon: UserIcon,
      activeIcon: UserIconSolid,
      match: (p: string) => p.startsWith("/auth"),
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-orange-100 bg-white/95 backdrop-blur-md md:hidden">
      <div className="flex items-center justify-around px-2 py-2 pb-safe">
        {navItems.map((item) => {
          const isActive = item.match(pathname);
          const Icon = isActive ? item.activeIcon : item.icon;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={clsx(
                "flex flex-1 flex-col items-center gap-1 rounded-xl px-2 py-2 transition-colors",
                isActive ? "text-orange-500" : "text-stone-400",
              )}
            >
              <Icon className="h-6 w-6" />
              <span
                className={clsx(
                  "text-[10px] font-medium",
                  isActive ? "text-orange-500" : "text-stone-400",
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}

        {/* Cart button */}
        <button
          onClick={openCart}
          className="flex flex-1 flex-col items-center gap-1 rounded-xl px-2 py-2 text-stone-400 transition-colors"
        >
          <div className="relative">
            <ShoppingCartIcon className="h-6 w-6" />
            {quantity > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 text-[9px] font-bold text-white">
                {quantity > 9 ? "9+" : quantity}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium">Cart</span>
        </button>
      </div>
    </nav>
  );
}
