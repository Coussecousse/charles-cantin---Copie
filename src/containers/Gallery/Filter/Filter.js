import React from "react";
import classes from './Filter.module.css';

import Categories from './Categories/Categories';
import FiltredCategories from './FiltredCategories/FiltredCategories'

export default function Filter(props) {
    return(
        <div className={classes.Filter}>
                {props.filtredCategories.length > 0 ?  <FiltredCategories filtredCategories={props.filtredCategories} removeCategorie={props.removeCategorie}></FiltredCategories> : null}
            <div className={classes.InputDiv}>
                <input id="filter" type="text" name="filter" placeholder="Filter" onChange={props.change} autoComplete="off" className={props.searching ? classes.ActiveInput : null}/>
                {props.searching ? <Categories categories={props.categories} 
                                           value={props.value} 
                                           filterClick={props.filterClick}></Categories> : null}
            </div>

            </div>
    )
}