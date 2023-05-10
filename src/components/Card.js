export class Card {
  constructor(
    { data, handleCardClick, handleCardLike, handleCardDelete, userId },
    templateSelector
  ) {
    this._card = data;
    this._name = this._card.name;
    this._link = this._card.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._likes = this._card.likes;
    this._cardId = this._card._id;
    this._userId = userId;
    this._handleCardDelete = handleCardDelete;
    this._handleCardLike = handleCardLike;
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
    if (this._userId !== this._card.owner._id) {
      this._cardDeleteButton.style.display = `none`;
    }
    this._numberLikes = this._element.querySelector(`.card__like-number`);
    this._numberLikes.textContent = this._likes.length;
    this.showLike();
    this._setEventListeners();
    return this._element;
  }

  like(item) {
    this._numberLikes.textContent = item;
    this._cardLikeButton.classList.toggle(`card__like-button_active`);
  }

  isButtomLiked() {
    return this._cardLikeButton.classList.contains(`card__like-button_active`);
  }

  showLike() {
    this._likes.forEach((element) => {
      if (element._id === this._userId) {
        this._cardLikeButton.classList.add(`card__like-button_active`);
      }
    });
  }

  _setEventListeners() {
    this._cardLikeButton.addEventListener(`click`, () =>
      this._handleCardLike(this._cardId)
    );
    this._cardDeleteButton.addEventListener(`click`, () => {
      this._handleCardDelete({ cardObj: this._card, cardDom: this._element });
    });
    this._cardImage.addEventListener(`click`, () =>
      this._handleCardClick(this._name, this._link)
    );
  }
}
