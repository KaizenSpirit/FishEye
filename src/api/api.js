import MediaFactory from '../factories/MediaFactory.js'
import Photographer from '../models/photographer.js';
const api_url = "./data/photographers.json";

export async function getPhotographers() {
  const response = await fetch(api_url);
  const photographersJsonFileData = await response.json();
  const photographers = photographersJsonFileData.photographers.map(data => new Photographer(data));
  return photographers;
}

export async function getPhotographerAndMedias(photographerId) {
  const response = await fetch(api_url);
  const data = await response.json();
  const photographerData = data.photographers.find(p => p.id === photographerId);
  const photographer = new Photographer(photographerData)
  const media = data.media.filter(m => m.photographerId === photographerId).map(mediaItem =>new MediaFactory(mediaItem));
  return { photographer, media };
}


//addSortListener ne plus passer de fonction en paramètre : displayMedia
// impoter utils.js dans photographer.html
//changer l'appel des prix au chargement de la page et updater le coeurs dans une focntion à part
//Utiliser le même focus sur l'image que sur la video