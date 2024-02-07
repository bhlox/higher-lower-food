import React, { useState, useEffect } from "react";
import { useDeviceContext } from "@/components/providers/device-provider";
import { P, match } from "ts-pattern";

export const useMediaQuery = () => {
  const { mobileDeviceType } = useDeviceContext();
  const [windowSize, setWindowSize] = useState<{
    width: number;
    height: number;
  }>(() => {
    return match(mobileDeviceType)
      .with("phone", () => ({
        width: 500,
        height: 740,
      }))
      .with("tablet", () => ({ width: 768, height: 1024 }))
      .with(P.nullish, () => ({ width: 1920, height: 1080 }))
      .exhaustive();
  });

  useEffect(() => {
    const handleResize = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowSize;
};
