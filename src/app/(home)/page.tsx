"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Home() {
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
      {/* <ScatteredObjects /> */}
    </section>
  );
}

// function ScatteredObjects() {
//   const [lastPoint, setLastPoint] = useState({ x: 0, y: 0 });

//   useEffect(() => {
//     const handleMouseMove = (e: MouseEvent) => {
//       const xMovement = e.movementX > 0 ? 0.1 : e.movementX < 0 ? -0.1 : 0;
//       const yMovement = e.movementY > 0 ? 0.1 : e.movementY < 0 ? -0.1 : 0;

//       setLastPoint(({ x, y }) => {
//         return { x: x + xMovement, y: y + yMovement };
//       });
//     };
//     window.addEventListener("mousemove", handleMouseMove);

//     return () => {
//       window.removeEventListener("mousemove", handleMouseMove);
//     };
//   }, [lastPoint.x, lastPoint.y]);
//   return (
//     <motion.div
//       animate={{ x: lastPoint.x, y: lastPoint.y }}
//       transition={{
//         type: "spring",
//         stiffness: 50,
//         damping: 10,
//       }}
//       className="absolute top-24 left-12 block shadow-2xl shadow-black bg-transparent rotate-12"
//     >
//       <Image src="/assets/chowking.png" alt="asd" width={400} height={400} />
//     </motion.div>
//   );
// }
