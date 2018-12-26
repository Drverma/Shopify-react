import React, { Component } from 'react';
import Products from '../Products';
import Cart from '../Cart'; 
import client from '../../helpers/ShopifyClient';
import { LocalStorage } from '../../helpers/LocalStorage';
 
import Story from './Story'; 
import Banner from './banner';  
 

class Index extends Component {

  constructor() {
    super();
  }

  render() {
    return (
      <div className="App">
        <Banner/> 
         <Products
          bestProducts={this.props.bestProducts}
          artProducts={this.props.artProducts}
          addVariantToCart={this.props.addVariantToCart}
        />       
		<Story/>
		 
      </div>
    );
  }
}

export default  Index;
