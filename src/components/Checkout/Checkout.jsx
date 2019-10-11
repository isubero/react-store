import React, { Component } from 'react';
import classes from './Checkout.module.css';
import axios from 'axios';
import { myContext } from '../../cartContext';

class Checkout extends Component {

    static contextType = myContext;

    state = {
        payment_method: 'bacs',
        payment_method_title: 'Direct Bank Transfer',
        set_paid: true,
        first_name: '',
        last_name: '',
        address_1: '',
        address_2: '',
        city: '',
        state: 'O',
        postcode: '',
        country: 'ES',
        email: '',
        phone: '',
        line_items: [],
        shipping_lines: {
            method_id: 'flat_rate',
            method_title: 'Flat Rate',
            total: 10
        }
    }

    handleChange = e => {
        const { name, type, value } = e.target;
        const val = type === 'number' ? parseFloat(value) : value;
        this.setState({ [name]: val });
    }

    formatLineItems = () => {
        let lineItems = [];

        this.context.state.items.forEach(item => {
            lineItems.push({
                product_id: item.id,
                quantity: item.quantity
            })
        });

        return lineItems;
    }

    handleSubmit = e => {
        e.preventDefault();
        
        axios({
            method: 'post',
            url: 'https://tienda.isaias.io/wp-json/wc/v3/orders',
            data: {
                payment_method: this.state.payment_method,
                payment_method_title: this.state.payment_method_title,
                set_paid: true,
                billing: {
                    first_name: this.state.first_name,
                    last_name: this.state.last_name,
                    address_1: this.state.address_1,
                    address_2: this.state.address_2,
                    city: this.state.city,
                    state: this.state.state,
                    postcode: this.state.postcode,
                    country: this.state.country,
                    email: this.state.email,
                    phone: this.state.phone
                },
                shipping: {
                    first_name: this.state.first_name,
                    last_name: this.state.last_name,
                    address_1: this.state.address_1,
                    address_2: this.state.address_2,
                    city: this.state.city,
                    state: this.state.state,
                    postcode: this.state.postcode,
                    country: this.state.country
                },
                line_items: this.formatLineItems()
            },
            auth: {
                username: process.env.REACT_APP_WOO_PUBLIC,
                password: process.env.REACT_APP_WOO_SECRET
            }
        })
        .then( response => {
            console.log(response.data);
            this.props.history.push('/thank-you', response.data);
        })
        .catch(error => {
            console.log(error);
        })
    }

    render() {
        return (
            <React.Fragment>
                <form action="" className={classes.checkoutForm} onSubmit={this.handleSubmit}>
                    <h1>Finalizar compra</h1>

                    <div className={classes.formGroup}>
                        <label htmlFor="first_name">Nombre</label>
                        <input type="text" name="first_name" value={this.state.first_name} onChange={this.handleChange} />
                    </div>
                    <div className={classes.formGroup}>
                        <label htmlFor="last_name">Apellido</label>
                        <input type="text" name="last_name" value={this.state.last_name} onChange={this.handleChange} />
                    </div>
                    <div className={classes.formGroup}>
                        <label htmlFor="phone">Teléfono</label>
                        <input type="text" name="phone" value={this.state.phone} onChange={this.handleChange} />
                    </div>
                    <div className={classes.formGroup}>
                        <label htmlFor="email">Correo electrónico</label>
                        <input type="text" name="email" value={this.state.email} onChange={this.handleChange} />
                    </div>
                    <div className={classes.formGroup}>
                        <label htmlFor="country">País</label>
                        <select name="country" value={this.state.country} onChange={this.handleChange}>
                            <option value="ES">España</option>
                        </select>
                    </div>
                    <div className={classes.formGroup}>
                        <label htmlFor="address_1">Dirección de la calle</label>
                        <input type="text" name="address_1" value={this.state.address_1} onChange={this.handleChange} placeholder="Nombre de la calle y número de la casa" />
                    </div>
                    <div className={classes.formGroup}>
                        <input type="text" name="address_2" value={this.state.address_2} onChange={this.handleChange} placeholder="Apartamento, habitación, etc. (opcional)" />
                    </div>
                    <div className={classes.formGroup}>
                        <label htmlFor="postcode">Código postal</label>
                        <input type="text" name="postcode" value={this.state.value} onChange={this.handleChange} />
                    </div>
                    <div className={classes.formGroup}>
                        <label htmlFor="city">Localidad / Ciudad</label>
                        <input type="text" name="city" value={this.state.city} onChange={this.handleChange} />
                    </div>
                    <div className={classes.formGroup}>
                        <label htmlFor="state">Provincia</label>
                        <select name="state" onChange={this.onChange}>
                            <option value="O">Asturias</option>
                        </select>
                    </div>
                    <input className={classes.checkoutBtn} type="submit" value="Realizar el pedido" />
                </form>
            </React.Fragment>
        )
    }
}

export default Checkout;