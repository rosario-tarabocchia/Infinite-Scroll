const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let photosArray = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

// Unsplash API
const count = 30;
const apiKey = "API";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}

// Helper function to set attributes
function setAttributes(element, attributes){
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Create Photo Elements
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log('total', totalImages);
    
    photosArray.forEach((photo) => {
        const item = document.createElement("a");
        setAttributes(item, {
            href: photo.links.html,
            target: "_blank"
         });
        const img = document.createElement("img");
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.description,
            title: photo.description

        });
        // Check When each photo is loaded
        img.addEventListener("load", imageLoaded);
        // Image inside anchor -> into ImageContainer
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get Photos from API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();        
    } catch (error) {
        
    }
}

// Check scroll
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false; 
        getPhotos();
    }
});

// On Load

getPhotos();