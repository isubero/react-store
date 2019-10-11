import React from 'react';
import classes from './ThankYou.module.css';

const ThankYou = (props) => {

    return (
        <div className={classes.thankYouPage}>
            <h1>¡Gracias por tu compra!</h1>

            Pedido #{props.location.state.number} | {props.location.state.date_paid}

            <table className={classes.orderTable}>
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Precio</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        props.location.state.line_items.map(item => {
                            return (
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.price}</td>
                                </tr>
                            )
                        })
                    }
                    
                    <tr>
                        <td colSpan="2">Envío:</td>
                        <td>{props.location.state.shipping_total}</td>
                    </tr>

                    <tr>
                        <td colSpan="2">Método de Pago:</td>
                        <td>{props.location.state.payment_method_title}</td>
                    </tr>

                    <tr>
                        <td colSpan="2">Total:</td>
                        <td>{props.location.state.currency + ' ' + props.location.state.total}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
};

export default ThankYou;