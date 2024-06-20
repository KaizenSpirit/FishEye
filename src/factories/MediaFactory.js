// Importer des classes:
import ImageMedia from '../models/ImageMedia.js';
import VideoMedia from '../models/VideoMedia.js';

// La classe MediaFactory crée une instance de ImageMedia ou VideoMedia en fonction des données fournies via les modèles
class MediaFactory {
  constructor(mediaData) {
    if (mediaData.image) {
      // Si les données contiennent une image, créer une instance de ImageMedia
      return new ImageMedia(mediaData);
    } else if (mediaData.video) {
      // Si les données contiennent une vidéo, créer une instance de VideoMedia
      return new VideoMedia(mediaData);
    } else {
      // Si le type de média est inconnu, lancer une erreur
      throw new Error("Unknown media type");
    }
  }
}

export default MediaFactory;

