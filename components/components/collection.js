import React from 'react'
import ProductImg1 from '../../images/product/product-image-1.jpg';
import Product from '../CatProduct';
import {Link} from "react-router-dom";
import { LocalStorage } from '../../helpers/LocalStorage';
import Arrow from "../../images/arrow";

class Collection extends React.Component {
  constructor(props) {
    super(props);
		this.lc = new LocalStorage()
    this.state = {
      items: [],
      visible: 8,
			error: false,
			name: ''
    };

    this.loadMore = this.loadMore.bind(this);
 }
  loadMore() {
    this.setState((prev) => {
      return {visible: prev.visible + 4};
    });
	}
	
	componentWillReceiveProps(nextProps) {
		const handle = nextProps.match.params.collection;
		this.setItems(handle)
	}

	componentWillMount() {
		this.setItems(this.props.collectionId);
	}

	setItems(handle) {
		window.scrollTo(0, 0)
		console.info('Collectionm title: ^', handle)
		const lcCollections = this.lc.getObject('collections');
		console.info('ls collection :::', lcCollections)
    if(lcCollections) {
			const collection = lcCollections.find( collect => collect.handle === handle );
			if(collection)
				this.setState({items: collection.products, name: collection.title})
		}
  }
 
 render() {
	    
    return (
      <section className="Collection">
	  
       <div className="container-fluid">
		<div className="row">
			<div className="col-sm-12">
				<div className="page_title">
					<h2>{this.state.name}</h2>
					<p>{this.state.items.length} Items</p>
				</div>
			</div>
			</div>
		<div className="row">
		 
<div className="col-sm-12 coll_product__box">
        <div className="tiles" aria-live="polite">
		<div className="row">
          {this.state.items.slice(0, this.state.visible).map((item, index) => {
              return ( 
					<Product
						addVariantToCart={this.props.addVariantToCart}
						key={item.id.toString()}
						product={item}
					/> 
              );
            })}
          </div>
          {this.state.visible < this.state.items.length &&
			 <div className="viewmore_cnt">
				<p onClick={this.loadMore}><span>View More</span><Arrow/></p>
			</div>
          }
		  </div>
		  </div>
		  </div>
		  </div>
        </section>
    );
  }
}

export default  Collection;