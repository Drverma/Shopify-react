import React from 'react';
import {Link} from "react-router-dom"; 

import Banner_img from '../../images/banner_img.jpg';
import Mobile_banner from '../../images/mobile_banner.jpg';

class Banner extends React.Component {
render() {
    return (
     	
		<div className="container-fluid m_nopadding">
			<div className="row"> 
			  <div className="app_banner_cnt">
			   <img src={Banner_img} alt="Banner_img" /> 
			   <img src={Mobile_banner} className="mob_img" alt="Banner_img" /> 
				<div className="app_banner_text">
				  <h1>The thrill of living is in the joy of giving.</h1>
				  <Link to="#">Shop our best seller and more here</Link></div>
			  
			</div>
			</div>
</div>
    );
  }
}
export default (Banner); 