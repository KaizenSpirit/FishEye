
import { getPhotographerAndMedias, getPhotographers } from './api.js';
import { MediaFactory } from './media.js';
import { PhotographerFactory } from './photograher.js';
window.addEventListener('DOMContentLoaded', async () => {
const urlParams = new URLSearchParams(window.location.search);
const photographerId = urlParams.get('id');

if (photographerId) {
  const { photographer, media } = await getPhotographerAndMedias(parseInt(photographerId, 10));
  
  if (photographer) {
    document.getElementById('nameProfil').textContent = photographer.name;
    document.getElementById('locationProfil').textContent = `${photographer.city}, ${photographer.country}`;
    document.getElementById('taglineProfil').textContent = photographer.tagline;
    document.getElementById('photoProfil').innerHTML = `<img src="assets/photographers/ID/${photographer.portrait}" alt="${photographer.name}">`;
    displayDataMedia(media);
  } else {
    console.error('Photographer not found');
  }
} else {
  console.error('No photographer ID found in URL');
}
});

function displayDataMedia(media) {
  const dataContainer = document.getElementById('dataContainer');
  if (dataContainer) {
    dataContainer.innerHTML = '';
    media.forEach(mediaItem => {
      const mediaModel = MediaFactory.createMedia(mediaItem);
      const mediaCardDOM = mediaModel.getMediaContentDOM();
      dataContainer.appendChild(mediaCardDOM);
    });
  } else {
    console.error('dataContainer not found');
  }
}

async function loadAndDisplayPhotographers() {
  const photographers = await getPhotographers();
  displayPhotographers(photographers);
}

async function displayPhotographers(photographers) {
  const photographersSection = document.querySelector(".photographer_section");
  if (photographersSection) {
    photographers.forEach(photographer => {
      const photographerModel = PhotographerFactory.createPhotographer(photographer);
      const userCardDOM = photographerModel.getUserCardDOM();
      photographersSection.appendChild(userCardDOM);
      userCardDOM.addEventListener('click', () => {
        localStorage.setItem('selectedPhotographer', JSON.stringify(photographer));
        window.location.href = 'photographer.html';
      });
    });
  } else {
    console.error('photographer_section not found');
  }
}

loadAndDisplayPhotographers();





document.querySelector(".contact_button")?.addEventListener('click', displayModal);
document.querySelector(".close_modale")?.addEventListener('click', closeModal);

function displayModal() {
  const modal = document.getElementById("contact_modal");
  if (modal) {
    modal.style.display = "block";
  } else {
    console.error('contact_modal not found');
  }
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  if (modal) {
    modal.style.display = "none";
  } else {
    console.error('contact_modal not found');
  }
}

///Importation des modules : On importe les fonctions et classes nécessaires d'autres fichiers.
// Événement DOMContentLoaded : On récupère et affiche les données du photographe et de ses médias si un ID de photographe est présent dans l'URL.
// Fonctions displayDataMedia, loadAndDisplayPhotographers, displayPhotographers : Elles gèrent l'affichage des médias et des photographes.
// Affichage et fermeture de la modal : On gère l'affichage de la modal de contact en fonction des événements de clic.