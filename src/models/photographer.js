class Photographer {
  constructor(data) {
    // Initialisation des propriétés de l'objet avec les données fournies
    this.name = data.name;
    this.portrait = data.portrait;
    this.city = data.city;
    this.country = data.country;
    this.tagline = data.tagline;
    this.price = data.price;
    this.id = data.id;

    // Chemin de l'image du photographe
    this.picture = `./assets/photographers/ID/${this.portrait}`;

    // Fonction pour obtenir la carte utilisateur en DOM
    this.getUserCardDOM = () => {
      const article = document.createElement('article');
      article.innerHTML = `
        <a href="photographer.html?id=${this.id}">
          <img src="${this.picture}" alt="${this.name}">
          <h2 class="photograph-name">${this.name}</h2>
        </a>
        <h3 class="photograph-location">${this.city}, ${this.country}</h3>
        <h4 class="photograph-tagline">${this.tagline}</h4>
        <h5 class="photograph-price">${this.price}€/jour</h5>
      `;
      return article;
    };
  }
}

export default Photographer;