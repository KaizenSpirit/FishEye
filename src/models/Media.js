export default class Media {
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