// let mediaItems = [];
// let currentMediaIndex = 0;

// function showLightbox(index) {
//   currentMediaIndex = index;
//   const media = mediaItems[currentMediaIndex];
//   lightboxContent.innerHTML = media.outerHTML;
//   lightbox.style.display = 'flex';
// }

// function closeLightbox() {
//   lightbox.style.display = 'none';
// }

// function showPrevMedia() {
//   currentMediaIndex = (currentMediaIndex > 0) ? currentMediaIndex - 1 : mediaItems.length - 1;
//   showLightbox(currentMediaIndex);
// }

// function showNextMedia() {
//   currentMediaIndex = (currentMediaIndex < mediaItems.length - 1) ? currentMediaIndex + 1 : 0;
//   showLightbox(currentMediaIndex);
// }

// const lightbox = document.createElement('div');
// lightbox.id = 'lightbox';
// lightbox.classList.add('lightbox');
// lightbox.innerHTML = `
//   <span class="close">&times;</span>  
//   <span class="prev">&#10094;</span>
//   <div class="lightbox-content">
//     <div class="media-container"></div>
//   </div> 
//   <span class="next">&#10095;</span>
// `;
// document.body.appendChild(lightbox);

// const lightboxContent = lightbox.querySelector('.media-container');
// const closeBtn = lightbox.querySelector('.close');
// const prevBtn = lightbox.querySelector('.prev');
// const nextBtn = lightbox.querySelector('.next');

// closeBtn.addEventListener('click', closeLightbox);
// prevBtn.addEventListener('click', showPrevMedia);
// nextBtn.addEventListener('click', showNextMedia);

// export { showLightbox, mediaItems };



//évenement de navigation au clavier 
let mediaItems = [];
let currentMediaIndex = 0;

function showLightbox(index) {
  currentMediaIndex = index;
  const media = mediaItems[currentMediaIndex];
  lightboxContent.innerHTML = media.outerHTML;
  lightbox.style.display = 'flex';

  // Disable focusable elements in the gallery
  disableGalleryFocus();

  // Add keyboard event listeners
  document.addEventListener('keydown', handleKeyDown);
}

function closeLightbox() {
  lightbox.style.display = 'none';

  // Enable focusable elements in the gallery
  enableGalleryFocus();

  // Remove keyboard event listeners
  document.removeEventListener('keydown', handleKeyDown);
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
      showPrevMedia();
      break;
    case 'ArrowRight':
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


