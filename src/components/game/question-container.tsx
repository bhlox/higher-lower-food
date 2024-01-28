import React, { useEffect } from "react";
import { useGameContext } from "../providers/game-provider";
import { useFetchMenuItems } from "@/lib/utils/utils";
import { isEvenNum, isIndexQualifiedToFetch } from "@/lib/utils/helper";
import { AnimatePresence } from "framer-motion";
import SlotMachine from "./slot-machine";
import Box from "./box";

function QuestionContainer() {
  const { indexes } = useGameContext();
  const [prevIndex, currentIndex] = indexes;
  const { data, error, fetchNextPage } = useFetchMenuItems({
    indexes,
  });

  if (error) {
    throw new Error("error fetching menuItems");
  }

  const menuItems = data?.pages.flat()!;

  const firstCardData = {
    ...menuItems[isEvenNum(prevIndex) ? prevIndex : currentIndex],
    new: false,
    revealedPrice: "",
  };
  const secondCardData = {
    ...menuItems[isEvenNum(currentIndex) ? prevIndex : currentIndex],
    new: false,
    revealedPrice: "",
  };
  const whoHoldsNewData =
    firstCardData.id === menuItems[currentIndex].id ? "first" : "second";

  if (whoHoldsNewData === "first") {
    firstCardData.new = true;
    firstCardData.revealedPrice = secondCardData.price!;
  } else {
    secondCardData.new = true;
    secondCardData.revealedPrice = firstCardData.price!;
  }
  const questionSet = [firstCardData, secondCardData];

  useEffect(() => {
    if (isIndexQualifiedToFetch(indexes[1])) {
      fetchNextPage();
    }
  }, [fetchNextPage, indexes]);

  return (
    <>
      <AnimatePresence initial={false}>
        {questionSet.map((data, i) => (
          <Box key={data.id} order={!i ? "first" : "second"} data={data} />
        ))}
      </AnimatePresence>
      <SlotMachine
        price={
          whoHoldsNewData === "first"
            ? firstCardData.price!
            : secondCardData.price!
        }
      />
    </>
  );
}

export default QuestionContainer;