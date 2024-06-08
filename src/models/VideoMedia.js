import Media from './Media.js';

class VideoMedia extends Media {
  constructor(data) {
    super(data);
    this.video = `./assets/photographers/videos/${data.video}`;
  }

  generateHTML() {
    return `
      <figure>
        <video class="vids" controls src="${this.video}" alt="${this.title}" title="${this.title}" tabindex="0"></video>
        <figcaption class="personal-photos">
          <p class="photo-details">${this.title}</p>
          <div class="likes">
            <p class="photo-details like-count" data-likes="${this.likes}">${this.likes}</p>
            <i class="fas fa-heart heart-icon like-button" data-id="${this.id}" data-liked="false"></i>
          </div>
        </figcaption>
      </figure>`;
  }
}

export default VideoMedia;

