export default class MediaFactory {
    static createMedia(mediaData) {
        const { photographerId, title, image, video, likes } = mediaData;
        const media = { photographerId, title, likes };

        if (image) {
            media.image = `assets/photographers/medias/${image}`;
        }
        if (video) {
            media.video = `assets/photographers/videos/${video}`;
        }
        const getMediaContentDOM = () => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('div-photos');
            let htmlContent = '';
            if (media.image) {
                htmlContent += `<img class="img_display" src="${media.image}" alt="${title}">`;
            }
            htmlContent += `
                <div class="personal-photos">
                    <p class="photo-details">${title}</p>
                    <p class="photo-details like-count" data-likes="${likes}">${likes}</p>
                    <i class="fas fa-heart heart-icon like-button"></i>
                </div>`;

            if (media.video) {
                htmlContent += `<video class="vids" controls src="${media.video}" alt="${title}"></video>`;
            }
            itemDiv.innerHTML = htmlContent;
            return itemDiv;
        };

        return { ...media, getMediaContentDOM };
    }
}
