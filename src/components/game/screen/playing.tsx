import React, { Suspense } from "react";
import ScoreUI from "../score";
import LineDivider from "@/components/line-divider";
import Loading from "@/app/game/loading";
import QuestionContainer from "../question-container";

// #TODO create back button to home
function Playing() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <QuestionContainer />
        <ScoreUI />
      </Suspense>
      <LineDivider />
    </>
  );
}

export default Playing;
