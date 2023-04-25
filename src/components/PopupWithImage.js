import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupDescription = this._popup.querySelector(`.popup__description`);
    this._popupImage = this._popup.querySelector(`.popup__image`);
  }

  open(description, image) {
    super.open();
    this._popupImage.setAttribute(`src`, image);
    this._popupImage.setAttribute(`alt`, description);
    this._popupDescription.textContent = description;
  }
}
