import { getPhotographerAndMedias } from './api/api.js'; 
import { displayModal, closeModal } from './utils/modal.js'; 
import { showLightbox, mediaItems } from './utils/lightbox.js'; 
import { addSortEventListener, sortMediaBy } from './utils/sort.js'; 
import { addLikeListeners, updateTotalLikes, insertPhotographerPrice } from './utils/likes.js'; 

/**
 * Récupère et affiche les détails d'un photographe et ses médias associés.
 * Cette fonction utilise l'ID du photographe dans l'URL pour récupérer les données, puis met à jour l'interface utilisateur.
 * @async
 * @returns {Promise<void>} Une promesse qui se résout une fois les détails du photographe affichés.
 */
async function fetchAndDisplayPhotographerDetails() {
  const photographerId = getPhotographerIdFromUrl(); 
  if (photographerId) {
    const { photographer, media } = await getPhotographerAndMedias(parseInt(photographerId, 10)); 
    if (photographer) {
      updatePhotographerDetails(photographer); 
      const sortedMedia = sortMediaBy('likes', media); 
      displayMedia(sortedMedia); 
      document.getElementById('orderBy').value = 'Popularité'; 
      addSortEventListener(media); 
      updateTotalLikes(); 
      insertPhotographerPrice(photographer.price); 
    } else {
      console.error('Photographer not found'); 
    }
  }
}

/**
 * Récupère l'ID du photographe à partir de l'URL.
 * @returns {string|null} L'ID du photographe ou null s'il n'est pas trouvé.
 */
function getPhotographerIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('id'); 
}

/**
 * Met à jour les détails du photographe dans l'interface utilisateur.
 * @param {Object} photographer - L'objet photographe contenant les informations à afficher.
 */
function updatePhotographerDetails(photographer) {
  photographer.updatePhotographerDetails(); 
  photographer.insertPhotographerImage(); 
}

/**
 * Affiche les médias du photographe dans l'interface utilisateur.
 * Vide le conteneur des images et ajoute les cartes médias pour chaque élément de média.
 * @param {Array} media - Un tableau d'objets média à afficher.
 */
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

/**
 * Crée une carte média pour un élément de média spécifique.
 * @param {Object} mediaItem - L'objet média contenant les données pour générer la carte.
 * @param {number} index - L'index de l'élément média dans le tableau des médias.
 * @returns {HTMLElement} Un élément DOM représentant la carte média.
 */
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

// Appel initial pour récupérer et afficher les détails du photographe lors du chargement de la page.
fetchAndDisplayPhotographerDetails();

export { displayMedia };
