import GameScreen from "@/components/game/screen";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import React from "react";

async function GamePage() {
  // const headersList = headers();
  // const url = headersList.has("next-url");
  // headersList.forEach((value, key, parent) => {
  // console.log({ [key]: value });
  // });
  // if (!url) {
  //   redirect("/");
  // }

  return (
    <>
      <Link href="/" className="absolute top-4 left-16">
        back
      </Link>
      <GameScreen />
    </>
  );
}

export default GamePage;
