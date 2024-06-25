import ImageMedia from '../models/ImageMedia.js';
import VideoMedia from '../models/VideoMedia.js';

/**
 * Création des instances de médias basées sur les données fournies.
 * Cette classe examine les données de média et décide quel type d'objet média instancier.
 */
class MediaFactory {  
  /**
   * Crée une instance de média appropriée en fonction des données fournies.
   * @param {Object} mediaData - Les données descriptives du média.
   * @param {string} mediaData.image - Chemin d'accès à l'image, si le média est une image.
   * @param {string} mediaData.video - Chemin d'accès à la vidéo, si le média est une vidéo.
   * @returns {ImageMedia|VideoMedia} - Retourne une instance de ImageMedia ou VideoMedia basée sur les données fournies.
   * @throws {Error} - Lance une erreur si le type de média n'est pas reconnu.
   */
  constructor(mediaData) {
    if (mediaData.image) {
      return new ImageMedia(mediaData);
    } else if (mediaData.video) {
      return new VideoMedia(mediaData);
    } else {
      throw new Error("Unknown media type");
    }
  }
}

export default MediaFactory;


