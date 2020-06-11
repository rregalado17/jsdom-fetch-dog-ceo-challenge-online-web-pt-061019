console.log('%c HI', 'color: firebrick')

document.addEventListener('DOMContentLoaded', function() {
    loadImages();
    loadBreeds();
    dropDownFilter();
})

const imgURL = "https://dog.ceo/api/breeds/image/random/4"
const breedURL = "https://dog.ceo/api/breeds/list/all"

let allBreeds = []
let filterBreed = []

function loadImages() {
    return fetch(imgURL)
    .then(resp => resp.json())
    .then(json => addImageElements(json));
} // this fetch requests pulls the images from the API

function addImageElements(json) {
    let imagesContainer = document.getElementById('dog-image-container'); //creates a container to store images
    json.message.forEach(image => {
        let newImageElem = document.createElement('img'); //create an image element for each new image
        newImageElem.src = image;
        imagesContainer.appendChild(newImageElem); //connect the new image into the container that stores it
    });
}

function loadBreeds() {
    return fetch(breedURL)
    .then(resp => resp.json())
    .then(json => createBreedsArray(json));
}

function createBreedsArray(json) {
    allBreeds = Object.keys(json.message)
    listBreeds(allBreeds);
}

function listBreeds(breeds) {
    let dogBreedList = document.getElementById('dog-breeds');
    breeds.forEach(breed => {
        let newLiElem = document.createElement('li');
        newLiElem.textContent = breed;
        newLiElem.addEventListener('click', changeColor)
        dogBreedList.appendChild(newLiElem);
    })
}

function changeColor(event) {
    event.target.style.color = 'red';
}

function dropDownFilter() {
    const dropDownElem = document.getElementById('breed-dropdown')
    const dogBreedList = document.getElementById('dog-breeds');
    dropDownElem.addEventListener('change', function() {
        while (dogBreedList.firstChild) dogBreedList.removeChild(dogBreedList.firstChild);
        filterBreeds(this.value);
    })
}

function filterBreeds(letter) {
    filterBreed = [];
    filterBreed = allBreeds.filter(breed => breed[0] === letter);
    listBreeds(filterBreed);
}

