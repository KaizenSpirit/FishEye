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
      const img = document.createElement('img');
      img.setAttribute('src', `./assets/photographers/ID/${photographer.portrait}`);
      img.setAttribute('alt', photographer.name);
      document.querySelector('.photograph-header').appendChild(img);
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
    const mediaModel = MediaFactory.create(mediaItem);
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
