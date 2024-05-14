
    async function getPhotographers() {
        // Ceci est un exemple de données pour avoir un affichage de photographes de test dès le démarrage du projet, 
        // mais il sera à remplacer avec une requête sur le fichier JSON en utilisant "fetch".
        const api_url = "data/photographers.json"
        const res = await fetch(api_url)
        const photographersJsonFileData = await res.json()
        const photographers = photographersJsonFileData.photographers
        return {photographers : [...photographers]}
    }


    async function getPhotographersData() {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers();
        displayData(photographers);
    }
    
    getPhotographersData();


    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerTemplate(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    }


    function photographerTemplate(data) {
        const { name, portrait } = data;
    
        const picture = `assets/photographers/ID/${portrait}`;
    
        function getUserCardDOM() {
            const article = document.createElement( 'article' );
            const img = document.createElement( 'img' );
            img.setAttribute("src", picture)
            const h2 = document.createElement( 'h2' );
            h2.textContent = name;
            article.appendChild(img);
            article.appendChild(h2);
            return (article);
        }
        return { name, picture, getUserCardDOM }
    }