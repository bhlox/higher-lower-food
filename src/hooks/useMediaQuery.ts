import React from "react";

export const useMediaQuery = () => {
  const [windowSize, setWindowSize] = React.useState<{
    width: number;
    height: number;
  }>({ height: 1080, width: 1920 });

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
