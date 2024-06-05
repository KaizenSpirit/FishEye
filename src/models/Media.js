
class Media {
  constructor({ id, photographerId, title, likes, date, price, image, video }) {
    this.id = id;
    this.photographerId = photographerId;
    this.title = title;
    this.likes = likes;
    this.date = date;
    this.price = price;
  }

  getMediaContentDOM() {      //Essayer de changer cela comme le mentor l'a fait ?
    const figure = document.createElement('figure');
    figure.innerHTML = this.generateHTML();
    return figure;
  }

  generateHTML() {
    throw new Error("generateHTML must be implemented in subclasses");
  }
}

export default Media;
