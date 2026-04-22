import { db } from "@/lib/db";
import { orders, payments } from "@/lib/db/schema";
import { verifyWebhookSignature } from "@/lib/payments/razorpay";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const raw = await req.text();
  const sig = req.headers.get("x-razorpay-signature") ?? "";
  if (!sig || !verifyWebhookSignature(raw, sig)) {
    return NextResponse.json({ error: "Bad signature" }, { status: 401 });
  }

  let body: { event?: string; payload?: { payment?: { entity?: Record<string, unknown> } } };
  try {
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const event = body.event ?? "";
  const ent = body.payload?.payment?.entity ?? null;
  const rzpOrderId = ent && typeof ent.order_id === "string" ? ent.order_id : null;
  if (!rzpOrderId) return NextResponse.json({ ok: true });

  const [pmt] = await db
    .select()
    .from(payments)
    .where(eq(payments.rzpOrderId, rzpOrderId))
    .limit(1);
  if (!pmt) return NextResponse.json({ ok: true });

  if (event === "payment.captured" || event === "payment.authorized") {
    await db
      .update(payments)
      .set({
        rzpPaymentId: typeof ent.id === "string" ? ent.id : pmt.rzpPaymentId,
        method: (ent.method as never) ?? pmt.method,
        status: event === "payment.captured" ? "captured" : "authorized",
        rawWebhook: body as unknown as Record<string, unknown>,
        updatedAt: new Date(),
      })
      .where(eq(payments.id, pmt.id));

    if (event === "payment.captured") {
      await db
        .update(orders)
        .set({ status: "placed", placedAt: new Date(), updatedAt: new Date() })
        .where(eq(orders.id, pmt.orderId));
    }
  } else if (event === "payment.failed") {
    await db
      .update(payments)
      .set({ status: "failed", rawWebhook: body as unknown as Record<string, unknown>, updatedAt: new Date() })
      .where(eq(payments.id, pmt.id));
  }

  return NextResponse.json({ ok: true });
}
