let mediaItems = [];
let currentMediaIndex = 0;
let currentGalleryElement = null;

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
document.body.appendChild(lightbox);

const lightboxContent = lightbox.querySelector('.media-container');
const prevBtn = lightbox.querySelector('.prev');
const nextBtn = lightbox.querySelector('.next');

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
  disableGalleryFocus();
  document.addEventListener('keydown', handleKeyDown);
  trapFocus(lightbox);

  const videoElement = lightboxContent.querySelector('video');
  const imageElement = lightboxContent.querySelector('img');
  
  if (!retainFocus) {
    if (videoElement) {
      videoElement.setAttribute('controls', 'controls');
      videoElement.focus();
    } else if (imageElement) {
      imageElement.setAttribute('tabindex', '0');
      imageElement.focus();
    }
  }

  addCloseButtonEvent();
}

function trapFocus(element) {
  const focusableElements = element.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
  const firstFocusableElement = focusableElements[0];
  const lastFocusableElement = focusableElements[focusableElements.length - 1];

  element.addEventListener('keydown', function(event) {
    if (event.key !== 'Tab' && event.keyCode !== 9) {
      return;
    }

    if (event.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstFocusableElement) {
        lastFocusableElement.focus();
        event.preventDefault();
      }
    } else if (document.activeElement === lastFocusableElement) {
      // Tab
      firstFocusableElement.focus();
      event.preventDefault();
    }
  });
}

function closeLightbox() {
  lightbox.style.display = 'none';
  document.body.classList.remove('no-scroll');
  enableGalleryFocus();
  document.removeEventListener('keydown', handleKeyDown);
  if (currentGalleryElement) {
    currentGalleryElement.focus();
  }
}

function showPrevMedia() {
  currentMediaIndex = (currentMediaIndex > 0) ? currentMediaIndex - 1 : mediaItems.length - 1;
  showLightbox(currentMediaIndex, true);
  prevBtn.focus();
}

function showNextMedia() {
  currentMediaIndex = (currentMediaIndex < mediaItems.length - 1) ? currentMediaIndex + 1 : 0;
  showLightbox(currentMediaIndex, true);
  nextBtn.focus();
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
