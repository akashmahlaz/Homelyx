import { requireVendor } from "@/lib/auth/vendor";
import { db } from "@/lib/db";
import { slots } from "@/lib/db/schema";
import { and, eq, gte, lte } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";

const SLOT_TIMES: Record<
  "breakfast" | "lunch" | "snacks" | "dinner",
  { start: string; end: string; cutoffMinutes: number }
> = {
  breakfast: { start: "07:30", end: "09:30", cutoffMinutes: 60 * 12 }, // night before
  lunch: { start: "12:30", end: "14:00", cutoffMinutes: 60 * 3 },
  snacks: { start: "16:30", end: "18:00", cutoffMinutes: 60 * 2 },
  dinner: { start: "19:30", end: "21:30", cutoffMinutes: 60 * 3 },
};

const PostBody = z.object({
  fromDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  toDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  kinds: z.array(z.enum(["breakfast", "lunch", "snacks", "dinner"])).min(1),
  capacity: z.number().int().min(1).max(500),
});

export async function GET(req: Request) {
  let v;
  try { ({ vendor: v } = await requireVendor()); }
  catch (e) { return e instanceof Response ? e : NextResponse.json({ error: "Forbidden" }, { status: 403 }); }
  const url = new URL(req.url);
  const from = url.searchParams.get("from") ?? new Date().toISOString().slice(0, 10);
  const to =
    url.searchParams.get("to") ??
    new Date(Date.now() + 14 * 86400_000).toISOString().slice(0, 10);
  const rows = await db
    .select()
    .from(slots)
    .where(and(eq(slots.vendorId, v.id), gte(slots.date, from), lte(slots.date, to)));
  return NextResponse.json({ items: rows });
}

export async function POST(req: Request) {
  let v;
  try { ({ vendor: v } = await requireVendor()); }
  catch (e) { return e instanceof Response ? e : NextResponse.json({ error: "Forbidden" }, { status: 403 }); }
  if (v.status !== "approved") {
    return NextResponse.json({ error: "Vendor not approved" }, { status: 403 });
  }
  const parsed = PostBody.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: parsed.error.message }, { status: 400 });

  const { fromDate, toDate, kinds, capacity } = parsed.data;
  const start = new Date(`${fromDate}T00:00:00.000Z`).getTime();
  const end = new Date(`${toDate}T00:00:00.000Z`).getTime();
  if (end < start) return NextResponse.json({ error: "toDate before fromDate" }, { status: 400 });
  if (end - start > 60 * 86400_000) {
    return NextResponse.json({ error: "Range > 60 days" }, { status: 400 });
  }

  const values: Array<typeof slots.$inferInsert> = [];
  for (let t = start; t <= end; t += 86400_000) {
    const day = new Date(t).toISOString().slice(0, 10);
    for (const kind of kinds) {
      const cfg = SLOT_TIMES[kind];
      const startAt = new Date(`${day}T${cfg.start}:00.000Z`);
      values.push({
        vendorId: v.id,
        date: day,
        kind,
        startTime: cfg.start,
        endTime: cfg.end,
        cutoffAt: new Date(startAt.getTime() - cfg.cutoffMinutes * 60_000),
        capacity,
        booked: 0,
        isOpen: true,
      });
    }
  }

  const inserted = await db
    .insert(slots)
    .values(values)
    .onConflictDoNothing({ target: [slots.vendorId, slots.date, slots.kind] })
    .returning({ id: slots.id });

  return NextResponse.json({ ok: true, created: inserted.length, attempted: values.length });
}
