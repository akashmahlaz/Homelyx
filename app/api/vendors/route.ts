import { db } from "@/lib/db";
import { vendors } from "@/lib/db/schema";
import { and, desc, eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const revalidate = 60;

export async function GET(req: Request) {
  const url = new URL(req.url);
  const city = url.searchParams.get("city");
  const q = url.searchParams.get("q");
  const limit = Math.min(Number(url.searchParams.get("limit") ?? 24), 100);

  const rows = await db
    .select()
    .from(vendors)
    .where(
      and(
        eq(vendors.status, "approved"),
        city ? eq(vendors.city, city) : sql`true`,
        q ? sql`${vendors.name} ILIKE ${"%" + q + "%"}` : sql`true`,
      ),
    )
    .orderBy(desc(vendors.rating))
    .limit(limit);

  return NextResponse.json({ items: rows });
}
