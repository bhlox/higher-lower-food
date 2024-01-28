import { useGameContext } from "@/components/providers/game-provider";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

function GameOver() {
  const { restartGame, score } = useGameContext();

  return (
    <div className="h-[100dvh] w-screen flex flex-col justify-center items-center space-y-6">
      <ScoreCard key={"sdfsdfsdf"} score={score} />
      <h2 className=" text-2xl md:text-6xl font-bold font-dynaPuff text-white">
        Game over. Try again
      </h2>
      <div className="flex gap-4">
        <Button
          onClick={restartGame}
          className="capitalize size-28 p-0 rounded-full bg-green-800 border-b-4 border-r-2 border-l-2 border-green-600 hover:border-0 transition-all duration-100  hover:bg-green-800 text-2xl font-dynaPuff"
        >
          Try <br /> again
        </Button>
        <Link href="/">
          <Button className="capitalize size-28 p-0 rounded-full bg-green-800 border-b-4 border-r-2 border-l-2 border-green-600 hover:border-0 transition-all duration-100  hover:bg-green-800 text-2xl font-dynaPuff">
            Home
          </Button>
        </Link>
      </div>
    </div>
  );
}

// #TODO animation card idea. it infinitely flips going up fast, then slides down or enters from left or right screen going to center with score reveal.

function ScoreCard({ score }: { score: number }) {
  return (
    <>
      <motion.div
        initial={{ y: "-135%" }}
        animate={{
          y: 0,
          transition: {
            duration: 0.2,
            ease: "easeInOut",
            type: "spring",
            mass: 0.5,
            bounce: 1,
            damping: 4,
          },
        }}
        // transition={{ type: "spring", mass: 1.35, bounce: 2, }}
        className="relative w-48 h-96"
      >
        {/* <motion.div
          initial={{
            transform: `rotateY(${flip ? 0 : 180}deg)`,
            background: "blue",
            // perspective: "600px",
          }}
          animate={{
            transform: `rotateY(${flip ? 0 : 180}deg)`,
            background: "blue",
            // backfaceVisibility: "hidden",
            transition: { duration: 0.4 },
            transformStyle: "preserve-3d",
            perspective: "600px",
            animationIterationCount: "infinite",
          }}
          className={`absolute h-full w-full rounded-xl flex justify-center items-center text-white`}
        >
          {score}
        </motion.div> */}
        <motion.div
          initial={{
            // transform: `rotateY(${flip ? 0 : 180}deg)`,
            transform: `rotateY(${180}deg)`,
            // backfaceVisibility: "hidden",
            background: "blue",
            perspective: "600px",
          }}
          animate={{
            // transform: `rotateY(${flip ? 0 : 180}deg)`,
            transform: `rotateY(${0}deg)`,
            background: "blue",
            backfaceVisibility: "hidden",
            transition: { duration: 1.2, ease: "easeInOut", delay: 0.9 },
            transformStyle: "preserve-3d",
            perspective: "600px",
          }}
          className={`absolute h-full w-full rounded-xl flex justify-center items-center text-white text-7xl`}
        >
          {score}
        </motion.div>
        {/* back */}
        <motion.div
          initial={{
            backfaceVisibility: "hidden",
            // transform: `rotateY(${flip ? -180 : 0}deg)`,
            transform: `rotateY(${0}deg)`,
            background: "gray",
            perspective: "600px",
          }}
          animate={{
            // transform: `rotateY(${flip ? -180 : 0}deg)`,
            transform: `rotateY(${-180}deg)`,
            background: "gray",
            perspective: "600px",
            transition: { duration: 1.2, ease: "easeInOut", delay: 0.9 },
            backfaceVisibility: "hidden",
            transformStyle: "preserve-3d",
          }}
          className={`absolute h-full w-full rounded-xl  transition-all duration-500 flex justify-center items-center text-white`}
        >
          <p>back</p>
        </motion.div>
      </motion.div>
    </>
  );
}

export default GameOver;
