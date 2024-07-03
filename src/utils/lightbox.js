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
    <div class="lightbox-content" role="dialog" aria-modal="true">
      <span class="prev" tabindex="0" aria-label="Previous media" role="button">&#10094;</span>
      <div class="media-container" aria-live="polite"></div>
      <span class="next" tabindex="0" aria-label="Next media" role="button">&#10095;</span>
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
      <span class="close" tabindex="0" aria-label="Close dialog" role="button">&times;</span>
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
  const focusableElements = element.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"]), video');
  const firstFocusableElement = focusableElements[0];
  const lastFocusableElement = focusableElements[focusableElements.length - 1];

  element.addEventListener('keydown', function(event) {
    const activeElement = document.activeElement;

    if (event.key !== 'Tab') return;

    if (event.shiftKey && activeElement === firstFocusableElement) {
      lastFocusableElement.focus();
      event.preventDefault();
    } else if (!event.shiftKey && activeElement === lastFocusableElement) {
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
    el.addEventListener('click', function() {
      const index = Array.prototype.indexOf.call(mediaItems, el);
      showLightbox(index);
    });
    el.addEventListener('keydown', function(event) {
      if (event.key === 'Enter') {
        const index = Array.prototype.indexOf.call(mediaItems, el);
        showLightbox(index);
      }
    });
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
    videoElement.setAttribute('tabindex', '0'); // Assurer que la vidéo est focusable
    videoElement.focus();
  } else if (imageElement) {
    imageElement.setAttribute('tabindex', '0');
    imageElement.focus();
  }
}

// Ajouter des écouteurs d'événements pour les boutons précédent et suivant
[prevBtn, nextBtn].forEach(btn => {
  btn.addEventListener('click', btn === prevBtn ? showPrevMedia : showNextMedia);
  btn.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      (btn === prevBtn ? showPrevMedia : showNextMedia)();
    }
  });
});

export { showLightbox, mediaItems };









// Explications des modifications :

//     aria-live="polite" : Permet d'annoncer les changements dynamiques de contenu.
//     Ajout de role="dialog" et aria-modal="true" : Spécifie que le contenu de la lightbox est un dialogue modal.
//     Ajout de role="button" pour les éléments interactifs : Spécifie que ces éléments sont des boutons pour les lecteurs d'écran.
//     Gestion du focus améliorée : Ajout du focus sur les éléments multimédias (vidéos ou images) lorsqu'ils sont affichés.

// Ces modifications devraient améliorer l'expérience utilisateur pour les personnes utilisant NVDA ou d'autres lecteurs d'écran.