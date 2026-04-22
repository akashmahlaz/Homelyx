import { getSession } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  const s = await getSession();
  if (!s) return NextResponse.json({ user: null });
  const [u] = await db.select().from(users).where(eq(users.id, s.sub)).limit(1);
  if (!u) return NextResponse.json({ user: null });
  return NextResponse.json({
    user: {
      id: u.id,
      phone: u.phone,
      name: u.name,
      email: u.email,
      role: u.role,
      avatarUrl: u.avatarUrl,
    },
  });
}
