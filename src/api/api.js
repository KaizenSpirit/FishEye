import MediaFactory from '../factories/MediaFactory.js';
import Photographer from '../models/photographer.js';
const api_url = "./data/photographers.json";

// Récupérer tous les photographes depuis le fichier JSON et créer des objets photographe
export async function getPhotographers() {
  const response = await fetch(api_url);
  const photographersJsonFileData = await response.json();
  const photographers = photographersJsonFileData.photographers.map(data => new Photographer(data));
  return photographers;
}

// Récupérer les données d'un photographe spécifique et ses médias associés en fonction de son ID
export async function getPhotographerAndMedias(photographerId) {
  const response = await fetch(api_url);
  const data = await response.json();
  const photographerData = data.photographers.find(p => p.id === photographerId);
  const photographer = new Photographer(photographerData);
  const media = data.media.filter(m => m.photographerId === photographerId).map(mediaItem => new MediaFactory(mediaItem));
  return { photographer, media };
}

