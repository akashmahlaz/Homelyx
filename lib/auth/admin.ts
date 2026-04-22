import { requireSession, type SessionPayload } from "./session";

export async function requireAdmin(): Promise<SessionPayload> {
  const s = await requireSession();
  if (s.role !== "admin") {
    throw new Response(JSON.stringify({ error: "Admin only" }), {
      status: 403,
      headers: { "content-type": "application/json" },
    });
  }
  return s;
}
