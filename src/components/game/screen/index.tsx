"use client";
import React, { useEffect, useState } from "react";
import { useGameContext } from "../../providers/game-provider";
import Playing from "./playing";
import GameOver from "./game-over";

// #TODO PRIO add LOADING BAR that stimulates percentage done then render playing or gamescreen. guide ref: https://dev.to/jrdev_/how-to-display-the-progress-of-promises-in-javascript-lh0 https://github.com/sindresorhus/p-progress



function GameScreen() {
  const { isGameOver } = useGameContext();
  return (
    <section className="relative flex flex-col lg:flex-row bg-slate-800">
      {!isGameOver ? <Playing /> : <GameOver />}      
    </section>
  );
}

export default GameScreen;
