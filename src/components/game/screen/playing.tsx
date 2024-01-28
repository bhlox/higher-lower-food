import React, { Suspense } from "react";
import ScoreUI from "../score";
import LineDivider from "@/components/line-divider";
import Loading from "@/app/game/loading";
import QuestionContainer from "../question-container";

function Playing() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <QuestionContainer />
      </Suspense>
      <ScoreUI />
      <LineDivider />
    </>
  );
}

export default Playing;
