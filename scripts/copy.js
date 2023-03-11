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
const cardTempale = document.querySelector(`#cardTempale`).content;/*переменная шаблона карты*/
const popupImage = document.querySelector(`.popup__image`);/*переменная увеличенного изображения попапа*/
const popupDescription = document.querySelector(`.popup__description`);/*переменная надписи под изображением попапа*/
const bigImagePopup = document.querySelector(`.popup_type_image`);/*переменная попапа увеличения*/

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

  /*--------------функция открытия попапов---------------*/
  function openPopup (item) {
    item.classList.add('popup_opened');
   };

   /*--------------функция открытия попапа редактирования профиля---------------*/
   function openEditPopup(){
    nameInput.value = profileName.textContent;
    professionInput.value = profileProfession.textContent;
    openPopup(editPopup);
};

/*--------------функция закрытия попапов---------------*/
popupCloseButton.forEach(item => {
    item.addEventListener(`click`, function(){
      const popup = item.closest (`.popup`);
      popupClosed(popup) 
    })
  });
      
      function popupClosed(item){
        item.classList.remove(`popup_opened`);
    };

profileEditButton.addEventListener(`click`, openEditPopup);

/*-------------функция поведения попапа редактирования профиля при нажатии кнопки------------------*/
function handleProfileFormSubmit (evt) {
    evt.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileProfession.textContent = professionInput.value;
    popupClosed(editPopup);
};

editPopupSubmit.addEventListener(`submit`, handleProfileFormSubmit);

/*---------------открытие попапа добавления карточки-------------------*/
cardAddButton.addEventListener(`click`, () => {
    openPopup(cardAddPopup);
});

/*------------функция поведения добавления карты при нажатии кнопки-----------*/
function handleAddCardFormSubmit (event) {
    event.preventDefault(); 
    const name = document.querySelector(`.popup__input_el_image-name`).value;
    const link = document.querySelector(`.popup__input_el_image-url`).value;
    const card = {name, link};
    createCard(card);
    popupClosed(cardAddPopup);
};

function createCard(card){
    cardTempale.cloneNode(true);/*клонируем содержимое шаблона карточки*/
    const cardName = cardTempale.querySelector(`.card__title`);
    cardName.textContent = card.name;
    const cardImage = cardTempale.querySelector(`.card__image`);
    cardImage.setAttribute(`src`, card.link);
    cardImage.setAttribute(`alt`, card.name);
    const cardDeleteButton = cardTempale.querySelector(`.card__delete-button`);
    cardDeleteButton.addEventListener(`click`, handleDeleteButtonClick); 
    sectionElements.prepend(cardTempale);
    cardTempale.querySelector(`.card__like-button`).addEventListener(`click`, (event) => {
        event.target.classList.toggle(`card__like-button_active`);
  });
    cardPopupForm.reset();
    cardImage.addEventListener(`click`, function(){
      popupDescription.textContent = card.name;
      popupImage.src = card.link;
      openPopup(bigImagePopup);
  });
  };

  initialCards.forEach(createCard); /*прогнали по циклу*/

  /*создали функцию удаления карты*/
  function handleDeleteButtonClick(event){
    const deleteButton = event.target;
    const card = deleteButton.closest(`.card`);
    card.remove();
  }
