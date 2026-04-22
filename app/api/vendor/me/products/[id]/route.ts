import { requireVendor } from "@/lib/auth/vendor";
import { db } from "@/lib/db";
import { products } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";

const Patch = z.object({
  title: z.string().min(2).max(200).optional(),
  description: z.string().max(5000).optional(),
  images: z.array(z.string().url()).max(10).optional(),
  priceInPaise: z.number().int().min(1000).max(10_00_000).optional(),
  mrpInPaise: z.number().int().min(1000).max(10_00_000).nullable().optional(),
  isVeg: z.boolean().optional(),
  spiceLevel: z.number().int().min(0).max(3).optional(),
  portionLabel: z.string().max(60).nullable().optional(),
  tags: z.array(z.string()).max(20).optional(),
  allergens: z.array(z.string()).max(20).optional(),
  availableIn: z.array(z.enum(["breakfast", "lunch", "snacks", "dinner"])).optional(),
  status: z.enum(["draft", "active", "paused", "archived"]).optional(),
});

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  let v;
  try { ({ vendor: v } = await requireVendor()); }
  catch (e) { return e instanceof Response ? e : NextResponse.json({ error: "Forbidden" }, { status: 403 }); }
  const { id } = await params;
  const parsed = Patch.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: parsed.error.message }, { status: 400 });

  const [updated] = await db
    .update(products)
    .set({ ...parsed.data, updatedAt: new Date() })
    .where(and(eq(products.id, id), eq(products.vendorId, v.id)))
    .returning();
  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ product: updated });
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  let v;
  try { ({ vendor: v } = await requireVendor()); }
  catch (e) { return e instanceof Response ? e : NextResponse.json({ error: "Forbidden" }, { status: 403 }); }
  const { id } = await params;
  const [deleted] = await db
    .delete(products)
    .where(and(eq(products.id, id), eq(products.vendorId, v.id)))
    .returning({ id: products.id });
  if (!deleted) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
