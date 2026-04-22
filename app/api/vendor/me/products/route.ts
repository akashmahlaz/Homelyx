import { requireVendor } from "@/lib/auth/vendor";
import { db } from "@/lib/db";
import { products } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";

const Body = z.object({
  handle: z.string().regex(/^[a-z0-9-]{2,120}$/, "lowercase, digits, hyphens only"),
  title: z.string().min(2).max(200),
  description: z.string().max(5000).optional(),
  images: z.array(z.string().url()).max(10).default([]),
  priceInPaise: z.number().int().min(1000).max(10_00_000),
  mrpInPaise: z.number().int().min(1000).max(10_00_000).optional(),
  isVeg: z.boolean().default(true),
  spiceLevel: z.number().int().min(0).max(3).default(1),
  portionLabel: z.string().max(60).optional(),
  tags: z.array(z.string()).max(20).default([]),
  allergens: z.array(z.string()).max(20).default([]),
  availableIn: z.array(z.enum(["breakfast", "lunch", "snacks", "dinner"])).default(["lunch"]),
  status: z.enum(["draft", "active", "paused"]).default("active"),
});

export async function GET() {
  let v;
  try { ({ vendor: v } = await requireVendor()); }
  catch (e) { return e instanceof Response ? e : NextResponse.json({ error: "Forbidden" }, { status: 403 }); }
  const items = await db.select().from(products).where(eq(products.vendorId, v.id));
  return NextResponse.json({ items });
}

export async function POST(req: Request) {
  let v;
  try { ({ vendor: v } = await requireVendor()); }
  catch (e) { return e instanceof Response ? e : NextResponse.json({ error: "Forbidden" }, { status: 403 }); }
  if (v.status !== "approved") {
    return NextResponse.json({ error: "Vendor not approved yet" }, { status: 403 });
  }
  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: parsed.error.message }, { status: 400 });

  const [created] = await db
    .insert(products)
    .values({ ...parsed.data, vendorId: v.id })
    .returning();
  return NextResponse.json({ product: created }, { status: 201 });
}
