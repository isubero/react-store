import React from 'react';
import Cart from '../Cart/Cart';
import classes from './Layout.module.css';

const Layout = (props) => {
    return (
        <div className={classes.appLayout}>
            <div className="menu">
                APP MENU
            </div>
            <div className={classes.page}>
                <main className={classes.main}>
                    {props.children}
                </main>
                <div className={classes.cartWrapper}>
                    <Cart />
                </div>
            </div>
        </div>
    )
}

export default Layout;