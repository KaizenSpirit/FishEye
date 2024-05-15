async function fetchPhotographers() {
    const api_url = "data/photographers.json";
    const response = await fetch(api_url);
    const photographersJsonFileData = await response.json();
    return photographersJsonFileData.photographers;
}

async function loadAndDisplayPhotographers() {
    const  photographers  = await fetchPhotographers();
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

        // Crée le contenu HTML avec des template literals
        article.innerHTML = `
            <a href="photographer.html">
                <img src="${picture}" alt="${name}">
            </a>
            <h2>${name}</h2>
            <h3>${city}, ${country}</h3>
            <h4>${tagline}</h4>
            <h5>${price}€/jour</h5>
        `;
        return article;
    };

    return { name, picture, city, country, tagline, price, getUserCardDOM };
}







