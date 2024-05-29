// main.js //Ce fichier JavaScript (main.js) gère la logique principale de l'application web. Il importe des fonctions et des classes d'autres modules, récupère des données de photographes et de médias, affiche ces données sur la page web, et gère l'affichage d'une modal de contact.
//Importations : On importe des fonctions et des classes nécessaires à partir d'autres fichiers JavaScript (api.js, media.js, photographer.js).
import { getPhotographerAndMedias, getPhotographers } from './api.js';
import { MediaFactory } from './media.js';
import { PhotographerFactory } from './photograher.js';
//Événement DOMContentLoaded
//Événement DOMContentLoaded : Cet événement se déclenche lorsque le HTML initial a été complètement chargé et analysé.
window.addEventListener('DOMContentLoaded', async () => {
//URLSearchParams est utilisé pour récupérer les paramètres de l'URL. Ici, on récupère l'ID du photographe.
const urlParams = new URLSearchParams(window.location.search);
const photographerId = urlParams.get('id');
//Condition if pour vérifier l'ID du photographe :
// Si un ID de photographe est présent dans l'URL, on appelle getPhotographerAndMedias pour obtenir les données du photographe et ses médias.
// Mise à jour du profil du photographe :

if (photographerId) {
  const { photographer, media } = await getPhotographerAndMedias(parseInt(photographerId, 10));
  
  if (photographer) {
    document.getElementById('nameProfil').textContent = photographer.name;
    document.getElementById('locationProfil').textContent = `${photographer.city}, ${photographer.country}`;
    document.getElementById('taglineProfil').textContent = photographer.tagline;
    document.getElementById('photoProfil').innerHTML = `<img src="assets/photographers/ID/${photographer.portrait}" alt="${photographer.name}">`;
//On met à jour les éléments HTML avec les informations du photographe.
    displayDataMedia(media);
  } else {
    console.error('Photographer not found');
  }
} else {
  console.error('No photographer ID found in URL');
}
});

//Fonction displayDataMedia
//Fonction displayDataMedia : Cette fonction affiche les médias d'un photographe.
// Vérification de l'existence de dataContainer :

// Si dataContainer existe, on le vide et on y ajoute les cartes des médias.

function displayDataMedia(media) {
  const dataContainer = document.getElementById('dataContainer');
  if (dataContainer) {
    dataContainer.innerHTML = '';
  //Boucle forEach :
    media.forEach(mediaItem => {
      const mediaModel = MediaFactory.createMedia(mediaItem);
      const mediaCardDOM = mediaModel.getMediaContentDOM();
      dataContainer.appendChild(mediaCardDOM);
      //Pour chaque élément de média, on utilise MediaFactory pour créer un modèle de média et on obtient le DOM de la carte média à ajouter au dataContainer.
    });
  } else {
    console.error('dataContainer not found');
  }
}


//Fonction loadAndDisplayPhotographers
async function loadAndDisplayPhotographers() {
  //Fonction loadAndDisplayPhotographers : Cette fonction charge et affiche tous les photographes.
// Appel de getPhotographers pour obtenir la liste des photographes et appel de displayPhotographers pour les afficher.
  const photographers = await getPhotographers();
  displayPhotographers(photographers);
}
//Fonction displayPhotographers : Cette fonction affiche tous les photographes dans une section spécifique.
async function displayPhotographers(photographers) {
  //Vérification de l'existence de photographersSection :

  // Si photographersSection existe, on ajoute une carte pour chaque photographe.
  const photographersSection = document.querySelector(".photographer_section");
  if (photographersSection) {
    //Boucle forEach :
    photographers.forEach(photographer => {
      //Pour chaque photographe, on utilise PhotographerFactory pour créer un modèle de photographe et obtenir le DOM de la carte utilisateur à ajouter à la section.
      const photographerModel = PhotographerFactory.createPhotographer(photographer);
      const userCardDOM = photographerModel.getUserCardDOM();
      photographersSection.appendChild(userCardDOM);
//Événement click sur la carte utilisateur :
//Lorsqu'on clique sur une carte, les informations du photographe sont stockées dans le localStorage et on est redirigé vers la page photographer.html.
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