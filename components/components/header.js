import React from 'react';
import logo from '../../images/logo.png';  
import {NavLink} from "react-router-dom";
import Searchinput from './search'; 
import Search from "../../images/search";
import ShoppingBag from "../../images/ShoppingBag";
import Menu from "../../images/menu";
import Remove from "../../images/close";

 
class Header extends React.Component {
	
	constructor() {
    super();

    this.state = { 
	    isCartOpen: false,
      checkout: { lineItems: [] },
      products: [],
      shop: {},
	    displayMenu: false,
      popupVisible: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);

	
  }

  handleClick() {
    if (!this.state.popupVisible) {
      // attach/remove event handler
      document.addEventListener('click', this.handleOutsideClick, false);
    } else {
      document.removeEventListener('click', this.handleOutsideClick, false);
    }

    this.setState(prevState => ({
       popupVisible: !prevState.popupVisible,
    }));
  }
  
  handleOutsideClick(e) {
    // ignore clicks on the component itself
    if (this.node.contains(e.target)) {
      return;
    }
    
    this.handleClick();
  }

  render() {
    return (
<header className="Apps__header">

    
  <div className="container-fluid">
    <div className="row headder">
      <div className="col-4 header_left">
        <div className="nav-side-menu">
          <div className="toggle-button" onClick={() => this.props.sidebarOpen(true)}>
            <Menu width={50}  />
          </div>
        </div>
      </div>
      <div className="col-4 header_center">
        <NavLink to="/" exact={true} > <img src={logo} alt="" /> </NavLink>
      </div>
      <div className="col-4 header_right" ref={node => { this.node = node; }}>
        <ul>
          <li>
            <div className="search_c" onClick={this.handleClick}>
              <Search width={35}  />
            </div>
            { this.state.popupVisible ? (
            <div className="light_search_box_cnt">
              <div className="light_search_box">
                <Search width={30} />
                <Searchinput hideSearch={this.handleClick}/>
                <div className="close_search" onClick={this.handleClick}>
                  <Remove width={20}  />
                </div>
              </div>
            </div>
            ):
            (
            null
            )
            } </li>
          <li> {!this.state.isCartOpen &&
            <div className="cart_icon" onClick={()=> this.props.openCartSlide(true)}>
              <ShoppingBag width={35}  />
              {(this.props.cartCount > 0) ? <span className="cartCount">({this.props.cartCount})</span> : null }</div>
            } </li>
        </ul>
      </div>
    </div>
  </div>
</header>
);
  }
}
 
export default Header; 