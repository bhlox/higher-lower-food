import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useRef } from "react";

export default function ScatteredBox({
  color,
  position,
  image,
  size,
  className,
}: {
  color?: string;
  position?: string;
  image: string;
  size?: string;
  className?: string;
}) {
  const obRef = useRef<HTMLDivElement>(null);
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
  }, []);
  return (
    <div
      ref={obRef}
      style={{ transformStyle: "preserve-3d" }}
      className={cn(
        "absolute bg-red-700 rounded-xl size-48 shadow-2xl shadow-green-400",
        `${color} ${position} ${size} ${className}`
      )}
    >
      <Image src={image} alt="asd" fill className="object-contain rounded-xl" />
    </div>
  );
}
