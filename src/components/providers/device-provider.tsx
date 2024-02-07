"use client";
import { useContext, createContext } from "react";
import { P, match } from "ts-pattern";

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

  const mobileDeviceType = match(isMobile)
    .with(true, () => {
      return match(userAgent)
        .returnType<"tablet" | "phone">()
        .with(
          P.when((ua) => /Tablet|iPad/i.test(ua)),
          () => "tablet"
        )
        .otherwise(() => "phone");
    })
    .with(false, () => null)
    .exhaustive();

  return (
    <DeviceContext.Provider value={{ mobileDeviceType }}>
      {children}
    </DeviceContext.Provider>
  );
};

export const useDeviceContext = () => useContext(DeviceContext)!;
