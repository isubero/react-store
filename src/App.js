import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Products from './components/Products/Products';
import Product from './components/Product/Product';
import Layout from './components/Layout/Layout';
import {MyProvider} from './cartContext';

class App extends Component {
  render() {
    return (
      <MyProvider>
        <Layout>
          <Router>
            <Route exact path="/" component={Products} />
            <Route path="/product/:id" component={Product} />
          </Router>
        </Layout>
      </MyProvider>
    );
  }
}

export default App;
