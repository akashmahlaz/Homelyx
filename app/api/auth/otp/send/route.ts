import { normalizeIndianPhone, sendOtp } from "@/lib/auth/twilio";
import { db } from "@/lib/db";
import { otpChallenges } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";

const Body = z.object({
  phone: z.string().min(7).max(20),
});

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const parsed = Body.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid phone" }, { status: 400 });
  }
  const phone = normalizeIndianPhone(parsed.data.phone);
  if (!phone) {
    return NextResponse.json({ error: "Invalid Indian phone number" }, { status: 400 });
  }

  // Basic rate-limit: count attempts in last 10 minutes
  const recent = await db
    .select({ id: otpChallenges.id })
    .from(otpChallenges)
    .where(eq(otpChallenges.phone, phone))
    .limit(20);
  if (recent.length >= 10) {
    return NextResponse.json(
      { error: "Too many OTP requests. Try again later." },
      { status: 429 },
    );
  }

  try {
    const { sid } = await sendOtp(phone);
    await db.insert(otpChallenges).values({ phone, twilioSid: sid, status: "pending" });
    return NextResponse.json({ ok: true, phone });
  } catch (e) {
    console.error("[otp/send]", e);
    return NextResponse.json({ error: "Failed to send OTP" }, { status: 502 });
  }
}
