import Media from './Media.js';

// Classe VideoMedia qui utilise les propriétés de la classe Media
class VideoMedia extends Media {
  constructor(data) {
    super(data);
    // Chemin de la vidéo basé sur les données fournies
    this.video = `./assets/photographers/videos/${data.video}`;
  }

  // Générer le HTML dans le but d'afficher la vidéo et ses détails
  generateHTML() {
    return `
      <figure>
        <video class="vids" controls src="${this.video}" aria-label="Video de l'auteur : ${this.title}" title=" ${this.title}" tabindex="0"></video>
        <figcaption class="personal-photos">
          <p class="photo-details">${this.title}</p>
          <div class="likes">
            <p class="photo-details like-count" data-likes="${this.likes}">${this.likes}</p>
            <i class="fas fa-heart heart-icon like-button" data-id="${this.id}" data-liked="false"></i>
          </div>
        </figcaption>
      </figure>`;
  }
}

export default VideoMedia;



