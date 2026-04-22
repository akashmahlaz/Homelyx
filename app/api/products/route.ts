import { db } from "@/lib/db";
import { products, vendors } from "@/lib/db/schema";
import { and, desc, eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const revalidate = 60;

export async function GET(req: Request) {
  const url = new URL(req.url);
  const city = url.searchParams.get("city");
  const vendorHandle = url.searchParams.get("vendor");
  const q = url.searchParams.get("q");
  const limit = Math.min(Number(url.searchParams.get("limit") ?? 24), 100);
  const offset = Math.max(Number(url.searchParams.get("offset") ?? 0), 0);

  const conds = [eq(products.status, "active")];
  if (vendorHandle) {
    const [v] = await db.select({ id: vendors.id }).from(vendors).where(eq(vendors.handle, vendorHandle)).limit(1);
    if (!v) return NextResponse.json({ items: [], total: 0 });
    conds.push(eq(products.vendorId, v.id));
  }
  if (q) {
    conds.push(sql`${products.title} ILIKE ${"%" + q + "%"}`);
  }

  const rows = await db
    .select({
      id: products.id,
      handle: products.handle,
      title: products.title,
      images: products.images,
      priceInPaise: products.priceInPaise,
      mrpInPaise: products.mrpInPaise,
      isVeg: products.isVeg,
      portionLabel: products.portionLabel,
      tags: products.tags,
      vendor: { id: vendors.id, handle: vendors.handle, name: vendors.name, city: vendors.city },
    })
    .from(products)
    .innerJoin(vendors, eq(vendors.id, products.vendorId))
    .where(and(...conds, city ? eq(vendors.city, city) : sql`true`))
    .orderBy(desc(products.createdAt))
    .limit(limit)
    .offset(offset);

  return NextResponse.json({ items: rows, limit, offset });
}
