const profileEditButton = document.querySelector(
  `.profile__edit-button`
); /*переменная кнопки редактирования профиля*/
const closeButons =
  document.querySelectorAll(
    `.popup__close`
  ); /*перемееная кнопки закрытия попапа*/
const popupsOverlay =
  document.querySelectorAll(`.popup`); /*переменная общего попапа*/
const popupEditProfile =
  document.querySelector(
    `.popup_type_profile`
  ); /*переменная попапа редактирования профиля*/
const profileNameInput = document.querySelector(
  `.popup__input_el_name`
); /*переменная поля ввода имени пользователя*/
const profileProfessionInput = document.querySelector(
  `.popup__input_el_profession`
); /*переменная поля ввода профессии пользователя*/
const profileName =
  document.querySelector(`.profile__name`); /*переменная имени пользователя*/
const profileProfession =
  document.querySelector(
    `.profile__profession`
  ); /*переменная профессии пользователя*/
const popupEditProfileForm =
  document.querySelector(
    `.popup__form-profile`
  ); /*переменная формы попапа редактирования профиля*/
const cardAddButton =
  document.querySelector(
    `.profile__add-button`
  ); /*переменная кнопки добавления карты*/
const popupAddCard =
  document.querySelector(
    `.popup_type_card`
  ); /*переменная попапа добавления карты*/
const cardNameInput = document.querySelector(
  `.popup__input_el_image-name`
); /*переменная поля ввода названия карточки*/
const cardUrlInput = document.querySelector(
  `.popup__input_el_image-url`
); /*переменная поля ввода ссылки картинки*/
const sectionElements =
  document.querySelector(
    `.elements`
  ); /*создали переменную секции в которую будут добавляться карточки*/
const popupAddCardForm =
  document.querySelector(
    `.popup__form-card`
  ); /*переменная формы добавления карты*/
const cardTempale =
  document.querySelector(`#cardTempale`).content; /*переменная шаблона карты*/
const popupImage =
  document.querySelector(
    `.popup__image`
  ); /*переменная увеличенного изображения попапа*/
const popupDescription =
  document.querySelector(
    `.popup__description`
  ); /*переменная надписи под изображением попапа*/
const popupBigImage =
  document.querySelector(`.popup_type_image`); /*переменная попапа увеличения*/

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

/*функция открытия попапов*/
function openPopup(item) {
  item.classList.add(`popup_opened`);
  document.addEventListener(`keydown`, closeByEscape);
}

function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

/*закрытие попапа кликом на овэрлэй*/
popupsOverlay.forEach((area) => {
  area.addEventListener(`mousedown`, (evt) => {
    closePopup(evt.target);
  });
});

/*функция открытия попапа редактирования профиля*/
function openEditProfileForm() {
  profileNameInput.value = profileName.textContent;
  profileProfessionInput.value = profileProfession.textContent;
  openPopup(popupEditProfile);
}

/*функция закрытия попапов*/
closeButons.forEach((item) => {
  item.addEventListener(`click`, function () {
    const popup = item.closest(`.popup`);
    closePopup(popup);
  });
});

function closePopup(item) {
  item.classList.remove(`popup_opened`);
  document.removeEventListener(`keydown`, closeByEscape);
}

profileEditButton.addEventListener(`click`, openEditProfileForm);

/*функция поведения попапа редактирования профиля при нажатии кнопки*/
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileProfession.textContent = profileProfessionInput.value;
  closePopup(popupEditProfile);
}

popupEditProfileForm.addEventListener(`submit`, handleProfileFormSubmit);

/*открытие попапа добавления карточки*/
cardAddButton.addEventListener(`click`, () => {
  openPopup(popupAddCard);
});

/*функция создания карточки*/
function createCard(card) {
  const cardElement = cardTempale.querySelector(`.card`).cloneNode(true);
  const cardDeleteButton = cardElement.querySelector(`.card__delete-button`);
  const likeCard = cardElement.querySelector(`.card__like-button`);
  const cardImage = cardElement.querySelector(`.card__image`);
  const cardName = cardElement.querySelector(`.card__title`);
  cardName.textContent = card.name;
  cardImage.setAttribute(`src`, card.link);
  cardImage.setAttribute(`alt`, card.name);
  /*попап увеличения*/
  cardImage.addEventListener(`click`, function () {
    popupDescription.textContent = card.name;
    popupImage.src = card.link;
    popupImage.alt = card.name;
    openPopup(popupBigImage);
  });
  /*лайк карточки*/
  likeCard.addEventListener(`click`, (evt) => {
    evt.target.classList.toggle(`card__like-button_active`);
  });
  /*удаление карточки*/
  cardDeleteButton.addEventListener(`click`, handleDeleteButtonClick);
  return cardElement;
}

function handleDeleteButtonClick(evt) {
  const button = evt.target;
  const card = button.closest(`.card`);
  card.remove();
}

function renderCard(item) {
  sectionElements.prepend(createCard(item));
}

initialCards.forEach((cardItems) => {
  renderCard(cardItems);
});

popupAddCardForm.addEventListener(`submit`, addNewCard);

/* функция добавления картоки*/
function addNewCard(card) {
  card.preventDefault();
  closePopup(popupAddCard);
  renderCard({
    name: cardNameInput.value,
    link: cardUrlInput.value,
  });
  const submitButton = document.querySelector(`.popup__submit`);
  submitButton.classList.add(`popup__submit_disabled`);
  submitButton.setAttribute(`disabled`, '');
  popupAddCardForm.reset();
}
