import React from "react";
import { useGameContext } from "../providers/game-provider";
import { AnimatePresence, motion } from "framer-motion";

function ScoreUI() {
  const { score } = useGameContext();
  return (
    <p className="absolute top-2 md:top-4 right-6 md:right-24  md:text-lg text-white z-50 tabular-nums">
      score:
      <AnimatePresence initial={false}>
        <motion.span
          key={`score:${score}`}
          initial={{ opacity: 0.2, position: "absolute", right: 0 }}
          animate={{ opacity: 1, position: "static" }}
          exit={{
            scale: 6,
            opacity: 0,
            position: "absolute",
            right: 0,
            x: -12,
            y: 18,
            color: "rgb(101 163 13)",
          }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="font-semibold text-2xl md:text-4xl inline-block align-middle"
        >
          {score}
        </motion.span>
      </AnimatePresence>
    </p>
  );
}

export default ScoreUI;
