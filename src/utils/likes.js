/**
 * Ajoute des écouteurs d'événements aux boutons de like pour gérer l'incrémentation et la décrémentation des likes.
 * Les boutons peuvent être activés via un clic ou en appuyant sur la touche "Entrée".
 */
export function addLikeListeners() {
  const likeButtons = document.querySelectorAll('.like-button');
  likeButtons.forEach(button => {
    button.setAttribute('tabindex', '0');
    /**
     * Bascule l'état "like" d'un média, met à jour le nombre de likes et l'icône correspondante.
     * @param {Event} event - L'événement déclenché par un clic ou une pression sur la touche "Entrée".
     */
    const toggleLike = (event) => {
      event.stopPropagation(); 
      const icon = event.target;
      const liked = icon.getAttribute('data-liked') === 'true';
      const likesSpan = icon.previousElementSibling;
      let likes = parseInt(likesSpan.innerText);
      if (liked) {
        likes -= 1;
        icon.setAttribute('data-liked', 'false');
        icon.classList.remove('liked');
      } else {
        likes += 1;
        icon.setAttribute('data-liked', 'true');
        icon.classList.add('liked');
      }
      likesSpan.innerText = likes;
      updateTotalLikes();
    };
    button.addEventListener('click', toggleLike);
    button.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        toggleLike(event);
      }
    });
  });
}

/**
 * Met à jour le total des likes affiché en bas de la page en sommant tous les likes individuels.
 */
export function updateTotalLikes() {
  const likeCounts = document.querySelectorAll('.like-count');
  let total = 0;
  likeCounts.forEach(like => {
    total += parseInt(like.innerText, 10);
  });

  document.getElementById('total-likes').innerText = `${total}`;
}

/**
 * Insère le prix du photographe dans l'élément de la page prévu à cet effet.
 * @param {number} price - Le prix journalier du photographe.
 */
export function insertPhotographerPrice(price) {
  const priceElement = document.getElementById('photographer-price');
  if (priceElement) {
    priceElement.innerText = `${price}€/jour`;
  }
}
