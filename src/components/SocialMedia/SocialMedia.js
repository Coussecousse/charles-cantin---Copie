import React from "react";

import data from '../../global.json'

export default function SocialMedia() {
    return(
        <>
            <a href={data[0].fb} target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-facebook"></i></a>
            <a href={data[0].insta} target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-instagram"></i></a>
        </>
    )
}