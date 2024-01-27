import { useRouter, } from "next/navigation";
import { useEffect, useRef } from "react";

export const useHistoryRoute = () => {
  const router = useRouter();
  const ref = useRef<string | null>(null);


  // useEffect(() => {
  //   const handleRouteChange = () => {
  //   //   ref.current = router.asPath;
  //   };

  //   router.events.on("routeChangeStart", handleRouteChange);

  //   return () => {
  //     router.events.off("routeChangeStart", handleRouteChange);
  //   };
  // }, [router]);

  return ref.current;
};
