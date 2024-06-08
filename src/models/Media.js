class Media {
  constructor({ id, photographerId, title, likes, date, price, image, video }) {
    this.id = id;
    this.photographerId = photographerId;
    this.title = title;
    this.likes = likes;
    this.date = date;
    this.price = price;
    this.image = image;
    this.video = video;
  }

  getMediaContentDOM() {
    const htmlString = this.generateHTML();
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    return doc.body.firstChild;
  }
}

export default Media;





