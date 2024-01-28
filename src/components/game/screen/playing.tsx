import { useGameContext } from "@/components/providers/game-provider";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect } from "react";
import Box from "../box";
import ScoreUI from "../score";
import LineDivider from "@/components/line-divider";
import SlotMachine from "../slot-machine";
import { isEvenNum } from "@/lib/utils/helper";
import SkeletonCard from "@/components/ui/skeleton-card";

function Playing() {
  const { menuitemsData } = useGameContext();
  return (
    <>
      {!menuitemsData.length ? <SkeletonCard /> : <QuestionContainer />}
      <SlotMachine />
      <ScoreUI />
      <LineDivider />
    </>
  );
}

function QuestionContainer() {
  const { menuitemsData, indexes, setQuestionPrice, isFetching } =
    useGameContext();

  const [prevIndex, currentIndex] = indexes;

  const firstCardData =
    menuitemsData[isEvenNum(prevIndex) ? prevIndex : currentIndex];
  const secondCardData =
    menuitemsData[isEvenNum(currentIndex) ? prevIndex : currentIndex];

  const whoHoldsNewData =
    firstCardData === menuitemsData[currentIndex] ? "first" : "second";

  const questionSet = [firstCardData, secondCardData];

  useEffect(() => {
    if (whoHoldsNewData === "first") {
      setQuestionPrice(firstCardData.price!);
    } else {
      setQuestionPrice(secondCardData.price!);
    }
  }, [
    firstCardData.price,
    secondCardData.price,
    setQuestionPrice,
    whoHoldsNewData,
  ]);

  return (
    <>
      <AnimatePresence initial={false}>
        {questionSet.map((data, i) => (
          <Box
            key={data.id}
            order={!i ? "first" : "second"}
            whoHoldsNewData={whoHoldsNewData}
            data={data}
          />
        ))}
      </AnimatePresence>
    </>
  );
}

export default Playing;
