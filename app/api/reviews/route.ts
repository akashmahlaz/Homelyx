import { requireSession } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { orders, reviews, vendors } from "@/lib/db/schema";
import { and, eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";

const Body = z.object({
  vendorId: z.string().uuid(),
  orderId: z.string().uuid().optional(),
  productId: z.string().uuid().optional(),
  rating: z.number().int().min(1).max(5),
  body: z.string().max(2000).optional(),
  images: z.array(z.string().url()).max(6).default([]),
});

export async function POST(req: Request) {
  let s;
  try { s = await requireSession(); } catch { return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); }
  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: parsed.error.message }, { status: 400 });
  const data = parsed.data;

  // Require user to have a delivered order with this vendor
  const [delivered] = await db
    .select({ id: orders.id })
    .from(orders)
    .where(
      and(
        eq(orders.userId, s.sub),
        eq(orders.vendorId, data.vendorId),
        eq(orders.status, "delivered"),
      ),
    )
    .limit(1);
  if (!delivered) {
    return NextResponse.json({ error: "Can only review after a delivered order" }, { status: 403 });
  }

  const [created] = await db
    .insert(reviews)
    .values({
      userId: s.sub,
      vendorId: data.vendorId,
      orderId: data.orderId ?? delivered.id,
      productId: data.productId,
      rating: data.rating,
      body: data.body,
      images: data.images,
    })
    .returning();

  // Update vendor aggregate
  await db
    .update(vendors)
    .set({
      ratingCount: sql`${vendors.ratingCount} + 1`,
      rating: sql`((${vendors.rating} * ${vendors.ratingCount}) + ${data.rating})::numeric / (${vendors.ratingCount} + 1)`,
      updatedAt: new Date(),
    })
    .where(eq(vendors.id, data.vendorId));

  return NextResponse.json({ review: created }, { status: 201 });
}
