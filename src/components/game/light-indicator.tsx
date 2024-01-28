import React from "react";
import { useGameContext } from "../providers/game-provider";
import { match } from "ts-pattern";
import { cn } from "@/lib/utils/utils";

function LightIndicator({ xBorder }: { xBorder: "left" | "right" }) {
  const { spinSlots, isCorrect } = useGameContext();

  const lightColor = match([spinSlots, isCorrect])
    .with(
      [false, null],
      () => "bg-yellow-900 shadow-inner shadow-black animate-pulse"
    )
    .with(
      [true, null],
      () => "bg-yellow-300 shadow-inner shadow-yellow-800 animate-custom-pulse"
    )
    .with([true, true], () => "bg-green-400 shadow-inner shadow-green-900")
    .with([true, false], () => "bg-red-400 shadow-inner shadow-black")
    .otherwise(() => "bg-purple-600");

  return (
    <div
      className={cn(
        "flex relative justify-center items-center px-2 md:px-4 border-black",
        undefined,
        { "border-l-2": xBorder === "left", "border-r-2": xBorder === "right" }
      )}
    >
      <div className={cn("size-4 md:size-7 rounded-full", lightColor)} />
    </div>
  );
}

export default LightIndicator;
