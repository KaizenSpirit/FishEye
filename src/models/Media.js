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





// class Media {
//   constructor({ id, photographerId, title, likes, date, price, image, video }) {
//     this.id = id;
//     this.photographerId = photographerId;
//     this.title = title;
//     this.likes = likes;
//     this.date = date;
//     this.price = price;
//     this.image = image;
//     this.video = video;
//   }

//   generateHTML() {
//     let mediaContent = 
//           this.image ? `<img src="${this.image}" alt="${this.title}">` :
//           this.video ? `<video controls><source src="${this.video}" type="video/mp4"></video>` : '';
    
//     return `
//       <figure>
//         ${mediaContent}
//         <figcaption>${this.title}</figcaption>
//       </figure>
//     `;
//   }

//   getMediaContentDOM() {
//     const parser = new DOMParser();
//     const mediaString = this.generateHTML();
//     const mediaDocument = parser.parseFromString(mediaString, 'text/html');
//     return mediaDocument.body;
//   }
// }

// export default Media;