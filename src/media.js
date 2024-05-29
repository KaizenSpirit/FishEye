class Media {
  constructor({ photographerId, title, likes }) {
    this.photographerId = photographerId;
    this.title = title;
    this.likes = likes;
  }
  getMediaContentDOM() {
    const itemDiv = document.createElement('article');
    itemDiv.classList.add('div-photos');
    itemDiv.innerHTML = this.generateHTML();
    return itemDiv;
  }
  generateHTML() {
    throw new Error("generateHTML must be implemented in subclasses");
  }
}

class ImageMedia extends Media {
  constructor(data) {
    super(data);
    this.image = `assets/photographers/medias/${data.image}`;
  }

  generateHTML() {
    return `
      <img class="img_display" src="${this.image}" alt="${this.title}">
      <div class="personal-photos">
        <p class="photo-details">${this.title}</p>
        <p class="photo-details like-count" data-likes="${this.likes}">${this.likes}</p>
        <i class="fas fa-heart heart-icon like-button"></i>
      </div>`;
  }
}

class VideoMedia extends Media {
  constructor(data) {
    super(data);
    this.video = `../assets/photographers/videos/${data.video}`;
  }

  generateHTML() {
    return `
      <video class="vids" controls src="${this.video}" alt="${this.title}"></video>
      <div class="personal-photos">
        <p class="photo-details">${this.title}</p>
        <p class="photo-details like-count" data-likes="${this.likes}">${this.likes}</p>
        <i class="fas fa-heart heart-icon like-button"></i>
      </div>`;
  }
}

class MediaFactory {
  static createMedia(mediaData) {
    if (mediaData.image) {
      return new ImageMedia(mediaData);
    } else if (mediaData.video) {
      return new VideoMedia(mediaData);
    } else {
      throw new Error("Unknown media type");
    }
  }
}

export { Media, ImageMedia, VideoMedia, MediaFactory };
