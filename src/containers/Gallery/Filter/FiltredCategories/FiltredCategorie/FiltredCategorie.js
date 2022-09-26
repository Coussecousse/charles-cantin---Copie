import React from "react";

export default function FiltredCategorie(props) {
    return(
        <li>
            <p>{props.children}</p>
            <button onClick={props.removeCategorie}><i className="fa-solid fa-xmark"></i></button>
        </li>
    )
}