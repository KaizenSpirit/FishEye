export function addLikeListeners(price, updateTotalLikes) {
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
      updateTotalLikes(price);
    };
    button.addEventListener('click', toggleLike);
    
    button.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        toggleLike(event);
      }
    });
  });
}



