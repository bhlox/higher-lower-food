import { useMediaQuery } from "@/hooks/use-media-query";
import { AnyCallback } from "@/lib/types";
import { cn } from "@/lib/utils/utils";
import React from "react";

function AnimatedBorders({
  children,
  triggerAtCompletion,
}: {
  children: React.ReactNode;
  triggerAtCompletion: undefined | AnyCallback;
}) {
  // upperThenX animation time of 0.6s. btm-left and btm-right takes 0.3s. total is 0.9s
  const { width } = useMediaQuery();

  return (
    <>
      <div
        id="upper"
        data-border-side="upperThenX"
        className={cn(
          "w-[75%] h-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-x-2 border-t-2 group-hover:animate-[full-width_0.3s_ease-in-out_forwards,full-height_0.3s_0.3s_ease-in-out_forwards] place-items-center rounded-xl",
          null,
          { "w-full h-full": width < 769 }
        )}
      />
      <div
        data-border-side="btm-left"
        className="w-0 h-6 border-b-2 group-hover:animate-[half-width_0.3s_0.6s_ease-in-out_forwards] absolute bottom-0 left-0 rounded-bl-xl"
      />
      <div
        onAnimationEnd={triggerAtCompletion}
        data-border-side="btm-right"
        className="w-0 h-6 border-b-2 group-hover:animate-[half-width_0.3s_0.6s_ease-in-out_forwards] absolute bottom-0 right-0 rounded-br-xl transition-all"
      />
      {children}
    </>
  );
}

export default AnimatedBorders;
