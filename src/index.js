import { getPhotographers } from './api/api.js';
import Photographer from './models/photographer.js'; 

export async function renderPhotographers() {// fetch and render photographers
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



//Plus logique pour la séparation des préoccupations ? 

// export async function DisplayPhotographers() {
//   const photographers = await getPhotographers();
//   renderPhotographers(photographers);
// }

// export function renderPhotographers(photographers) { // tableau de paramètres en argument
//   const photographersSection = document.querySelector(".photographer_section");
//   photographersSection.innerHTML = ""; 
//   photographers.forEach(photographer => {
//     const photographerModel = new Photographer(photographer);
//     const userCardDOM = photographerModel.getUserCardDOM();
//     photographersSection.appendChild(userCardDOM);
//   });
// }

// DisplayPhotographers();