import { requireSession } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { orderItems, orders, payments, slots, vendors } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(_req: Request, { params }: { params: Promise<{ code: string }> }) {
  let s;
  try { s = await requireSession(); } catch { return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); }
  const { code } = await params;

  const [row] = await db
    .select({
      order: orders,
      vendor: vendors,
      slot: slots,
    })
    .from(orders)
    .innerJoin(vendors, eq(vendors.id, orders.vendorId))
    .innerJoin(slots, eq(slots.id, orders.slotId))
    .where(and(eq(orders.code, code), eq(orders.userId, s.sub)))
    .limit(1);

  if (!row) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const items = await db.select().from(orderItems).where(eq(orderItems.orderId, row.order.id));
  const [pmt] = await db.select().from(payments).where(eq(payments.orderId, row.order.id)).limit(1);

  return NextResponse.json({
    order: row.order,
    vendor: { id: row.vendor.id, handle: row.vendor.handle, name: row.vendor.name, city: row.vendor.city, avatarUrl: row.vendor.avatarUrl },
    slot: row.slot,
    items,
    payment: pmt
      ? { id: pmt.id, status: pmt.status, method: pmt.method, amountInPaise: pmt.amountInPaise }
      : null,
  });
}
