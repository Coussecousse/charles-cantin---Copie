import React from "react";

import Photo from './Photo/Photo';
import galleryPics from '../../../gallery.json'

export default function Photos() {
    return(     
        galleryPics.map(photo => (
            <Photo src={photo.pic} 
                   key={photo.id} 
                   alt={photo.alt} 
                   size={photo.size} 
                   posRow={photo.placeRow === undefined ? 'auto' : photo.placeRow} 
                   posColumn={photo.placeColumn === undefined ? 'auto' : photo.placeColumn}
                   posImg={photo.posX + ' ' + photo.posY}></Photo>
        ))
        
    );
}