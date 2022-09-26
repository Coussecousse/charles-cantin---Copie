import React, {useState, useEffect} from "react";
import { useSearchParams } from "react-router-dom";
import classes from './Gallery.module.css'

import Filter from './Filter/Filter';
import Photos from './Photos/Photos';
import galleryData from '../../gallery.json';


function removeFromIndex(elementToScan, elementToRemove){
    const index = elementToScan.indexOf(elementToRemove);
    elementToScan.splice(index, 1);
}

export default function Gallery() {
    let currentURL, currentSort, input;
    const [searching, setSearching]       = useState(false);
    const [InputValue, setInputValue]     = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const [categories, setCategories]     = useState([]);
    const [filtredCategories, setFiltredCategories] = useState([]);

    function getCurrentSort(container=[]){
        currentURL  = Object.fromEntries([...searchParams]);
        currentSort = currentURL.sort;
        
        if (currentSort === undefined){
            setFiltredCategories([]);
            restaureCategorie(container);
            container = [...new Set(container)];
            setCategories(container);
            return;
        }
        currentSort = currentSort.split('+');
    }
    function restaureCategorie(container) {
        galleryData.forEach((photo) => {
            let multipleCategories = photo.categories;

            multipleCategories = multipleCategories.split(" ");
            for (let categorie of multipleCategories){
                categorie = categorie.split('');
                categorie = categorie.filter(item => item !== '\r');
                categorie = categorie.join('');
                container.push(categorie);
            }            
        })
        
    }
    useEffect(() => {
        let newCategorie = [];

        getCurrentSort();

        if (currentSort === ''){
            setSearchParams({});
            return;
        } else if (currentSort === undefined){
            return;
        }
        
        let newFiltredCategories = [];

        const getFiltredCategorie = () => {
            for (let categorie of currentSort){
                categorie    = categorie.split('');
                categorie[0] = categorie[0].toUpperCase();
                categorie    = categorie.join('');
                newFiltredCategories.push(categorie);
            }
        }
        getFiltredCategorie();

        restaureCategorie(newCategorie);
        newCategorie = [...new Set(newCategorie)];

        // Remove filtred catégories from all list catégories
        for (let removeCategorie of newFiltredCategories){
            removeFromIndex(newCategorie, removeCategorie);
        }

        setFiltredCategories(newFiltredCategories);
        setCategories(newCategorie);
        
    }, [searchParams]);

    function closeFilter(e) {
        input       = document.querySelector('#filter');    
        let buttons = document.querySelectorAll('#filter-button');

        if (buttons.length > 0 || e.target === input){
            if (e.target === input) {
                setSearching(true);
            } else {
                let result;
                buttons.forEach(button => {
                    if (e.target === button){
                        result   = true;
                    }
                })
                if (result ===  true){
                    setSearching(true);
                } else {
                    setSearching(false);
                }
            }
        } else {
            setSearching(false);
        }
    }    

    function handleChange(e) {
        setInputValue(e.target.value);
    }

    function handleRemoveCategorie(e) {
        let categorieToRemove = (e.target.previousSibling);

        const getCategorieToRemove = () => {
            if (categorieToRemove == null){
                categorieToRemove  = (e.target.parentElement.previousSibling);
            }
            categorieToRemove = categorieToRemove.textContent;
        }
        const removeTheCategorieInURL = () => {
            categorieToRemove = categorieToRemove.toLowerCase();

            getCurrentSort();

            removeFromIndex(currentSort, categorieToRemove);
            currentSort = currentSort.join('+');
        }

        getCategorieToRemove();
        removeTheCategorieInURL();
        
        setSearchParams({ sort: currentSort });
    }

    function handleAddFilter(e) {
        let chosenCategorie = e.target.innerHTML;

        currentURL      = Object.fromEntries([...searchParams]);

        chosenCategorie = chosenCategorie.toLowerCase();

        if (Object.keys(currentURL).length === 0){
            setSearchParams({ sort: chosenCategorie });
        } else {
            const oldSort = currentURL.sort;
            setSearchParams({ sort: oldSort + '+' + chosenCategorie});
        }
        setSearching(true);
    };

    return(
        <main onClick={closeFilter}>
            <h1 className="titleSection">Galerie</h1>
            <div className={classes.GalleryContainer} id="container">
                <Filter searching={searching} 
                        change={handleChange} 
                        value={InputValue} 
                        filtredCategories = {filtredCategories}
                        filterClick={handleAddFilter}
                        removeCategorie={handleRemoveCategorie}
                        categories={categories}></Filter>
                <div className={classes.PicsContainer}>
                    <Photos></Photos>
                </div>
            </div>
        </main>
    );
}