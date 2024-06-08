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

  getMediaContentDOM() {      //Essayer de changer cela comme le mentor l'a fait ?
    const figure = document.createElement('figure');
    figure.innerHTML = this.generateHTML();
    return figure;
  }

}

export default Media;
