import React, { ElementRef, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useGameContext } from "../providers/game-provider";
import { convertToRoman } from "@/lib/utils/helper";
import ArcWord from "../arc-word";
import ScoreInCircle from "./score-in-circle";
import { useMediaQuery } from "@/hooks/use-media-query";
import StarGlitter from "../star-glitter-fx";
import { P, match } from "ts-pattern";
import { CardSides } from "@/lib/types";
import { getScoreVisualAttributes } from "@/lib/utils/utils";

// #TODO particle animation instead of starGlitter. starGlitter only if new highscore. partical animation refs: https://freefrontend.com/css-particle-backgrounds/ . ALSO FOUND IN OUR CODEPEN LIKES

function ScoreCard() {
  const { width } = useMediaQuery();
  const { score } = useGameContext();
  const [showSide, setShowSide] = useState<CardSides>(null);
  const [hovering, setHovering] = useState(false);

  const scoreVA = getScoreVisualAttributes(score);
  return (
    <>
      <motion.div
        whileHover={{
          scale: 1.05,
          transition: { duration: 0.7, ease: "anticipate" },
        }}
        initial={{
          y: "-135%",
        }}
        animate={{
          y: 0,
          transition: {
            ease: "easeInOut",
            type: "spring",
            mass: 0.3,
            damping: 4,
          },
        }}
        onAnimationComplete={(definition: Record<string, unknown>) => {
          if (!definition.scale) {
            setShowSide("front");
          }
        }}
        onClick={() =>
          setShowSide((c) => {
            if (c === "front") {
              return "back";
            } else return "front";
          })
        }
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        className="h-[448.8px] w-[298.8px] grid place-items-center cursor-pointer group relative"
      >
        <CardFront showSide={showSide} boxShadow={scoreVA.boxShadow} />
        <CardBack showSide={showSide} boxShadow={scoreVA.boxShadow} />
        {(hovering || width <= 768) &&
          Boolean(score) &&
          [...Array(scoreVA.starCount)].map((_, i) => (
            <StarGlitter
              key={`star:${i}`}
              index={i}
              interval={scoreVA.starInterval}
            />
          ))}
      </motion.div>
    </>
  );
}

function CardFront({
  showSide,
  boxShadow,
}: {
  showSide: CardSides;
  boxShadow: string;
}) {
  const cardFrontRef = useRef<HTMLDivElement>(null);
  const rotation = match(showSide)
    .with("front", () => 0)
    .with("back", () => 180)
    .with(P.nullish, () => 180)
    .exhaustive();

  // const testRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   const handleMouseMove = (e: MouseEvent) => {
  //     const mouseX =
  //       ((e.clientX - window.innerWidth / 2) / window.innerWidth) * 4;
  //     const mouseY =
  //       ((e.clientY - window.innerHeight / 2) / window.innerHeight) * 4;

  //     // console.log(mouseX, mouseY);
  //     testRef.current!.style.transform = `translate3d(${mouseX}vw,${mouseY}vw,0px) scale3d(1,1,1)`;
  //     testRef.current!.style.transition = "";
  //   };
  //   const handleMouseLeave = (e: MouseEvent) => {
  //     testRef.current!.style.transform =
  //       "translate3d(0vw,0vw,0px) scale3d(1,1,1)";
  //     testRef.current!.style.transition = "all 0.3s ease-in-out";
  //   };
  //   if (cardFrontRef.current) {
  //     cardFrontRef.current.addEventListener("mousemove", handleMouseMove);
  //     cardFrontRef.current.addEventListener("mouseleave", handleMouseLeave);
  //   }
  //   return () => {
  //     cardFrontRef.current?.removeEventListener("mousemove", handleMouseMove);
  //   };
  // }, []);
  return (
    <motion.div
      id="score-front"
      ref={cardFrontRef}
      animate={{
        transform: `rotateY(${rotation}deg)`,
        backfaceVisibility: "hidden",
        transition: { duration: 1.2, ease: "easeInOut" },
        transformStyle: "preserve-3d",
        perspective: "600px",
      }}
      onAnimationStart={() => {
        if (showSide === "back") {
          cardFrontRef.current!.style.boxShadow = "0px 0px 0px 0px";
        }
      }}
      onAnimationComplete={() => {
        if (showSide === "front") {
          cardFrontRef.current!.style.boxShadow = boxShadow;
        }
      }}
      className="bg-black h-full w-full grid place-items-center transition-shadow duration-700 ease-in-out rounded-xl z-10"
    >
      <div className="fancy-border border-[24px] flex items-center justify-center h-[92.5%] w-[92.5%]">
        {/* <div
            ref={testRef}
            className="absolute bottom-6 left-6 hover:text-xl hover:[transition-property: font-size] hover:duration-300"
          >
            mouse magnet test
          </div> */}
        <ArcWord word="score" />
        <ScoreInCircle />
      </div>
    </motion.div>
  );
}

function CardBack({
  showSide,
  boxShadow,
}: {
  showSide: CardSides;
  boxShadow: string;
}) {
  const { score } = useGameContext();
  const romanNumerals = score ? convertToRoman(score) : "skill issue";
  const cardBackRef = useRef<ElementRef<"div">>(null);
  const rotation = match(showSide)
    .with("back", () => 0)
    .with("front", () => -180)
    .with(P.nullish, () => 0)
    .exhaustive();

  return (
    <motion.div
      id="score-back"
      ref={cardBackRef}
      animate={{
        transform: `rotateY(${rotation}deg)`,
        perspective: "600px",
        transition: { duration: 1.2, ease: "easeInOut" },
        backfaceVisibility: "hidden",
        transformStyle: "preserve-3d",
      }}
      onAnimationStart={() => {
        if (showSide === "front") {
          cardBackRef.current!.style.boxShadow = "0px 0px 0px 0px";
        }
      }}
      onAnimationComplete={() => {
        if (showSide === "back") {
          cardBackRef.current!.style.boxShadow = boxShadow;
        }
      }}
      className="absolute h-full w-full bg-black grid place-items-center transition-shadow duration-700 ease-in-out rounded-xl z-10 "
    >
      <div className="fancy-border border-[24px] flex items-center justify-center h-[92.5%] w-[92.5%]">
        <span className="text-white absolute top-8 left-1/2 -translate-x-1/2 text-6xl font-gideon uppercase">
          {romanNumerals}
        </span>
      </div>
    </motion.div>
  );
}

export default ScoreCard;
