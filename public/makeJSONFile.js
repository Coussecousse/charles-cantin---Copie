const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');

// Création des routes vers les fichiers
const dirPathGallery  = path.join(__dirname, "../data/gallery");
const dirPathServices = path.join(__dirname, "../data/services");
const dirPathGlobal   = path.join(__dirname, "../data/global");

let galleryList       = [];
let servicesList      = [];
let globalList        = [];

let allFiles          = [
    {
        path : dirPathGallery,
        list : galleryList,
        fileName : 'gallery'
    },
    {
        path : dirPathServices,
        list : servicesList, 
        fileName : 'services'
    },
    {
        path : dirPathGlobal,
        list : globalList,
        fileName : 'global'
    }
]

// Fonction pour récupérer les données de chaque image et en faire des données json : 
const getGalleryImages = (path, list, fileName) => {
    fs.readdir(path, (err, files) => {
        if (err) {
            return console.log("Failed to lst contents of directory : " + err)
        };
        let ilist = [];
        files.forEach((file, i) => {
            let obj = {};
            fs.readFile(`${path}/${file}`, "utf8", (err, contents) => {
                const getMetadataIndices = (acc, element, i) => {
                    if (/^---/.test(element)) {
                        acc.push(i);
                    }
                    return acc;
                }
                const parseMetadata = ({lines, metadataIndices}) => {
                    if (metadataIndices.length > 0) {
                        let metadata = lines.slice(metadataIndices[0] + 1, metadataIndices[1]);
                        metadata.forEach(line => {
                            obj[line.split(' : ')[0]] = line.split(': ')[1];
                        })
                        return obj;
                    }
                }
                
                const lines = contents.split('\n');
                const metadataIndices = lines.reduce(getMetadataIndices, []);
                metadata = parseMetadata({lines, metadataIndices});
                switch(fileName) {
                    case 'gallery': 
                        object  = {
                            id : uuidv4(),
                            pic : metadata.pic,
                            alt : metadata.alt,
                            categories : metadata.categorie,
                            size : metadata.size,
                            posX : metadata.posX,
                            posY : metadata.posY,
                            posXMobile : metadata.posXMobile,
                            posYMobile : metadata.posYMobile,
                            placeRow : metadata.placeRow,
                            placeColumn : metadata.placeColumn
                        };
                        break;
                    case 'services' : 
                        object = {
                            id : uuidv4(),
                            pic : metadata.pic,
                            size : metadata.size,
                            posX : metadata.posX,
                            posY : metadata.posY,
                            posXMobile : metadata.posXMobile,
                            posYMobile : metadata.posYMobile,
                            title : metadata.title,
                            price : metadata.price,
                            content : metadata.content,
                        }
                        break;
                    case 'global' : 
                        let pos = [metadata.posXMobileHome, metadata.posYMobileHome].join(' ')
                        object = {
                            siteTitle : metadata.siteTitle,
                            homeTitle : metadata.homeTitle,
                            sousHomeTitle : metadata.sousHomeTitle,
                            logoHeader : metadata.logoHeader,
                            logoFooter : metadata.logoFooter,
                            fb : metadata.fb, 
                            insta : metadata.insta,
                            picHome : metadata.picHome,
                            posXYMobileHome : pos,
                            picContact : metadata.picContact,
                            posXMobileContact : metadata.posXMobileContact,
                            posYMobileContact : metadata.posYMobileContact,
                        }
                        break;
                    default : 
                        console.log('Error in json files');
                }
                list.push(object);
                ilist.push(i);
                if (ilist.length == files.length) {
                    let data = JSON.stringify(list);
                    fs.writeFileSync(`src/${fileName}.json`, data)
                }
            })
        })
    })
    return;
}

for (let i = 0; i < allFiles.length; i++){
    getGalleryImages(allFiles[i].path, allFiles[i].list, allFiles[i].fileName);
}