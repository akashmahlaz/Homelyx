import { setSessionCookie } from "@/lib/auth/session";
import { checkOtp, normalizeIndianPhone } from "@/lib/auth/twilio";
import { db } from "@/lib/db";
import { otpChallenges, users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";

const Body = z.object({
  phone: z.string(),
  code: z.string().regex(/^\d{4,8}$/, "Invalid OTP"),
});

export async function POST(req: Request) {
  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }
  const phone = normalizeIndianPhone(parsed.data.phone);
  if (!phone) {
    return NextResponse.json({ error: "Invalid phone" }, { status: 400 });
  }

  let approved = false;
  try {
    approved = await checkOtp(phone, parsed.data.code);
  } catch (e) {
    console.error("[otp/verify]", e);
    return NextResponse.json({ error: "Verification failed" }, { status: 502 });
  }
  if (!approved) {
    return NextResponse.json({ error: "Invalid OTP" }, { status: 401 });
  }

  // Mark latest pending challenge verified (best-effort)
  await db
    .update(otpChallenges)
    .set({ status: "approved", verifiedAt: new Date() })
    .where(eq(otpChallenges.phone, phone));

  // Upsert user
  const existing = await db.select().from(users).where(eq(users.phone, phone)).limit(1);
  let user = existing[0];
  if (!user) {
    const [created] = await db
      .insert(users)
      .values({ phone, isPhoneVerified: true })
      .returning();
    user = created;
  } else if (!user.isPhoneVerified) {
    await db.update(users).set({ isPhoneVerified: true }).where(eq(users.id, user.id));
  }

  await setSessionCookie({ sub: user.id, phone: user.phone, role: user.role });
  return NextResponse.json({
    ok: true,
    user: { id: user.id, phone: user.phone, name: user.name, role: user.role },
  });
}
