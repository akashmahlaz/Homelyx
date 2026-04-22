import { requireSession } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { addresses } from "@/lib/db/schema";
import { and, desc, eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";

const Body = z.object({
  kind: z.enum(["home", "work", "other"]).default("home"),
  line1: z.string().min(3).max(200),
  line2: z.string().max(200).optional(),
  landmark: z.string().max(200).optional(),
  city: z.string().min(2).max(80),
  state: z.string().min(2).max(80),
  pincode: z.string().regex(/^\d{6}$/, "Invalid pincode"),
  lat: z.number().optional(),
  lng: z.number().optional(),
  isDefault: z.boolean().default(false),
});

export async function GET() {
  let s;
  try { s = await requireSession(); } catch { return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); }
  const rows = await db
    .select()
    .from(addresses)
    .where(eq(addresses.userId, s.sub))
    .orderBy(desc(addresses.isDefault), desc(addresses.createdAt));
  return NextResponse.json({ items: rows });
}

export async function POST(req: Request) {
  let s;
  try { s = await requireSession(); } catch { return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); }
  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.message }, { status: 400 });
  }
  const data = parsed.data;

  if (data.isDefault) {
    await db
      .update(addresses)
      .set({ isDefault: false })
      .where(and(eq(addresses.userId, s.sub), eq(addresses.isDefault, true)));
  }

  const [created] = await db
    .insert(addresses)
    .values({
      userId: s.sub,
      kind: data.kind,
      line1: data.line1,
      line2: data.line2,
      landmark: data.landmark,
      city: data.city,
      state: data.state,
      pincode: data.pincode,
      lat: data.lat != null ? sql`${data.lat}` : null,
      lng: data.lng != null ? sql`${data.lng}` : null,
      isDefault: data.isDefault,
    })
    .returning();

  return NextResponse.json({ address: created }, { status: 201 });
}
