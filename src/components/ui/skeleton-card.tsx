import React from "react";

function SkeletonCard() {
  return (
    <>
      {Array.from({ length: 2 }).map((_, i) => (
        <div
          key={`div:${i}`}
          className="h-[50dvh] w-screen lg:h-screen lg:w-[50dvw] flex flex-col justify-center items-center gap-y-4 animate-pulse"
        >
          <div className="relative size-44 sm:size-56 lg:size-64 rounded-[50px] bg-gray-400 grid place-items-center">
            <svg
              className="lg:size-36 md:size-32 size-24 text-gray-200 dark:text-gray-600"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 18"
            >
              <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
            </svg>
          </div>
          <div className="p-4 w-52 bg-gray-400 rounded-xl"></div>
          <div className="p-2 w-32 bg-gray-400 rounded-xl"></div>
        </div>
      ))}
    </>
  );
}

export default SkeletonCard;
