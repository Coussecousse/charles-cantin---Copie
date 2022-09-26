import React from "react";
import { NavLink } from "react-router-dom";

import paths from '../../config/paths';
import data from '../../global.json';


export default function Logo() {

    return (
        <>
            <NavLink to={paths.HOME} className={({isActive}) => (isActive ? '' : '' )}>
                <img src={data[0].logoHeader} alt="Logo Charles Cantin"></img>
            </NavLink>
        </>
    )
}