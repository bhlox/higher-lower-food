import { ANSWER_CHOICES } from "@/lib/constants";
import { type AnswerChoice } from "@/lib/types";
import React from "react";
import { useGameContext } from "../providers/game-provider";
import { motion } from "framer-motion";

// #TODO staggerChildren on animate for title price and other data

function Details({
  title,
  holdsNewData,
  price,
  questionId,
}: {
  title: string;
  price: string;
  questionId: number;
  holdsNewData: boolean;
}) {
  const { setSelectedAnswer, setSpinSlots, selectedAnswer } = useGameContext();

  const handleChooseAnswer = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    // document.body.requestFullscreen();
    setSpinSlots(true);
    setSelectedAnswer({
      answer: e.currentTarget.textContent as AnswerChoice,
      questionId,
    });
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
        {price}
      </motion.div>
      {!holdsNewData ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xl text-green-400 tabular-nums "
        >
          <span className="text-3xl align-bottom ">₱</span>
          <span className="animate-counter">{Number(price)}</span>
          .00
        </motion.p>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`space-x-4`}
        >
          {ANSWER_CHOICES.map((choice) => (
            <button
              disabled={Boolean(selectedAnswer)}
              key={Math.random()}
              onClick={handleChooseAnswer}
              className={`rounded-full px-4 py-2 border-white border-2 capitalize md:text-lg ${
                selectedAnswer === choice ? "bg-green-700" : ""
              } ${selectedAnswer ? "cursor-not-allowed" : ""}`}
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
