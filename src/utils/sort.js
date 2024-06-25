import { displayMedia } from '../photographer.js'; 

/**
 * Trie les médias selon un critère donné (date, likes, ou title).
 * @param {string} criteria - Le critère de tri ('date', 'likes', 'title').
 * @param {Array} medias - Le tableau des médias à trier.
 * @returns {Array} - Le tableau trié des médias.
 */
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

/**
 * Ajoute un écouteur d'événement pour trier les médias lorsque l'utilisateur change le critère de tri.
 * @param {Array} medias - Le tableau des médias à trier.
 */
export function addSortEventListener(medias) {
  const orderBySelect = document.getElementById('orderBy');
  orderBySelect.addEventListener('change', (event) => {
    if (!medias) {
      console.error('globalPhotographer or medias not defined');
      return;
    }

    let sortedMedias;
    switch (event.target.value) {
      case 'Date':
        sortedMedias = sortMediaBy('date', medias);
        break;
      case 'Popularité':
        sortedMedias = sortMediaBy('likes', medias);
        break;
      case 'Titre':
        sortedMedias = sortMediaBy('title', medias);
        break;
      default:
        sortedMedias = sortMediaBy('likes', medias);
    }
    displayMedia(sortedMedias);
  });
}
