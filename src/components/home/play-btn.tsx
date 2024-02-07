import Link from "next/link";
import React from "react";
import AnimatedBorders from "../animated-borders";
import { AnyCallback } from "@/lib/types";
import { FaAngleDoubleRight } from "react-icons/fa";
import { cn } from "@/lib/utils/utils";
import { useMediaQuery } from "@/hooks/use-media-query";

function PlayButton({ handler }: { handler?: AnyCallback }) {
  const { width } = useMediaQuery();
  return (
    <Link
      href="/game"
      className={cn(
        "relative grid grid-rows-[0fr] group-hover:grid-rows-[1fr] place-items-center px-4 py-2 transition-all duration-500 ease-in-out rounded-xl hover:opacity-90 group-hover:animate-[to-white-bg_0.3s_0.7s_ease-in-out_forwards] group/btn hover:pr-10",
        null,
        { "grid-rows-[1fr] bg-emerald-50 pr-8": width < 769 }
      )}
    >
      <AnimatedBorders triggerAtCompletion={handler}>
        <p
          className={cn(
            "overflow-hidden text-2xl md:text-3xl lg:text-5xl opacity-0 group-hover:opacity-100 group-hover:delay-500 group-hover:duration-700 ease-in-out text-canada capitalize",
            null,
            { "opacity-100": width < 769 }
          )}
        >
          play
          <FaAngleDoubleRight
            className={cn(
              "absolute right-3 md:right-2 top-1/2 -translate-y-1/2 duration-200 ease-in-out text-base md:text-2xl group-hover/btn:opacity-100 opacity-0",
              null,
              { "opacity-100": width < 769 }
            )}
          />
        </p>
      </AnimatedBorders>
    </Link>
  );
}

export default PlayButton;
