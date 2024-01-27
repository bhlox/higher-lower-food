import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
import env from "@/lib/config/env";

export const client = postgres(env.SUPABASE_POOLER_DB_URL, { prepare: false });
export const db = drizzle(client, { schema });
