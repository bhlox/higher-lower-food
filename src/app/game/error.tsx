"use client";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="h-[100dvh] max-w-7xl mx-auto p-4 grid place-items-center">
      <div className="space-y-4 text-white">
        <h2 className="text-3xl md:text-5xl font-bold">
          Something went wrong!
        </h2>
        <Button onClick={() => reset()} size={"lg"}>
          Try again
        </Button>
      </div>
    </div>
  );
}
