import { Card } from "./Card.js";
import { FormValidator, config } from "./FormValidator.js";

const profileEditButton = document.querySelector(`.profile__edit-button`);
const closeButons = document.querySelectorAll(`.popup__close`);
const popups = document.querySelectorAll(`.popup`);
const popupEditProfile = document.querySelector(`.popup_type_profile`);
const profileNameInput = document.querySelector(`.popup__input_el_name`);
const profileProfessionInput = document.querySelector(`.popup__input_el_profession`);
const profileName = document.querySelector(`.profile__name`);
const profileProfession = document.querySelector(`.profile__profession`);
const popupEditProfileForm = document.querySelector(`.popup__form-profile`);
const cardAddButton = document.querySelector(`.profile__add-button`);
const popupAddCard = document.querySelector(`.popup_type_card`);
const cardNameInput = document.querySelector(`.popup__input_el_image-name`);
const cardUrlInput = document.querySelector(`.popup__input_el_image-url`);
const sectionElements = document.querySelector(`.elements`);
const popupAddCardForm = document.querySelector(`.popup__form-card`);
const popupImage = document.querySelector(`.popup__image`);
const popupDescription = document.querySelector(`.popup__description`);
const popupBigImage = document.querySelector(`.popup_type_image`);
const addCardSubmitButton = popupAddCardForm.querySelector(`.popup__submit`);

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
    const openedPopup = document.querySelector(`.popup_opened`);
    closePopup(openedPopup);
  }
}

/*закрытие попапа кликом на овэрлэй*/
popups.forEach((area) => {
  area.addEventListener(`mousedown`, (evt) => {
    if (evt.target.classList.contains(`popup_opened`)) {
      closePopup(evt.target);
    }
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

function createCard(item){
  const card = new Card (item, '#cardTempale');
  const cardElement = card.createCard();
  return cardElement
}

function renderCard(item) {
  const cardElement = createCard(item);
  sectionElements.prepend(cardElement);
}

initialCards.forEach(renderCard);

popupAddCardForm.addEventListener(`submit`, addNewCard);

/* функция добавления картоки*/
function addNewCard(evt) {
  evt.preventDefault();
  closePopup(popupAddCard);
  renderCard({
    name: cardNameInput.value,
    link: cardUrlInput.value,
  });
  popupAddCardForm.reset();
  cardFormValidation.resetValidation();
}

const cardFormValidation = new FormValidator(config, popupAddCardForm);
cardFormValidation.enableValidation();
const profileFormValidation = new FormValidator(config, popupEditProfileForm);
profileFormValidation.enableValidation();

export {popupBigImage, openPopup, popupImage, popupDescription}