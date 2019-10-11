import React, { Component } from 'react';
import { Link } from "react-router-dom";
import classes from './Products.module.css';
import { myContext } from '../../cartContext';

class Products extends Component {

    static contextType = myContext;

    componentDidUpdate() {
        console.log('Products context: ', this.context);
    }

    render() {

        if ( this.context.state.storeProducts.length > 0 ) {
            const products = this.context.state.storeProducts.map(product => {
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