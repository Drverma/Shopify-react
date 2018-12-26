 
import React, { Component } from 'react'
import { LocalStorage } from '../../helpers/LocalStorage';
import {Link} from "react-router-dom";

class Search extends Component {
  constructor(){
    super();
    this.lc = new LocalStorage();
    this.state = {
      query: '',
      isHidden: true,
      products: []
    }
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  componentWillMount() {
    const product = this.lc.getObject('products')
    if(product)
      this.setState({products: product})
  }

 handleInputChange = () => {
   if(!this.state.products || this.state.products.length === 0) {
   
      const product = this.lc.getObject('products')
      if(product)
        this.setState({products: product})
   }

    if(this.state.products && this.state.products.length > 0 && this.search.value.length > 0) {
      const searchProduct = this.state.products.filter( product => product.title.toLowerCase().includes(this.search.value.toLowerCase()) );

      if(searchProduct.length > 0) {
        let showProduct = searchProduct.map((pro) => {
          return (
            <div className="searchProduct"> 
            <div className="row"> 
              <div className="col-4">
              <img src={(pro.images && pro.images[0]) ? pro.images[0].src : ''} className="searchProjectImage"/>
              </div>
             <div className="col-8">
              <Link to={`/product/${pro.handle}`} onClick={this.props.hideSearch}>{pro.title.substring(0,50)} {(pro.title.length > 50) ? '...' : ''}</Link>
              
              </div>
              </div>
            </div>
          );
        })
        this.setState({
          query: showProduct
        }) 
      } else {
        this.setState({
          query: ''
        }) 
      }
    } else {
      this.setState({
        query: ''
      }) 
    }
 } 
 toggleHidden () {
    this.setState({
      isHidden: !this.state.isHidden
    })
  }
 render() {
   return (
     <form>
       <input
         placeholder="What can we help you find?"
		 type="text"
         ref={input => this.search = input}
         onChange={this.handleInputChange}
		 onClick={this.toggleHidden.bind(this)}
       />
	   {!this.state.isHidden && <div className="form_cnt_box">{this.state.query}</div> } 
	   
     </form>
   )
 }
}

export default Search
