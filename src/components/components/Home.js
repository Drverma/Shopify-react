import React, { Component } from 'react';
import Products from '../Products';   
import Story from './Story'; 
import Banner from './banner';  

class Index extends Component {
  render() {
    return (
      <div className="App">
        <Banner/>
         <Products
          products={this.props.products}
          addVariantToCart={this.props.addVariantToCart}
        />       
		<Story/>
		 
      </div>
    );
  }
}

export default  Index;
