import React from 'react' 
import ProductImg1 from '../../images/product/product-image-1.jpg';
import icon_1 from '../../images/icon_1.jpg'; 
import icon_2 from '../../images/icon_2.jpg'; 
import icon_3 from '../../images/icon_3.jpg'; 
import icon_4 from '../../images/icon_4.jpg';  
import {Link} from "react-router-dom";
import { LocalStorage } from '../../helpers/LocalStorage';
import VariantSelector from '../VariantSelector';
import client from '../../helpers/ShopifyClient';

import SingleProduct from './singleproduct'; 
 
const renderHTML = (rawHTML) => React.createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML } });
class Product extends React.Component {

	constructor(props) {
		super(props);
		this.lc = new LocalStorage();
		this.state = { project: undefined, selectedOptions: {} };
		
	  }

	componentWillMount() {
		const lcProducts = this.lc.getObject('products');

		const product = lcProducts.find( product => product.handle === this.props.productId );
		this.setState({product: product})
		
		let defaultOptionValues = {};
    product.options.forEach((selector) => {
      defaultOptionValues[selector.name] = selector.values[0].value;
    });
    this.setState({ selectedOptions: defaultOptionValues });

    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
    this.findImage = this.findImage.bind(this);

	}

	findImage(images, variantId) {
    const primary = images[0];

    const image = images.filter(function (image) {
      return image.variant_ids.includes(variantId);
    })[0];

    return (image || primary).src;
  }

  handleOptionChange(event) {
    const target = event.target
    let selectedOptions = this.state.selectedOptions;
    selectedOptions[target.name] = target.value;

    const selectedVariant = client.product.helpers.variantForOptions(this.state.product, selectedOptions)
    this.setState({
      selectedVariant: selectedVariant,
      selectedVariantImage: selectedVariant.image
    });
  }

  handleQuantityChange(event) {
    this.setState({
      selectedVariantQuantity: event.target.value
    });
	}
	
  render () { 
    let variant = this.state.selectedVariant || this.state.product.variants[0]
    let variantQuantity = this.state.selectedVariantQuantity || 1
    let variantSelectors = this.state.product.options.map((option) => {
      return (
    <VariantSelector
          handleOptionChange={this.handleOptionChange}
          key={option.id.toString()}
          option={option}
        />
);
    });
    return (
<div >
  <div className="container-fluid">
    <div className="row">
      <div className="col-sm-7">
        <SingleProduct product={this.state.product}/>
      </div>
      <div className="col-sm-4">
        <div className="pro_right_box">
          <h2>{this.state.product.title}</h2>
          <div className="pro_review"> <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i>
            <p>4.8 stars. 4169 Orders</p>
          </div>
          <div className="price_cnt">
            <p>${variant.price}</p>
          </div>
          <div className="pro_type">
            <label>Type</label>
            {variantSelectors} </div>
          <div className="pro_qyt">
            <label className="Product__quntity"> Quantity
              <input min="1" type="number" defaultValue={variantQuantity} onChange={this.handleQuantityChange}>
              </input>
            </label>
          </div>
          <div className="addbuttonbox">
            <button onClick={() => this.props.addVariantToCart(variant.id, variantQuantity)}>Add to Bag</button>
          </div>
          <div className="fr_bog_tgh_cnt">
            <ul>
              <li>
                <div className="pro_item">
                  <div className="pro_img"><img src={ProductImg1} alt="" /></div>
                  <Link to="/Product">
                  100g Wax Beads - Choose Your Scent!
                  </Link>
                  <div className="p_price">$215</div>
                </div>
              </li>
              <li>
                <div className="pro_item">
                  <div className="pro_img"><img src={ProductImg1} alt="" /></div>
                  <Link to="/Product">
                  100g Wax Beads - Choose Your Scent!
                  </Link>
                  <div className="p_price">$215</div>
                </div>
              </li>
              <li>
                <div className="pro_item">
                  <div className="pro_img"><img src={ProductImg1} alt="" /></div>
                  <Link to="/Product">
                  100g Wax Beads - Choose Your Scent!
                  </Link>
                  <div className="setof_pro_type">
                    <select>
                      <option>Set of 12 colors</option>
                      <option>Set of 16 colors</option>
                      <option>Set of 18 colors</option>
                      <option>Set of 24 colors</option>
                    </select>
                  </div>
                  <div className="p_price">$215</div>
                </div>
              </li>
            </ul>
            <div className="buyallcnt">
              <button>Buy All and Save <i className="fas fa-check-circle"></i></button>
            </div>
          </div>
          <div className="frewidebox">
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
          <div className="product_detail_cnt">
            <h3>Product Details</h3>
            {renderHTML(this.state.product.descriptionHtml)} </div>
        </div>
      </div>
    </div>
  </div>
</div>
);
  }
}

export default Product;