export function updateTotalLikes(price) { 
  const likeCounts = document.querySelectorAll('.like-count'); // Corrected class name
  let total = 0;
  likeCounts.forEach(like => {
    total += parseInt(like.innerText, 10); // Ensure correct base parsing
  });

  document.getElementById('total-likes').innerText = `${total}`;
  const priceElement = document.querySelector('.price-and-likes .price');
  if (!priceElement) {
    const priceDiv = document.createElement('div');
    priceDiv.classList.add('price');
    priceDiv.innerText = `${price}€/jour`;
    document.querySelector('.price-and-likes').appendChild(priceDiv);
  } else {
    priceElement.innerText = `${price}€/jour`;
  }
}


