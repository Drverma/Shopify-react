import React from 'react'
import ProductImg1 from '../../images/product/product-image-1.jpg';

import {Link} from "react-router-dom";
 

class Collection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      visible: 8,
      error: false
    };

    this.loadMore = this.loadMore.bind(this);
 }
  loadMore() {
    this.setState((prev) => {
      return {visible: prev.visible + 4};
    });
  }
  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/posts").then(
      res => res.json()
    ).then(res => {
      this.setState({
        items: res
      });
    }).catch(error => {
      console.error(error);
      this.setState({
        error: true
      });
    });
  }
 
 render() {
	    
    return (
      <section className="Collection">
	  
       <div className="container-fluid">
		<div className="row">
			<div className="col-sm-12">
				<div className="page_title">
					<h2>Art & More</h2>
					<p>187 Items</p>
				</div>
			</div>
			</div>
		<div className="row">
		<div className="col-sm-3">
			<div className="filter_nav">
				<h2>Filters</h2>
				<ul>
					<li onClick={this.toggleList}><span>Size</span> <i className="fas fa-plus plus"><i className="fas fa-minus minus"></i></i>
					<ul className="nested_menu">
						<li><span>sm</span>  </li>
						<li><span>xl</span>  </li>
						<li><span>xxl</span>  </li>
					</ul>
					</li>
					<li><span>Category</span> <i className="fas fa-plus plus"><i className="fas fa-minus minus"></i></i>
					<ul>
						<li><span>Art & More</span>  </li>
						<li><span>Mens</span>  </li>
						<li><span>Women</span>  </li>
					</ul>
				</li>
					<li><span>Brand</span> <i className="fas fa-plus plus"><i className="fas fa-minus minus"></i></i>
					 <ul>
						<li><span>sm</span>  </li>
						<li><span>xl</span>  </li>
						<li><span>xxl</span>  </li>
					</ul>
				</li>
					<li><span>Color</span> <i className="fas fa-plus plus"><i className="fas fa-minus minus"></i></i>
					 <ul>
						<li><span>sm</span>  </li>
						<li><span>xl</span>  </li>
						<li><span>xxl</span>  </li>
					</ul>
				</li>
					<li><span>Price</span> <i className="fas fa-plus plus"><i className="fas fa-minus minus"></i></i>
					<ul>
					<li><span>$10  to  $100</span>  </li>
					<li><span>$100  to  $1000</span>  </li> 
				</ul>
				</li>
					<li><span>Short By</span> <i className="fas fa-plus plus"><i className="fas fa-minus minus"></i></i>
					<ul>
					<li><span>sm</span>  </li>
					<li><span>xl</span>  </li>
					<li><span>xxl</span>  </li>
				</ul>
				</li> 
				</ul>
			</div>
		</div>
	 
<div className="col-sm-9 coll_product__box">
        <div className="tiles" aria-live="polite">
          {this.state.items.slice(0, this.state.visible).map((item, index) => {
              return ( 
			  
			  <div  key={index} className="col-sm-3"><div className="pro_item"><div className="pro_img"><img src={ProductImg1} alt="" /></div><div className="color_varient"><ul><li className="green active varient"></li><li className="yellow varient"></li></ul></div> <Link to="/Product">100g Wax Beads - Choose Your Scent!</Link><div className="p_price">$215</div><div className="pro_buy"><button className="quick_view"><i className="fas fa-plus"></i> Quick view</button></div></div> </div>
              );
            })}
          </div>
          {this.state.visible < this.state.items.length &&
			 <div className="viewmore_cnt">
				<p  onClick={this.loadMore}><span>View More</span><i className="fas fa-long-arrow-alt-down"></i></p>
			</div>
          }
		  </div>
		  </div>
		  </div>
        </section>
    );
  }
}

export default  Collection;