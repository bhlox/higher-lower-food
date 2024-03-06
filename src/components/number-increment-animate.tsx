import React from "react";

function NumberIncrement() {
  const endValue = 135;
  return (
    <p
      style={{ "--start-value": "0", "--end-value": endValue } as any}
      className="text-7xl font-bold text-white counter"
    ></p>
  );
}

export default NumberIncrement;
