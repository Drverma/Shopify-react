import React from "react";

  
const SVG = React.createClass({
 render() {
   return (
     <svg className="umbrella" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" aria-labelledby="title">
          <title id="title">Umbrella</title>
			<circle className="sa" cx="12" cy="12" r="11"/>
			<line className="sa" x1="18" y1="12" x2="6" y2="12"/>
      </svg>
   )
 }
});
  
  export default SVG;
