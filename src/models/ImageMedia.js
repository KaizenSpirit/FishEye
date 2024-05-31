import Media from './Media.js';

export default class ImageMedia extends Media {
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