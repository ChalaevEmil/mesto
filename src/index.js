import { Card } from "./components/Card.js";
import { FormValidator, config } from "./components/FormValidator.js";
import {
  profileEditButton,
  popupAddCardForm,
  cardAddButton,
  popupEditProfileForm,
  profileNameInput,
  profileProfessionInput,
  initialCards,
} from "./utils/constants.js";
import { Section } from "./components/Section.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { UserInfo } from "./components/UserInfo.js";
import './pages/index.css';

function createCard(item) {
  const card = new Card(
    {
      data: item,
      handleCardClick: (name, link) => {
        popupBigImage.open(name, link);
      },
    },
    `#cardTempale`
  );
  const cardElement = card.randerCard();
  return cardElement;
}

const cards = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item);
      cards.addItem(cardElement);
    },
  },
  `.elements`
);

cards.renderItems();

const popupCardForm = new PopupWithForm(`.popup_type_card`, {
  callbackSubmit: (data) => {
    const card = createCard({
      name: data[`input-name`],
      link: data[`input-url`],
    });
    cards.addItem(card);
    popupCardForm.close();
  },
});

const popupBigImage = new PopupWithImage(`.popup_type_image`);
popupBigImage.setEventListeners();

popupCardForm.setEventListeners();

cardAddButton.addEventListener(`click`, () => {
  popupCardForm.open();
  cardFormValidation.resetValidation();
});

const profileRedaction = new UserInfo({
  selectorProfileName: `.profile__name`,
  selectorProfileProfession: `.profile__profession`,
});
const popupEditProfile = new PopupWithForm(".popup_type_profile", {
  callbackSubmit: (userInfo) => {
    profileRedaction.setUserInfo({
      userName: userInfo["name"],
      userProfession: userInfo["profession"],
    });
    popupEditProfile.close();
  },
});

popupEditProfile.setEventListeners();

profileEditButton.addEventListener(`click`, () => {
  const info = profileRedaction.getUserInfo();
  popupEditProfile.open();
  profileFormValidation.resetValidation();
  profileNameInput.value = info.userName;
  profileProfessionInput.value = info.userProfession;
});

const cardFormValidation = new FormValidator(config, popupAddCardForm);
cardFormValidation.enableValidation();
const profileFormValidation = new FormValidator(config, popupEditProfileForm);
profileFormValidation.enableValidation();
