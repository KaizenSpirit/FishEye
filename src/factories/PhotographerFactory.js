//Cette ligne définit une classe appelée PhotographerFactory. Une classe est comme un plan de construction pour créer des objets avec des propriétés et des méthodes spécifiques.
class PhotographerFactory {
  //Méthode statique createPhotographer:
  //static createPhotographer(data) : Cette méthode statique peut être appelée directement sur la classe PhotographerFactory, sans avoir besoin de créer une instance de la classe. Elle prend un paramètre data, qui est un objet contenant les informations du photographe.
  static createPhotographer(data) {
    //Extraction des données du photographe:
    //Cette ligne utilise la déstructuration pour extraire les propriétés name, portrait, city, country, tagline, price et id de l'objet data.
    const { name, portrait, city, country, tagline, price, id } = data;
    //Construction de l'URL de l'image:
    //Cette ligne crée une URL pour l'image du photographe en utilisant la valeur de portrait et en la combinant avec le chemin vers le dossier des photographes
    const picture = `./assets/photographers/ID/${portrait}`;
    //Méthode getUserCardDOM
    const getUserCardDOM = () => {
      //const getUserCardDOM = () => { ... } : Cette fonction retourne un élément DOM représentant la carte du photographe.

    // const article = document.createElement('article'); : Crée un élément <article> HTML.
    // article.innerHTML = \...`;` : Remplit cet élément avec le HTML nécessaire pour afficher les informations du photographe :
    //     <a href="photographer.html?id=${id}"> : Crée un lien vers la page du photographe en utilisant son ID.
    //     <img src="${picture}" alt="${name}"> : Affiche l'image du photographe.
    //     <h2 class="photograph-name">${name}</h2> : Affiche le nom du photographe.
    //     <h3 class="photograph-location">${city}, ${country}</h3> : Affiche la ville et le pays du photographe.
    //     <h4 class="photograph-tagline">${tagline}</h4> : Affiche le slogan du photographe.
    //     <h5 class="photograph-price">${price}€/jour</h5> : Affiche le prix du photographe par jour.
    // return article; : Retourne l'élément <article> contenant les informations du photographe.
      const article = document.createElement('article');
      article.innerHTML = `
        <a href="photographer.html?id=${id}">
          <img src="${picture}" alt="${name}">
          <h2 class="photograph-name">${name}</h2>
        </a>
        <h3 class="photograph-location">${city}, ${country}</h3>
        <h4 class="photograph-tagline">${tagline}</h4>
        <h5 class="photograph-price">${price}€/jour</h5>
      `;
      return article;
    };
    return { id, name, picture, city, country, tagline, price, getUserCardDOM };
  }
}


export default PhotographerFactory;

