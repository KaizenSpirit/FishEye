export function addLikeListeners(price, updateTotalLikes) {
  const likeButtons = document.querySelectorAll('.like-button');
  likeButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      event.stopPropagation(); // Arrête la propagation de l'événement de clic
      const liked = event.target.getAttribute('data-liked') === 'true';
      if (!liked) {
        const likesSpan = event.target.previousElementSibling;
        let likes = parseInt(likesSpan.innerText);
        likes += 1;
        likesSpan.innerText = likes;
        event.target.setAttribute('data-liked', 'true');
        updateTotalLikes(price); 
      }
    });
  });
}

