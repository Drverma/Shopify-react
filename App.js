import React from "react"; 
import Index from './components/components/Home'; 
import Header from './components/components/header'; 
import Footer from './components/components/footer'; 
import Collection from './components/components/collection'; 
import Pro  from './components/components/product'; 
import client from './helpers/ShopifyClient';
import { LocalStorage } from './helpers/LocalStorage';
import Cart from './components/Cart';
import Sidebar from "react-sidebar";
import SidebarMenu from './components/components/sidebar';
import About from './components/static/About';
 
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
      shop: {},
      collections: [],
      artProducts: [],
      bestProducts: [],
      sidebarOpen: false
    };

    this.handleCartClose = this.handleCartClose.bind(this);
    this.addVariantToCart = this.addVariantToCart.bind(this);
    this.updateQuantityInCart = this.updateQuantityInCart.bind(this);
    this.removeLineItemInCart = this.removeLineItemInCart.bind(this);
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  componentWillMount() {
    const checkout = this.lc.getObject('checkout');
    console.info('************', checkout)
    if(checkout) {
      this.setState({checkout: checkout});;
    } else {
      client.checkout.create().then((res) => {
        this.setState({
          checkout: res,
        });
      });
    }
    // Fetch all collections, including their products
    client.collection.fetchAllWithProducts().then((collections) => {
      // Do something with the collections
      this.lc.putObject('collections', collections);
      console.log('collections',collections);
      this.setState({collections})
    });

    client.product.fetchAll().then((res) => {
      this.lc.putObject('products', res);
      console.info('products: ', this.lc.getObject('products'))
      this.setState({
        products: res,
      });
    });

    const lcCollections = this.lc.getObject('collections');
    if(lcCollections) {
      const bestCollection = lcCollections.find( bestcollect => bestcollect.id === 'Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzg5MjE4MzUxMTkz' );
      if(bestCollection) {
        this.setState({bestProducts: bestCollection.products})
        this.lc.putObject('bestProducts', bestCollection.products)
      }

      const artProducts = lcCollections.find( artcollect => artcollect.id === 'Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzg5MDI2Nzg5NDY1' );
      if(artProducts) {
        this.setState({artProducts: artProducts.products})
        this.lc.putObject('artProducts', artProducts.products)
      }
        
    } else {

      client.collection.fetchWithProducts( 'Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzg5MjE4MzUxMTkz').then((bastcollection) => {
        this.lc.putObject('bestProducts', bastcollection.products);
        this.setState({
          bestProducts: bastcollection.products,
        });
      });

      client.collection.fetchWithProducts( 'Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzg5MDI2Nzg5NDY1').then((artcollection) => {
        this.lc.putObject('artProducts', artcollection.products);
        this.setState({
          artProducts: artcollection.products,
        });
      });
    }
  

    client.shop.fetchInfo().then((res) => {
      this.lc.putObject('shop', res);
      this.setState({
        shop: res,
      });
    });
  }

  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
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
    bestProducts={this.state.bestProducts}
    artProducts={this.state.artProducts}
    addVariantToCart={this.addVariantToCart}
    />
  singleProject = (path) => {
    const { match: { params } } = path;
		console.info('PARAMS: ', params)
    return (
    <Pro 
    addVariantToCart={this.addVariantToCart}
    productId={params.productId}
    {...path}
    />
    )
  }

  getCollection = (path) => {
    const { match: { params } } = path;
    console.info('PARAMS: ', params)
    return (
      <Collection collectionId={params.collection} {...path} addVariantToCart={this.addVariantToCart}/>
    )
  }

  Head = () => {
    return (
      <div>
        <Header 
          openCartSlide={this.openCartSlide.bind(this)} 
          cartCount={this.state.checkout.lineItems.length}
          collections={this.state.collections}
          sidebarOpen={this.onSetSidebarOpen}
        />
        <Cart
          checkout={this.state.checkout}
          cartCount={this.state.cartCount}
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
    <Router onUpdate={() => window.scrollTo(0, 0)}>
	<div className="fullwidth"> 
  <Sidebar
    sidebar={<SidebarMenu sidebarOpen={this.onSetSidebarOpen}/>}
    open={this.state.sidebarOpen}
    onSetOpen={this.onSetSidebarOpen}
    styles={{ sidebar: { background: "white" } }}
  >
  <this.Head />
	<Switch>
	  <Route path="/" exact component={this.home} />
	  <Route path="/Product/:productId" component={this.singleProject} />
	  {/* <Route path="/SaleArt" component={Collection} /> */}
	  <Redirect from="/old-match" to="/will-match" />
	  <Route path="/will-match" component={WillMatch} />
	  <Route path="/about" component={About} />
    <Route path="/:collection" component={this.getCollection} />
	  <Route component={NoMatch} />
	</Switch>
      <Footer/>
      </Sidebar>
      </div>
    </Router>
  );
  }
}

export default Main;