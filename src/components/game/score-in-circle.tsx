import React from "react";
import { useGameContext } from "../providers/game-provider";

function ScoreInCircle() {
  const { score } = useGameContext();
  return (
    <div className="mx-auto bg-stone-100 size-52 rounded-full flex items-center justify-center">
      <span className="text-[100px] leading-none font-canada font-semibold text-black">
        {score}
      </span>
    </div>
  );
}
export default ScoreInCircle;
