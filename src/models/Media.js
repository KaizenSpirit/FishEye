/**
 * Classe de base pour les objets média, contenant des propriétés communes et des méthodes pour manipuler ces médias.
 */
class Media {
  /**
   * Construit une instance de Media avec des attributs spécifiés.
   * @param {Object} param0 - Un objet contenant toutes les propriétés nécessaires pour créer une instance de Media.
   * @param {number} param0.id - L'identifiant unique du média.
   * @param {number} param0.photographerId - L'identifiant du photographe associé au média.
   * @param {string} param0.title - Le titre du média.
   * @param {number} param0.likes - Le nombre de "j'aime" que le média a reçu.
   * @param {Date} param0.date - La date de création ou de publication du média.
   * @param {number} param0.price - Le prix du média, si applicable.
   * @param {string} param0.image - Le chemin d'accès à l'image du média, si c'est une image.
   * @param {string} param0.video - Le chemin d'accès à la vidéo du média, si c'est une vidéo.
   */
  constructor({ id, photographerId, title, likes, date, price, image, video }) {
    this.id = id;
    this.photographerId = photographerId;
    this.title = title;
    this.likes = likes;
    this.date = date;
    this.price = price;
    this.image = image;
    this.video = video;
  }

  /**
   * Génère un élément DOM à partir du HTML retourné par la méthode generateHTML.
   * Cette méthode utilise un DOMParser pour transformer une chaîne HTML en un élément DOM.
   * @returns {ChildNode} Le premier enfant du corps du document analysé, représentant le contenu média sous forme d'élément DOM.
   */
  getMediaContentDOM() {
    const htmlString = this.generateHTML();
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    return doc.body.firstChild;
  }

  /**
   * Méthode destinée à être surchargée par des sous-classes pour générer du HTML spécifique au type de média.
   * @returns {string} Une chaîne de caractères représentant le HTML pour le média.
   */
  generateHTML() {
    throw new Error('This method should be implemented by subclasses');
  }
}

export default Media;







