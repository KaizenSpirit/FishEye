import { getPhotographers } from './api/api.js';

export async function fetchAndRenderPhotographers() {
  const photographers = await getPhotographers();
  const photographersSection = document.querySelector(".photographer_section");
  photographersSection.innerHTML = ""; 
  photographers.forEach(photographer => {
    const userCardDOM = photographer.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

fetchAndRenderPhotographers();
