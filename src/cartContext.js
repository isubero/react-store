import React, { Component } from 'react';

// Create a context
export const myContext = React.createContext();

// Create a provider component
export class MyProvider extends Component {
  state = {
    items: [],
    subtotal: 0
  }

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

        this.setState(newState);
        return;
    }

    const formattedProduct = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0].src,
        quantity: 1
    }

    const newState = {...this.state};
    newState.items.push(formattedProduct);
    this.setState(newState);

    console.log(formattedProduct);
  }

  render() {
    return (
      <myContext.Provider value={{ state: this.state, addToCart: this.addToCart }}>
        {this.props.children}
      </myContext.Provider>
    )
  }
}