import React from 'react';
import classes from './cartItem.module.css';

const CartItem = (props) => (
    <li className={classes.cartItem}>
        <div>
            <img className={classes.itemImage} src={props.item.image} alt={props.item.name} />
        </div>
        <div className={classes.itemDetails}>
            <div className={classes.itemName}>{props.item.name}</div>
            <div className={classes.priceAndQuantity}>
                <span>{props.item.quantity} x</span>
                <span className={classes.price}>{props.item.price}€</span>
            </div>
        </div>
    </li>
);

export default CartItem;