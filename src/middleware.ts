import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const uuidExists = req.cookies.has("uuid");

  const res = NextResponse.next();
  if (!uuidExists) {
    console.log("setting uuid cookie for user");
    res.cookies.set({
      name: "uuid",
      value: crypto.randomUUID(),
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
  }
  return res;
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
