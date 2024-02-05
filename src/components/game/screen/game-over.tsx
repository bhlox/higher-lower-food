import { useGameContext } from "@/components/providers/game-provider";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { convertToRoman, generateRandomNumber } from "@/lib/utils/helper";
import { useMediaQuery } from "@/hooks/useMediaQuery";

function GameOver() {
  const { restartGame } = useGameContext();

  return (
    <div className="w-screen h-[100dvh] flex flex-col justify-center items-center space-y-6 relative">
      <ScoreCard />
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

function ScoreCard() {
  const { width } = useMediaQuery();
  const [showSide, setShowSide] = useState<"front" | "back" | null>(null);
  const [hovering, setHovering] = useState(false);
  return (
    <>
      <motion.div
        whileHover={{
          scale: 1.05,
          transition: { duration: 0.7, ease: "anticipate" },
        }}
        initial={{
          y: "-135%",
          position: "relative",
        }}
        animate={{
          y: 0,
          position: "relative",
          transition: {
            duration: 0.2,
            ease: "easeInOut",
            type: "spring",
            mass: 0.5,
            bounce: 1,
            damping: 4,
          },
        }}
        onAnimationComplete={(definition: any) => {
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
        className="h-[448.8px] w-[298.8px] grid place-items-center cursor-pointer group"
      >
        <CardFront showSide={showSide} />
        <CardBack showSide={showSide} />
        {(hovering || width < 769) &&
          [...Array(3)].map((_, i) => (
            <StarGlitter key={`star:${i}`} index={i} />
          ))}
      </motion.div>
    </>
  );
}

function CardFront({ showSide }: { showSide: "front" | "back" | null }) {
  const cardFrontRef = useRef<HTMLDivElement>(null);
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
        transform: `rotateY(${
          showSide === "front" ? 0 : showSide === "back" ? 180 : 180
        }deg)`,
        backfaceVisibility: "hidden",
        transition: { duration: 1.2, ease: "easeInOut" },
        transformStyle: "preserve-3d",
        perspective: "600px",
      }}
      onAnimationStart={() => {
        if (showSide === "back") {
          cardFrontRef.current!.style.boxShadow = `0px 0px 0px 0px`;
        }
      }}
      onAnimationComplete={() => {
        if (showSide === "front") {
          cardFrontRef.current!.style.boxShadow = `0px 0px 40px 1px blue`;
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
        <ArcWord />
        <ScoreInCircle />
      </div>
    </motion.div>
  );
}

function CardBack({ showSide }: { showSide: "front" | "back" | null }) {
  const { score } = useGameContext();
  const romanNumerals = score ? convertToRoman(score) : "skill issue";
  const cardBackRef = useRef<HTMLDivElement>(null);
  return (
    <motion.div
      id="score-back"
      ref={cardBackRef}
      animate={{
        transform: `rotateY(${
          showSide === "back" ? 0 : showSide === "front" ? -180 : 0
        }deg)`,
        // transform: `rotateY(${-180}deg)`,
        perspective: "600px",
        transition: { duration: 1.2, ease: "easeInOut" },
        backfaceVisibility: "hidden",
        transformStyle: "preserve-3d",
      }}
      onAnimationStart={() => {
        if (showSide === "front") {
          cardBackRef.current!.style.boxShadow = `0px 0px 0px 0px`;
        }
      }}
      onAnimationComplete={() => {
        if (showSide === "back") {
          cardBackRef.current!.style.boxShadow = `0px 0px 40px 1px blue`;
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

function ArcWord() {
  return (
    <div className="absolute top-[4.5rem] z-50">
      <svg
        viewBox="0 0 30 6"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          id="text"
          strokeWidth=".1"
          d="M 0 5 Q 15 -5 30 5"
          pathLength="2"
          fill="transparent"
        />
        <text
          fontSize="4.5"
          className="font-canada"
          dominantBaseline="hanging"
          textAnchor="middle"
          letterSpacing={1.3}
        >
          <textPath href="#text" startOffset="51%" fill="white">
            Score
          </textPath>
        </text>
      </svg>
    </div>
  );
}

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

function StarGlitter({ index }: { index: number }) {
  const starsRef = useRef<HTMLSpanElement>(null);
  const intervalId = useRef<NodeJS.Timeout>();

  const animate = useCallback((star: HTMLSpanElement) => {
    star.style.setProperty("--star-left", `${generateRandomNumber(10, 90)}%`);
    star.style.setProperty("--star-top", `${generateRandomNumber(5, 90)}%`);

    star.style.animation = "none";
    star.offsetHeight;
    star.style.animation = "";
  }, []);

  useEffect(() => {
    let interval = 1000;
    const star = starsRef.current;
    if (star) {
      setTimeout(() => {
        animate(star);

        intervalId.current = setInterval(() => animate(star), interval);
      }, index++ * (interval / 3));

      return () => {
        clearInterval(intervalId.current);
      };
    }
  }, [animate, index]);
  return (
    <span className="z-50 magic-star" ref={starsRef}>
      <svg viewBox="0 0 512 512">
        <path
          d="M512 255.1c0 11.34-7.406 20.86-18.44 23.64l-171.3 42.78l-42.78 171.1C276.7 504.6 267.2 512 255.9 512s-20.84-7.406-23.62-18.44l-42.66-171.2L18.47 279.6C7.406 276.8 0 267.3 0 255.1c0-11.34 7.406-20.83 18.44-23.61l171.2-42.78l42.78-171.1C235.2 7.406 244.7 0 256 0s20.84 7.406 23.62 18.44l42.78 171.2l171.2 42.78C504.6 235.2 512 244.6 512 255.1z"
          fill="yellow"
        />
      </svg>
    </span>
  );
}

export default GameOver;
