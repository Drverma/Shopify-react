import React from 'react' 
import ProductImg1 from '../../images/product/product-image-1.jpg';
import icon_1 from '../../images/fwc.png'; 
import icon_2 from '../../images/er.png'; 
import icon_3 from '../../images/hh.png'; 
import icon_4 from '../../images/sc.png';  
import SubtractCircle from "../../images/subtract-circle";
import AddCircle from "../../images/add-circle";
import {Link} from "react-router-dom";
import { LocalStorage } from '../../helpers/LocalStorage';
import VariantSelector from '../VariantSelector';
import client from '../../helpers/ShopifyClient';
import base64 from 'react-native-base64'
import SingleProduct from './singleproduct'; 
 
 const productId = ' ';
 export function fetchAllProducts() {
  return new Promise((resolve, reject) => {
    client.product.fetch(productId).then((product) => {
    
});
  });
}


const renderHTML = (rawHTML) => React.createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML } });
class Product extends React.Component {

	constructor(props) {
		super(props);
		this.lc = new LocalStorage();
     this.state = { 
      project: undefined, 
      selectedOptions: {}, 
      selectedVariantQuantity: 1,
      productId: undefined
    };
    
    this.minusQty = this.minusQty.bind(this)
    this.plusQty = this.plusQty.bind(this)
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
    this.findImage = this.findImage.bind(this);
    }
    componentDidMount () {
      // const script1 = document.createElement("script");
      // script1.src = "https://cdn.shopify.com/s/files/1/0040/9780/2329/t/2/assets/jquery.js";
      // script1.async = true;
      // document.body.appendChild(script1);
      
      const script = document.createElement("script");
      script.src = "https://loox.io/widget/VyZgXWes3B/loox.js?shop=shutupandgiftmedev.myshopify.com";
      script.async = true;

      document.body.appendChild(script);
  }

    componentWillReceiveProps(nextProps) {
      const productId = nextProps.match.params.productId;
      this.setItems(productId)
    }

    componentWillMount() {
      window.scrollTo(0,0)
      this.setItems(this.props.productId)
    }

