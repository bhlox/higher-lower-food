"use client";

import { usePathname } from "next/navigation";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useRef,
} from "react";

export const PreviousPathnameContext = createContext<string[] | undefined>(
  undefined
);

export default function PreviousPathnameProvider({
  children,
}: PropsWithChildren<{}>) {
  const pathname = usePathname();
  const ref = useRef<string>();
  const prevRef = useRef<string[]>();

  useEffect(() => {
    ref.current = pathname;
    prevRef.current = prevRef.current
      ? [...prevRef.current, pathname]
      : [pathname];
    // console.log(prevRef.current);
  }, [pathname]);

  return (
    <PreviousPathnameContext.Provider value={prevRef.current}>
      {children}
    </PreviousPathnameContext.Provider>
  );
}
