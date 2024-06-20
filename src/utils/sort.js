import { displayMedia, globalPhotographer } from '../photographer.js'; // Importer displayMedia et globalPhotographer

// Fonction pour trier les médias selon un critère donné
export function sortMediaBy(criteria, medias) {
  if (!medias) {
    console.error('No medias to sort');
    return [];
  }

  return medias.slice().sort((a, b) => {
    if (criteria === 'date') {
      // Trier par date (plus récent au plus ancien)
      return new Date(b.date) - new Date(a.date);
    } else if (criteria === 'likes') {
      // Trier par nombre de likes (du plus élevé au plus bas)
      return b.likes - a.likes;
    } else if (criteria === 'title') {
      // Trier par titre (ordre alphabétique)
      if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
      if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
      return 0;
    }
    return 0;
  });
}

// Fonction pour ajouter un écouteur d'événements sur l'élément de tri
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
        // Trier les médias par date
        sortedMedias = sortMediaBy('date', globalPhotographer.medias);
        break;
      case 'Popularité':
        // Trier les médias par popularité (likes)
        sortedMedias = sortMediaBy('likes', globalPhotographer.medias);
        break;
      case 'Titre':
        // Trier les médias par titre
        sortedMedias = sortMediaBy('title', globalPhotographer.medias);
        break;
      default:
        // Par défaut, trier par popularité
        sortedMedias = sortMediaBy('likes', globalPhotographer.medias);
    }
    // Afficher les médias triés
    displayMedia(sortedMedias);
  });
}
