import React, { Component } from 'react';
import { myContext } from '../../cartContext';
import CartItem from '../CartItem/CartItem';
import classes from './Cart.module.css';

class Cart extends Component {

    static contextType = myContext;

    componentDidMount() {
        console.log( 'cart context', this.context );
    }

    render() {

        let cartItems = null;

        if ( this.context.state.items.length > 0 ) {
            cartItems = this.context.state.items.map(item => (
                <CartItem key={item.id} item={item} />
            ))
        } else {
            cartItems = 'Añade un producto al carrito.';
        }

        return (
            <div className={classes.cart}>
                <h3>Carrito</h3>
                <ul className={classes.itemsList}>
                    { cartItems }
                </ul>

                <div>
                    Subtotal: €{ this.context.state.subtotal }
                </div>
                <button>Pagar ahora</button>
            </div>
        )
    }
}

export default Cart;