import { getPhotographerAndMedias } from './api/api.js';
import { displayModal, closeModal } from './utils/modal.js';
import { showLightbox, mediaItems } from './utils/lightbox.js';
import { addSortEventListener, sortMediaBy } from './utils/sort.js';
import { addLikeListeners, updateTotalLikes, insertPhotographerPrice } from './utils/likes.js';

let globalPhotographer = null; // Nouvelle variable globale pour stocker le photographe

async function fetchAndDisplayPhotographerDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const photographerId = urlParams.get('id');
  if (photographerId) {
    const { photographer, media } = await getPhotographerAndMedias(parseInt(photographerId, 10));
    if (photographer) {
      globalPhotographer = { ...photographer, medias: media }; // Stocker le photographe et les médias globalement
      photographer.updatePhotographerDetails();
      photographer.insertPhotographerImage();
      const sortedMedia = sortMediaBy('likes', media);
      displayMedia(sortedMedia);
      document.getElementById('orderBy').value = 'Popularité';
      addSortEventListener();
      updateTotalLikes();
      insertPhotographerPrice(photographer.price);
    } else {
      console.error('Photographer not found');
    }
  }
}

function displayMedia(media) {
  const imagesContainer = document.getElementById('photographer-images');
  imagesContainer.innerHTML = "";
  mediaItems.length = 0; 
  media.forEach((mediaItem, index) => {
    const htmlString = mediaItem.generateHTML();
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    const mediaCardDOM = doc.body.firstChild;
    imagesContainer.appendChild(mediaCardDOM);
    const mediaElement = mediaCardDOM.querySelector('img, video');
    if (mediaElement) {
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
    } else {
      console.error('No media element found for:', mediaItem);
    }
  });

  addLikeListeners();
  updateTotalLikes();
}

function focusNextMedia(currentIndex) {
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
    } else if (key === 'ArrowDown' || key === 'ArrowLeft') {
      focusPreviousMedia(currentIndex);
    }
  }
}

fetchAndDisplayPhotographerDetails();

export { displayMedia, globalPhotographer }; // Exporter displayMedia et globalPhotographer
