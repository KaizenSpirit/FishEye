import { getPhotographers } from './api/api.js';
import PhotographerFactory from './factories/PhotographerFactory.js'; 

export async function DisplayPhotographers() {
  const photographers = await getPhotographers();
  renderPhotographers(photographers);
}
export function renderPhotographers(photographers) {
  const photographersSection = document.querySelector(".photographer_section");
  photographersSection.innerHTML = ""; 
  photographers.forEach(photographer => {
    const photographerModel = PhotographerFactory.createPhotographer(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

DisplayPhotographers();
