import React from 'react';

import icon_1 from '../../images/fwc.png'; 
import icon_2 from '../../images/er.png'; 
import icon_3 from '../../images/hh.png'; 
import icon_4 from '../../images/sc.png'; 
 
 
 
class  Story extends React.Component {
 
  render() {
    return (
<div className="text_cnt">
  <div className="container-fluid">
    <div className="row">
      <div className="col-md-5">
        <div className="over_story_cnt">
          <h2>Our Story and promise</h2>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&rsquo;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
          <ul>
            <li> <img src={icon_1} alt="" />
              <p>Free Worldwide Shipping</p>
            </li>
            <li> <img src={icon_2}alt="" />
              <p>Easy Returns</p>
            </li>
            <li> <img src={icon_3} alt="" />
              <p>Human Helpdesk</p>
            </li>
            <li> <img src={icon_4} alt="" />
              <p>Secure Checkout</p>
            </li>
          </ul>
        </div>
      </div>
      <div className="col-md-7 hide_mob">
        <div className="holyday_cnt">
          <div className="holyday_text_cnt">
            <h3>Happy Holidays!</h3>
            <p>In the spirit of the holidays here's 15% OFF our 
              art collection! Use code ARTSY at checkout</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
);
  }
}
export default (Story); 