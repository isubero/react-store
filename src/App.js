import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Products from './components/Products/Products';
import Product from './components/Product/Product';
import {MyProvider} from './cartContext';

class App extends Component {
  render() {
    return (
      <MyProvider>
        <div className="App">
            <Router>
              <Route exact path="/" component={Products} />
              <Route path="/product/:id" component={Product} />
            </Router>
        </div>
      </MyProvider>
    );
  }
}

export default App;
