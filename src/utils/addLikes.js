export function addLikeListeners(price, updateTotalLikes) {
  const likeButtons = document.querySelectorAll('.like-button');
  likeButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      event.stopPropagation(); // Arrête la propagation de l'événement de clic
      const icon = event.target; // Icone coeur cliqué
      const liked = icon.getAttribute('data-liked') === 'true';
      const likesSpan = icon.previousElementSibling;
      let likes = parseInt(likesSpan.innerText);

      if (liked) {
        // Décrémente le nombre de likes et change la couleur de l'icône à l'original
        likes -= 1;
        icon.setAttribute('data-liked', 'false');
        icon.classList.remove('liked');
      } else {
        // Incrémente le nombre de likes et change la couleur de l'icône en rouge
        likes += 1;
        icon.setAttribute('data-liked', 'true');
        icon.classList.add('liked');
      }

      likesSpan.innerText = likes;
      updateTotalLikes(price); 
    });
  });
}


