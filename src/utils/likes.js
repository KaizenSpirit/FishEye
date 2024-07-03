/**
 * Ajoute des écouteurs d'événements aux boutons de like pour gérer l'incrémentation et la décrémentation des likes.
 * Les boutons peuvent être activés via un clic ou en appuyant sur la touche "Entrée".
 */
export function addLikeListeners() {
  const likeContainers = document.querySelectorAll('.likes');
  likeContainers.forEach(container => {
    container.setAttribute('tabindex', '0');
    /**
     * Bascule l'état "like" d'un média, met à jour le nombre de likes et l'icône correspondante.
     * @param {Event} event - L'événement déclenché par un clic ou une pression sur la touche "Entrée".
     */
    const toggleLike = (event) => {
      event.stopPropagation(); 
      const icon = container.querySelector('.like-button');
      const liked = icon.getAttribute('data-liked') === 'true';
      const likesSpan = container.querySelector('.like-count');
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
      likesSpan.setAttribute('aria-label', `${likes} likes pour ce media`);  // Ajout de aria-label pour lire correctement le nombre
      updateTotalLikes();
    };

    container.addEventListener('click', toggleLike);
    container.addEventListener('keydown', (event) => {
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

  const totalLikesElement = document.getElementById('total-likes');
  const totalText = `${total}`;
  totalLikesElement.innerText = totalText;
  totalLikesElement.setAttribute('aria-label', `Total des likes du photographe ${totalText}`);
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
