import React from "react";

export default function Categorie(props){
    
    return(
        <li><button style={props.styling ? {display: 'none'} : {}} onClick={props.filterClick}id="filter-button">{props.children}</button></li>
    )
}