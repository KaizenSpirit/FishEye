/**
 * Affiche la modal de contact et désactive le focus sur le reste de la page.
 * Ajoute également un écouteur pour fermer la modal avec la touche Échap.
 */
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

/**
 * Ferme la modal de contact et réactive le focus sur le reste de la page.
 * Supprime également l'écouteur pour fermer la modal avec la touche Échap.
 */
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

/**
 * Gère les événements de touche pour fermer la modal de contact avec la touche Échap.
 * @param {KeyboardEvent} event - L'événement clavier.
 */
function handleModalKeyDown(event) {
  if (event.key === 'Escape') {
    closeModal();
  }
}

/**
 * Désactive le focus sur tous les éléments de la page sauf ceux à l'intérieur de la modal de contact.
 */
function disablePageFocus() {
  document.querySelectorAll('body *').forEach(el => {
    if (!el.closest('#contact_modal')) {
      el.setAttribute('tabindex', '-1');
    }
  });
}

/**
 * Réactive le focus sur tous les éléments de la page sauf ceux à l'intérieur de la modal de contact.
 */
function enablePageFocus() {
  document.querySelectorAll('body *').forEach(el => {
    if (!el.closest('#contact_modal')) {
      el.removeAttribute('tabindex');
    }
  });
}

const modalEnd = document.querySelector('#contact-modal-end');

/**
 * Affiche la modal de fin de contact et met le focus sur le bouton de fermeture.
 * Ajoute également un piège de focus pour le bouton de fermeture.
 */
function displayModalEnd() {
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

/**
 * Ferme la modal de fin de contact.
 */
function closeModalEnd() {
  modalEnd.style.display = "none";
}

/**
 * Piège le focus sur le bouton de fermeture de la modal de fin de contact pour éviter que le focus ne sorte de la modal.
 * @param {HTMLElement} button - Le bouton de fermeture sur lequel piéger le focus.
 */
function trapFocusOnCloseButton(button) {
  button.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
      e.preventDefault();
      button.focus();
    }
  });
}

const firstNameInput = document.getElementById('prenom');
const lastNameInput = document.getElementById('nom');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

const firstNameRegex = /^[a-zA-Z0-9-]{2,15}$/;
const lastNameRegex = /^[a-zA-Z0-9-]{2,15}$/;
const emailRegex = /^[\w-.]+@[\w-.]+\.[a-zA-Z]{2,25}$/;

const firstNameErrorMessage = "Prénom entre 2 et 15 caractères";
const lastNameErrorMessage = "Nom entre 2 et 15 caractères";
const emailErrorMessage = "Adresse email invalide";
const messageErrorMessage = "Dix caractères minimum";

/**
 * Valide l'entrée d'un champ de formulaire selon un regex et affiche un message d'erreur si invalide.
 * @param {HTMLInputElement} inputElement - L'élément de champ de formulaire à valider.
 * @param {RegExp} regex - L'expression régulière à utiliser pour valider l'entrée.
 * @param {string} errorMessage - Le message d'erreur à afficher si l'entrée est invalide.
 * @returns {boolean} - Retourne true si l'entrée est valide, sinon false.
 */
function isInputsValidated(inputElement, regex, errorMessage) {
  if (!regex.test(inputElement.value)) {
    errorDisplay(inputElement, errorMessage);
    return false;
  }
  errorDisplay(inputElement, "");
  return true;
}

/**
 * Valide le champ de texte du message et affiche un message d'erreur si la longueur est inférieure à 10 caractères.
 * @param {HTMLTextAreaElement} textareaElement - L'élément de champ de texte à valider.
 * @param {string} errorMessage - Le message d'erreur à afficher si le texte est invalide.
 * @returns {boolean} - Retourne true si le texte est valide, sinon false.
 */
function isMessageValidated(textareaElement, errorMessage) {
  if (textareaElement.value.length < 10) {
    errorDisplay(textareaElement, errorMessage);
    return false;
  }
  errorDisplay(textareaElement, "");
  return true;
}

/**
 * Affiche ou masque un message d'erreur pour un champ de formulaire.
 * @param {HTMLElement} inputField - Le champ de formulaire où afficher/masquer le message d'erreur.
 * @param {string} errorMessage - Le message d'erreur à afficher. Si vide, l'erreur est masquée.
 */
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

// Ajoute des écouteurs de validation aux champs du formulaire.
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

/**
 * Gère la soumission du formulaire, valide les champs et affiche les modals appropriées.
 * @param {Event} event - L'événement de soumission du formulaire.
 */
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
    event.target.reset();
    closeModal();
    displayModalEnd();
  } else {
    console.log("formdata invalide");
  }
}

// Ajoute des écouteurs d'événements pour ouvrir et fermer la modal de contact.
document.querySelector(".contact_button")?.addEventListener('click', displayModal);
document.querySelector(".close_modale")?.addEventListener('click', closeModal);
document.querySelector(".close_modale")?.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.key === ' ') {
    closeModal();
  }
});

// Ajoute un écouteur d'événement pour gérer la soumission du formulaire.
document.querySelector('#contact_modal form')?.addEventListener('submit', handleFormSubmit);

export { displayModal, closeModal };
