import React from "react";
import "./loader.scss";

const Loader = ({ size, theme }) => {
  const strokeColor = theme === "dark" ? "#FFFFFF" : "#ff6768";
  const circleSize = size === "large" ? 100 : 50;
  return (
    <div className="loader-wrapper">
      <svg width={circleSize} height={circleSize}>
        <path
          d={`M0,${circleSize / 2 - 2} a1,1 0 0,0 ${circleSize},0`}
          fill="none"
          stroke={strokeColor}
          strokeWidth="2"
        />
      </svg>
      <svg width={circleSize / 2} height={circleSize / 2}>
        <path
          d={`M0,${circleSize / 4 - 1}  a1,1 0 0,0 ${circleSize / 2},0`}
          fill="none"
          stroke={strokeColor}
          strokeWidth="2"
        />
      </svg>
    </div>
  );
};

export default Loader;
