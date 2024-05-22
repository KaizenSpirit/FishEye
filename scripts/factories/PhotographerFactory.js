export default class PhotographerFactory {
    static createPhotographer(data) {
        const { name, portrait, city, country, tagline, price, id } = data;
        const picture = `assets/photographers/ID/${portrait}`;
        const getUserCardDOM = () => {
            const link = document.createElement('a');
            link.classList.add('photographer-link');
            link.setAttribute('href', 'photographer.html');
            link.setAttribute('aria-label', name);
            link.setAttribute('role', 'link');
            const article = document.createElement('article');
            article.classList.add('photographer-card');
            article.innerHTML = `
                <img src="${picture}" alt="${name}">
                <h2>${name}</h2>
                <h3>${city}, ${country}</h3>
                <h4>${tagline}</h4>
                <h5>${price}€/jour</h5>
            `;
            link.appendChild(article);

            return link;
        };
        return { id, name, picture, city, country, tagline, price, getUserCardDOM };
    }
}