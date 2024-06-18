// Importer des classes:
import ImageMedia from '../models/ImageMedia.js';
import VideoMedia from '../models/VideoMedia.js';

class MediaFactory {
  constructor(mediaData) {
    if (mediaData.image) {
      return new ImageMedia(mediaData);
    } else if (mediaData.video) {
      return new VideoMedia(mediaData);
    } else {
      throw new Error("Unknown media type");
    }
  }
}

export default MediaFactory;
