
// événement de navigation au clavier 
let mediaItems = [];
let currentMediaIndex = 0;

function showLightbox(index) {
  currentMediaIndex = index;
  const media = mediaItems[currentMediaIndex];
  lightboxContent.innerHTML = `
    <div class="lightbox-media">
      ${media.outerHTML}
      <div class="lightbox-title">${media.getAttribute('title')}</div>
    </div>
  `;

  lightbox.style.display = 'flex';

  // Disable focusable elements in the gallery
  disableGalleryFocus();

  // Add keyboard event listeners
  document.addEventListener('keydown', handleKeyDown);

  // Add focus to the video element if it exists
  const videoElement = lightboxContent.querySelector('video');
  if (videoElement) {
    videoElement.setAttribute('controls', 'controls');
    videoElement.focus();
    addVideoKeyboardControls(videoElement);
  }

  document.body.classList.add('no-scroll');
}

function closeLightbox() {
  lightbox.style.display = 'none';

  // Enable focusable elements in the gallery
  enableGalleryFocus();

  // Remove keyboard event listeners
  document.removeEventListener('keydown', handleKeyDown);

  // Remove keyboard controls from the video element if it exists
  const videoElement = lightboxContent.querySelector('video');
  if (videoElement) {
    removeVideoKeyboardControls(videoElement);
  }
  document.body.classList.remove('no-scroll');
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
      // Toggle play/pause on spacebar press
      if (videoElement.paused) {
        videoElement.play();
      } else {
        videoElement.pause();
      }
      break;
    case 'm':
      // Mute/unmute on 'm' press
      videoElement.muted = !videoElement.muted;
      break;
    case 'ArrowUp':
      // Increase volume on ArrowUp press
      videoElement.volume = Math.min(videoElement.volume + 0.1, 1);
      break;
    case 'ArrowDown':
      // Decrease volume on ArrowDown press
      videoElement.volume = Math.max(videoElement.volume - 0.1, 0);
      break;
  }
}

const lightbox = document.createElement('div');
lightbox.id = 'lightbox';
lightbox.classList.add('lightbox');
lightbox.innerHTML = `
  <span class="close" tabindex="0">&times;</span>  
  <span class="prev" tabindex="0">&#10094;</span>
  <div class="lightbox-content">
    <div class="media-container"></div>
  </div> 
  <span class="next" tabindex="0">&#10095;</span>
`;
document.body.appendChild(lightbox);

const lightboxContent = lightbox.querySelector('.media-container');
const closeBtn = lightbox.querySelector('.close');
const prevBtn = lightbox.querySelector('.prev');
const nextBtn = lightbox.querySelector('.next');

closeBtn.addEventListener('click', closeLightbox);
prevBtn.addEventListener('click', showPrevMedia);
nextBtn.addEventListener('click', showNextMedia);

// Add keyboard accessibility for buttons
closeBtn.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.key === ' ') {
    closeLightbox();
  }
});
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