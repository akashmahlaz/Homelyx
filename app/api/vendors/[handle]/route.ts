import { db } from "@/lib/db";
import { products, vendors } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(_req: Request, { params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const [v] = await db.select().from(vendors).where(eq(vendors.handle, handle)).limit(1);
  if (!v || v.status !== "approved") {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const items = await db
    .select()
    .from(products)
    .where(eq(products.vendorId, v.id));
  return NextResponse.json({ vendor: v, products: items });
}
