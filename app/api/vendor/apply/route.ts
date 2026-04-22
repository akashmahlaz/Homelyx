import { normalizeIndianPhone } from "@/lib/auth/twilio";
import { db } from "@/lib/db";
import { users, vendors } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";

const Body = z.object({
  phone: z.string(),
  ownerName: z.string().min(2).max(120),
  email: z.string().email().optional(),
  kitchenName: z.string().min(2).max(160),
  city: z.string().min(2).max(80),
  pincode: z.string().regex(/^\d{6}$/),
  cuisines: z.array(z.string()).default([]),
  isVeg: z.boolean().default(false),
  fssaiLicense: z.string().max(40).optional(),
  bio: z.string().max(2000).optional(),
});

function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

export async function POST(req: Request) {
  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.message }, { status: 400 });
  }
  const data = parsed.data;
  const phone = normalizeIndianPhone(data.phone);
  if (!phone) return NextResponse.json({ error: "Invalid phone" }, { status: 400 });

  // Upsert user (vendor role)
  const [existing] = await db.select().from(users).where(eq(users.phone, phone)).limit(1);
  let owner = existing;
  if (!owner) {
    const [created] = await db
      .insert(users)
      .values({ phone, name: data.ownerName, email: data.email, role: "vendor" })
      .returning();
    owner = created;
  } else if (owner.role === "customer") {
    await db.update(users).set({ role: "vendor", name: owner.name ?? data.ownerName }).where(eq(users.id, owner.id));
  }

  // Generate unique handle
  let baseHandle = slugify(data.kitchenName);
  if (!baseHandle) baseHandle = "kitchen";
  let handle = baseHandle;
  for (let i = 2; i < 50; i++) {
    const [exists] = await db.select({ id: vendors.id }).from(vendors).where(eq(vendors.handle, handle)).limit(1);
    if (!exists) break;
    handle = `${baseHandle}-${i}`;
  }

  const [vendor] = await db
    .insert(vendors)
    .values({
      ownerId: owner.id,
      handle,
      name: data.kitchenName,
      bio: data.bio,
      cuisines: data.cuisines,
      isVeg: data.isVeg,
      fssaiLicense: data.fssaiLicense,
      city: data.city,
      pincode: data.pincode,
      status: "applied",
    })
    .returning();

  return NextResponse.json({ ok: true, vendor: { id: vendor.id, handle: vendor.handle, status: vendor.status } }, { status: 201 });
}
