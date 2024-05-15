//Mettre le code JavaScript lié à la page photographer.html

window.onload = async () => {
    const selectedPhotographer = JSON.parse(localStorage.getItem('selectedPhotographer'));
    document.getElementById('nameProfil').textContent = selectedPhotographer.name;
    document.getElementById('locationProfil').textContent = `${selectedPhotographer.city}, ${selectedPhotographer.country}`;
    document.getElementById('taglineProfil').textContent = selectedPhotographer.tagline;
    document.getElementById('photoProfil').innerHTML = `<img src="assets/photographers/ID/${selectedPhotographer.portrait}" alt="${selectedPhotographer.name}">`;



//fetch data

// displayData

//carousel 

// sort

//likes

// key right and left



}