// api.js
//Constante api_url : C'est l'URL du fichier JSON qui contient les données des photographes. Cette URL est stockée dans une constante pour être réutilisée facilement.
const api_url = "../data/photographers.json";
//Ce code JavaScript se connecte à une API (dans ce cas, un fichier JSON local) pour obtenir des informations sur les photographes et leurs médias. Il utilise des fonctions asynchrones pour gérer les appels réseau.


//Exportation de la fonction : La fonction getPhotographers est exportée pour pouvoir être utilisée dans d'autres fichiers.
// Fonction asynchrone : async function indique que cette fonction est asynchrone, ce qui signifie qu'elle peut attendre des opérations asynchrones (comme les appels réseau) pour se terminer.

export async function getPhotographers() {
  //fetch est une fonction intégrée de JavaScript qui permet de faire des requêtes réseau. Ici, elle est utilisée pour récupérer le fichier JSON à partir de api_url.
// await indique que la fonction doit attendre la réponse de fetch avant de continuer.
//Fetch :
  const response = await fetch(api_url);
  const photographersJsonFileData = await response.json();
  //La réponse de fetch est convertie en JSON en utilisant la méthode .json(). Cela transforme le contenu de la réponse en un objet JavaScript.
  return photographersJsonFileData.photographers;
  //La fonction retourne la liste des photographes trouvée dans l'objet JSON.
}

//Exportation de la fonction : Cette fonction est également exportée pour être utilisée dans d'autres fichiers.
// Fonction asynchrone : async function indique que cette fonction est asynchrone.
// Fetch :
export async function getPhotographerAndMedias(photographerId) {
  //Comme précédemment, fetch récupère le fichier JSON et await attend la réponse.
  const response = await fetch(api_url);
  // La réponse de fetch est convertie en JSON, transformant le contenu de la réponse en un objet JavaScript.
  //Conversion en JSON :
  const data = await response.json();
  // find est une méthode de tableau qui recherche le premier élément qui satisfait une condition. Ici, elle cherche le photographe dont l'ID correspond à photographerId.
  //Trouver un photographe spécifique :
  const photographer = data.photographers.find(p => p.id === photographerId);
  //filter est une méthode de tableau qui crée un nouveau tableau contenant tous les éléments qui satisfont une condition. Ici, elle cherche tous les médias associés au photographe avec l'ID photographerId.
  //Filtrer les médias :
  const media = data.media.filter(m => m.photographerId === photographerId);
  //Retourne le photographe et ses médias :
  // La fonction retourne un objet contenant le photographe trouvé et la liste de ses médias.
  return { photographer, media };
}

//api_url : Stocke l'URL du fichier JSON contenant les données des photographes.
// getPhotographers : Fonction asynchrone qui récupère et retourne la liste de tous les photographes depuis le fichier JSON.
// getPhotographerAndMedias : Fonction asynchrone qui récupère les données, trouve un photographe spécifique par son ID, filtre et retourne ses médias associés.