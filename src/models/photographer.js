// Représentation des photographes
class Photographer {
  constructor(data) {
    this.name = data.name;
    this.portrait = data.portrait;
    this.city = data.city;
    this.country = data.country;
    this.tagline = data.tagline;
    this.price = data.price;
    this.id = data.id;
    // Chemin de la photo du photographe basé sur les données fournies
    this.picture = `./assets/photographers/ID/${this.portrait}`;
  }

  // Mise à jour des détails du photographe dans le DOM
  updatePhotographerDetails() {
    document.querySelector('.photograph-name').textContent = this.name;
    document.querySelector('.photograph-location').textContent = `${this.city}, ${this.country}`;
    document.querySelector('.photograph-tagline').textContent = this.tagline;
    document.querySelector('#contact_modal .photographer-name').textContent = this.name;
    document.querySelector('#contact-modal-end .photographer-name').textContent = this.name;
  }

  // Isersion de l'image du photographe dans le header du DOM
  insertPhotographerImage() {
    const photographerHeader = document.querySelector('.photograph-header');
    const imgHTML = `
      <a href="#photographer-images">
        <img 
          src="${this.picture}" 
          alt="${this.name}" 
          class="photograph-img photograph-${this.id}-img"
        />
      </a>
    `;
    photographerHeader.insertAdjacentHTML('beforeend', imgHTML);
  }

  // Obtention de la carte utilisateur du photographe en tant que nœud DOM
  getUserCardDOM() {
    const article = document.createElement('article');
    article.classList.add('photographer-article', `photographer-${this.id}`);
    article.innerHTML = `
      <a href="photographer.html?id=${this.id}">
        <img class="photographer-img photographer-${this.id}-img" src="${this.picture}" alt="Visitez la page de ${this.name}">
      </a>
      <h2 class="photograph-name photographer-${this.id}-name">${this.name}</h2>
      <h3 class="photograph-location photographer-${this.id}-location">${this.city}, ${this.country}</h3>
      <h4 class="photograph-tagline photographer-${this.id}-tagline">${this.tagline}</h4>
      <h5 class="photograph-price photographer-${this.id}-price">${this.price}€/jour</h5>
    `;
    return article;
  }
}


export default Photographer;



