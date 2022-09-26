import React from "react";
import classes from './Header.module.css';


import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';
import MobileNavigation from './MobileNavigation/MobileNavigation'


export default function Header(props) {

    return (
        <header style={{height : '15%'}}>
            <div className={classes.HeaderContainer}>
                <Logo></Logo>
                <nav>
                    {props.mobile ? <MobileNavigation></MobileNavigation> : <Navigation></Navigation>}
                </nav>
            </div>
        </header>
    );
}