import { getRequestConfig } from "next-intl/server";
import { cookies, headers } from "next/headers";

export const locales = ["en", "hi"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const headersList = await headers();

  // Try to get locale from cookie first
  let locale: Locale = defaultLocale;
  const localeCookie = cookieStore.get("locale")?.value as Locale | undefined;
  if (localeCookie && locales.includes(localeCookie)) {
    locale = localeCookie;
  }

  // Fall back to Accept-Language header
  if (!localeCookie) {
    const acceptLanguage = headersList.get("accept-language");
    if (acceptLanguage?.startsWith("hi")) {
      locale = "hi";
    }
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});