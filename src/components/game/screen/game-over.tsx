import { useGameContext } from "@/components/providers/game-provider";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import ScoreCard from "../score-card";

function GameOver() {
  const { restartGame } = useGameContext();
  return (
    <div className="w-screen h-[100dvh] flex flex-col justify-center items-center space-y-6 relative">
      <ScoreCard />
      <h2 className="text-2xl md:text-6xl font-bold font-dynaPuff text-white z-10">
        Game over. Try again
      </h2>
      <div className="flex gap-4 z-10">
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

export default GameOver;
