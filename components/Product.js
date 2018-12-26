import React, {Component} from 'react';
import VariantSelector from './VariantSelectorSlider';  
import {Link} from "react-router-dom";
import client from '../helpers/ShopifyClient';
import SubtractCircle from "../images/subtract-circle";
import AddCircle from "../images/add-circle";


class Product extends Component {
  constructor(props) {
    super(props);
    let defaultOptionValues = {};
    this.props.product.options.forEach((selector) => {
      defaultOptionValues[selector.name] = selector.values[0].value;
    });
    this.state = { selectedOptions: defaultOptionValues };

	this.minusQty = this.minusQty.bind(this)
    this.plusQty = this.plusQty.bind(this)
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
    const nameSplit = target.name.split('--')
    let selectedOptions = this.state.selectedOptions;
    selectedOptions[nameSplit[0]] = target.value;
    const selectedVariant = client.product.helpers.variantForOptions(this.props.product, selectedOptions)

    if(selectedVariant.attrs) {
      this.setState({
        selectedVariant: selectedVariant,
        selectedVariantImage: selectedVariant.attrs.image
      });
    } else if(selectedVariant.image){
      this.setState({
        selectedVariant: selectedVariant,
        selectedVariantImage: selectedVariant.image
      });
    }
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
  render() {
	   
    let variantImage = this.state.selectedVariantImage || this.props.product.images[0]
    let variant = this.state.selectedVariant || this.props.product.variants[0]
    let variantQuantity = this.state.selectedVariantQuantity || 1
    let variantSelectors = this.props.product.options.map((option) => {
      return (
        <span className="variant_txt" key={option.id.toString()}>
        <VariantSelector
          handleOptionChange={this.handleOptionChange}
          key={option.id.toString()}
          option={option}
        />
        <br/>
        </span>
      );
    });
    return (
 
      <div className="Product_item col-6 col-sm-4 col-md-3 col-lg-2">
	  <div className="img_cnt">
        {this.props.product.images.length ? <img src={variantImage.src} alt={`${this.props.product.title} product shot`}/> : null}
		</div>
		
		 <div className="varient_txt_box">
		{variantSelectors}
        </div>
		  
        <h5 className="Product__title">  
        <a href={`/product/${this.props.product.handle}`} >
          {this.props.product.title.substring(0,67)} {(this.props.product.title.length > 67) ? '...' : ''}
        </a> 
        </h5> 
		<span className="Product__price">${variant.price}</span>
			{/* <div className="pro_qyt">
            <label className="Product__quntity"> <span>Quantity</span> </label>
			<div className="pro_qyt_box">
              <button onClick={this.minusQty}><SubtractCircle /></button>
              <input min="1" type="text" value={variantQuantity} onChange={this.handleQuantityChange} />
              <button  onClick={this.plusQty}><AddCircle /></button>
			  
			  </div>  
			</div>*/}
        <button className="Product__buy button" onClick={() => this.props.addVariantToCart(variant.id, variantQuantity)}>Add to Bag</button>
      </div>
      
    );
  }
}

export default Product;
