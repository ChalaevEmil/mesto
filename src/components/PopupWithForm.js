import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, callbackSubmit) {
    super(popupSelector);
    this._callbackSubmit = callbackSubmit;
    this._form = this._popup.querySelector(`.popup__form`);
    this._inputList = Array.from(this._form.querySelectorAll(`.popup__input`));
    this._buttonElement = this._form.querySelector(`.popup__submit`);
  }

  _getInputValues() {
    const formInputData = new Object();
    this._inputList.forEach((input) => {
      formInputData[input.name] = input.value;
    });
    return formInputData;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener(`submit`, (evt) => {
      evt.preventDefault();
      this._callbackSubmit(this._getInputValues());
    });
  }

  close() {
    this._form.reset();
    super.close();
  }

  loadingConfirm(isLoading, content) {
    if (isLoading) {
      this._buttonElement.textContent = `Сохранение...`;
    } else {
      this._buttonElement.textContent = content;
    }
  }
}
