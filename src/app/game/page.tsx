"use server";
import GameScreen from "@/components/game/screen";
import { getRandomUndiplicatedMenuItems } from "@/lib/actions/menuitems";
import { createAnonUser } from "@/lib/actions/users";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { cookies, headers } from "next/headers";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import React from "react";

// #BUG when accessing this page directly, error is occuring. assuming that prefetch is not working

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
    initialPageParam: [],
    getNextPageParam: (lastPage: any, pages: any) => pages,
    queryKey: ["menuitems"],
    queryFn: getRandomUndiplicatedMenuItems,
    staleTime: Infinity,
  });

  await createAnonUser();
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
