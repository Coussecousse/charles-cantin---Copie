import React from "react";
import { NavLink } from "react-router-dom";

export default function NavigationItem(props) {
    return (
        <li>
            <NavLink to={props.to} className={({isActive}) => (isActive ? 'link active' : 'link' )}>{props.children}</NavLink>
        </li>
    )
}