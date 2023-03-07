const profileEditButton = document.querySelector(`.profile__edit-button`);/*переменная кнопки редактирования профиля*/
const popupCloseButton = document.querySelectorAll(`.popup__close`);/*перемееная кнопки закрытия попапа*/
const popup = document.querySelector (`.popup`);/*переменная общего попапа*/
const editPopup = document.querySelector(`.popup_type_profile`);/*переменная попапа редактирования профиля*/
const nameInput = document.querySelector(`.popup__input_el_name`);/*переменная поля ввода имени пользователя*/
const professionInput = document.querySelector(`.popup__input_el_profession`);/*переменная поля ввода профессии пользователя*/
const profileName = document.querySelector(`.profile__name`);/*переменная имени пользователя*/
const profileProfession = document.querySelector(`.profile__profession`);/*переменная профессии пользователя*/
const editPopupSubmit = document.querySelector(`.popup__form-profile`); /*переменная формы попапа редактирования профиля*/
const cardAddButton = document.querySelector(`.profile__add-button`); /*переменная кнопки добавления карты*/
const cardAddPopup = document.querySelector (`.popup_type_card`); /*переменная попапа добавления карты*/
const cardNameInput = document.querySelector(`.popup__input_el_image-name`); /*переменная поля ввода названия карточки*/
const urlInput = document.querySelector(`.popup__input_el_image-url`); /*переменная поля ввода ссылки картинки*/
const sectionElements = document.querySelector(`.elements`); /*создали переменную секции в которую будут добавляться карточки*/
const cardPopupForm = document.querySelector(`.popup__form-card`); /*переменная формы добавления карты*/

/*задали массив карточек для страницы*/
const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ]; 

/*функция открытия попапа редактирования профиля*/
function openEditPopup(){
    editPopup.classList.add(`popup_opened`);
    nameInput.value = profileName.textContent;
    professionInput.value = profileProfession.textContent;
};

/*событие открытия попапа редактирования профиля при нажатии на кнопку profileEditButton*/
profileEditButton.addEventListener(`click`, openEditPopup);

/*функция поведия попапа редактирования профиля при нажатии кнопки*/
function handleProfileFormSubmit (evt) {
    evt.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileProfession.textContent = professionInput.value;
    popupClosed(editPopup);
};

editPopupSubmit.addEventListener(`submit`, handleProfileFormSubmit);

/*функция открытия попапа добавления карточки*/
function cardPopupOpened(){   
    cardAddPopup.classList.add(`popup_opened`);
    };

cardAddButton.addEventListener(`click`, cardPopupOpened);

/*функция закрытия попапов*/
popupCloseButton.forEach(item => {
  item.addEventListener(`click`, function(){
    const popup = item.closest (`.popup`);
    popupClosed(popup) 
  })
});
    
    function popupClosed(item){
      item.classList.remove(`popup_opened`);
  };

 /*создали функцию добавления карты + лайки + удаление карты + открытие попапа увеличения катринки*/
 function createCard(card){
    const cardTempale = document.querySelector(`#cardTempale`).content.cloneNode(true);/*клонируем содержимое шаблона карточки*/
    const cardName = cardTempale.querySelector(`.card__title`);
    cardName.textContent = card.name;
    const cardImage = cardTempale.querySelector(`.card__image`);
    cardImage.setAttribute(`src`, card.link);
    cardImage.setAttribute(`alt`, card.name);
    const cardDeleteButton = cardTempale.querySelector(`.card__delete-button`);
    cardDeleteButton.addEventListener(`click`, handleDeleteButtonClick); 
    sectionElements.prepend(cardTempale);
    const buttonLike = document.querySelector(`.card__like-button`);
    buttonLike.addEventListener(`click`, function (event) {
        event.target.classList.toggle(`card__like-button_active`);
  });
    cardPopupForm.reset();
    cardImage.addEventListener(`click`, function(){
      const popupImage = document.querySelector(`.popup__image`);
      const popupDescription = document.querySelector(`.popup__description`);
      const bigImagePopup = document.querySelector(`.popup_type_image`);
      bigImagePopup.classList.add(`popup_opened`);
      popupDescription.textContent = card.name;
      popupImage.src = card.link;
  });
  };

  initialCards.forEach(createCard); /*прогнали по циклу*/

  /*создали функцию удаления карты*/
  function handleDeleteButtonClick(event){
    const deleteButton = event.target;
    const card = deleteButton.closest(`.card`);
    card.remove();
  }

  cardPopupForm.addEventListener(`submit`, handleAddCardFormSubmit);

  /*функция поведия добавления карты при нажатии кнопки*/
  function handleAddCardFormSubmit (event) {
    event.preventDefault(); 
    const name = document.querySelector(`.popup__input_el_image-name`).value;
    const link = document.querySelector(`.popup__input_el_image-url`).value;
    const card = {name, link};
    createCard(card);
    popupClosed(cardAddPopup);
};