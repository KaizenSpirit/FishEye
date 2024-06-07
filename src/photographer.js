import { getPhotographerAndMedias } from './api/api.js';
import MediaFactory from './factories/MediaFactory.js';
import { displayModal, closeModal } from './utils/modal.js';
import { showLightbox, mediaItems } from './utils/lightbox.js';
import { addSortEventListener } from './utils/sort.js';
import { addLikeListeners } from './utils/addLikes.js';
import { updateTotalLikes } from './utils/updateLikes.js'; 


async function fetchAndDisplayPhotographerDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const photographerId = urlParams.get('id');

  if (photographerId) {
    const { photographer, media } = await getPhotographerAndMedias(parseInt(photographerId, 10));
    if (photographer) {
      document.querySelector('.photograph-name').textContent = photographer.name;
      document.querySelector('.photograph-location').textContent = `${photographer.city}, ${photographer.country}`;
      document.querySelector('.photograph-tagline').textContent = photographer.tagline;
      document.querySelector('#contact_modal .photographer-name').textContent = photographer.name;
      
      // Utilisation d'un template literal pour créer le lien et l'image
      const photographerHeader = document.querySelector('.photograph-header');
      const imgHTML = `
        <a href="#photographer-images">
          <img 
            src="./assets/photographers/ID/${photographer.portrait}" 
            alt="${photographer.name}" 
            class="photograph-img photograph-${photographer.id}-img"
          />
        </a>
      `;
      
      // Insérer l'image après le bloc de titre existant
      photographerHeader.insertAdjacentHTML('beforeend', imgHTML);

      // Afficher les médias et ajouter les écouteurs d'événements
      displayMedia(media, photographer.price);
      addSortEventListener({ ...photographer, medias: media }, displayMedia);
      updateTotalLikes(photographer.price); 
    } else {
      console.error('Photographer not found');
    }
  }
}

function displayMedia(medias, price) {
  const imagesContainer = document.getElementById('photographer-images');
  imagesContainer.innerHTML = "";
  mediaItems.length = 0; 
  medias.forEach((mediaItem, index) => {
    const mediaModel = new MediaFactory(mediaItem);
    const mediaCardDOM = mediaModel.getMediaContentDOM();
    imagesContainer.appendChild(mediaCardDOM);
    const mediaElement = mediaCardDOM.querySelector('img, video');
    mediaItems.push(mediaElement);
    mediaCardDOM.addEventListener('click', () => showLightbox(index));
    mediaElement.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        showLightbox(index);
      } else if (event.key === 'ArrowRight') {
        focusNextMedia(index);
      } else if (event.key === 'ArrowLeft') {
        focusPreviousMedia(index);
      } else if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        focusMedia(event.key);
      }
    });
  });
  addLikeListeners(price, updateTotalLikes);
  updateTotalLikes(price);
}

function focusNextMedia(currentIndex) {//Paramètre: currentIndex - l'index actuel de l'élément focusé dans mediaItems.
  const nextIndex = (currentIndex + 1) % mediaItems.length;
  mediaItems[nextIndex].focus();
}

function focusPreviousMedia(currentIndex) {
  const previousIndex = (currentIndex - 1 + mediaItems.length) % mediaItems.length;
  mediaItems[previousIndex].focus();
}

function focusMedia(key) {
  const focusedElement = document.activeElement;
  const currentIndex = mediaItems.indexOf(focusedElement);
  if (currentIndex !== -1) {
    if (key === 'ArrowUp' || key === 'ArrowRight') {
      focusNextMedia(currentIndex);
    } 
  }
}
fetchAndDisplayPhotographerDetails();
