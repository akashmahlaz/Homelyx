import { requireSession } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { addresses } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";

const Patch = z.object({
  kind: z.enum(["home", "work", "other"]).optional(),
  line1: z.string().min(3).max(200).optional(),
  line2: z.string().max(200).nullable().optional(),
  landmark: z.string().max(200).nullable().optional(),
  city: z.string().min(2).max(80).optional(),
  state: z.string().min(2).max(80).optional(),
  pincode: z.string().regex(/^\d{6}$/).optional(),
  isDefault: z.boolean().optional(),
});

async function load(id: string, userId: string) {
  const [row] = await db
    .select()
    .from(addresses)
    .where(and(eq(addresses.id, id), eq(addresses.userId, userId)))
    .limit(1);
  return row ?? null;
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  let s;
  try { s = await requireSession(); } catch { return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); }
  const { id } = await params;
  const existing = await load(id, s.sub);
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const parsed = Patch.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: parsed.error.message }, { status: 400 });

  if (parsed.data.isDefault) {
    await db
      .update(addresses)
      .set({ isDefault: false })
      .where(and(eq(addresses.userId, s.sub), eq(addresses.isDefault, true)));
  }

  const [updated] = await db
    .update(addresses)
    .set(parsed.data)
    .where(eq(addresses.id, id))
    .returning();
  return NextResponse.json({ address: updated });
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  let s;
  try { s = await requireSession(); } catch { return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); }
  const { id } = await params;
  const existing = await load(id, s.sub);
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });
  await db.delete(addresses).where(eq(addresses.id, id));
  return NextResponse.json({ ok: true });
}
