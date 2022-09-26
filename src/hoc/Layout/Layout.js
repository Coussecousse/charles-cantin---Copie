import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import classes from './Layout.module.css'

import data from "../../global.json";
import Header from '../../components/Header/Header';
import Footer from "../../components/Footer/Footer";


export default function Layout(props){
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [mobile, setMobile] = useState(false);
    let resize;

    useEffect(() => {
        if (window.innerWidth < 768) {
            setMobile(true);
        } else {
            setMobile(false);
        }
    }, [windowWidth]);

    window.addEventListener('resize', () => {
        function resizeFunction() {
            console.log(windowWidth);
            console.log(window.innerWidth);
            console.log('resize');
            let widthState = window.innerWidth;
            setWindowWidth(widthState);
        }
        clearTimeout(resize);
        resize = setTimeout(resizeFunction, 100)
    })

    let location  = useLocation();
    const styleContainer = () => {
        if (mobile){
            return {
                minHeight : '100vh'
            }
        } else {
            return {
                minHeight : '90vh'
            }
        }
    }
    const getBackground = () => {
        switch(location.pathname){
            case '/': 
                if (mobile){
                    return {
                        backgroundImage : 'url(images/home.jpg)',
                        backgroundPosition: "68% 30%",
                        filter : 'blur(2px)',
                    }
                } else {
                    return {
                        backgroundImage :  'url(' + data[0].picHome +')',
                        backgroundSize : 'cover',
                        backgroundPosition: "center",
                        filter : 'blur(2px)',
                    };
                }
            case '/galerie' :
            case '/prestations' :
                return {
                    backgroundColor : 'var(--color-primary)',
                }
            case '/contact': 
            console.log('contact')
                if (mobile) {
                    return {
                        backgroundImage : 'url(' + data[0].picContact +')',
                        backgroundPosition : 'center',
                        filter : 'blur(2px)',
                    }
                } else {
                    return {
                        backgroundImage : 'url(' + data[0].picContact +')',
                        backgroundPosition : 'center',
                        filter : 'blur(2px)',
                    }
                }
            default : 
                return {
                    backgroundColor : '#fff',
                }
        }
    }
    return (
        <>
            <div className={classes.Container} style={styleContainer()}>
                <div className={classes.Background} style={getBackground()}></div>
                <div className={classes.ChildContainer}>
                    <Header mobile={mobile}></Header>
                    {props.children}
                </div>
            </div>
            {mobile ? null : <Footer></Footer>}
        </>
    )
}