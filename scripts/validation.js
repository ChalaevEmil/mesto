const showInputError = (form, input, errorMessage, enableValidation) => {
  const errorElement = form.querySelector(`.${input.id}-error`);
  input.classList.add(enableValidation.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(enableValidation.errorClass);
};

const hideInputError = (form, input, enableValidation) => {
  const errorElement = form.querySelector(`.${input.id}-error`);
  input.classList.remove(enableValidation.inputErrorClass);
  errorElement.classList.remove(enableValidation.errorClass);
  errorElement.textContent = "";
};

const isValid = (form, input, enableValidation) => {
  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage, enableValidation);
  } else {
    hideInputError(form, input, enableValidation);
  }
};

const setEventListeners = (form, enableValidation) => {
  const inputList = Array.from(
    form.querySelectorAll(enableValidation.inputSelector)
  );
  const buttonElement = form.querySelector(
    enableValidation.submitButtonSelector
  );
  toggleButtonState(inputList, buttonElement, enableValidation);
  inputList.forEach((input) => {
    input.addEventListener(`input`, () => {
      isValid(form, input, enableValidation);
      toggleButtonState(inputList, buttonElement, enableValidation);
    });
  });
};

const enableValidation = (enableValidation) => {
  const formList = Array.from(
    document.querySelectorAll(enableValidation.formSelector)
  );
  formList.forEach((form) => {
    form.addEventListener(`submit`, (evt) => {
      evt.preventDefault();
    });
    setEventListeners(form, enableValidation);
  });
};

enableValidation({
  formSelector: `.popup__form`,
  inputSelector: `.popup__input`,
  submitButtonSelector: `.popup__submit`,
  inactiveButtonClass: `popup__submit_disabled`,
  inputErrorClass: `popup__input-error`,
  errorClass: `popup__input-error_active`,
});

function hasInvalidInput(inputList) {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement, enableValidation) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(enableValidation.inactiveButtonClass);
    buttonElement.setAttribute("disabled", "");
  } else {
    buttonElement.classList.remove(enableValidation.inactiveButtonClass);
    buttonElement.removeAttribute("disabled", "");
  }
}
