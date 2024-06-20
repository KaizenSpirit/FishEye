// Afficher la fenêtre modale de contact
function displayModal() {
  const modal = document.getElementById("contact_modal");
  if (modal) {
    modal.style.display = "block";
    disablePageFocus();
    document.addEventListener('keydown', handleModalKeyDown);
  } else {
    console.error('contact_modal not found');
  }
}

// Fermer la fenêtre modale de contact
function closeModal() {
  const modal = document.getElementById("contact_modal");
  if (modal) {
    modal.style.display = "none";
    enablePageFocus();
    document.removeEventListener('keydown', handleModalKeyDown);
  } else {
    console.error('contact_modal not found');
  }
}

// Gérer les touches dans la fenêtre modale (fermeture avec "Escape")
function handleModalKeyDown(event) {
  if (event.key === 'Escape') {
    closeModal();
  }
}

// Désactiver le focus sur tous les éléments sauf ceux de la fenêtre modale
function disablePageFocus() {
  document.querySelectorAll('body *').forEach(el => {
    if (!el.closest('#contact_modal')) {
      el.setAttribute('tabindex', '-1');
    }
  });
}

// Réactiver le focus sur tous les éléments après fermeture de la fenêtre modale
function enablePageFocus() {
  document.querySelectorAll('body *').forEach(el => {
    if (!el.closest('#contact_modal')) {
      el.removeAttribute('tabindex');
    }
  });
}

// Sélectionner l'élément de fin de modal
const modalEnd = document.querySelector('#contact-modal-end'); 

// Affichage de la fenêtre modale de fin
function displayModalEnd(){  
  modalEnd.style.display = "block";
  const closeButton = modalEnd.querySelector('.close-modal-end');
  if (closeButton) {
    closeButton.focus();
    trapFocusOnCloseButton(closeButton);
  } else {
    console.error('close-modal-end button not found');
  }
}

modalEnd.addEventListener('click', closeModalEnd);


function closeModalEnd(){
  modalEnd.style.display = "none";
}

// Piéger le focus sur le bouton de fermeture de la fenêtre modale de fin
function trapFocusOnCloseButton(button) {
  button.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
      e.preventDefault(); // Empêche le comportement par défaut de la touche Tab
      button.focus(); // Garde le focus sur le bouton
    }
  });
}

const firstNameInput = document.getElementById('prenom');
const lastNameInput = document.getElementById('nom');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

// Regex pour validation
const firstNameRegex = /^[a-zA-Z0-9-]{2,15}$/;
const lastNameRegex = /^[a-zA-Z0-9-]{2,15}$/;
const emailRegex = /^[\w-.]+@[\w-.]+\.[a-zA-Z]{2,25}$/;

// Messages d'erreur
const firstNameErrorMessage = "Prénom entre 2 et 15 caractères";
const lastNameErrorMessage = "Nom entre 2 et 15 caractères";
const emailErrorMessage = "Adresse email invalide";
const messageErrorMessage = " Dix caractères minimum";

// Validation des champs
function isInputsValidated(inputElement, regex, errorMessage) {
  if (!regex.test(inputElement.value)) {
    errorDisplay(inputElement, errorMessage);
    return false;
  }
  errorDisplay(inputElement, "");
  return true;
}

// Validation du champ de message
function isMessageValidated(textareaElement, errorMessage) {
  if (textareaElement.value.length < 10) {
    errorDisplay(textareaElement, errorMessage);
    return false;
  }
  errorDisplay(textareaElement, "");
  return true;
}

function errorDisplay(inputField, errorMessage) {
  const formData = inputField.parentElement;
  if (errorMessage) {
    inputField.classList.add('error');
    formData.setAttribute('data-error', errorMessage);
    formData.setAttribute('data-error-visible', 'true');
  } else {
    inputField.classList.remove('error');
    formData.removeAttribute('data-error');
    formData.removeAttribute('data-error-visible');
  }
}

firstNameInput.addEventListener('blur', () => {
  isInputsValidated(firstNameInput, firstNameRegex, firstNameErrorMessage);
});

lastNameInput.addEventListener('blur', () => {
  isInputsValidated(lastNameInput, lastNameRegex, lastNameErrorMessage);
});

emailInput.addEventListener('blur', () => {
  isInputsValidated(emailInput, emailRegex, emailErrorMessage);
});

messageInput.addEventListener('blur', () => {
  isMessageValidated(messageInput, messageErrorMessage);
});

// Gérer la soumission du formulaire
function handleFormSubmit(event) {
  event.preventDefault(); 
  const isFirstNameValid = isInputsValidated(firstNameInput, firstNameRegex, firstNameErrorMessage);
  const isLastNameValid = isInputsValidated(lastNameInput, lastNameRegex, lastNameErrorMessage);
  const isEmailValid = isInputsValidated(emailInput, emailRegex, emailErrorMessage);
  const isMessageValid = isMessageValidated(messageInput, messageErrorMessage);
  const isFormValid = isFirstNameValid && isLastNameValid && isEmailValid && isMessageValid;

  if (isFormValid) {
    const formData = {
      prenom: firstNameInput.value,
      nom: lastNameInput.value,
      email: emailInput.value,
      message: messageInput.value,
    };
    console.log(formData);
    // Réinitialiser le formulaire
    event.target.reset();
    closeModal();
    displayModalEnd();
  } else {
    console.log("formdata invalide");
  }
}

// Ajout d'écouteurs d'événements pour les boutons et le formulaire
document.querySelector(".contact_button")?.addEventListener('click', displayModal);
document.querySelector(".close_modale")?.addEventListener('click', closeModal);
document.querySelector(".close_modale")?.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.key === ' ') {
    closeModal();
  }
});

document.querySelector('#contact_modal form')?.addEventListener('submit', handleFormSubmit);

export { displayModal, closeModal };
