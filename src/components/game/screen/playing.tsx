import { useGameContext } from "@/components/providers/game-provider";
import { isEvenNum } from "@/lib/utils/helper";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import Box from "../box";
import SlotsMachine from "../slot";
import ScoreUI from "../score";
import LineDivider from "@/components/line-divider";
import SlotMachine from "../slot-machine";

// #TODO npm use CLSX?
function Playing() {
  const { menuitemsData, indexes } = useGameContext();

  if (!menuitemsData.length) {
    return <motion.div className="">loading</motion.div>;
  }

  const [prevIndex, currentIndex] = indexes;

  // #TODO refactor below. it is also being used in the gameProvider
  const firstCardData =
    menuitemsData[isEvenNum(prevIndex) ? prevIndex : currentIndex];
  const secondCardData =
    menuitemsData[isEvenNum(currentIndex) ? prevIndex : currentIndex];

  const whoHoldsNewData =
    firstCardData === menuitemsData[currentIndex] ? "first" : "second";

  return (
    <>
      <AnimatePresence initial={false}>
        {indexes.map((indexNum, i) => (
          <Box
            key={
              menuitemsData[isEvenNum(indexNum) ? prevIndex : currentIndex].id
            }
            order={!i ? "first" : "second"}
            whoHoldsNewData={whoHoldsNewData}
            data={menuitemsData[isEvenNum(indexNum) ? prevIndex : currentIndex]}
          />
        ))}
      </AnimatePresence>

      <SlotMachine
        price={
          whoHoldsNewData === "first"
            ? firstCardData.price
            : secondCardData.price
        }

        // price="333"
      />
      <ScoreUI />
      <LineDivider />
    </>
  );
}

export default Playing;
