import { useDeviceContext } from "@/components/providers/device-provider";
import React from "react";

export const useMediaQuery = () => {
  const { mobileDeviceType } = useDeviceContext();
  // #TODO use ts-pattern
  const [windowSize, setWindowSize] = React.useState<{
    width: number;
    height: number;
  }>({
    height: mobileDeviceType ? 740 : 1080,
    width: mobileDeviceType
      ? mobileDeviceType === "tablet"
        ? 768
        : 500
      : 1920,
  });

  React.useEffect(() => {
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
