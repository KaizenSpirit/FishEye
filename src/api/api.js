// class Api {
//     constructor(url) { 
//       this._url = url;
//     }
//     async get() {
//       try {
//         const response = await fetch(this._url);
//         if (!response.ok) {
//           throw new Error("La réponse du réseau n'est pas correcte");
//         }
//         const data = await response.json();
//         return data; 
//       } catch (error) {
//         console.error('Erreur sur la récupération des données:', error);
//       }
//     }
//   }

export class Api {
  constructor(url) { 
    this._url = url;
  }

  async get() {
    return fetch(this._url)
      .then(response => {
        if (!response.ok) {
          throw new Error("La réponse du réseau n'est pas correcte");
        }
        return response.json();
      })
      .catch(error => {
        console.error('Erreur sur la récupération des données:', error);
      });
  }
}
// L'utilisation de async/await est remplacée par des promesses et la syntaxe then() pour gérer la logique asynchrone.

// En utilisant then(), travaille directement avec les promesses retournées par les appels asynchrones, évitant ainsi l'utilisation de async/await.

// async/await,toujours retourner une promesse à partir de la méthode get() pour que le code qui l'appelle puisse attendre la résolution ou le rejet de la promesse. Dans cet exemple, promesse est retournée par l'appel à fetch(), et ensuite, elle est manipulée à l'aide de la méthode then().

