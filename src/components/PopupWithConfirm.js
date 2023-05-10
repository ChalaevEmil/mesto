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

  close() {
    super.close();
  }

  setEventListeners() {
    super.setEventListeners();
    this._buttonElement.addEventListener("mousedown", () => {
      this._apiCallBacks(this._card);
    });
  }
}

export { PopupWithConfirm };
