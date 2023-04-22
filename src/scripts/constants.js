const profileEditButton = document.querySelector(`.profile__edit-button`);
const popupAddCardForm = document.querySelector(`.popup__form-card`);
const cardAddButton = document.querySelector(`.profile__add-button`);
const popupEditProfileForm = document.querySelector(`.popup__form-profile`);
const profileNameInput = document.querySelector(`.popup__input_el_name`);
const profileProfessionInput = document.querySelector(
  `.popup__input_el_profession`
);

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

export {
  profileEditButton,
  popupAddCardForm,
  cardAddButton,
  popupEditProfileForm,
  profileNameInput,
  profileProfessionInput,
  initialCards,
};
