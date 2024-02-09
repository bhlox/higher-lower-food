import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";

export async function GET(req: Request) {
  const uuid = cookies().get("uuid")?.value;
  if (!uuid) {
    return new Response(JSON.stringify({ error: "no uuid found" }), {
      status: 404,
    });
  }
  const data = await db.query.users.findFirst({
    where: eq(users.id, uuid),
    columns: { highestScore: true },
  });
  return Response.json({ highScore: data?.highestScore });
}
