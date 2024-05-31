import { getPhotographers } from './api/api.js';
import { PhotographersFactory} from './factories/PhotographersFactory.js'

async function loadAndDisplayPhotographers() {
  const photographers = await getPhotographers();
  displayPhotographers(photographers);
}

async function displayPhotographers(photographers) {
  const photographersSection = document.querySelector(".photographers_section");
  if (photographersSection) {
    photographers.forEach(photographer => {
      const photographerModel = PhotographersFactory.createPhotographer(photographer);
      const userCardDOM = photographerModel.getUserCardDOM();
      photographersSection.appendChild(userCardDOM);
      userCardDOM.addEventListener('click', () => {
        window.location.href = 'photographer.html';
      });
    });
  } 
  
}

loadAndDisplayPhotographers();