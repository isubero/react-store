import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Products from './components/Products/Products';
import Product from './components/Product/Product';
import Checkout from './components/Checkout/Checkout';
import ThankYou from './components/ThankYou/ThankYou';
import {MyProvider} from './cartContext';

class App extends Component {
  render() {
    return (
      <MyProvider>
        <Router>
          <Layout>
            <Route exact path="/" component={Products} />
            <Route path="/product/:id" component={Product} />
            <Route exact path="/checkout" component={Checkout} />
            <Route exact path="/thank-you" component={ThankYou} />
          </Layout>
        </Router>
      </MyProvider>
    );
  }
}

export default App;