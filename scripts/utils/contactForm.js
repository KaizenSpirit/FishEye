
document.querySelector(".contact_button").addEventListener('click',displayModal)
document.querySelector(".close_modale").addEventListener('click',closeModal)

function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}
