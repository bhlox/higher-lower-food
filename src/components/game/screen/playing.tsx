import React, { Suspense } from "react";
import ScoreUI from "../score";
import LineDivider from "@/components/line-divider";
import Loading from "@/app/game/loading";
import QuestionContainer from "../question-container";
import { useGameContext } from "@/components/providers/game-provider";
import { useFetchMenuItems } from "@/lib/utils/utils";
import Link from "next/link";
import { FaCaretLeft } from "react-icons/fa";


function Playing() {
  const { indexes } = useGameContext();
  const { data, error, fetchNextPage } = useFetchMenuItems({
    indexes,
  });
  if (error) {
    throw new Error(error.message);
  }
  return (
    <>
      <Suspense fallback={<Loading />}>
        {data ? (
          <>
            <QuestionContainer />
            <ScoreUI />
          </>
        ) : (
          <Loading />
        )}
      </Suspense>
      <Link
        href={"/"}
        className="absolute top-4 left-4 z-40 bg-none text-white flex justify-center items-center hover:scale-105 transition-transform ease-in-out duration-100"
      >
        <FaCaretLeft className="inline" /> Back
      </Link>
      <LineDivider />
    </>
  );
}

export default Playing;
