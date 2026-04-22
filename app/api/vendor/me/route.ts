import { requireSession } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { vendors } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  let s;
  try { s = await requireSession(); } catch { return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); }
  const [v] = await db.select().from(vendors).where(eq(vendors.ownerId, s.sub)).limit(1);
  if (!v) return NextResponse.json({ vendor: null });
  return NextResponse.json({ vendor: v });
}
