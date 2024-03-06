import React, { Suspense } from "react";
import ScoreUI from "../score";
import LineDivider from "@/components/line-divider";
import Loading from "@/app/game/loading";
import QuestionContainer from "../question-container";
import { useGameContext } from "@/components/providers/game-provider";
import { useFetchMenuItems } from "@/lib/utils/utils";

// #TODO create back button to home
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
      <LineDivider />
    </>
  );
}

export default Playing;
