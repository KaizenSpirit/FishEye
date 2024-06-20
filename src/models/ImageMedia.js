import Media from './Media.js';

// La classe ImageMedia utilise les propriétés de la classe Media
class ImageMedia extends Media {
  constructor(data) {
    super(data);
    // Chemin de l'image basé sur les données fournies
    this.image = `./assets/photographers/medias/${data.image}`;
  }

  // Générer le HTML qui affiche l'image et ses détails
  generateHTML() {
    return `
      <figure>
        <img class="img_display" src="${this.image}" alt="${this.title}" title="${this.title}" tabindex="0">
        <figcaption class="personal-photos">
          <p class="photo-details">${this.title}</p>
          <div class="likes">
            <p class="photo-details like-count" data-likes="${this.likes}">${this.likes}</p>
            <i class="fa-solid fa-heart like-button" data-id="${this.id}" data-liked="false"></i>
          </div>
        </figcaption>
      </figure>`;
  }
}

export default ImageMedia;
