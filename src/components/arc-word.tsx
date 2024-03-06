import React from "react";

function ArcWord({ word }: { word: string }) {
  return (
    <div className="absolute top-[4.5rem] z-50">
      <svg
        viewBox="0 0 30 6"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          id="text"
          strokeWidth=".1"
          d="M 0 5 Q 15 -5 30 5"
          pathLength="2"
          fill="transparent"
        />
        <text
          fontSize="4.5"
          className="font-canada"
          dominantBaseline="hanging"
          textAnchor="middle"
          letterSpacing={1.3}
        >
          <textPath href="#text" startOffset="51%" fill="white">
            {word}
          </textPath>
        </text>
      </svg>
    </div>
  );
}

export default ArcWord;
