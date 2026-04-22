import { requireAdmin } from "@/lib/auth/admin";
import { db } from "@/lib/db";
import { vendors } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";

const Body = z.object({
  status: z.enum(["applied", "kyc_pending", "approved", "suspended", "rejected"]),
});

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try { await requireAdmin(); }
  catch (e) { return e instanceof Response ? e : NextResponse.json({ error: "Forbidden" }, { status: 403 }); }
  const { id } = await params;
  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: parsed.error.message }, { status: 400 });

  const update: Record<string, unknown> = { status: parsed.data.status, updatedAt: new Date() };
  if (parsed.data.status === "approved") {
    update.fssaiVerifiedAt = new Date();
  }

  const [updated] = await db
    .update(vendors)
    .set(update)
    .where(eq(vendors.id, id))
    .returning();
  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ vendor: updated });
}
