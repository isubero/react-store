import React, { Component } from 'react';
import { myContext } from '../../cartContext';
import classes from './Product.module.css';

class Product extends Component {

    static contextType = myContext;

    componentDidMount() {
        console.log( this.props.location.state.product );
    }

    render() {
        return (
            <div className={classes.productPage}>
                <div className={classes.imageCol}>
                    <img className={classes.productImage} src={this.props.location.state.product.images[0].src} alt={this.props.location.state.product.name} />
                </div>
                <div className={classes.infoCol}>
                    <h1 className="productTitle">{this.props.location.state.product.name}</h1>
                    <div className={classes.price}>{this.props.location.state.product.price}<span className={classes.currency}>€</span></div>
                    <div className="productDescription">
                        {this.props.location.state.product.short_description.replace(/(<([^>]+)>)/ig,"")}
                    </div>
                    <button 
                        className={classes.addToCartBtn}
                        onClick={ (event) => {this.context.addToCart( this.props.location.state.product )} }
                        >
                        Añadir al carrito
                    </button>
                </div>
            </div>
        );
    }
}

export default Product;
