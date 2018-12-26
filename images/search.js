import React from "react";

const SVG = ({
  style = {},
  fill = "#000",
  width = "100%",
  height = "100%",
  className = "searchicon",
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
    <path
      fill={fill}
      d="M23.5,24c-0.134,0-0.259-0.052-0.354-0.146l-9.004-9.004C12.582,16.238,10.588,17,8.5,17C3.813,17,0,13.187,0,8.5
		C0,3.813,3.813,0,8.5,0C13.187,0,17,3.813,17,8.5c0,2.088-0.762,4.082-2.151,5.642l9.004,9.004C23.948,23.241,24,23.366,24,23.5
		s-0.052,0.259-0.146,0.354S23.634,24,23.5,24z M8.5,1C4.365,1,1,4.365,1,8.5S4.365,16,8.5,16S16,12.635,16,8.5S12.635,1,8.5,1z"
    />
  </svg>
);

export default SVG;
