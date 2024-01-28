import GameScreen from "@/components/game/screen";
import { getMenuItems } from "@/lib/actions/menuActions";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import React from "react";

// KURK YOU ARE CURRENTLY HERE. WE WILL BE FETCHING DATA HERE IN SERVER COMPONENT. PASS TO CLIENT COMPONENT GAMESCREEN THEN PASS IT AS PARAMETER TO SETMENUITEMSDATA. DO NOT TRIGGER AT FIRST USE QUERY AT FIRST INDEX. NOT SURE ON THIS BECAUSE LOADERS MIGHT NOT BE NEEDED???

async function GamePage() {
  // const headersList = headers();
  // const url = headersList.has("next-url");
  // headersList.forEach((value, key, parent) => {
  // console.log({ [key]: value });
  // });
  // if (!url) {
  //   redirect("/");
  // }

  // const queryClient = new QueryClient();

  // await queryClient.prefetchQuery({
  //   queryKey: ["menuitems", [0, 1]],
  //   queryFn: getMenuItems,
  // });

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
