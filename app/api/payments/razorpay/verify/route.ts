import { requireSession } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { orders, payments } from "@/lib/db/schema";
import { verifyCheckoutSignature } from "@/lib/payments/razorpay";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";

const Body = z.object({
  razorpayOrderId: z.string(),
  razorpayPaymentId: z.string(),
  razorpaySignature: z.string(),
});

export async function POST(req: Request) {
  try {
    await requireSession();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
  const ok = verifyCheckoutSignature({
    orderId: parsed.data.razorpayOrderId,
    paymentId: parsed.data.razorpayPaymentId,
    signature: parsed.data.razorpaySignature,
  });
  if (!ok) {
    return NextResponse.json({ error: "Signature mismatch" }, { status: 400 });
  }

  const [pmt] = await db
    .select()
    .from(payments)
    .where(eq(payments.rzpOrderId, parsed.data.razorpayOrderId))
    .limit(1);
  if (!pmt) return NextResponse.json({ error: "Payment not found" }, { status: 404 });

  await db
    .update(payments)
    .set({
      rzpPaymentId: parsed.data.razorpayPaymentId,
      rzpSignature: parsed.data.razorpaySignature,
      status: "captured",
      updatedAt: new Date(),
    })
    .where(eq(payments.id, pmt.id));

  await db
    .update(orders)
    .set({ status: "placed", placedAt: new Date(), updatedAt: new Date() })
    .where(eq(orders.id, pmt.orderId));

  return NextResponse.json({ ok: true });
}
