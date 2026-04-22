import { CartProvider } from "components/cart/cart-context";
import { CartUIProvider } from "components/cart/cart-ui-context";
import { MobileBottomNav } from "components/layout/mobile-bottom-nav";
import { Navbar } from "components/layout/navbar";
import { WelcomeToast } from "components/welcome-toast";
import { GeistSans } from "geist/font/sans";
import { getCart } from "lib/shopify";
import { baseUrl } from "lib/utils";
import { ReactNode } from "react";
import { Toaster } from "sonner";
import "./globals.css";

const { SITE_NAME } = process.env;

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME!,
    template: `%s | ${SITE_NAME}`,
  },
  robots: {
    follow: true,
    index: true,
  },
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  // Don't await the fetch, pass the Promise to the context provider
  const cart = getCart();

  return (
    <html lang="en" className={GeistSans.variable}>
      <body className="bg-orange-50 text-stone-900 selection:bg-orange-200 selection:text-orange-900 pb-16 md:pb-0">
        <CartProvider cartPromise={cart}>
          <CartUIProvider>
            <Navbar />
            <main>
              {children}
              <Toaster closeButton />
              <WelcomeToast />
            </main>
            <MobileBottomNav />
          </CartUIProvider>
        </CartProvider>
      </body>
    </html>
  );
}
