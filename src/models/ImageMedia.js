import Media from './Media.js';
/**
 * Représente un média de type image, étend la classe Media pour ajouter une gestion spécifique des images.
 */
class ImageMedia extends Media {
  /**
   * Crée une nouvelle instance d'ImageMedia.
   * @param {Object} data - Les données spécifiques au média image.
   * @param {string} data.image - Le nom de fichier de l'image.
   */
  constructor(data) {
    super(data);
    this.image = `./assets/photographers/medias/${data.image}`;
  }

  /**
   * Génère et retourne le HTML nécessaire pour afficher l'image sur la page web.
   * Le HTML inclut une balise `<figure>` avec une `<img>`, et une `<figcaption>` contenant les détails de l'image et des options pour aimer l'image.
   * @returns {string} Le HTML sous forme de chaîne de caractères pour l'affichage de l'image.
   */
  generateHTML() {
    return `
      <figure>
        <img class="img_display" src="${this.image}" alt="Image de l'auteur : ${this.title}" title="${this.title}" tabindex="0">
        <figcaption class="personal-photos">
          <p class="photo-details">${this.title}</p>
          <div class="likes">
            <p class="photo-details like-count" data-likes="${this.likes}">${this.likes}</p>
            <i class="fa-solid fa-heart like-button" data-id="${this.id}" data-liked="false" aria-label="likes"></i>
          </div>
        </figcaption>
      </figure>`;
  }
}

export default ImageMedia;

