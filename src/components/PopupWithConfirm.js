import { Popup } from "./Popup.js";

class PopupWithConfirm extends Popup {
  constructor(popupSelector, apiCallBacks) {
    super(popupSelector);
    this._apiCallBacks = apiCallBacks;
    this._buttonElement = this._popup.querySelector(`.popup__submit`);
  }

  open(cardId) {
    super.open();
    this._card = cardId;
  }

  setEventListeners() {
    super.setEventListeners();
    this._buttonElement.addEventListener("mousedown", () => {
      this._apiCallBacks(this._card);
    });
  }

  loadingConfirm(isLoading, content) {
    if (isLoading) {
      this._buttonElement.textContent = `Сохранение...`;
    } else {
      this._buttonElement.textContent = content;
    }
  }
}

export { PopupWithConfirm };
