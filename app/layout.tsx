import { CartProvider } from "components/cart/cart-context";
import { CartUIProvider } from "components/cart/cart-ui-context";
import { MobileBottomNav } from "components/layout/mobile-bottom-nav";
import { Navbar } from "components/layout/navbar";
import { WelcomeToast } from "components/welcome-toast";
import { GeistSans } from "geist/font/sans";
import { getCart } from "lib/shopify";
import { baseUrl } from "lib/utils";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
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

const RTL_LOCALES = new Set(["ar", "he", "fa", "ur"]);

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  // Don't await the fetch, pass the Promise to the context provider
  const cart = getCart();
  const locale = await getLocale();
  const messages = await getMessages();
  const dir = RTL_LOCALES.has(locale) ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir} className={GeistSans.variable}>
      <body className="bg-orange-50 pb-16 text-stone-900 selection:bg-orange-200 selection:text-orange-900 md:pb-0">
        <NextIntlClientProvider locale={locale} messages={messages}>
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
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
