import MediaFactory from '../factories/MediaFactory.js';
import Photographer from '../models/photographer.js';
const api_url = "./data/photographers.json";

/**
 * Récupère et retourne une liste de tous les photographes.
 * @async Fonction asynchrone qui retourne une promesse
 * @returns {Promise<Photographer[]>} Une promesse qui résout un tableau d'instances de Photographer.
 */
export async function getPhotographers() {
  const response = await fetch(api_url);
  const photographersJsonFileData = await response.json();
  const photographers = photographersJsonFileData.photographers.map(data => new Photographer(data));
  return photographers;
}

/**
 * Récupère et retourne un photographe et ses médias associés en fonction de son identifiant.
 * @async 
 * @param {number} photographerId - L'identifiant unique du photographe à retrouver.
 * @returns {Promise<{photographer: Photographer, media: MediaFactory[]}>} Une promesse qui résout un objet contenant un photographe et un tableau de ses médias, chacun créé via la MediaFactory.
 */
export async function getPhotographerAndMedias(photographerId) {
  const response = await fetch(api_url);
  const data = await response.json();
  const photographerData = data.photographers.find(p => p.id === photographerId);
  const photographer = new Photographer(photographerData);
  const media = data.media.filter(m => m.photographerId === photographerId).map(mediaItem => new MediaFactory(mediaItem));
  return { photographer, media };
}

