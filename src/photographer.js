import { getPhotographerAndMedias } from './api/api.js';
import { displayModal, closeModal } from './utils/modal.js';
import { showLightbox, mediaItems } from './utils/lightbox.js';
import { addSortEventListener, sortMediaBy } from './utils/sort.js';
import { addLikeListeners, updateTotalLikes, insertPhotographerPrice } from './utils/likes.js';

let globalPhotographer;

async function fetchAndDisplayPhotographerDetails() {
  const photographerId = getPhotographerIdFromUrl();
  if (photographerId) {
    const { photographer, media } = await getPhotographerAndMedias(parseInt(photographerId, 10));
    if (photographer) {
      globalPhotographer = { ...photographer, medias: media };
      updatePhotographerDetails(photographer);
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

function getPhotographerIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('id');
}

function updatePhotographerDetails(photographer) {
  photographer.updatePhotographerDetails();
  photographer.insertPhotographerImage();
}

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
      } else if (event.key === 'ArrowRight') {
        focusNextMedia(index);
      } else if (event.key === 'ArrowLeft') {
        focusPreviousMedia(index);
      }
    });
  } else {
    console.error('No media element found for:', mediaItem);
  }
  return mediaCardDOM;
}

// function focusNextMedia(currentIndex) {
//   const nextIndex = (currentIndex + 1) % mediaItems.length;
//   mediaItems[nextIndex].focus();
// }

// function focusPreviousMedia(currentIndex) {
//   const previousIndex = (currentIndex - 1 + mediaItems.length) % mediaItems.length;
//   mediaItems[previousIndex].focus();
// }
    
fetchAndDisplayPhotographerDetails();

export { displayMedia, globalPhotographer }; 
