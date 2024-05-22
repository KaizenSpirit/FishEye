export async function fetchPhotographers() {
  const api_url = "data/photographers.json";
  const response = await fetch(api_url);
  const photographersJsonFileData = await response.json();
  return photographersJsonFileData.photographers;
}

export async function fetchMedia(photographerId) {
  const api_url = "data/photographers.json";
  const res = await fetch(api_url);
  const mediaJsonFileData = await res.json();
  const media = mediaJsonFileData.media.filter(item => item.photographerId === photographerId);
  return media;
}
