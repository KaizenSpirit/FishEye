// photographer.js
//Ce code concerne la création d'objets "Photographer" (photographe) avec une classe appelée PhotographerFactory. Cette classe contient une méthode statique pour créer des objets photographe, avec leurs informations et une méthode pour générer leur carte utilisateur en HTML.
//Détails du fonctionnement

// Classe PhotographerFactory : C'est une classe contenant une méthode statique pour créer des objets photographe.

// Méthode statique createPhotographer :
//     Une méthode statique est une méthode qui appartient à la classe elle-même, pas à ses instances. Elle est appelée directement sur la classe.
//     Cette méthode prend en entrée un objet data contenant des informations sur un photographe.

// Extraction des données :

class PhotographerFactory {
  static createPhotographer(data) {
    //Ici, les propriétés name, portrait, city, country, tagline, price, et id sont extraites de l'objet data pour une utilisation plus simple.
    const { name, portrait, city, country, tagline, price, id } = data;
    //Construction du chemin de l'image :
    const picture = `../assets/photographers/ID/${portrait}`;
//    Une chaîne de caractères est créée pour stocker le chemin de l'image du photographe.

// Méthode getUserCardDOM :

// Cette méthode crée une carte utilisateur en HTML pour le photographe.
// Création d'un élément article :

    const getUserCardDOM = () => {
      //    Un élément HTML article est créé.

// Insertion du contenu HTML dans l'article :
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
      //    Le contenu HTML est inséré dans l'élément article, incluant une image, un lien, et diverses informations sur le photographe.

// Retourne l'article :
//        La méthode retourne l'élément article créé.

// Retour de l'objet photographe :
      return article;
    };
//La méthode retourne un objet contenant toutes les propriétés du photographe ainsi que la méthode getUserCardDOM.
    return { id, name, picture, city, country, tagline, price, getUserCardDOM };
  }
}

export { PhotographerFactory };

//PhotographerFactory : Une classe qui contient une méthode pour créer des objets représentant des photographes.
// createPhotographer : Une méthode statique qui prend des données de photographe, crée une représentation de ce photographe et une méthode pour générer une carte HTML.
// Méthode getUserCardDOM : Génère une carte utilisateur en HTML pour un photographe, incluant son image, son nom, sa ville, son pays, son slogan, et son prix.

