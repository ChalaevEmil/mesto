export class Card {
  constructor({ data, handleCardClick }, templateSelector) {
    this._card = data;
    this._name = this._card.name;
    this._link = this._card.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    this.cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(`.card`)
      .cloneNode(true);
    return this.cardElement;
  }

  randerCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(`.card__image`);
    this._cardImage.setAttribute(`src`, this._link);
    this._cardImage.setAttribute(`alt`, this._name);
    this._cardTitle = this._element.querySelector(`.card__title`);
    this._cardTitle.textContent = this._name;
    this._cardLikeButton = this._element.querySelector(`.card__like-button`);
    this._cardDeleteButton =
      this._element.querySelector(`.card__delete-button`);
    this._setEventListeners();
    return this._element;
  }

  like() {
    this._cardLikeButton.classList.toggle(`card__like-button_active`);
  }

  _removeCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._cardLikeButton.addEventListener(`click`, () => {
      this.like();
    });

    this._cardDeleteButton.addEventListener(`click`, () => {
      this._removeCard();
    });

    this._cardImage.addEventListener(`click`, () => {
      this._handleCardClick(this._name, this._link);
    });
  }
}
