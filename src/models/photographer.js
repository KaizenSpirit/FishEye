/**
 * Représente un photographe avec ses détails personnels et des méthodes pour manipuler et afficher ces informations dans l'interface utilisateur.
 */
class Photographer {
  /**
   * Crée une instance de Photographer.
   * @param {Object} data - Les données du photographe.
   * @param {string} data.name - Le nom du photographe.
   * @param {string} data.portrait - Le nom de fichier du portrait du photographe.
   * @param {string} data.city - La ville du photographe.
   * @param {string} data.country - Le pays du photographe.
   * @param {string} data.tagline - La phrase d'accroche du photographe.
   * @param {number} data.price - Le tarif journalier du photographe.
   * @param {number} data.id - L'identifiant unique du photographe.
   */
  constructor(data) {
    this.name = data.name;
    this.portrait = data.portrait;
    this.city = data.city;
    this.country = data.country;
    this.tagline = data.tagline;
    this.price = data.price;
    this.id = data.id;
    this.picture = `./assets/photographers/ID/${this.portrait}`;
  }

  /**
   * Met à jour les détails du photographe dans l'interface utilisateur.
   * Modifie le contenu des éléments DOM correspondants avec les informations du photographe.
   */
  updatePhotographerDetails() {
    document.querySelector('.photograph-name').textContent = this.name;
    document.querySelector('.photograph-location').textContent = `${this.city}, ${this.country}`;
    document.querySelector('.photograph-tagline').textContent = this.tagline;
    document.querySelector('#contact_modal .photographer-name').textContent = this.name;
    document.querySelector('#contact-modal-end .photographer-name').textContent = this.name;
  }

  /**
   * Insère l'image du photographe dans l'en-tête de la page du photographe.
   * Ajoute un élément HTML contenant l'image du photographe à l'élément DOM spécifié.
   */
  insertPhotographerImage() {
    const photographerHeader = document.querySelector('.photograph-header');
    const imgHTML = `
      <a href="#photographer-images">
        <img 
          src="${this.picture}" 
          alt="${this.name}" 
          class="photograph-img"
        />
      </a>
    `;
    photographerHeader.insertAdjacentHTML('beforeend', imgHTML);
  }

  /**
   * Crée et retourne un élément DOM représentant une carte de visite du photographe.
   * La carte de visite inclut l'image, le nom, la localisation, la tagline et le tarif du photographe.
   * @returns {HTMLElement} Un élément DOM <article> contenant les informations du photographe.
   */
  getUserCardDOM() {
    const article = document.createElement('article');
    article.classList.add('photographer-article', `photographer-${this.id}`);
    article.innerHTML = `
      <a href="photographer.html?id=${this.id}">
        <img class="photographer-img" src="${this.picture}" alt="Visitez la page de ${this.name}">
      </a>
      <a href="photographer.html?id=${this.id}" class="photograph-name-first-page"><h2 class="photograph-name photographer-${this.id}-name">${this.name}</h2></a>
      <h3 class="photograph-location photographer-${this.id}-location">${this.city}, ${this.country}</h3>
      <h4 class="photograph-tagline photographer-${this.id}-tagline">${this.tagline}</h4>
      <h5 class="photograph-price photographer-${this.id}-price">${this.price}€/jour</h5>
    `;
    return article;
  }
}

export default Photographer;
