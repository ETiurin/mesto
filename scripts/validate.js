const validationOptions = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__span_error'
};

function showInputError(formElement, inputElement, errorMessage, validationOptions) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationOptions.inputErrorClass);
  errorElement.classList.add(validationOptions.errorClass);
  errorElement.textContent = errorMessage;
};

function hideInputError(formElement, inputElement, validationOptions) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationOptions.inputErrorClass);
  errorElement.classList.remove(validationOptions.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, validationOptions) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validationOptions);
  } else {
    hideInputError(formElement, inputElement, validationOptions);
  }
};

const disableButton = (buttonElement, validationOptions) => {
  buttonElement.classList.add(validationOptions.inactiveButtonClass);
  buttonElement.setAttribute("disabled", true);
};

const enableButton = (buttonElement, validationOptions) => {
  buttonElement.classList.remove(validationOptions.inactiveButtonClass);
  buttonElement.removeAttribute("disabled");
};

function setEventListeners(formElement, validationOptions) {
  const inputList = Array.from(
    formElement.querySelectorAll(validationOptions.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    validationOptions.submitButtonSelector
  );
  toggleButtonState(inputList, buttonElement, validationOptions);
  
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, validationOptions);
      toggleButtonState(inputList, buttonElement, validationOptions);
    });
  });
}

function enableValidation(validationOptions) {
  const formList = Array.from(document.querySelectorAll(validationOptions.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, validationOptions);
  });
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

const toggleButtonState = (inputList, buttonElement, validationOptions) => {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonElement, validationOptions);
  } else {
    enableButton(buttonElement, validationOptions);
  }
};

enableValidation(validationOptions);