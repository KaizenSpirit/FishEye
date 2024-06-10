function displayModal() {
  const modal = document.getElementById("contact_modal");
  if (modal) {
    modal.style.display = "block";
    disablePageFocus();
    // Add keyboard event listeners
    document.addEventListener('keydown', handleModalKeyDown);
  } else {
    console.error('contact_modal not found');
  }
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  if (modal) {
    modal.style.display = "none";
    enablePageFocus();
    // Remove keyboard event listeners
    document.removeEventListener('keydown', handleModalKeyDown);
  } else {
    console.error('contact_modal not found');
  }
}


function handleModalKeyDown(event) {
  if (event.key === 'Escape') {
    closeModal();
  }
}

function disablePageFocus() {
  document.querySelectorAll('body *').forEach(el => {
    if (!el.closest('#contact_modal')) {
      el.setAttribute('tabindex', '-1');
    }
  });
}

function enablePageFocus() {
  document.querySelectorAll('body *').forEach(el => {
    if (!el.closest('#contact_modal')) {
      el.removeAttribute('tabindex');
    }
  });
}
const modalEnd = document.querySelector('#contact-modal-end'); 

function displayModalEnd(){  
  modalEnd.style.display = "block";
}

modalEnd.addEventListener('click',closeModalEnd)
function closeModalEnd(){
  modalEnd.style.display = "none";
}


// Sélecteurs des champs de formulaire
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

// Fonction de validation des champs
function isInputsValidated(inputElement, regex, errorMessage) {
  if (!regex.test(inputElement.value)) {
    errorDisplay(inputElement, errorMessage);
    return false;
  }
  errorDisplay(inputElement, "");
  return true;
}

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
    displayModalEnd()
  } else {
    console.log("formdata invalide");
  }
}

document.querySelector(".contact_button")?.addEventListener('click', displayModal);
document.querySelector(".close_modale")?.addEventListener('click', closeModal);
document.querySelector(".close_modale")?.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.key === ' ') {
    closeModal();
  }
});

document.querySelector('#contact_modal form')?.addEventListener('submit', handleFormSubmit);

export { displayModal, closeModal };
