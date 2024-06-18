import { displayMedia, globalPhotographer } from '../photographer.js'; // Importer displayMedia et globalPhotographer

export function sortMediaBy(criteria, medias) {
  if (!medias) {
    console.error('No medias to sort');
    return [];
  }

  return medias.slice().sort((a, b) => {
    if (criteria === 'date') {
      return new Date(b.date) - new Date(a.date);
    } else if (criteria === 'likes') {
      return b.likes - a.likes;
    } else if (criteria === 'title') {
      if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
      if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
      return 0;
    }
    return 0;
  });
}

export function addSortEventListener() {
  const orderBySelect = document.getElementById('orderBy');
  orderBySelect.addEventListener('change', (event) => {
    if (!globalPhotographer || !globalPhotographer.medias) {
      console.error('globalPhotographer or medias not defined');
      return;
    }

    let sortedMedias;
    switch (event.target.value) {
      case 'Date':
        sortedMedias = sortMediaBy('date', globalPhotographer.medias);
        break;
      case 'Popularité':
        sortedMedias = sortMediaBy('likes', globalPhotographer.medias);
        break;
      case 'Titre':
        sortedMedias = sortMediaBy('title', globalPhotographer.medias);
        break;
      default:
        sortedMedias = sortMediaBy('likes', globalPhotographer.medias);
    }
    displayMedia(sortedMedias);
  });
}
