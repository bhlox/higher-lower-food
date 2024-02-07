"use client";
import React, { useEffect, useRef, useState } from "react";
import PlayButton from "./play-btn";
import { useGameContext } from "../providers/game-provider";
import { cn } from "@/lib/utils/utils";
import { useMediaQuery } from "@/hooks/use-media-query";

function HomeBoard() {
  const { restartStates } = useGameContext();
  const { width } = useMediaQuery();
  const [showRainbowBorder, setShowRainbowBorder] = useState(false);
  const triggerRainbowBorder = () => setShowRainbowBorder(true);
  const handleMouseLeave = () => setShowRainbowBorder(false);
  useEffect(() => {
    restartStates({ includeQuery: true });
  });
  return (
    <div
      onMouseLeave={handleMouseLeave}
      className={cn(
        "space-y-6 flex flex-col justify-center items-center relative rounded-xl md:p-8 p-4 lg:p-16 bg-slate-900 shadow-xl shadow-black transition-shadow duration-100 ease-in-out group",
        undefined,
        { "rainbow-border shadow-none": showRainbowBorder || width <= 768 }
      )}
    >
      <div className="text-center text-white ">
        <h4 className="font-overpass font-medium capitalize ">
          <span>🍗</span>fastfood edition{" "}
          <span className="rotate-[65deg] inline-block">🍕</span>
        </h4>
        <h2 className="font-semibold text-4xl sm:text-5xl lg:text-7xl font-dynaPuff capitalize ">
          higher lower <br />{" "}
          <span className="bg-clip-text text-flag-bgImage text-transparent tracking-widest text-4xl sm:text-5xl lg:text-7xl">
            Philippines
          </span>
        </h2>
      </div>
      <PlayButton handler={triggerRainbowBorder} />
    </div>
  );
}

export default HomeBoard;
