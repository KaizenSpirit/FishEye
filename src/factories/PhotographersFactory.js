export class PhotographersFactory {
  static createPhotographer(data) {
    const { name, portrait, city, country, tagline, price, id } = data;
    const picture = `../assets/photographers/ID/${portrait}`;
    const getUserCardDOM = () => {
      const article = document.createElement('article');
      article.innerHTML = `
        <a href="photographer.html?id=${id}">
          <img src=${picture} alt="${name}">
          <h2 class="photograph-name">${name}</h2>
        </a>
        <h3>${city}, ${country}</h3>
        <h4>${tagline}</h4>
        <h5>${price}€/jour</h5>
      `;
      return article;
    };
    return { id, name, picture, city, country, tagline, price, getUserCardDOM };
  }
}