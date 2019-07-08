import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import classes from './Products.module.css';

class Products extends Component {
    state = {
        loading: true,
        products: []
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
            console.log(response.data);
            this.setState({
                loading: false,
                products: response.data
            });
        } );
    }

    render() {

        if ( ! this.state.loading ) {
            const products = this.state.products.map(product => {
                return (
                    <div key={product.id} className={classes.productCard} product={product}>
                        <div className="productImage">
                            <Link to={{
                                pathname: `/product/${product.id}`,
                                state: { product: {...product} }
                            }}>
                                <img className={classes.productImg} src={product.images[0].src} alt={product.images[0].name} width="200" />
                            </Link>
                        </div>
                        <div className="productName">{product.name}</div>
                        <div className="productPrice">{product.price}€</div>
                    </div>
                )
            });

            return <div className={classes.productsList}>{products}</div>;
        } else {
            return 'Loading...';
        }
    }
}

export default Products;