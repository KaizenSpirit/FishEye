import { getPhotographerAndMedias } from './api/api.js';
import MediaFactory from './factories/MediaFactory.js';
import { showLightbox, setMediaItems } from './utils/lightbox.js';

async function initPhotographer(){
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
}

function displayDataMedia(media) {
  const dataContainer = document.getElementById('dataContainer');
  if (dataContainer) {
    dataContainer.innerHTML = '';
    const mediaItems = [];
    media.forEach((mediaItem, index) => {
      const mediaModel = new MediaFactory(mediaItem);
      const mediaCardDOM = mediaModel.getMediaContentDOM();
      mediaItems.push(mediaCardDOM.querySelector('img, video'));
      mediaCardDOM.addEventListener('click', () => showLightbox(index));
      dataContainer.appendChild(mediaCardDOM);
    });
    setMediaItems(mediaItems);
  }
}

initPhotographer();






