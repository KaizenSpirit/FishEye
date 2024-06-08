class Photographer {
  constructor(data) {
    this.name = data.name;
    this.portrait = data.portrait;
    this.city = data.city;
    this.country = data.country;
    this.tagline = data.tagline;
    this.price = data.price;
    this.id = data.id;
    this.picture = `./assets/photographers/ID/${this.portrait}`;

    this.getUserCardDOM = () => {
      const article = document.createElement('article');
      article.classList.add('photographer-article', `photographer-${this.id}`);
      article.innerHTML = `
        <a href="photographer.html?id=${this.id}">
          <img class="photographer-img photographer-${this.id}-img" src="${this.picture}" alt="${this.name}">
        </a>
         <h2 class="photograph-name photographer-${this.id}-name">${this.name}</h2>
        <h3 class="photograph-location photographer-${this.id}-location">${this.city}, ${this.country}</h3>
        <h4 class="photograph-tagline photographer-${this.id}-tagline">${this.tagline}</h4>
        <h5 class="photograph-price photographer-${this.id}-price">${this.price}€/jour</h5>
      `;
      return article;
    };
  }
}

export default Photographer;
