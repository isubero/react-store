import React, { Component } from 'react';
import axios from 'axios';

// Create a context
export const myContext = React.createContext();

// Create a provider component
export class MyProvider extends Component {
  state = {
    storeProducts: [],
    items: [],
    subtotal: 0
  }

  componentDidMount() {
      // Get products
      axios({
        method: 'get',
        url: 'https://tienda.isaias.io/wp-json/wc/v1/products',
        auth: {
            username: process.env.REACT_APP_WOO_PUBLIC,
            password: process.env.REACT_APP_WOO_SECRET
        }
    })
    .then( response => {
        console.log('Store products:', response.data);
        this.setState({
            storeProducts: response.data
        });

        console.log(response.data);
    } );
  }

  // ADD TO CART
  addToCart = (product) => {

    // Check if product is already in the cart
    let exists = this.state.items.filter(item => item.id === product.id);
    
    // If exists update quantity
    if ( exists.length > 0 ) {
        const newState = { ...this.state };
        newState.items.forEach( item => {
            if ( item.id === exists[0].id ) {
                item.quantity = item.quantity + 1;
            }
        });

        newState.subtotal = this.calculateSubtotal();
        this.setState(newState);
        return;
    }

    // If product is NOT in the cart, add it.
    const formattedProduct = {
        id: product.id,
        name: product.name,
        price: parseFloat(product.price),
        image: product.images[0].src,
        quantity: 1
    }

    const newState = {...this.state};
    newState.items.push(formattedProduct);
    newState.subtotal = this.calculateSubtotal();
    this.setState(newState);
  }

  // CALCULATE SUBTOTAL
  calculateSubtotal = () => {
    let subtotal = 0;

    this.state.items.forEach(item => {
      subtotal = subtotal + ( item.price * item.quantity );
    });

    subtotal = this.round(subtotal, 2);
    return subtotal;
  }

  // ROUND HELPER
  round = (value, decimals) => {
    return Number( Math.round(value+'e'+decimals)+'e-'+decimals );
  }

  render() {
    return (
      <myContext.Provider value={{ state: this.state, addToCart: this.addToCart }}>
        {this.props.children}
      </myContext.Provider>
    )
  }
}