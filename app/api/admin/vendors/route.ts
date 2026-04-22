import { requireAdmin } from "@/lib/auth/admin";
import { db } from "@/lib/db";
import { vendors } from "@/lib/db/schema";
import { desc, eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(req: Request) {
  try { await requireAdmin(); }
  catch (e) { return e instanceof Response ? e : NextResponse.json({ error: "Forbidden" }, { status: 403 }); }
  const url = new URL(req.url);
  const status = url.searchParams.get("status");
  const rows = await db
    .select()
    .from(vendors)
    .where(status ? eq(vendors.status, status as never) : sql`true`)
    .orderBy(desc(vendors.createdAt))
    .limit(100);
  return NextResponse.json({ items: rows });
}
