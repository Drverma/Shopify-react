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
	 
	<path fill={fill} d="M3,7.5C2.724,7.5,2.5,7.276,2.5,7S2.724,6.5,3,6.5h18c0.276,0,0.5,0.224,0.5,0.5S21.276,7.5,21,7.5H3z"/>
	<path fill={fill} d="M3,12.5c-0.276,0-0.5-0.224-0.5-0.5c0-0.276,0.224-0.5,0.5-0.5h18c0.276,0,0.5,0.224,0.5,0.5c0,0.276-0.224,0.5-0.5,0.5H3z
		"/>
	<path fill={fill} d="M3,17.5c-0.276,0-0.5-0.224-0.5-0.5s0.224-0.5,0.5-0.5h18c0.276,0,0.5,0.224,0.5,0.5s-0.224,0.5-0.5,0.5H3z"/>
  </svg>
);

export default SVG;
