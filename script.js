const imageContainer = document.getElementById('imageContainer');
const loader = document.getElementById('loader');

let imageArray=[];
let imagesLoaded=0;
let totalImages=0;
let ready = false;

//Unsplash API 

const count=5;
const apiKey='ue2F9gJrK6t-RZLbTeO-QGQe72OmwWppaHWOg0bztZs';
const apiUrl=`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//check if all images are loaded
function imageLoaded(){
    imagesLoaded++;
    if(imagesLoaded==totalImages){
        ready=true;
        loader.hidden=true;
        count=30;
    }

}
//Helper Function to Set Attribute on DOM elements
function setAttributes(element,attributes){
    for (const key in attributes) {
        element.setAttribute(key,attributes[key]);
        }
    }

// Create Elements for Links & Images, Add to DOM
function displayImages(){
    imagesLoaded=0;
    totalImages=imageArray.length;
    //Run function for each object in imageArray
    imageArray.forEach((image)=> {
        //create <a> link to unsplash
        const item = document.createElement('a');
        // item.setAttribute('href',image.links.html);
        // item.setAttribute('target','_blank');
        setAttributes(item,{
            href:image.links.html,
            target:'_blank'
        })
        //create <img> for images
        const img= document.createElement('img');
        // img.setAttribute('src',image.urls.regular);
        // img.setAttribute('alt',image.alt_description);
        // img.setAttribute('title',image.alt_description);
        setAttributes(img, {
            src:image.urls.regular,
            alt:image.alt_description,
            title:image.alt_description
        })

        //Event listner, check when each is finished loading
        img.addEventListener('load',imageLoaded)

        //Put <img> inside <a>, then put both inside imageContainer element
        item.appendChild(img);
        imageContainer.appendChild(item);
    })
}

//get Imahges from Unsplash API
async function getImages(){
    try {
        const response= await fetch(apiUrl);
        imageArray = await response.json();
        displayImages();
    } catch (error) {
        //Error
    }
}

//Check to see if scrolling near bottom of page, load more images
window.addEventListener('scroll',()=> {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight-1000 && ready){
        ready=false;
        getImages();
    }
})


//on load
getImages();