import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Products from './components/Products/Products';
import Product from './components/Product/Product';
import Checkout from './components/Checkout/Checkout';
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
          </Layout>
        </Router>
      </MyProvider>
    );
  }
}

export default App;
