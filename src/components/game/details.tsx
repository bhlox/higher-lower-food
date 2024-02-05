import { ANSWER_CHOICES } from "@/lib/constants";
import { type AnswerChoice } from "@/lib/types";
import React from "react";
import { useGameContext } from "../providers/game-provider";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils/utils";

// #TODO staggerChildren on animate for title price and other data

function Details({
  title,
  holdsNewData,
  price,
  questionId,
  revealedPrice,
}: {
  title: string;
  price: number;
  questionId: number;
  holdsNewData: boolean;
  revealedPrice: number;
}) {
  const {
    setSelectedAnswer,
    setSpinSlots,
    selectedAnswer,
    setQuestionPrice,
    setRevealedPrice,
  } = useGameContext();

  const handleChooseAnswer = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    // document.body.requestFullscreen();
    setSpinSlots(true);
    setSelectedAnswer({
      answer: e.currentTarget.textContent as AnswerChoice,
      questionId,
    });
    setQuestionPrice(price);
    if (revealedPrice) {
      setRevealedPrice(revealedPrice);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { duration: 2.5, ease: "easeInOut" },
      }}
      exit={{ opacity: 0, transition: { duration: 0.2, ease: "easeInOut" } }}
      className="text-center"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="px-4 w-[90%] md:w-[75%] mx-auto"
      >
        <h4 className="md:text-xl font-semibold capitalize">{title}</h4>
      </motion.div>
      {!holdsNewData ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xl text-green-400 tabular-nums "
        >
          <span className="text-3xl align-bottom">₱</span>
          <span>{price}</span>
          .00
        </motion.p>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`space-x-4 mt-2`}
        >
          {ANSWER_CHOICES.map((choice) => (
            <button
              disabled={Boolean(selectedAnswer)}
              key={Math.random()}
              onClick={handleChooseAnswer}
              className={cn(
                "rounded-xl px-4 py-2 border-white border-2 capitalize md:text-lg",
                undefined,
                {
                  "bg-white text-black": selectedAnswer === choice,
                  "cursor-not-allowed": selectedAnswer,
                }
              )}
            >
              {choice}
            </button>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}

export default Details;
