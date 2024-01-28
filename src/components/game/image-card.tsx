import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

// #TODO add a flip animation. reference: https://codesandbox.io/p/sandbox/flip-card-cju2d?file=%2Fsrc%2FApp.tsx https://codesandbox.io/p/sandbox/wordle-90qj1i

function ImageCard({
  brandName,
  imgSrc,
  foodName,
}: {
  brandName: string;
  imgSrc: string;
  foodName: string;
}) {
  return (
    <motion.div
      initial={{
        boxShadow: "0",
      }}
      animate={{
        boxShadow: "25px 25px 49px #bebebe, -25px -25px 49px #ffffff",
        transition: { duration: 1.2, ease: "easeInOut" },
      }}
      exit={{
        boxShadow: "0",
        transition: { duration: 0.2, ease: "easeInOut" },
      }}
      className="relative size-44 sm:size-56 lg:size-64 rounded-[50px] neu"
    >
      <Image
        src={`/assets/${brandName}.png`}
        alt={brandName}
        width={200}
        height={100}
        className="absolute top-2 left-1/2 -translate-x-1/2 w-[80%] lg:w-[90%]"
      />
      <Image
        src={imgSrc}
        alt={foodName}
        fill
        className="rounded-lg object-contain"
        objectPosition="bottom"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </motion.div>
  );
}

export default ImageCard;
