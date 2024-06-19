let mediaItems = [];
let currentMediaIndex = 0;
let currentGalleryElement = null;

const lightbox = createLightbox();
document.body.appendChild(lightbox);

const lightboxContent = lightbox.querySelector('.media-container');
const prevBtn = lightbox.querySelector('.prev');
const nextBtn = lightbox.querySelector('.next');

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

function closeLightbox() {
  lightbox.style.display = 'none';
  document.body.classList.remove('no-scroll');
  toggleGalleryFocus(true);
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

function toggleGalleryFocus(enable) {
  const tabIndexValue = enable ? '0' : '-1';
  document.querySelectorAll('#photographer-images img, #photographer-images video').forEach(el => {
    el.setAttribute('tabindex', tabIndexValue);
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

[prevBtn, nextBtn].forEach(btn => {
  btn.addEventListener('click', btn === prevBtn ? showPrevMedia : showNextMedia);
  btn.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      (btn === prevBtn ? showPrevMedia : showNextMedia)();
    }
  });
});

export { showLightbox, mediaItems };
