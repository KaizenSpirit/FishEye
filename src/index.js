import { getPhotographers } from './api/api.js';
import Photographer from './models/photographer.js'; 

export async function renderPhotographers() {
  const photographers = await getPhotographers();
  const photographersSection = document.querySelector(".photographer_section");
  photographersSection.innerHTML = ""; 
  photographers.forEach(photographer => {
    const photographerModel = new Photographer(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

renderPhotographers();