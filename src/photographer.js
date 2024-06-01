import { getPhotographerAndMedias, getPhotographers } from './api/api.js';
import PhotographerFactory from './factories/PhotographerFactory.js';
import MediaFactory from './factories/MediaFactory.js';
import { displayModal, closeModal } from './utils/modal.js';
import { showLightbox, mediaItems } from './utils/lightbox.js';
import { sortMediaBy, addSortEventListener } from './utils/sort.js';
import { addLikeListeners } from './utils/addLikes.js';
import { updateTotalLikes } from './utils/updateLikes.js'; // Assurez-vous que cette ligne est présente

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
      displayMedia(media, photographer.price); // Passez le prix ici
      addSortEventListener({ ...photographer, medias: media }, displayMedia);
      updateTotalLikes(photographer.price); 
    } else {
      console.error('Photographer not found');
    }
  } else {
    const photographers = await getPhotographers();
    renderPhotographers(photographers);
  }
}

function displayMedia(medias, price) {
  const imagesContainer = document.getElementById('photographer-images');
  imagesContainer.innerHTML = "";
  mediaItems.length = 0; // Clear mediaItems before adding new items
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
      }
    });


  });
  addLikeListeners(price, updateTotalLikes);
  updateTotalLikes(price); // Call updateTotalLikes after displaying media
}

fetchAndDisplayPhotographerDetails();
