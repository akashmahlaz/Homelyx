import { NextRequest, NextResponse } from "next/server";

const SUPPORTED_LOCALES = ["en", "hi"] as const;
const DEFAULT_LOCALE = "en";

/**
 * Lightweight locale middleware.
 *
 * We deliberately do NOT use next-intl's routing middleware because we are not
 * using a [locale] segment in the App Router (avoids breaking SSR routes).
 *
 * Instead we read Accept-Language on first visit and set a `locale` cookie that
 * `i18n/request.ts` consumes to load the right messages.
 */
export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const existing = request.cookies.get("locale")?.value;
  if (
    existing &&
    SUPPORTED_LOCALES.includes(existing as (typeof SUPPORTED_LOCALES)[number])
  ) {
    return response;
  }

  const accept = request.headers.get("accept-language") ?? "";
  const detected = accept.toLowerCase().startsWith("hi") ? "hi" : DEFAULT_LOCALE;

  response.cookies.set("locale", detected, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
  return response;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};