    setItems(productId) {
        const lcProducts = this.lc.getObject('products');
        if(!lcProducts) {
        setTimeout(() => {
          window.location.replace(`/product/${productId}`)
        },10000)
        } else {
        const product = lcProducts.find( product => product.handle === productId );
        const decodeId = base64.decode(product.id).split('Product/');
        this.setState({product: product, productId: decodeId[1]})

        fetch('https://loox.io/widget/VyZgXWes3B/reviews/1503675154521?h=')
      .then(response => response.json())
      .then(data => this.setState({ data }));


        let defaultOptionValues = {};
        if(product) {
          product.options.forEach((selector) => {
            defaultOptionValues[selector.name] = selector.values[0].value;
          });
        }
        this.setState({ selectedOptions: defaultOptionValues });
      }
   
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
    const nameSplit = target.name.split('--')
    let selectedOptions = this.state.selectedOptions;
    selectedOptions[nameSplit[0]] = target.value;

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
  minusQty() {
    this.setState({
      selectedVariantQuantity: (this.state.selectedVariantQuantity) ? Number(this.state.selectedVariantQuantity)-1 : 1
    })
  }
  plusQty() {
    this.setState({
      selectedVariantQuantity: (this.state.selectedVariantQuantity ) ? Number(this.state.selectedVariantQuantity) + 1 : 1
    })
  }
	
  render () {
    if(this.state.product) {
	let variantImage = this.state.selectedVariantImage || this.state.product.images[0] || null
    let variant = this.state.selectedVariant || this.state.product.variants[0]
    let variantQuantity = this.state.selectedVariantQuantity || 1
    let variantSelectors = this.state.product.options.map((option) => {
      return (
        (option.values.length > 1 || (option.values.length == 1 && option.values[0].value != 'Default Title')) ?
        <span className={`variant_txt ${option.name}Variant`} key={option.id.toString()}>
          <VariantSelector
              handleOptionChange={this.handleOptionChange}
              key={option.id.toString()}
              option={option}
            />
          <br/>
        </span>
        : undefined
      );
    });
    return (
<div>
  <div className="container-fluid">
    <div className="row">
      <div className="col-sm-6 col-md-7">
        <SingleProduct product={this.state.product}/>
      </div>
      <div className="col-sm-6 col-md-5">
        <div className="pro_right_box">
          <h2>{this.state.product.title}</h2>
          <div className="pro_review"> <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i>
            <p>4.8 stars. 4169 Orders</p>  
          </div>  
          <div className="price_cnt">
            <p>${variant.price}</p>
          </div>
          {(variantSelectors.length > 0 && variantSelectors[0]) ?
          <div className="pro_type">
            <label>Type</label>
            {variantSelectors} </div>
            : null }
          <div className="pro_qyt">
            <label className="Product__quntity"> <span>Quantity</span> </label>
			<div className="pro_qyt_box">
              <button onClick={this.minusQty}><SubtractCircle /></button>
              <input min="1" type="text" value={variantQuantity} onChange={this.handleQuantityChange} />
              <button  onClick={this.plusQty}><AddCircle /></button>
			  </div>  
		   </div>
          <div className="addbuttonbox">
            <button onClick={() => this.props.addVariantToCart(variant.id, variantQuantity)}>Add to Bag</button>
          </div>
          <div className="fr_bog_tgh_cnt">
		  
		  <h3>Frequently Bought Togther</h3>
		  <p>Select the items you like and press Add to Bag above or buy all with the button below !</p>
            <ul>
              <li className="active">
                <div className="pro_item">
                  <div className="pro_img"> <i className="fas fa-check-circle"></i><img src={ProductImg1} alt="" /></div>
                  <Link to="/Product">
                  100g Wax Beads - Choose Your Scent!
                  </Link>
                  <div className="p_price">$215</div>
                </div>
              </li>
              <li>
                <div className="pro_item">
                  <div className="pro_img"><i className="fas fa-check-circle"></i><img src={ProductImg1} alt="" /></div>
                  <Link to="/Product">
                  100g Wax Beads - Choose Your Scent!
                  </Link>
                  <div className="p_price">$215</div>
                </div>
              </li>
              <li>
                <div className="pro_item">
                  <div className="pro_img"><i className="fas fa-check-circle"></i><img src={ProductImg1} alt="" /></div>
                  <Link to="/Product">100g Wax Beads - Choose Your Scent!</Link>
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
          {(this.state.product.descriptionHtml.trim() !== '') ?
          <div className="product_detail_cnt">
            <h3>Product Details</h3>
            {renderHTML(this.state.product.descriptionHtml)} 
          </div>
          : null
          }
        </div>
      </div>
    </div>
	 <div className="reviews_cnt">
  <div className="row">
  <div className="col-12">
    {this.state.productId ?
   <div id="looxReviews" data-product-id={this.state.productId} className="loox-reviews-default"></div>
	 : null}
	  </div>
    </div>
  </div>
  </div>
  
 
	 
    <div className="add_cart_cnt">
  <div className="row">
  <div className="col-7">
	{(variantSelectors.length > 0 && variantSelectors[0]) ?
          <div className="pro_type">
            <label>Type</label>
            {variantSelectors} </div>
            : null }
			</div>
			 <div className="col-5">
          <div className="pro_qyt">
            <label className="Product__quntity"> <span>Quantity</span> </label>
			<div className="pro_qyt_box">
              <button onClick={this.minusQty}><SubtractCircle /></button>
			  
              <input min="1" type="text" value={variantQuantity} onChange={this.handleQuantityChange} />
              <button  onClick={this.plusQty}><AddCircle /></button>
			  </div>
			  </div>
          </div>
		   <div className="col-12">
          <div className="addbuttonbox">
            <button onClick={() => this.props.addVariantToCart(variant.id, variantQuantity)}>Add to Bag</button>
          </div>
          </div>
</div>
</div>
</div>
);
    } else {
      return (
        <div>
          <h2 className="text-center" style={{minHeight: '200px'}}>Loading...</h2>
        </div>
      )
    }
  }
}

export default Product;