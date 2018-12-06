import React from "react"; 
import Index from './components/components/Home'; 
import Header from './components/components/header'; 
import Footer from './components/components/footer'; 
import Collection from './components/components/collection'; 
import Pro  from './components/components/product'; 
import client from './helpers/ShopifyClient';
import { LocalStorage } from './helpers/LocalStorage';
import Cart from './components/Cart';
import {
  BrowserRouter as Router,
  Route, 
  Switch,
  Redirect
} from "react-router-dom";

const WillMatch = () => {
  return <h3>Matched!</h3>;
}

const NoMatch = ({ location }) => {
  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
}
 
class Main extends React.Component {

  constructor() {
    super();
    this.lc = new LocalStorage();

    this.state = {
      isCartOpen: false,
      checkout: { lineItems: [] },
      products: [],
      shop: {}
    };

    this.handleCartClose = this.handleCartClose.bind(this);
    this.addVariantToCart = this.addVariantToCart.bind(this);
    this.updateQuantityInCart = this.updateQuantityInCart.bind(this);
    this.removeLineItemInCart = this.removeLineItemInCart.bind(this);
  }

  componentWillMount() {
    // client.checkout.create().then((res) => {
    //   this.setState({
    //     checkout: res,
    //   });
    // });
    const checkout = this.lc.getObject('checkout');
    console.info('************', this.props)
    if(checkout)
      this.setState({checkout});;

    client.product.fetchAll().then((res) => {
      this.lc.putObject('products', res);
      console.info('products: ', this.lc.getObject('products'))
      this.setState({
        products: res,
      });
    });

    client.shop.fetchInfo().then((res) => {
      this.lc.putObject('shop', res);
      this.setState({
        shop: res,
      });
    });
  }

  addVariantToCart(variantId, quantity){
    this.setState({
      isCartOpen: true,
    });

    const lineItemsToAdd = [{variantId, quantity: parseInt(quantity, 10)}]
    const checkoutId = this.state.checkout.id

    return client.checkout.addLineItems(checkoutId, lineItemsToAdd).then(res => {
      this.lc.putObject('checkout', res);
      this.setState({
        checkout: res,
      });
    });
  }

  updateQuantityInCart(lineItemId, quantity) {
    const checkoutId = this.state.checkout.id
    const lineItemsToUpdate = [{id: lineItemId, quantity: parseInt(quantity, 10)}]

    return client.checkout.updateLineItems(checkoutId, lineItemsToUpdate).then(res => {
      this.lc.putObject('checkout', res);
      this.setState({
        checkout: res,
      });
    });
  }

  removeLineItemInCart(lineItemId) {
    const checkoutId = this.state.checkout.id

    return client.checkout.removeLineItems(checkoutId, [lineItemId]).then(res => {
      this.lc.putObject('checkout', res);
      this.setState({
        checkout: res,
      });
    });
  }

  openCartSlide(isCartOpen) {
    this.setState({
      isCartOpen,
    });
  }

  handleCartClose() {
    this.setState({
      isCartOpen: false,
    });
  }
  
  home = () => 
    <Index 
    products={this.state.products}
    addVariantToCart={this.addVariantToCart}
    />
  singleProject = (path) => {
    const { match: { params } } = path;
		console.info('---------', params)
    return (
    <Pro 
    addVariantToCart={this.addVariantToCart}
    productId={params.productId}
    />
    )
  }
  Head = () => {
    return (
      <div>
        <Header openCartSlide={this.openCartSlide.bind(this)} />
        <Cart
          checkout={this.state.checkout}
          isCartOpen={this.state.isCartOpen}
          handleCartClose={this.handleCartClose}
          updateQuantityInCart={this.updateQuantityInCart}
          removeLineItemInCart={this.removeLineItemInCart}
        />
      </div>
    )
  }
  
  render() {
  return (
    <Router>
	<div className="fullwidth"> 
  <this.Head />
	<Switch>
	  <Route path="/" exact component={this.home} />
	  <Route path="/Product/:productId" component={this.singleProject} />
	  <Route path="/SaleArt" component={Collection} />
	  <Redirect from="/old-match" to="/will-match" />
	  <Route path="/will-match" component={WillMatch} />
	  <Route component={NoMatch} />
	</Switch>
      <Footer/>
      </div>
    </Router>
  );
  }
}

export default Main;