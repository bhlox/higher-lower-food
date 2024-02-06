"use server";
import GameScreen from "@/components/game/screen";
import { getRandomUndiplicatedMenuItems } from "@/lib/actions/menuitems";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import React from "react";

async function GamePage() {
  // const headersList = headers();
  // const url = headersList.has("next-url");
  // headersList.forEach((value, key, parent) => {
  //   console.log({ [key]: value });
  // });
  // if (!url) {
  //   redirect("/");
  // }

  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    initialPageParam: 0,
    getNextPageParam: (lastPage: any, pages: any) => pages,
    queryKey: ["menuitems"],
    queryFn: getRandomUndiplicatedMenuItems,
    staleTime: Infinity,
  });

  return (
    <>
      {/* <Link href="/" className="z-30 absolute top-4 left-6">
        <Button className="bg-gray-400 hover:bg-gray-400">Back</Button>
      </Link> */}
      <HydrationBoundary state={dehydrate(queryClient)}>
        <GameScreen />
      </HydrationBoundary>
    </>
  );
}

export default GamePage;
