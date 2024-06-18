export function addLikeListeners() {
  const likeButtons = document.querySelectorAll('.like-button');

  likeButtons.forEach(button => {
    button.setAttribute('tabindex', '0');
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
      updateTotalLikes(); // Mise à jour directe des likes
    };
    button.addEventListener('click', toggleLike);
    button.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        toggleLike(event);
      }
    });
  });
}

export function updateTotalLikes() {
  const likeCounts = document.querySelectorAll('.like-count');
  let total = 0;
  likeCounts.forEach(like => {
    total += parseInt(like.innerText, 10);
  });

  document.getElementById('total-likes').innerText = `${total}`;
}

export function insertPhotographerPrice(price) {
  const priceElement = document.getElementById('photographer-price');
  if (priceElement) {
    priceElement.innerText = `${price}€/jour`;
  }
}