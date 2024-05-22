import MediaFactory from '../factories/MediaFactory.js';
import { fetchMedia } from '../api/api.js';

window.onload = async () => {
    const selectedPhotographer = JSON.parse(localStorage.getItem('selectedPhotographer'));
    document.getElementById('nameProfil').textContent = selectedPhotographer.name;
    document.getElementById('locationProfil').textContent = `${selectedPhotographer.city}, ${selectedPhotographer.country}`;
    document.getElementById('taglineProfil').textContent = selectedPhotographer.tagline;
    document.getElementById('photoProfil').innerHTML = `<img src="assets/photographers/ID/${selectedPhotographer.portrait}" alt="${selectedPhotographer.name}">`;
    const media = await fetchMedia(selectedPhotographer.id);
    displayDataMedia(media);
};

function displayDataMedia(media) {
    const dataContainer = document.getElementById('dataContainer');
    dataContainer.innerHTML = '';

    media.forEach((mediaItem) => {
        const mediaModel = MediaFactory.createMedia(mediaItem);
        const mediaCardDOM = mediaModel.getMediaContentDOM();
        dataContainer.appendChild(mediaCardDOM);
    });
}
