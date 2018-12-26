import React from "react";

const SVG = ({
  style = {},
  fill = "#000",
  width = "100%",
  className = "",
  viewBox = "0 0 32 32"
}) => (
  <svg
    width={width}
    style={style}
    height={width}
    viewBox={viewBox}
    xmlns="http://www.w3.org/2000/svg"
    className={`svg-icon ${className || ""}`}
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <path
      fill={fill}
      d="M0.535,18.873c-0.122,0-0.239-0.044-0.331-0.125c-0.207-0.183-0.226-0.5-0.044-0.706L11.286,5.469
		c0.026-0.03,0.055-0.059,0.086-0.086c0.183-0.162,0.418-0.251,0.662-0.251c0.287,0,0.56,0.123,0.75,0.337L23.91,18.042
		c0.183,0.207,0.163,0.523-0.043,0.706c-0.092,0.081-0.209,0.125-0.331,0.125c0,0,0,0,0,0c-0.143,0-0.279-0.061-0.374-0.168
		L12.035,6.131L0.91,18.705C0.815,18.812,0.678,18.873,0.535,18.873z"
    />
  </svg>
);

export default SVG;
