import React, { Component } from 'react';
import { myContext } from '../../cartContext';
import CartItem from '../CartItem/CartItem';
import classes from './Cart.module.css';

class Cart extends Component {

    static contextType = myContext;

    componentDidMount() {
        console.log( 'cart context', this.context );
    }

    itemsCount = () => {
        let count = 0;

        this.context.state.items.forEach(item => {
            count = count + item.quantity;
        });

        if ( count === 0 ) {
            return 'No items';
        } 
        else if ( count > 1 ) {
            return count + ' items en total';
        }else {
            return count + ' item';
        }
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
                <div className={classes.cartHeader}>
                <h3 className={classes.cartTitle}>Carrito</h3>
                <span className={classes.itemsCount}>{ this.itemsCount() }</span>
                </div>
                <ul className={classes.itemsList}>
                    { cartItems }
                </ul>

                <div className={classes.cartFooter}>
                    <div className={classes.subtotal}>
                        <div className={classes.subtotalAmount}>€{ this.context.state.subtotal }</div>
                        <span>Subtotal</span>
                    </div>
                    <button className={classes.payBtn}>Pagar ahora</button>
                </div>
            </div>
        )
    }
}

export default Cart;