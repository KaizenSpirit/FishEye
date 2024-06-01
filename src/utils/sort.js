export function sortMediaBy(criteria, medias) {
  return medias.slice().sort((a, b) => {
    if (a[criteria] > b[criteria]) return -1;
    if (a[criteria] < b[criteria]) return 1;
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


