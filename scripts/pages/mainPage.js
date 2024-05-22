import PhotographerFactory from '../factories/PhotographerFactory.js';
import { fetchPhotographers } from '../api/api.js';

async function loadAndDisplayPhotographers() {
    const photographers = await fetchPhotographers();
    displayPhotographers(photographers);
}
async function displayPhotographers(photographers) {
    const photographersSection = document.querySelector(".photographer_section");
    photographers.forEach((photographer) => {
        const photographerModel = PhotographerFactory.createPhotographer(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);

        userCardDOM.addEventListener('click', () => {
            localStorage.setItem('selectedPhotographer', JSON.stringify(photographer));
            window.location.href = 'photographer.html';
        });
    });
}

loadAndDisplayPhotographers();

