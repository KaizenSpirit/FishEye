const api_url = "data/photographers.json";

export async function getPhotographerAndMedias(photographerId) {
  const response = await fetch(api_url);
  const data = await response.json();
  const photographer = data.photographers.find(p => p.id === photographerId);
  const media = data.media.filter(m => m.photographerId === photographerId);
  return { photographer, media };
}

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
    this.video = `assets/photographers/videos/${data.video}`;
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
  static createMedia(mediaData) {
    if (mediaData.image) {
      return new ImageMedia(mediaData);
    } else if (mediaData.video) {
      return new VideoMedia(mediaData);
    } else {
      throw new Error("Unknown media type");
    }
  }
}

class PhotographerFactory {
  static createPhotographer(data) {
    const { name, portrait, city, country, tagline, price, id } = data;
    const picture = `assets/photographers/ID/${portrait}`;

    const getUserCardDOM = () => {
      const article = document.createElement('article');
      article.innerHTML = `
        <a href="photographer.html?id=${id}">
          <img src=${picture} alt="${name}">
          <h2 class="photograph-name">${name}</h2>
        </a>
        <h3>${city}, ${country}</h3>
        <h4>${tagline}</h4>
        <h5>${price}€/jour</h5>
      `;
      return article;
    };

    return { id, name, picture, city, country, tagline, price, getUserCardDOM };
  }
}

window.addEventListener('DOMContentLoaded', async () => {
  const selectedPhotographer = JSON.parse(localStorage.getItem('selectedPhotographer'));
  if (selectedPhotographer) {
    const { photographer, media } = await getPhotographerAndMedias(selectedPhotographer.id);
  
    document.getElementById('nameProfil').textContent = photographer.name;
    document.getElementById('locationProfil').textContent = `${photographer.city}, ${photographer.country}`;
    document.getElementById('taglineProfil').textContent = photographer.tagline;
    document.getElementById('photoProfil').innerHTML = `<img src="assets/photographers/ID/${photographer.portrait}" alt="${photographer.name}">`;
    
    displayDataMedia(media);
  }
});

function displayDataMedia(media) {
  const dataContainer = document.getElementById('dataContainer');
  if (dataContainer) {
    dataContainer.innerHTML = '';
  
    media.forEach(mediaItem => {
      const mediaModel = MediaFactory.createMedia(mediaItem);
      const mediaCardDOM = mediaModel.getMediaContentDOM();
      dataContainer.appendChild(mediaCardDOM);
    });
  } else {
    console.error('dataContainer not found');
  }
}

async function getPhotographers() {
  const response = await fetch(api_url);
  const photographersJsonFileData = await response.json();
  return photographersJsonFileData.photographers;
}

async function loadAndDisplayPhotographers() {
  const photographers = await getPhotographers();
  displayPhotographers(photographers);
}

async function displayPhotographers(photographers) {
  const photographersSection = document.querySelector(".photographer_section");
  if (photographersSection) {
    photographers.forEach(photographer => {
      const photographerModel = PhotographerFactory.createPhotographer(photographer);
      const userCardDOM = photographerModel.getUserCardDOM();
      photographersSection.appendChild(userCardDOM);

      userCardDOM.addEventListener('click', () => {
        localStorage.setItem('selectedPhotographer', JSON.stringify(photographer));
        window.location.href = 'photographer.html';
      });
    });
  } else {
    console.error('photographer_section not found');
  }
}

loadAndDisplayPhotographers();

document.querySelector(".contact_button")?.addEventListener('click', displayModal);
document.querySelector(".close_modale")?.addEventListener('click', closeModal);

function displayModal() {
  const modal = document.getElementById("contact_modal");
  if (modal) {
    modal.style.display = "block";
  } else {
    console.error('contact_modal not found');
  }
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  if (modal) {
    modal.style.display = "none";
  } else {
    console.error('contact_modal not found');
  }
}
