import { cleanEnv, str } from "envalid";

const env = cleanEnv(process.env, {
  SUPABASE_POOLER_DB_URL: str(),
  SUPABASE_DB_PW: str(),
  REDIS_PW: str(),
  REDIS_HOST: str(),
  ENCRYPT_KEY: str({ default: "32" }),
  ENCRYPT_IV: str({ default: "16" }),
});

export default env;
