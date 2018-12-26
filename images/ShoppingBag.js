import React from "react";

const SVG = ({
  style = {},
  fill = "#000",
  width = "100%",
  height = "100%",
  className = "",
  viewBox = "0 0 32 32"
}) => (
  <svg
    width={width}
    style={style}
    height={height}
    viewBox={viewBox}
    xmlns="http://www.w3.org/2000/svg"
    className={`svg-icon ${className || ""}`}
    xmlnsXlink="http://www.w3.org/1999/xlink"
  > 
	 <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
        <g id="shopping-bag-skinny" transform="translate(1.000000, 1.000000)" stroke="#000000">
            <rect id="Rectangle-path" x="0" y="7" width="13" height="15" rx="1"></rect>
            <path d="M3,5 L3,3.74999999 C3.00000003,1.67893217 4.5670034,-9.25185864e-17 6.5,0 C8.4329966,9.25185864e-17 9.99999997,1.67893217 10,3.74999999 L10,5" id="Shape"></path>
        </g>
    </g>
  </svg>
);

export default SVG;
