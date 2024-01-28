"use client";
import React, { useEffect, useState } from "react";
import { useGameContext } from "../../providers/game-provider";
import Playing from "./playing";
import GameOver from "./game-over";

function GameScreen() {
  const { isGameOver, restartGame } = useGameContext();

  useEffect(() => {
    restartGame();
  }, []);
  return (
    <section className="relative flex flex-col lg:flex-row bg-slate-800">
      {!isGameOver ? <Playing /> : <GameOver />}
    </section>
  );
}

export default GameScreen;
