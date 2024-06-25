let mediaItems = [];
let currentMediaIndex = 0;
let currentGalleryElement = null;

const lightbox = createLightbox();
document.body.appendChild(lightbox);

const lightboxContent = lightbox.querySelector('.media-container');
const prevBtn = lightbox.querySelector('.prev');
const nextBtn = lightbox.querySelector('.next');

/**
 * Crée et retourne un élément DOM représentant la lightbox.
 * La lightbox contient des contrôles pour naviguer entre les médias et un conteneur pour afficher le média actuel.
 * @returns {HTMLElement} L'élément DOM de la lightbox.
 */
function createLightbox() {
  const lightbox = document.createElement('div');
  lightbox.id = 'lightbox';
  lightbox.classList.add('lightbox');
  lightbox.innerHTML = `
    <div class="lightbox-content">
      <span class="prev" tabindex="0" aria-label="Previous media">&#10094;</span>
      <div class="media-container"></div>
      <span class="next" tabindex="0" aria-label="Next media">&#10095;</span>
    </div>
  `;
  return lightbox;
}

/**
 * Affiche la lightbox avec le média spécifié par son index.
 * @param {number} index - L'index du média à afficher.
 * @param {boolean} [retainFocus=false] - Si vrai, conserve le focus sur l'élément actuel.
 */
function showLightbox(index, retainFocus = false) {
  currentMediaIndex = index;
  currentGalleryElement = mediaItems[currentMediaIndex];
  const media = mediaItems[currentMediaIndex];
  lightboxContent.innerHTML = `
    <div aria-label="Close dialog" class="lightbox-media">
      <span class="close" tabindex="0" aria-label="Close dialog">&times;</span>
      ${media.outerHTML}
      <div class="lightbox-title">${media.getAttribute('title')}</div>
    </div>
  `;
  lightbox.style.display = 'flex';
  document.body.classList.add('no-scroll');
  toggleGalleryFocus(false);
  focusMediaElement();
  document.addEventListener('keydown', handleKeyDown);
  trapFocus(lightbox);

  if (!retainFocus) {
    focusMediaElement();
  }
  addCloseButtonEvent();
}

/**
 * Empêche le focus de sortir de l'élément spécifié, créant ainsi un piège de focus.
 * @param {HTMLElement} element - L'élément dans lequel piéger le focus.
 */
function trapFocus(element) {
  const focusableElements = element.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
  const firstFocusableElement = focusableElements[0];
  const lastFocusableElement = focusableElements[focusableElements.length - 1];
  element.addEventListener('keydown', function(event) {
    if (event.key !== 'Tab') return;

    if (event.shiftKey && document.activeElement === firstFocusableElement) {
      lastFocusableElement.focus();
      event.preventDefault();
    } else if (!event.shiftKey && document.activeElement === lastFocusableElement) {
      firstFocusableElement.focus();
      event.preventDefault();
    }
  });
}

/**
 * Ferme la lightbox et restaure l'état de défilement et de focus de la page.
 */
function closeLightbox() {
  lightbox.style.display = 'none';
  document.body.classList.remove('no-scroll');
  toggleGalleryFocus(true);
  document.removeEventListener('keydown', handleKeyDown);
  if (currentGalleryElement) {
    currentGalleryElement.focus();
  }
}

/**
 * Affiche le média précédent dans la lightbox.
 */
function showPrevMedia() {
  currentMediaIndex = (currentMediaIndex > 0) ? currentMediaIndex - 1 : mediaItems.length - 1;
  showLightbox(currentMediaIndex, true);
  prevBtn.focus();
}

/**
 * Affiche le média suivant dans la lightbox.
 */
function showNextMedia() {
  currentMediaIndex = (currentMediaIndex < mediaItems.length - 1) ? currentMediaIndex + 1 : 0;
  showLightbox(currentMediaIndex, true);
  nextBtn.focus();
}

/**
 * Gère les événements de clavier pour la navigation et la fermeture de la lightbox.
 * @param {KeyboardEvent} event - L'événement clavier.
 */
function handleKeyDown(event) {
  switch (event.key) {
    case 'ArrowLeft':
    case 'ArrowUp':
      showPrevMedia();
      break;
    case 'ArrowRight':
    case 'ArrowDown':
      showNextMedia();
      break;
    case 'Escape':
      closeLightbox();
      break;
  }
}

/**
 * Active ou désactive le focus des éléments de la galerie en modifiant leur attribut tabindex.
 * @param {boolean} enable - Si vrai, active le focus; sinon, le désactive.
 */
function toggleGalleryFocus(enable) {
  const tabIndexValue = enable ? '0' : '-1';
  document.querySelectorAll('#photographer-images img, #photographer-images video').forEach(el => {
    el.setAttribute('tabindex', tabIndexValue);
  });
}

/**
 * Ajoute des événements de clic et de clavier pour fermer la lightbox.
 */
function addCloseButtonEvent() {
  const closeBtn = lightboxContent.querySelector('.close');
  closeBtn.addEventListener('click', closeLightbox);
  closeBtn.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      closeLightbox();
    }
  });
}

/**
 * Met le focus sur l'élément média dans la lightbox.
 */
function focusMediaElement() {
  const videoElement = lightboxContent.querySelector('video');
  const imageElement = lightboxContent.querySelector('img');
  
  if (videoElement) {
    videoElement.setAttribute('controls', 'controls');
    videoElement.setAttribute('tabindex', '0'); 
    videoElement.focus();
  } else if (imageElement) {
    imageElement.setAttribute('tabindex', '0');
    imageElement.focus();
  }
}

// Ajoute des événements pour les boutons de navigation de la lightbox.
[prevBtn, nextBtn].forEach(btn => {
  btn.addEventListener('click', btn === prevBtn ? showPrevMedia : showNextMedia);
  btn.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      (btn === prevBtn ? showPrevMedia : showNextMedia)();
    }
  });
});

export { showLightbox, mediaItems };
