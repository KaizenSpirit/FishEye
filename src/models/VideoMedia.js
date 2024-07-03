import Media from './Media.js';

/**
 * Représente un média de type vidéo, étend la classe Media pour ajouter une gestion spécifique des vidéos.
 */
class VideoMedia extends Media {
  /**
   * Crée une nouvelle instance de VideoMedia.
   * @param {Object} data - Les données spécifiques au média vidéo.
   * @param {string} data.video - Le nom de fichier de la vidéo.
   */
  constructor(data) {
    super(data);
    this.video = `./assets/photographers/videos/${data.video}`;
  }

  /**
   * Génère et retourne le HTML nécessaire pour afficher la vidéo sur la page web.
   * Le HTML inclut une balise `<figure>` avec une `<video>`, et une `<figcaption>` contenant les détails de la vidéo et des options pour aimer la vidéo.
   * @returns {string} Le HTML sous forme de chaîne de caractères pour l'affichage de la vidéo.
   */
  generateHTML() {
    return `
      <figure>
        <video class="vids" controls src="${this.video}" aria-label="Video de l'auteur : ${this.title}" title=" ${this.title}" tabindex="0"></video>
        <figcaption class="personal-photos">
          <p class="photo-details">${this.title}</p>
          <div class="likes" role="button" aria-label="Bouton j'aime, nombre de likes pour ce media :${this.likes}">
            <p class="photo-details like-count" data-likes="${this.likes}" role="status" aria-live="polite" aria-atomic="true">${this.likes}</p>
            <i class="fas fa-heart heart-icon like-button" data-id="${this.id}" data-liked="false" aria-label="likes"></i>
          </div>
        </figcaption>
      </figure>`;
  }
}

export default VideoMedia;