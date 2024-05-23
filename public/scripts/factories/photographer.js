
function photographerTemplate(data) {
  const { name, portrait, location, tagline, price, id } = data;
  function getUserCardDOM() {
      const article = document.createElement('article');
      article.innerHTML = `
          <a href="../../../public/page_photographe/photographer.html?id=${id}"> <!-- Lien vers la page du photographe avec son id -->
              <img src=${portrait} alt="${name}"> <!-- Image du photographe -->
              <h2 class="photograph-name">${name}</h2> <!-- Nom du photographe -->
          </a>
          <h3 class="photograph-location">${location}</h3> <!-- Localisation du photographe -->
          <h4 class="photograph-tagline">${tagline}</h4> <!-- Tagline du photographe -->
          <h5 class="photograph-price">${price}€/jour</h5> <!-- Prix du photographe -->
      `;
      return article;
  }
  return { name, portrait, location, tagline, getUserCardDOM };
}