import React from "react";
import data from "../../global.json";
import classes from "./Home.module.css";

export default function Home(){

    return(
        <main className={classes.Home}>
            <div className={classes.TitleContainer}>
                <h1 className={classes.Title}>{data[0].homeTitle}</h1>
                <h2>{data[0].sousHomeTitle}</h2>
            </div>
        </main>
    )
}