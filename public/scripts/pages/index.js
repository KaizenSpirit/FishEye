import {Api} from "../../../src/api/api.js"
import {Photographer} from "../../../src/classes/Photographer.js"

      async function getPhotographers(){ 
        const api = new Api('../../../src/data/photographers.json');
        const data = await api.get();
        const photographers = data.photographers.map(photographerData => {
          const photographer = new Photographer(photographerData);
          return {
            name: photographer.name,
            id: photographer.id,
            tagline: photographer.tagline,
            price: photographer.price,
            portrait: photographer.portrait,
            location: photographer.location,
            medias: photographer.medias
          };
        });
        
        return photographers
    }


//Dans le contexte d'une application logicielle, un "service" est généralement une classe ou un module qui fournit des fonctionnalités spécifiques ou des traitements liés à un domaine particulier de l'application. Les services encapsulent souvent la logique métier et fournissent une interface pour interagir avec cette logique depuis d'autres parties de l'application.

// Dans le cas du code que vous avez fourni, la fonction getPhotographers pourrait être considérée comme un service. Ce service est responsable de la récupération des données des photographes à partir d'une source (dans ce cas, un fichier JSON) et de la transformation de ces données en un format approprié pour être utilisé dans l'application.

// L'idée de placer cette fonctionnalité dans un service distinct est de promouvoir la séparation des préoccupations et la modularité de votre code. En isolant la logique de récupération des données dans un service dédié, vous pouvez facilement modifier ou remplacer cette logique sans avoir à toucher d'autres parties de votre application.

// Les services sont souvent utilisés pour encapsuler des fonctionnalités communes telles que l'accès aux données, l'authentification, la validation, etc. Ils permettent également de rendre le code plus réutilisable, car d'autres parties de l'application peuvent simplement appeler les méthodes exposées par le service pour effectuer certaines tâches, sans avoir à connaître les détails de l'implémentation sous-jacente.






















































    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");
        photographers.forEach((photographer) => {
            const photographerModel = photographerTemplate(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    }

// Initialisation
async function init() {
    const photographers = await getPhotographers();
    displayData(photographers);
}

init();
    
