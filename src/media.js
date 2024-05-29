
//1.En JavaScript, une classe est comme un plan ou un modèle pour créer des objets. Dans ce code, nous avons plusieurs classes : Media, ImageMedia, VideoMedia, et MediaFactory.

//2. La classe Media
// C'est la classe de base ou la classe parente.

// media.js
class Media {
  //Constructeur : Il s'agit d'une méthode spéciale qui est utilisée pour créer et initialiser un objet créé avec une classe. Ici, il prend un objet avec photographerId, title, et likes comme propriétés et les assigne à l'objet.
  constructor({ photographerId, title, likes }) {
    this.photographerId = photographerId;
    this.title = title;
    this.likes = likes;
  }
//Méthode getMediaContentDOM : Cette méthode crée un élément HTML <article>, lui ajoute une classe, et lui assigne du contenu HTML généré par une autre méthode generateHTML()
  getMediaContentDOM() {
    const itemDiv = document.createElement('article');
    itemDiv.classList.add('div-photos');
    itemDiv.innerHTML = this.generateHTML();
    return itemDiv;
  }
//Méthode generateHTML : C'est une méthode vide ici qui est destinée à être redéfinie dans les sous-classes (ImageMedia et VideoMedia). Si elle est appelée directement sur un objet Media, elle déclenche une erreur.
  generateHTML() {
    throw new Error("generateHTML must be implemented in subclasses");
  }
}

//3. La classe ImageMedia

// C'est une classe qui hérite de Media et représente une image.
class ImageMedia extends Media {
  //Constructeur : Il appelle le constructeur de la classe parente avec super(data), puis ajoute une propriété image qui construit le chemin de l'image.
  //Méthode generateHTML : Cette méthode crée du HTML spécifique pour afficher une image.
  constructor(data) {
    super(data);
    this.image = `assets/photographers/medias/${data.image}`;
  }

  generateHTML() {
    return `
      <img class="img_display" src="${this.image}" alt="${this.title}">
      <div class="personal-photos">
        <p class="photo-details">${this.title}</p>
        <p class="photo-details like-count" data-likes="${this.likes}">${this.likes}</p>
        <i class="fas fa-heart heart-icon like-button"></i>
      </div>`;
  }
}

//4. La classe VideoMedia
// C'est une classe qui hérite de Media et représente une vidéo.

class VideoMedia extends Media {
  //Constructeur : Il appelle le constructeur de la classe parente avec super(data), puis ajoute une propriété video qui construit le chemin de la vidéo.
  //Méthode generateHTML : Cette méthode crée du HTML spécifique pour afficher une vidéo
  constructor(data) {
    super(data);
    this.video = `../assets/photographers/videos/${data.video}`;
  }

  generateHTML() {
    return `
      <video class="vids" controls src="${this.video}" alt="${this.title}"></video>
      <div class="personal-photos">
        <p class="photo-details">${this.title}</p>
        <p class="photo-details like-count" data-likes="${this.likes}">${this.likes}</p>
        <i class="fas fa-heart heart-icon like-button"></i>
      </div>`;
  }
}
//5. La classe MediaFactory

// Cette classe est utilisée pour créer des objets Media spécifiques (soit ImageMedia soit VideoMedia).

class MediaFactory {
  //Méthode createMedia : Cette méthode regarde les données mediaData et décide si elle doit créer un objet ImageMedia ou VideoMedia en fonction de la présence d'une propriété image ou video.
  static createMedia(mediaData) {
    if (mediaData.image) {
      return new ImageMedia(mediaData);
    } else if (mediaData.video) {
      return new VideoMedia(mediaData);
    } else {
      throw new Error("Unknown media type");
    }
  }
}
//6. Exportation des classes

// Enfin, ces classes sont exportées pour être utilisées dans d'autres fichiers.

export { Media, ImageMedia, VideoMedia, MediaFactory };


//Media : Classe de base pour tous les types de médias.
// ImageMedia : Classe pour les images, hérite de Media.
// VideoMedia : Classe pour les vidéos, hérite de Media.
// MediaFactory : Classe utilitaire pour créer des instances de ImageMedia ou VideoMedia en fonction des données fournies.