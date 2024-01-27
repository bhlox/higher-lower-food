import React from "react";

function LineDivider() {
  return (
    <svg className="absolute z-10 inline-block" height="100%" width="100%">
      <g
        id="vertical"
        className="lg:block hidden"
        stroke="rgb(71 85 105)"
        strokeWidth={4}
      >
        <line x1="50%" y1="0" x2="50%" y2="33%" />
        <line x1="50%" y1="100%" x2="50%" y2="67%" />
      </g>
      <g
        id="horizontal"
        className="lg:hidden block"
        stroke="rgb(71 85 105)"
        strokeWidth={4}
      >
        <line x1="0%" y1="50%" x2="25%" y2="50%" />
        <line x1="75%" y1="50%" x2="100%" y2="50%" />
        {/* <line x1="50%" y1="100%" x2="50%" y2="67%" /> */}
      </g>
    </svg>
  );
}

export default LineDivider;
