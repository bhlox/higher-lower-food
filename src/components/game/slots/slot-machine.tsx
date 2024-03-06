import { useMediaQuery } from "@/hooks/use-media-query";
import { usePrevious } from "@/hooks/use-previous";
import { splitNumbers } from "@/lib/utils/helper";
import React from "react";
import SlotLightIndicator from "./slot-light-indicator";
import Slot from "./slot";
import { useGameContext } from "../../providers/game-provider";

function SlotMachine({ price }: { price: number }) {
  const { width } = useMediaQuery();
  const { spinSlots } = useGameContext();
  const priceArray = splitNumbers(price);
  const originalPriceArrayLength = priceArray.length;
  while (priceArray.length < 4) {
    priceArray.unshift(69);
  }

  const previousAssigned = usePrevious(price) ?? 0;
  let previousPriceArray: number[] | undefined;
  if (previousAssigned) {
    previousPriceArray = splitNumbers(previousAssigned);
    while (previousPriceArray.length < 4) {
      previousPriceArray.unshift(69);
    }
  }

  return (
    <div className="absolute bg-gradient-to-t from-slate-800 via-slate-500 to-slate-800 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 rounded-xl outline outline-2 outline-slate-900">
      <div className="flex ">
        <SlotLightIndicator xBorder="right" />
        {priceArray.map((num, i) => (
          <Slot
            key={
              spinSlots
                ? `slot:${price}:${i}`
                : `slot:${(price ?? 0) + previousAssigned}:${i}`
            }
            assignedDigit={num === 69 ? null : num}
            textSize={width < 641 ? 24 : width < 1025 ? 30 : 60}
            index={i}
            isLastIndex={priceArray.length - 1 === i}
            isFirstIndex={
              num !== 69 && i === priceArray.length - originalPriceArrayLength
            }
            previousAssignedDigit={
              previousPriceArray && previousPriceArray[i] !== 69
                ? previousPriceArray[i]
                : null
            }
          />
        ))}
        <SlotLightIndicator xBorder="left" />
      </div>
    </div>
  );
}

export default SlotMachine;
