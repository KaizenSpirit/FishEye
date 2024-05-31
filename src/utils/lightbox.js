
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

export function setMediaItems(items) {
  mediaItems = items;
}