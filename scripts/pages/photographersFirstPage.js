async function fetchPhotographers() {
    const api_url = "data/photographers.json";
    const res = await fetch(api_url);
    const photographersJsonFileData = await res.json();
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
    });
}

function createPhotographerTemplate(data) {
    const { name, portrait } = data;
    const picture = `assets/photographers/ID/${portrait}`;
    function getUserCardDOM() {
        const article = document.createElement('article');
        const img = document.createElement('img');
        img.setAttribute("src", picture);
        const h2 = document.createElement('h2');
        h2.textContent = name;
        article.appendChild(img);
        article.appendChild(h2);
        return article;
    }
    return { name, picture, getUserCardDOM };
}

