import { requireSession } from "@/lib/auth/session";
import { db } from "@/lib/db";
import {
    addresses,
    orderItems,
    orders,
    payments,
    products,
    slotProducts,
    slots,
    vendors,
} from "@/lib/db/schema";
import { rzp } from "@/lib/payments/razorpay";
import { and, desc, eq, inArray, sql } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";

const Body = z.object({
  vendorId: z.string().uuid(),
  slotId: z.string().uuid(),
  addressId: z.string().uuid(),
  notes: z.string().max(500).optional(),
  items: z
    .array(z.object({ productId: z.string().uuid(), quantity: z.number().int().min(1).max(20) }))
    .min(1),
});

function shortCode() {
  const t = Date.now().toString(36).toUpperCase().slice(-4);
  const r = Math.random().toString(36).toUpperCase().slice(2, 6);
  return `HMX-${t}-${r}`;
}

export async function POST(req: Request) {
  let session;
  try {
    session = await requireSession();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.message }, { status: 400 });
  }
  const input = parsed.data;

  // Validate vendor + slot + address belong correctly
  const [vendor] = await db.select().from(vendors).where(eq(vendors.id, input.vendorId)).limit(1);
  if (!vendor || vendor.status !== "approved") {
    return NextResponse.json({ error: "Vendor unavailable" }, { status: 400 });
  }
  const [slot] = await db.select().from(slots).where(eq(slots.id, input.slotId)).limit(1);
  if (!slot || slot.vendorId !== vendor.id || !slot.isOpen) {
    return NextResponse.json({ error: "Slot unavailable" }, { status: 400 });
  }
  if (new Date(slot.cutoffAt).getTime() < Date.now()) {
    return NextResponse.json({ error: "Slot cutoff passed" }, { status: 400 });
  }
  const [address] = await db
    .select()
    .from(addresses)
    .where(and(eq(addresses.id, input.addressId), eq(addresses.userId, session.sub)))
    .limit(1);
  if (!address) {
    return NextResponse.json({ error: "Address invalid" }, { status: 400 });
  }

  // Load products + prices
  const productIds = input.items.map((i) => i.productId);
  const productRows = await db
    .select()
    .from(products)
    .where(and(inArray(products.id, productIds), eq(products.vendorId, vendor.id)));
  if (productRows.length !== productIds.length) {
    return NextResponse.json({ error: "Some products unavailable" }, { status: 400 });
  }

  const priceMap = new Map(productRows.map((p) => [p.id, p]));
  let subtotal = 0;
  const lineItems = input.items.map((i) => {
    const p = priceMap.get(i.productId)!;
    const lineTotal = p.priceInPaise * i.quantity;
    subtotal += lineTotal;
    return {
      productId: p.id,
      titleSnapshot: p.title,
      imageSnapshot: p.images[0] ?? null,
      unitPriceInPaise: p.priceInPaise,
      quantity: i.quantity,
      lineTotalInPaise: lineTotal,
    };
  });

  const deliveryFee = subtotal >= 49900 ? 0 : 2900; // free above 499
  const total = subtotal + deliveryFee;

  // Create order row
  const [order] = await db
    .insert(orders)
    .values({
      code: shortCode(),
      userId: session.sub,
      vendorId: vendor.id,
      slotId: slot.id,
      addressId: address.id,
      addressSnapshot: address as unknown as Record<string, unknown>,
      subtotalInPaise: subtotal,
      deliveryFeeInPaise: deliveryFee,
      totalInPaise: total,
      notes: input.notes,
    })
    .returning();

  await db.insert(orderItems).values(lineItems.map((li) => ({ ...li, orderId: order.id })));

  // Reserve slot capacity (best-effort)
  await db.update(slots).set({ booked: sql`${slots.booked} + 1` }).where(eq(slots.id, slot.id));
  for (const li of lineItems) {
    await db
      .insert(slotProducts)
      .values({ slotId: slot.id, productId: li.productId, quantity: 0, sold: li.quantity })
      .onConflictDoUpdate({
        target: [slotProducts.slotId, slotProducts.productId],
        set: { sold: sql`${slotProducts.sold} + ${li.quantity}` },
      });
  }

  // Create Razorpay order
  const rzpOrder = await rzp().orders.create({
    amount: total,
    currency: "INR",
    receipt: order.code,
    notes: { orderId: order.id, userId: session.sub },
  });

  await db.insert(payments).values({
    orderId: order.id,
    rzpOrderId: rzpOrder.id,
    amountInPaise: total,
    status: "created",
  });

  return NextResponse.json({
    order: { id: order.id, code: order.code, totalInPaise: total },
    razorpay: {
      orderId: rzpOrder.id,
      amount: total,
      currency: "INR",
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    },
  });
}

export async function GET() {
  let session;
  try {
    session = await requireSession();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const rows = await db
    .select()
    .from(orders)
    .where(eq(orders.userId, session.sub))
    .orderBy(desc(orders.createdAt))
    .limit(50);
  return NextResponse.json({ items: rows });
}
