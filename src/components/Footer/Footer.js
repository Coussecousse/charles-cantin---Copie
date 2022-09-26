import React from "react";
import { NavLink } from "react-router-dom";
import classes from './Footer.module.css'

// import Logo from "../Logo/Logo";
import Navigation from "../Navigation/Navigation";
import SocialMedia from '../SocialMedia/SocialMedia';
import data from '../../global.json'
import paths from "../../config/paths";

export default function Footer(){
    return(
        <footer style={{width : '100vw'}}>
            <div className={classes.FooterContainer}>
                <NavLink to={paths.HOME}><img src={data[0].logoFooter} alt="Logo appareil-photo" style={{height : '50px'}}></img></NavLink>
                <nav>
                    <Navigation></Navigation>
                </nav>
                <div className={classes.Media}>
                    <SocialMedia></SocialMedia>
                </div>
            </div>
        </footer>
    )
}