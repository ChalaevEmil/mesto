export class Card {
    constructor(card, templateSelector){
        this._name = card.name;
        this._link = card.link;
        this._templateSelector = templateSelector;
    }

    _getTemplate(){
        const cardElement = document
            .querySelector(this._templateSelector)
            .content
            .querySelector(`.card`)
            .cloneNode(true);
        return cardElement;
    }

    createCard(){
        this._element = this._getTemplate();
        this._cardImage = this._element.querySelector(`.card__image`);
        this._cardImage.setAttribute(`src`, this._link);
        this._cardImage.setAttribute(`alt`, this._name);
        this._cardTitle = this._element.querySelector(`.card__title`);
        this._cardTitle.textContent = this._name;
        this._cardLikeButton = this._element.querySelector(`.card__like-button`);
        this._cardDeleteButton = this._element.querySelector(`.card__delete-button`);
        this._setEventListeners();
        return this._element;
    };

    like(){
        this._cardLikeButton.classList.toggle(`card__like-button_active`);
    }

    _removeCard(){
        this._cardDeleteButton.closest(`.card`).remove();
    }

    _createPopupBigImage(){
        popupDescription.textContent = this._name;
        popupImage.src = this._link;
        popupImage.alt = this._name;
        openPopup(popupBigImage)
    }

    _setEventListeners(){
        this._cardImage.addEventListener(`click`, ()=>{
            this._createPopupBigImage();
        });
        
        this._cardLikeButton.addEventListener(`click`, ()=>{
            this.like();
        });

        this._cardDeleteButton.addEventListener(`click`, ()=>{
            this._removeCard();
        });
    }
}

import{popupBigImage, openPopup, popupImage, popupDescription} from './index.js'