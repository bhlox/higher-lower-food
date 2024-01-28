"use client";
import React from "react";
import { useGameContext } from "../../providers/game-provider";
import Playing from "./playing";
import GameOver from "./game-over";

function GameScreen() {
  const { isGameOver } = useGameContext();
  return (
    <section className="relative flex flex-col lg:flex-row bg-slate-800">
      {!isGameOver ? <Playing /> : <GameOver />}
    </section>
  );
}

export default GameScreen;
