import React, { Component } from 'react';
import { myContext } from '../../cartContext';

class Product extends Component {

    static contextType = myContext;

    componentDidMount() {
        console.log( this.props.location.state.product );
        console.log( this.context );
    }

    render() {
        return (
            <div>
                <img className="productImage" src={this.props.location.state.product.images[0].src} alt={this.props.location.state.product.name} />
                <h1 className="productTitle">{this.props.location.state.product.name}</h1>
                <div className="productDescription">
                    {this.props.location.state.product.short_description.replace(/(<([^>]+)>)/ig,"")}
                </div>
                <button 
                    onClick={ (event) => {this.context.addToCart( this.props.location.state.product )} }
                    >
                    Add to cart
                </button>
                <div>
                    <h3>Cart</h3>
                    { this.context.state.items.map(item => ( 
                        <div key={item.id} className="productCartCard">{item.name} / Cantidad:{item.quantity}</div> 
                    )) }
                </div>
            </div>
        );
    }
}

export default Product;
