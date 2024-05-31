import { getPhotographerAndMedias } from './api/api.js';
import MediaFactory from './factories/MediaFactory.js';


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

// Création dynamique de la structure HTML de la lightbox
const lightbox = document.createElement('div');
lightbox.id = 'lightbox';
lightbox.classList.add('lightbox');
lightbox.innerHTML = `
  <span class="close">&times;</span>  
  <span class="prev">&#10094;</span>
  <div class="lightbox-content">
    <div class="media-container"></div>
  </div> 
  <span class="next">&#10095;</span>
`;
document.body.appendChild(lightbox);

const lightboxContent = lightbox.querySelector('.media-container');
const closeBtn = lightbox.querySelector('.close');
const prevBtn = lightbox.querySelector('.prev');
const nextBtn = lightbox.querySelector('.next');
let currentMediaIndex = 0;
let mediaItems = [];

export function showLightbox(index) {
  currentMediaIndex = index;
  const media = mediaItems[currentMediaIndex];
  lightboxContent.innerHTML = media.outerHTML;
  lightbox.style.display = 'flex';
}

function closeLightbox() {
  lightbox.style.display = 'none';
}

function showPrevMedia() {
  currentMediaIndex = (currentMediaIndex > 0) ? currentMediaIndex - 1 : mediaItems.length - 1;
  showLightbox(currentMediaIndex);
}

function showNextMedia() {
  currentMediaIndex = (currentMediaIndex < mediaItems.length - 1) ? currentMediaIndex + 1 : 0;
  showLightbox(currentMediaIndex);
}

closeBtn.addEventListener('click', closeLightbox);
prevBtn.addEventListener('click', showPrevMedia);
nextBtn.addEventListener('click', showNextMedia);




  // Modifiez votre fonction displayDataMedia pour ajouter des événements de clics sur les médias
  function displayDataMedia(media) {
    const dataContainer = document.getElementById('dataContainer');
    if (dataContainer) {
      dataContainer.innerHTML = '';
      mediaItems = [];
      media.forEach((mediaItem, index) => {
        const mediaModel = new MediaFactory(mediaItem);
        const mediaCardDOM = mediaModel.getMediaContentDOM();
        mediaItems.push(mediaCardDOM.querySelector('img, video'));
        mediaCardDOM.addEventListener('click', () => showLightbox(index));
        dataContainer.appendChild(mediaCardDOM);
      });
    } 
  }



  initPhotographer();




