async function fetchPhotographers() {
    const api_url = "data/photographers.json";
    const response = await fetch(api_url);
    const photographersJsonFileData = await response.json();
    const photographers = photographersJsonFileData.photographers;
    return { photographers: [...photographers] };
}

async function loadAndDisplayPhotographers() {
    const { photographers } = await fetchPhotographers();
    displayPhotographers(photographers);
}
loadAndDisplayPhotographers();

async function displayPhotographers(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = createPhotographerTemplate(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);

    userCardDOM.addEventListener('click', () => {
        localStorage.setItem('selectedPhotographer', JSON.stringify(photographer));
        window.location.href = 'photographer.html';
    });

    });
}

function createPhotographerTemplate(data) {
    const { name, portrait, city, country, tagline, price } = data;
    const picture = `assets/photographers/ID/${portrait}`;
    const getUserCardDOM = () => {                  
        const article = document.createElement('article');
        const link = document.createElement('a');
        link.href = 'photographer.html'; 
        const img = document.createElement('img');
        img.src = picture;
        link.appendChild(img);
        const h2 = document.createElement('h2');
        const h3 = document.createElement('h3');
        const h4 = document.createElement('h4');
        const h5 = document.createElement('h5');
        h2.textContent = name;
        h3.textContent = `${city}, ${country}`;
        h4.textContent = tagline;
        h5.textContent = `${price}€/jour`;
        article.appendChild(link); 
        article.appendChild(h2);
        article.appendChild(h3);
        article.appendChild(h4);
        article.appendChild(h5);
        return article;
    };
    return { name, picture, city, country, tagline, price, getUserCardDOM };
}

