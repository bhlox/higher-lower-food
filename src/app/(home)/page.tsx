"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ScatteredBox from "@/components/ui/scattered-box";
import { useEffect } from "react";
import { useGameContext } from "@/components/providers/game-provider";

const foodBoxes = [
  {
    image: "/assets/greenwich.png",
    position: "top-6 left-[20%]",
    color: "bg-red-400",
    size: "size-24 md:size-32",
  },
  {
    image: "/assets/flag1.png",
    position: "top-1/2 right-[10%]",
    color: "bg-red-600",
  },
];

// KURK YOU ARE CURRENTLY HERE. 3 PRIO THINGS LEFT FOR NOW. once we fix the images on bucket, 1. finish the foodBoxes List on the home page. 2. finish styling on game over page.

export default function Home() {
  const { restartStates } = useGameContext();
  useEffect(() => {
    restartStates();
  }, []);
  return (
    <section className="flex h-[100dvh] flex-col items-center justify-center p-4 relative">
      <div className="space-y-6 flex flex-col justify-center items-center">
        <div className="text-center ">
          <h4 className="font-overpass font-medium capitalize ">
            <span>🍗</span>fastfood edition{" "}
            <span className="rotate-[65deg] inline-block">🍕</span>
          </h4>
          <h2 className="font-semibold text-5xl lg:text-6xl font-dynaPuff capitalize">
            higher lower <br />{" "}
            <span className="bg-clip-text text-image text-transparent tracking-widest text-7xl">
              PH
            </span>
          </h2>
        </div>
        <Button className="capitalize size-20 p-0 rounded-full bg-green-800 border-b-4 border-r-2 border-l-2 border-green-600 hover:border-0 transition-all duration-100  hover:bg-green-800 text-2xl font-dynaPuff">
          <Link href={"/game"}>play!</Link>
        </Button>
      </div>
      {foodBoxes.map((food, i) => (
        <ScatteredBox
          key={`ScatteredBox:${i}`}
          image={food.image}
          color={food.color}
          position={food.position}
          size={food.size}
        />
      ))}
    </section>
  );
}
