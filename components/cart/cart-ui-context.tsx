"use client";

import { createContext, useContext, useState } from "react";

type CartUIContextType = {
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
};

const CartUIContext = createContext<CartUIContextType>({
  isOpen: false,
  openCart: () => {},
  closeCart: () => {},
});

export function CartUIProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <CartUIContext.Provider
      value={{
        isOpen,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
      }}
    >
      {children}
    </CartUIContext.Provider>
  );
}

export function useCartUI() {
  return useContext(CartUIContext);
}
