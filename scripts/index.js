
const api_url = "data/photographers.json";

export async function getPhotographers() {
  const response = await fetch(api_url);
  const photographersJsonFileData = await response.json();
  return photographersJsonFileData.photographers;
}

export async function getMedias(photographerId) {
  const res = await fetch(api_url);
  const mediaJsonFileData = await res.json();
  const media = mediaJsonFileData.media.filter(item => item.photographerId === photographerId);
  return media;
}

 class MediaFactory {
  static getMedias(mediaData) {
      const { photographerId, title, image, video, likes } = mediaData;
      const media = { photographerId, title, likes };

      if (image) {
          media.image = `assets/photographers/medias/${image}`;
      }
      if (video) {
          media.video = `assets/photographers/videos/${video}`;
      }
      const getMediaContentDOM = () => {
          const itemDiv = document.createElement('article');
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

 class PhotographerFactory {
  static getPhotographers(data) {
      const { name, portrait, city, country, tagline, price, id } = data;
      const picture = `assets/photographers/ID/${portrait}`;
          const getUserCardDOM = () => {
              const article = document.createElement('article')
              article.innerHTML = `
              <a href="photographer.html?id=${id}">
                  <img src=${picture} alt="${name}">
                  <h2 class="photograph-name">${name}</h2>
              </a>
              <h3>${location}</h3>
              <h4>${tagline}</h4>
              <h5>${price}€/jour</h5>
          `;
          return (article);
      };
      return { id, name, picture, city, country, tagline, price, getUserCardDOM };
  }
}





window.onload = async () => {
  const selectedPhotographer = JSON.parse(localStorage.getItem('selectedPhotographer'));
  document.getElementById('nameProfil').textContent = selectedPhotographer.name;
  document.getElementById('locationProfil').textContent = `${selectedPhotographer.city}, ${selectedPhotographer.country}`;
  document.getElementById('taglineProfil').textContent = selectedPhotographer.tagline;
  document.getElementById('photoProfil').innerHTML = `<img src="assets/photographers/ID/${selectedPhotographer.portrait}" alt="${selectedPhotographer.name}">`;
  const media = await getMedias(selectedPhotographer.id);
  displayDataMedia(media);
};

function displayDataMedia(media) {
  const dataContainer = document.getElementById('dataContainer');
  dataContainer.innerHTML = '';

  media.forEach((mediaItem) => {
      const mediaModel = MediaFactory.getMedias(mediaItem);
      const mediaCardDOM = mediaModel.getMediaContentDOM();
      dataContainer.appendChild(mediaCardDOM);
  });
}


async function loadAndDisplayPhotographers() {
  const photographers = await getPhotographers();
  displayPhotographers(photographers);
}
async function displayPhotographers(photographers) {
  const photographersSection = document.querySelector(".photographer_section");
  photographers.forEach((photographer) => {
      const photographerModel = PhotographerFactory.getPhotographers(photographer);
      const userCardDOM = photographerModel.getUserCardDOM();
      photographersSection.appendChild(userCardDOM);

      userCardDOM.addEventListener('click', () => {
          localStorage.setItem('selectedPhotographer', JSON.stringify(photographer));
          window.location.href = 'photographer.html';
      });
  });
}

loadAndDisplayPhotographers();




const articles = document.querySelectorAll(".article");

articles.forEach(function(article) {
    // Ajoute un écouteur d'événement pour le focus
    article.addEventListener("focus", function() {
        this.classList.add("focus");
    });

    // article.addEventListener("click", function() {
    //     this.classList.remove("focus");
    // });

    // Ajoute un écouteur d'événement pour la perte de focus
    article.addEventListener("blur", function() {
        this.classList.remove("focus");
    });

});



document.querySelector(".contact_button").addEventListener('click',displayModal)
document.querySelector(".close_modale").addEventListener('click',closeModal)

function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}
