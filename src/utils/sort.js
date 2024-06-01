export function sortMediaBy(criteria, medias) {
  return medias.slice().sort((a, b) => {
    if (criteria === 'date') {
      // Tri par date de la plus récente à la plus ancienne
      return new Date(b.date) - new Date(a.date);
    } else if (criteria === 'likes') {
      // Tri par likes du plus grand au plus petit
      return b.likes - a.likes;
    } else if (criteria === 'title') {
      // Tri par titre en ordre alphabétique de A à Z
      if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
      if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
      return 0;
    }
    return 0;
  });
}

export function addSortEventListener(photographer, displayMedia) {
  const orderBySelect = document.getElementById('orderBy');
  orderBySelect.addEventListener('change', (event) => {
    let sortedMedias;
    switch (event.target.value) {
      case 'Date':
        sortedMedias = sortMediaBy('date', photographer.medias);
        break;
      case 'Popularité':
        sortedMedias = sortMediaBy('likes', photographer.medias);
        break;
      case 'Titre':
        sortedMedias = sortMediaBy('title', photographer.medias);
        break;
      default:
        sortedMedias = sortMediaBy('likes', photographer.medias);
    }
    displayMedia(sortedMedias, photographer.price);
  });
}


