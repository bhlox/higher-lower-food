"use client";
import { useContext, createContext } from "react";

interface IDeviceContext {
  mobileDeviceType: "tablet" | "phone" | null;
}

export const DeviceContext = createContext<IDeviceContext | undefined>(
  undefined
);

export const DeviceProvider = ({
  children,
  userAgent,
}: {
  children: React.ReactNode;
  userAgent: string;
}) => {
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      userAgent
    );

  // #TODO use ts-pattern
  const mobileDeviceType = isMobile
    ? /Tablet|iPad/i.test(userAgent)
      ? "tablet"
      : "phone"
    : null;
  return (
    <DeviceContext.Provider value={{ mobileDeviceType }}>
      {children}
    </DeviceContext.Provider>
  );
};

export const useDeviceContext = () => useContext(DeviceContext)!;
