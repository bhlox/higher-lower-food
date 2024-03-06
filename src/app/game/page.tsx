"use server";
import GameScreen from "@/components/game/screen";
import { getRandomUndiplicatedMenuItems } from "@/lib/actions/menuitems";
import { createAnonUser } from "@/lib/actions/users";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
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
    initialPageParam: [],
    getNextPageParam: (lastPage: any, pages: any) => pages,
    queryKey: ["menuitems"],
    queryFn: getRandomUndiplicatedMenuItems,
    staleTime: Infinity,
  });

  await createAnonUser();
  return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <GameScreen />
      </HydrationBoundary>
  );
}

export default GamePage;
