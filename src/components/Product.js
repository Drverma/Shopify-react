import React, {Component} from 'react';
import VariantSelector from './VariantSelector';  
import {Link} from "react-router-dom";
import client from '../helpers/ShopifyClient';

class Product extends Component {
  constructor(props) {
    super(props);
    let defaultOptionValues = {};
    this.props.product.options.forEach((selector) => {
      defaultOptionValues[selector.name] = selector.values[0].value;
    });
    this.state = { selectedOptions: defaultOptionValues };

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
    const selectedVariant = client.product.helpers.variantForOptions(this.props.product, selectedOptions)

    this.setState({
      selectedVariant: selectedVariant,
      selectedVariantImage: selectedVariant.attrs.image
    });
  }

  handleQuantityChange(event) {
    this.setState({
      selectedVariantQuantity: event.target.value
    });
  }

  render() {
	   
    let variantImage = this.state.selectedVariantImage || this.props.product.images[0]
    let variant = this.state.selectedVariant || this.props.product.variants[0]
    let variantQuantity = this.state.selectedVariantQuantity || 1
    let variantSelectors = this.props.product.options.map((option) => {
      return (
        <VariantSelector
          handleOptionChange={this.handleOptionChange}
          key={option.id.toString()}
          option={option}
        />
      );
    });
    return (
 
      <div className="Product_item col-6 col-sm-3 col-md-2">
	  <div className="img_cnt">
        {this.props.product.images.length ? <img src={variantImage.src} alt={`${this.props.product.title} product shot`}/> : null}
		</div>
        <h5 className="Product__title"> <Link to={`/product/${this.props.product.handle}`}>{this.props.product.title}</Link></h5>
        <span className="Product__price">${variant.price}</span>
        {variantSelectors}
        <label className="Product__quntity">
          Quantity
          <input min="1" type="number" defaultValue={variantQuantity} onChange={this.handleQuantityChange}></input>
        </label>
        <button className="Product__buy button" onClick={() => this.props.addVariantToCart(variant.id, variantQuantity)}>Add to Bag</button>
      </div>
      
    );
  }
}

export default Product;
