import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

neonConfig.fetchConnectionCache = true;

const url = process.env.DATABASE_URL;
if (!url) {
  // Throw lazily so build doesn't fail when env is missing in CI
  // The error will surface only when an actual query runs.
  console.warn("[db] DATABASE_URL is not set");
}

const sql = neon(url ?? "");
export const db = drizzle(sql, { schema });
export { schema };

