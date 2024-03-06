"use client";
import { isNull, shuffleArray } from "@/lib/utils/helper";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useGameContext } from "../../providers/game-provider";
import { useMediaQuery } from "@/hooks/use-media-query";
import { P, match } from "ts-pattern";
import { ZERO_TO_NINE_DIGITS, SLOT_Y_PADDING } from "@/lib/constants";
import { SlotProps } from "@/lib/types";

function Slot({
  assignedDigit,
  textSize,
  index,
  isLastIndex,
  isFirstIndex,
  previousAssignedDigit,
}: SlotProps) {
  const { width } = useMediaQuery();
  const { spinSlots, handleRoundResults, isCorrect } = useGameContext();
  const boxRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const [textHeight, setTextHeight] = useState<number>(
    textSize + SLOT_Y_PADDING * 2
  );
  const [boxHeight, setBoxHeight] = useState<number>(
    textSize + SLOT_Y_PADDING * 2
  );

  const shuffledNums = useMemo(() => {
    return spinSlots ? shuffleArray(ZERO_TO_NINE_DIGITS) : null;
  }, [spinSlots]);

  const pool = useMemo(() => {
    return match([spinSlots, assignedDigit])
      .with([true, P.number], () => [
        assignedDigit,
        ...shuffledNums!,
        ...shuffledNums!,
        "?",
      ])
      .with([true, null], () => ["?"])
      .with([false, P.union(P.number, P.nullish)], () =>
        ["?", previousAssignedDigit].filter((n) => !isNull(n))
      )
      .exhaustive();
  }, [assignedDigit, previousAssignedDigit, shuffledNums, spinSlots]);

  useEffect(() => {
    if (textRef.current) {
      setTextHeight(textRef.current.clientHeight);
    }
    if (boxRef.current) {
      setBoxHeight(boxRef.current.clientHeight);
    }
  }, [width]);

  useEffect(() => {
    if (boxRef.current) {
      setBoxHeight(boxRef.current.clientHeight);
    }
  }, [spinSlots]);

  useEffect(() => {
    const box = boxRef.current;

    const handleTransitionStart = () => {
      if (spinSlots) {
        Array.from(box!.children).forEach((child) =>
          child.classList.add("blur-sm")
        );
      }
    };

    const handleTransitionEnd = () => {
      if (spinSlots) {
        Array.from(box!.children).forEach((child) =>
          child.classList.remove("blur-sm")
        );
      }
      if (isLastIndex && spinSlots && !isCorrect) {
        setTimeout(() => {
          handleRoundResults();
        }, 1000);
      }
    };

    if (box) {
      box.addEventListener("transitionstart", handleTransitionStart, {
        once: true,
      });
      box.addEventListener("transitionend", handleTransitionEnd, {
        once: true,
      });
    }

    return () => {
      box?.removeEventListener("transitionstart", handleTransitionStart);
      box?.removeEventListener("transitionend", handleTransitionEnd);
    };
  }, [boxRef, handleRoundResults, isLastIndex, spinSlots, isCorrect]);

  return (
    <div
      style={{ height: `${textHeight}px` }}
      className="flex justify-center items-end tabular-nums border-x-2 border-black overflow-hidden"
    >
      <div
        ref={boxRef}
        style={{
          transitionDelay: `${index * 200}ms`,
          transform: `translateY(${boxHeight - textHeight}px)`,
          transitionDuration: spinSlots ? "2000ms" : "500ms",
        }}
        className={`px-4 transition-all ease-in-out flex flex-col items-center justify-center gap-y-4 tabular-nums`}
      >
        {pool?.map((item, i) => (
          <p
            ref={!i ? textRef : undefined}
            key={Math.random()}
            style={{
              fontSize: `${textSize}px`,
              lineHeight: 1,
              paddingTop: SLOT_Y_PADDING,
              paddingBottom: SLOT_Y_PADDING,
            }}
            className={`transition-all duration-1000 ease-in-out`}
          >
            {item}
          </p>
        ))}
      </div>
    </div>
  );
}

export default Slot;
