"use server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { cookies } from "next/headers";

export async function createAnonUser() {
  const uuid = cookies().get("uuid")?.value!;
  await db.insert(users).values({ id: uuid }).onConflictDoNothing();
}

export async function updateScores(score: number) {
  const uuid = cookies().get("uuid")?.value!;
  const highscore = await db
    .update(users)
    .set({ scores: sql`ARRAY_APPEND(${users.scores}, ${score})` })
    .where(eq(users.id, uuid))
    .returning({ highScore: users.highestScore })
    .catch((err) => console.log(err));
  if (highscore) {
    return highscore[0];
  }
}
