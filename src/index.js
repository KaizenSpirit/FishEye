import { getPhotographers } from './api/api.js';

/**
 * Récupère les données des photographes et les rend dans la section correspondante de la page.
 * Cette fonction utilise l'API pour obtenir les données des photographes, vide la section des photographes,
 * et ajoute une carte pour chaque photographe récupéré.
 * @async
 * @returns {Promise<void>} Une promesse qui se résout quand les photographes sont rendus.
 */
export async function fetchAndRenderPhotographers() {
  const photographers = await getPhotographers();
  const photographersSection = document.querySelector(".photographer_section");
  photographersSection.innerHTML = ""; 
  photographers.forEach(photographer => {
    const userCardDOM = photographer.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

// Appel initial pour récupérer et afficher les photographes lors du chargement de la page.
fetchAndRenderPhotographers();


