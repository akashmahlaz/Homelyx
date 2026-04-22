"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const SUPPORTED = ["en", "hi"] as const;
type Locale = (typeof SUPPORTED)[number];

export async function setLocale(locale: Locale) {
  if (!SUPPORTED.includes(locale)) return;
  const store = await cookies();
  store.set("locale", locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
  revalidatePath("/", "layout");
}
