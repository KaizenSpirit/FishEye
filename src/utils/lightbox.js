let mediaItems = [];
let currentMediaIndex = 0;
let currentGalleryElement = null; //1.//////////////////////// Variable pour stocker l'élément de la galerie actuel

const lightbox = document.createElement('div');
lightbox.id = 'lightbox';
lightbox.classList.add('lightbox');
lightbox.innerHTML = `
  <div class="lightbox-content">
    <span class="prev" tabindex="0">&#10094;</span>
    <div class="media-container"></div>
    <span class="next" tabindex="0">&#10095;</span>
  </div>
`;
document.body.appendChild(lightbox);

const lightboxContent = lightbox.querySelector('.media-container');
const prevBtn = lightbox.querySelector('.prev');
const nextBtn = lightbox.querySelector('.next');

function showLightbox(index) {
  currentMediaIndex = index;
  currentGalleryElement = mediaItems[currentMediaIndex]; //2.//////////////////////////////////////// Enregistrer l'élément actuel de la galerie
  const media = mediaItems[currentMediaIndex];
  lightboxContent.innerHTML = `
    <div aria-label="Close dialog" class="lightbox-media">
      <span class="close" tabindex="0">&times;</span>
      ${media.outerHTML}
      <div class="lightbox-title">${media.getAttribute('title')}</div>
    </div>
  `;
  lightbox.style.display = 'flex';
  document.body.classList.add('no-scroll'); 
  disableGalleryFocus();
  document.addEventListener('keydown', handleKeyDown);
  trapFocus(lightbox);
  const videoElement = lightboxContent.querySelector('video');
  if (videoElement) {
    videoElement.setAttribute('controls', 'controls');
    videoElement.focus();
    addVideoKeyboardControls(videoElement);
  }
  addCloseButtonEvent();
}

function trapFocus(element) {
  const focusableElements = element.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
  const firstFocusableElement = focusableElements[0];
  const lastFocusableElement = focusableElements[focusableElements.length - 1];

  element.addEventListener('keydown', function(event) {
    const isTabPressed = event.key === 'Tab' || event.keyCode === 9;
    if (!isTabPressed) {
      return;
    }
    if (event.shiftKey) {
      if (document.activeElement === firstFocusableElement) {
        lastFocusableElement.focus(); 
        event.preventDefault();
      }
    } else {
      if (document.activeElement === lastFocusableElement) {
        firstFocusableElement.focus(); 
        event.preventDefault();
      }
    }
  });
}

function closeLightbox() {
  lightbox.style.display = 'none';
  document.body.classList.remove('no-scroll');
  enableGalleryFocus();
  document.removeEventListener('keydown', handleKeyDown);
  const videoElement = lightboxContent.querySelector('video');
  if (videoElement) {
    removeVideoKeyboardControls(videoElement);
  }
  if (currentGalleryElement) {
    currentGalleryElement.focus(); //3./////////////////////////////// Restaurer le focus sur l'élément de la galerie
  }
}

function showPrevMedia() {
  currentMediaIndex = (currentMediaIndex > 0) ? currentMediaIndex - 1 : mediaItems.length - 1;
  showLightbox(currentMediaIndex);
}

function showNextMedia() {
  currentMediaIndex = (currentMediaIndex < mediaItems.length - 1) ? currentMediaIndex + 1 : 0;
  showLightbox(currentMediaIndex);
}

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

function disableGalleryFocus() {
  document.querySelectorAll('#photographer-images img, #photographer-images video').forEach(el => {
    el.setAttribute('tabindex', '-1');
  });
}

function enableGalleryFocus() {
  document.querySelectorAll('#photographer-images img, #photographer-images video').forEach(el => {
    el.setAttribute('tabindex', '0');
  });
}
// supprimer ceci aussi
function addVideoKeyboardControls(videoElement) {
  videoElement.addEventListener('keydown', handleVideoKeyDown);
}

function removeVideoKeyboardControls(videoElement) {
  videoElement.removeEventListener('keydown', handleVideoKeyDown);
}


// enlever cette fonction ///
// enlever cette fonction ///
// enlever cette fonction ///
// enlever cette fonction ///
// enlever cette fonction ///
// enlever cette fonction ///
function handleVideoKeyDown(event) {
  const videoElement = event.target;
  switch (event.key) {
    case ' ':
      if (videoElement.paused) {
        videoElement.play();
      } else {
        videoElement.pause();
      }
      break;
    case 'm':
      videoElement.muted = !videoElement.muted;
      break;
    case 'ArrowUp':
      videoElement.volume = Math.min(videoElement.volume + 0.1, 1);
      break;
    case 'ArrowDown':
      videoElement.volume = Math.max(videoElement.volume - 0.1, 0);
      break;
  }
}

function addCloseButtonEvent() {
  const closeBtn = lightboxContent.querySelector('.close');
  closeBtn.addEventListener('click', closeLightbox);
  closeBtn.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      closeLightbox();
    }
  });
}

prevBtn.addEventListener('click', showPrevMedia);
nextBtn.addEventListener('click', showNextMedia);

prevBtn.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.key === ' ') {
    showPrevMedia();
  }
});
nextBtn.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.key === ' ') {
    showNextMedia();
  }
});

export { showLightbox, mediaItems };
