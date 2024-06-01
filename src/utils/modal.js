function displayModal() {
  const modal = document.getElementById("contact_modal");
  if (modal) {
    modal.style.display = "block";
  } else {
    console.error('contact_modal not found');
  }
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  if (modal) {
    modal.style.display = "none";
  } else {
    console.error('contact_modal not found');
  }
}

document.querySelector(".contact_button")?.addEventListener('click', displayModal);
document.querySelector(".close_modale")?.addEventListener('click', closeModal);

export { displayModal, closeModal };
