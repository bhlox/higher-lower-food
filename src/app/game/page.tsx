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

async function GamePage() {
  // const headersList = headers();
  // const url = headersList.has("next-url");
  // headersList.forEach((value, key, parent) => {
  // console.log({ [key]: value });
  // });
  // if (!url) {
  //   redirect("/");
  // }

  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    initialPageParam: 0,
    getNextPageParam: (lastPage: any, pages: any) => pages,
    queryKey: ["menuitems"],
    queryFn: () => getMenuItems(),
    staleTime: Infinity,
  });

  return (
    <>
      <Link href="/" className="absolute top-4 left-16">
        back
      </Link>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <GameScreen />
      </HydrationBoundary>
    </>
  );
}

export default GamePage;
