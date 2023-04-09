const config = {
    formSelector: `.popup__form`,
    inputSelector: `.popup__input`,
    submitButtonSelector: `.popup__submit`,
    inactiveButtonClass: `popup__submit_disabled`,
    inputErrorClass: `popup__input-error`,
    errorClass: `popup__input-error_active`
  };
  

  class FormValidator {
    constructor(config, formElement) {
      this.config = config;
      this._formElement = formElement;
      this._inputList = Array.from(this._formElement.querySelectorAll(this.config.inputSelector));
      this._buttonElement = this._formElement.querySelector(this.config.submitButtonSelector);
    }
  
    _showInputError(input, errorMessage) {
      const errorElement = this._formElement.querySelector(`.${input.id}-error`);
      input.classList.add(this.config.inputErrorClass);
      errorElement.textContent = errorMessage;
      errorElement.classList.add(this.config.errorClass);
    }
  
    _hideInputError(input) {
      const errorElement = this._formElement.querySelector(`.${input.id}-error`);
      input.classList.remove(this.config.inputErrorClass);
      errorElement.classList.remove(this.config.errorClass);
      errorElement.textContent = "";
    }
  
    _isValid(input) {
      if (!input.validity.valid) {
        this._showInputError(input, input.validationMessage);
      } else {
        this._hideInputError(input);
      }
    }
  
    _setEventListeners() {
      this._toggleButtonStatus();
  
      this._formElement.addEventListener(this.resetValidation(), this._toggleButtonStatus()
      );
  
      this._inputList.forEach((input) => {
        input.addEventListener(`input`, () => {
          this._isValid(input);
          this._toggleButtonStatus();
        });
      });
    }
  
    enableValidation() {
      this._formElement.addEventListener(`submit`, (evt) => {
        evt.preventDefault();
      });
  
      this._setEventListeners();
    }
  
    _hasInvalidInput() {
      return this._inputList.some((input) => {
        return !input.validity.valid;
      });
    }
  
    _toggleButtonStatus() {
      if (this._hasInvalidInput()) {
        this._buttonElement.classList.add(this.config.inactiveButtonClass);
        this._buttonElement.setAttribute(`disabled`, ``);
      } else {
        this._buttonElement.classList.remove(this.config.inactiveButtonClass);
        this._buttonElement.removeAttribute(`disabled`, ``);
      }
    }
  
    resetValidation() {
      this._toggleButtonStatus();
  
      this._inputList.forEach((input) => {
        this._hideInputError(input);
      });
    }
  }
  
  export{FormValidator, config}