const api_url = "./data/photographers.json";

export async function getPhotographers() {
  const response = await fetch(api_url);
  const photographersJsonFileData = await response.json();
  return photographersJsonFileData.photographers;
}

export async function getPhotographerAndMedias(photographerId) {
  const response = await fetch(api_url);
  const data = await response.json();
  const photographer = data.photographers.find(p => p.id === photographerId);
  const media = data.media.filter(m => m.photographerId === photographerId);
  return { photographer, media };
}
//Retourner un objet en utilisant le modèle photographer et pareil pour Media