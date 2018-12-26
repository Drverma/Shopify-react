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
	  <g id="Page-1" stroke="none" stroke-width="1" fill="{fill}" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
        <g id="navigation-menu" transform="translate(1.000000, 1.000000)" stroke="#000000">
            <path d="M13,0 L0,0" id="Shape"></path>
            <path d="M18,5 L0,5" id="Shape"></path>
            <path d="M13,10 L0,10" id="Shape"></path>
        </g>
    </g>
 
  </svg>
);

export default SVG;
