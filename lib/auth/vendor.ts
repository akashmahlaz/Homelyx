import { db } from "@/lib/db";
import { vendors, type Vendor } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { requireSession, type SessionPayload } from "./session";

/**
 * Resolves the vendor record owned by the current session user.
 * Throws Response 401 if no session, 403 if no vendor row owned by user.
 */
export async function requireVendor(): Promise<{ session: SessionPayload; vendor: Vendor }> {
  const session = await requireSession();
  const [vendor] = await db
    .select()
    .from(vendors)
    .where(eq(vendors.ownerId, session.sub))
    .limit(1);
  if (!vendor) {
    throw new Response(JSON.stringify({ error: "Not a vendor" }), {
      status: 403,
      headers: { "content-type": "application/json" },
    });
  }
  return { session, vendor };
}
