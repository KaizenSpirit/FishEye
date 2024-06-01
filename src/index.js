import { getPhotographers } from './api/api.js';
import PhotographerFactory from './factories/PhotographerFactory.js'; // Ajout de cette ligne pour importer PhotographerFactory

async function DisplayPhotographers() {
  const photographers = await getPhotographers();
  renderPhotographers(photographers);
}

function renderPhotographers(photographers) {
  const photographersSection = document.querySelector(".photographer_section");
  photographersSection.innerHTML = ""; // Clear previous entries if any
  photographers.forEach(photographer => {
    const photographerModel = PhotographerFactory.createPhotographer(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

DisplayPhotographers();