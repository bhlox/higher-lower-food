"use client";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { DEFAULT_BOX_SHADOW_SCATTERED_BOX } from "@/lib/constants";
import { ScatteredBoxProps } from "@/lib/types";
import { getRandomIndex } from "@/lib/utils/helper";
import { cn } from "@/lib/utils/utils";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function ScatteredBox({
  position,
  image,
  size,
  className,
  brandName,
  primaryColor,
  secondaryColor,
  shouldAnimate,
}: ScatteredBoxProps) {
  const [reloadImage, setReloadImage] = useState(false);
  const obRef = useRef<HTMLDivElement>(null);

  const neonBoxShadowColor = `0 0 .2rem #fff,
  0 0 .2rem #fff,
  0 0 2rem ${primaryColor},
  0 0 0.8rem ${primaryColor},
  0 0 2.8rem ${primaryColor},
  inset 0 0 1.3rem ${primaryColor}`;

  const handleMouseEnter = () => {
    obRef.current!.style.boxShadow = neonBoxShadowColor;
  };
  const handleMouseLeave = () => {
    obRef.current!.style.boxShadow = DEFAULT_BOX_SHADOW_SCATTERED_BOX;
  };
  useEffect(() => {
    let frameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      frameId = requestAnimationFrame(() => {
        const mouseX =
          ((e.clientX - window.innerWidth / 2) / window.innerWidth) * 2;
        const mouseY =
          ((e.clientY - window.innerHeight / 2) / window.innerHeight) * 2;
        obRef.current!.style.transform = `translate3d(${mouseX}vw,${mouseY}vw,0px) scale3d(1,1,1)`;
      });
    };
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  });
  return (
    <div
      ref={obRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        backgroundImage: `linear-gradient(${primaryColor}, ${secondaryColor})`,
        boxShadow: shouldAnimate
          ? neonBoxShadowColor
          : DEFAULT_BOX_SHADOW_SCATTERED_BOX,
      }}
      className={cn(
        "absolute rounded-2xl md:rounded-[32px] lg:rounded-[40px] ease-in-out duration-75 hover:animate-dance -z-10 md:z-0",
        `${position} ${size} ${className}`,
        { "animate-dance": shouldAnimate }
      )}
    >
      <Image
        src={reloadImage ? `${image}?t=${new Date().getTime()}` : image}
        alt={brandName}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className={cn(
          "object-contain rounded-2xl md:rounded-[32px] lg:rounded-[40px] transition-all duration-300 ease-in-out",
          undefined,
          { "object-cover": brandName === "greenwich" }
        )}
        onError={() => setReloadImage((c) => !c)}
      />
    </div>
  );
}

export function ScatteredBoxList({ list }: { list: ScatteredBoxProps[] }) {
  const { width } = useMediaQuery();
  // only for mobile width
  const [boxIndexToAnimate, setBoxIndexToAnimate] = useState<number | null>(
    null
  );

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (width < 769) {
      interval = setInterval(() => {
        setBoxIndexToAnimate(getRandomIndex(list));
      }, 4500);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [list, width]);
  return (
    <>
      {list.map((food, i) => (
        <ScatteredBox
          key={`ScatteredBox:${i}`}
          image={food.image}
          position={food.position}
          size={food.size}
          brandName={food.brandName}
          primaryColor={food.primaryColor}
          secondaryColor={food.secondaryColor}
          shouldAnimate={boxIndexToAnimate === i}
        />
      ))}
    </>
  );
}
