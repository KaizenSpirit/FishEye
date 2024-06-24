// Importer des fonctions et modules nécessaires
import { getPhotographerAndMedias } from './api/api.js'; 
import { displayModal, closeModal } from './utils/modal.js'; 
import { showLightbox, mediaItems } from './utils/lightbox.js'; 
import { addSortEventListener, sortMediaBy } from './utils/sort.js'; 
import { addLikeListeners, updateTotalLikes, insertPhotographerPrice } from './utils/likes.js'; 



// Récupération asynchrone et d'affichage des détails du photographe
async function fetchAndDisplayPhotographerDetails() {
  const photographerId = getPhotographerIdFromUrl(); 
  if (photographerId) {
    const { photographer, media } = await getPhotographerAndMedias(parseInt(photographerId, 10)); 
    if (photographer) {
      updatePhotographerDetails(photographer); 
      const sortedMedia = sortMediaBy('likes', media); 
      displayMedia(sortedMedia); 
      document.getElementById('orderBy').value = 'Popularité'; 
      addSortEventListener( media ); 
      updateTotalLikes(); 
      insertPhotographerPrice(photographer.price); 
    } else {
      console.error('Photographer not found'); 
    }
  }
}

// Récupération de l'ID du photographe à partir de l'URL
function getPhotographerIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('id'); 
}

// Mettre à jour les détails du photographe dans le DOM
function updatePhotographerDetails(photographer) {
  photographer.updatePhotographerDetails(); 
  photographer.insertPhotographerImage(); 
}

// Affichage des médias dans le DOM
function displayMedia(media) {
  const imagesContainer = document.getElementById('photographer-images');
  imagesContainer.innerHTML = ""; 
  mediaItems.length = 0; 
  media.forEach((mediaItem, index) => {
    const mediaCardDOM = createMediaCard(mediaItem, index); 
    imagesContainer.appendChild(mediaCardDOM); 
  });
  addLikeListeners(); 
  updateTotalLikes(); 
}

// Création d'une carte de média
function createMediaCard(mediaItem, index) {
  const htmlString = mediaItem.generateHTML(); 
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  const mediaCardDOM = doc.body.firstChild; 
  const mediaElement = mediaCardDOM.querySelector('img, video'); 
  if (mediaElement) {
    mediaItems.push(mediaElement); 
    mediaCardDOM.addEventListener('click', () => showLightbox(index)); 
    mediaElement.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        showLightbox(index); 
      }
    });
  } else {
    console.error('No media element found for:', mediaItem);
  }
  return mediaCardDOM; 
}
  fetchAndDisplayPhotographerDetails();



export { displayMedia}; 
