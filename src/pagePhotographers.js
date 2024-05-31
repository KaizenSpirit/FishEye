import { getPhotographerAndMedias } from './api.js';


class Media {
  constructor({ photographerId, title, likes }) {
    this.photographerId = photographerId;
    this.title = title;
    this.likes = likes;
  }
  getMediaContentDOM() {
    const itemDiv = document.createElement('article');
    itemDiv.classList.add('div-photos');
    itemDiv.innerHTML = this.generateHTML();
    return itemDiv;
  }
  generateHTML() {
    throw new Error("generateHTML must be implemented in subclasses");
  }
}

class ImageMedia extends Media {
  constructor(data) {
    super(data);
    this.image = `assets/photographers/medias/${data.image}`;
  }

  generateHTML() {
    return `
      <img class="img_display" src="${this.image}" alt="${this.title}">
      <div class="personal-photos">
        <p class="photo-details">${this.title}</p>
        <p class="photo-details like-count" data-likes="${this.likes}">${this.likes}</p>
        <i class="fas fa-heart heart-icon like-button"></i>
      </div>`;
  }
}

class VideoMedia extends Media {
  constructor(data) {
    super(data);
    this.video = `../assets/photographers/videos/${data.video}`;
  }

  generateHTML() {
    return `
      <video class="vids" controls src="${this.video}" alt="${this.title}"></video>
      <div class="personal-photos">
        <p class="photo-details">${this.title}</p>
        <p class="photo-details like-count" data-likes="${this.likes}">${this.likes}</p>
        <i class="fas fa-heart heart-icon like-button"></i>
      </div>`;
  }
}

class MediaFactory {
  constructor(mediaData) {
    if (mediaData.image) {
      return new ImageMedia(mediaData);
    } else if (mediaData.video) {
      return new VideoMedia(mediaData);
    } else {
      throw new Error("Unknown media type");
    }
  }
}



async function init(){
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



function displayDataMedia(media) {
  const dataContainer = document.getElementById('dataContainer');
  if (dataContainer) {
    dataContainer.innerHTML = '';
    media.forEach(mediaItem => {
      const mediaModel = new MediaFactory(mediaItem);
      const mediaCardDOM = mediaModel.getMediaContentDOM();
      dataContainer.appendChild(mediaCardDOM);

    });
  } 
}


init()



