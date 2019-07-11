import React, { useContext } from 'react';
import { myContext } from '../../cartContext';
import classes from './CartItem.module.css';

const CartItem = (props) => {

    const { removeFromCart } = useContext(myContext);

    return (
        <li className={classes.cartItem}>
            <div>
                <img className={classes.itemImage} src={props.item.image} alt={props.item.name} />
            </div>
            <div className={classes.itemDetails}>
                <div className={classes.itemName}>{props.item.name}</div>
                <div className={classes.priceAndQuantity}>
                    <span>{props.item.quantity} x</span>
                    <span className={classes.price}>{props.item.price}€</span>
                    <button className={classes.removeBtn} onClick={ () => removeFromCart(props.item.id) }>Eliminar</button>
                </div>
            </div>
        </li>
    )
};

export default CartItem;