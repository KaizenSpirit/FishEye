let mediaItems = [];
let currentMediaIndex = 0;

function trapFocus(element) {
  const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
  const firstFocusableElement = element.querySelectorAll(focusableElements)[0];
  const focusableContent = element.querySelectorAll(focusableElements);
  const lastFocusableElement = focusableContent[focusableContent.length - 1];

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

function showLightbox(index) {
  currentMediaIndex = index;
  const media = mediaItems[currentMediaIndex];
  lightboxContent.innerHTML = `
    <div class="lightbox-media">
      <span class="close" aria-label="Close dialog tabindex="0">&times;</span>
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

function closeLightbox() {
  lightbox.style.display = 'none';
  document.body.classList.remove('no-scroll'); // Retire la classe pour réactiver le défilement

  enableGalleryFocus();

  document.removeEventListener('keydown', handleKeyDown);

  const videoElement = lightboxContent.querySelector('video');
  if (videoElement) {
    removeVideoKeyboardControls(videoElement);
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

function addVideoKeyboardControls(videoElement) {
  videoElement.addEventListener('keydown', handleVideoKeyDown);
}

function removeVideoKeyboardControls(videoElement) {
  videoElement.removeEventListener('keydown', handleVideoKeyDown);
}

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

const lightbox = document.createElement('div');
lightbox.id = 'lightbox';
lightbox.classList.add('lightbox');
lightbox.innerHTML = `
  <div class="lightbox-content">
    <span class="prev" tabindex="0" aria-label="Previous image">&#10094;</span>
    <div class="media-container"></div>
    <span class="next" tabindex="0" aria-label="Next image">&#10095;</span>
  </div>
`;
document.body.appendChild(lightbox);

const lightboxContent = lightbox.querySelector('.media-container');
const prevBtn = lightbox.querySelector('.prev');
const nextBtn = lightbox.querySelector('.next');


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



